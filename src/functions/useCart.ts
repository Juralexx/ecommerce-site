import React from "react";
import { createCart, getCart, updateCart } from "@/api/carts";
import { CartProduct, IProductVariant, Product, Promotion } from "@/types";
import { getPromotions } from "@/api/promotions";

interface Props {
    cart: CartProduct[];
    setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    codePromo: Promotion.Options | null;
    setCodePromo: React.Dispatch<React.SetStateAction<Promotion.Options | null>>;
}

export default function useCart({ cart, setCart, codePromo, setCodePromo }: Props) {
    //Variable to handle loading while fetching user cart
    const [isCartFetched, setCartFetched] = React.useState<boolean>(false);
    //Total cart price
    const [total, setTotal] = React.useState<number>(0);
    //All promotions codes applicable to the cart
    const [applicableCodes, setApplicableCodes] = React.useState<any[]>([]);

    //Cart object
    const [promotions, setPromotions] = React.useState<Promotion.Options[]>([]);

    React.useEffect(() => {
        //Fetch promotions
        async function fetchPromotions() {
            const { promotions: promos } = await getPromotions()
            if (promos) {
                setPromotions(promos)
            }
        }
        fetchPromotions()
    }, [])

    /**
     * Hook to fetch the user cart if he already has one in the database
     */

    React.useEffect(() => {
        const fetchExistingCart = async () => {
            //Get the user cart ID in the localStorage
            const cartStorage = localStorage.getItem('cart_id');
            //If there's a cart ID
            if (cartStorage) {
                //Fetch the cart in the database
                const { cart: existingCart } = await getCart(cartStorage);
                //If there's a cart in the database
                if (existingCart && existingCart?.products) {
                    //Retrieve all the cart products with the right structure { product, variant, quantity }
                    const products = existingCart.products.map((cartItem: any) => {
                        //Get current product and quantity
                        const { product, quantity } = cartItem;
                        //Find the variant stored in the database through all the product variant
                        const variant = product?.variants.find((el: any) => el._id === cartItem.variant);
                        //If the variant still exists
                        if (variant) {
                            return {
                                _id: product._id,
                                name: product.name,
                                category: product.category,
                                promotions: product.promotions,
                                image: product.images![0].path,
                                variant: variant,
                                original_price: variant.price,
                                promotion: variant.promotion,
                                taxe: variant.taxe,
                                price: variant.price - ((variant.promotion / 100) * variant.price),
                                quantity: quantity
                            }
                        }
                    })
                    //Assign the products to the cart
                    setCart(products)
                }
                //If the cart ID do not exists in the database
                //Remove the cart_id from the localStorage
                else {
                    localStorage.removeItem('cart_id')
                }
            }
            setCartFetched(true)
        }
        fetchExistingCart()
    }, [])

    /**
     * Store all the codes applicable to the current cart in the 'applicableCodes' array
     */

    function storeApplicablesCodes() {
        //Deep applicable code duplication to mutate orinal array
        let applicablecodesArr = [...applicableCodes];
        //For each cart products
        for (let i = 0; i < cart.length; i++) {
            //Get the current product
            const product = cart[i];
            //If the product variant doesn't have a promotion
            //We check that so the codes wouldn't be cumulable with a default promotion
            if (!product.promotion || product.promotion === 0) {
                //If the product is concerned by a promotion codes
                if (product.promotions.length > 0) {
                    //For each product promotion codes
                    product.promotions.forEach(promo => {
                        const now = new Date();
                        //If the promotion has not started yet, return
                        if (now < promo.start_date) return;
                        //If the promotion is finished, return
                        if (promo.end_date && (now > promo.end_date)) return;
                        //Check if the applicable code already exists in the 'applicableCodes' array
                        const isAlreadyInApplicableCodes = applicablecodesArr.some(el => el._id === promo._id);
                        //If it's not already present
                        if (!isAlreadyInApplicableCodes) {
                            //Push it to the applicable codes
                            applicablecodesArr = [...applicablecodesArr, promo];
                        }
                    })
                }
            }
        }
        //Pass the applicableCodes retrieved from the cart products to the 'applicableCodes' var
        setApplicableCodes(applicablecodesArr)
    }

    /**
     * Push the promotion code to the 'codePromo' variable if there's no promotion code applied yet
     * @param code
     */

    function handleCodePromo(code: string) {
        //If there's no pomotion code applied yet
        if (!codePromo) {
            //If the current promotion code is applicable to the cart
            if (applicableCodes.some(el => el.code === code)) {
                //Find the pomotion code object in the applicables codes
                const index = applicableCodes.findIndex(el => el.code === code)
                //Assign it to the 'codePromo' variable
                setCodePromo(applicableCodes[index])
            }
        }
    }

    /**
     * Check if the applicated promotion code is applicable to the product.  
     * So the promotion in applied only on products concerned by the promotion.
     * Return the final cart price with the reduction applied.
     */

    function checkIfCodeIsApplicable() {
        //If a promotion code is applied
        if (codePromo) {
            //For each cart products
            for (let i = 0; i < cart.length; i++) {
                //Assign the current product
                const product = cart[i];
                //Assign a default reduction value
                let reduction = 0;
                //If the product variant doesn't have root promotion
                //We check that so the codes wouldn't be cumulable with a default promotion
                if (!product.promotion || product.promotion === 0) {
                    //If the product is concerned by a promotion codes
                    if (product.promotions.length > 0) {
                        //For each product promotions
                        product.promotions.forEach(promo => {
                            const now = new Date()
                            //If the promotion has not started yet, return
                            if (now < promo.start_date) return;
                            //If the promotion is finished, return
                            if (promo.end_date && (now > promo.end_date)) return;
                            //Find if the code is applicable, if the product contains the current promotion ID in its 'promotions' array
                            const isCodeApplicable = promotions.some(el => el._id === promo._id);
                            //If the code is applicable
                            if (isCodeApplicable) {
                                //Assign a default value to the new product price
                                let newPrice = 0;
                                //If the promotion is of type 'percentage'
                                if (codePromo.type === 'percentage') {
                                    //Apply the reduction percentage
                                    newPrice = Number((product.price - ((codePromo.value / 100) * product.price)).toFixed(2));
                                }
                                //If the promotion is of type 'fixed'
                                if (codePromo.type === 'fixed') {
                                    //Apply the fixed reduction
                                    newPrice = product.price - codePromo.value;
                                }
                                //Push the new product price to the cart total price
                                reduction = reduction + (Number((product.price - newPrice).toFixed(2)) * product.quantity);
                            }
                        })
                    }
                }
                //If the current product is the last product of the cart
                if (i === cart.length - 1) {
                    //Assign the total price to the 'total' variable
                    setTotal(Number((getCartTotal() - reduction).toFixed(2)));
                }
            }
        }
    }

    /**
     * Hook to launch functions on cart and codePromo change
     */

    React.useEffect(() => {
        //If there's no promotion code applied
        //Calculate the total price from the products price
        if (!codePromo) {
            setTotal(getCartTotal());
        };
        //If the cart has products in it
        if (cart.length > 0) {
            //Get the applicable codes
            storeApplicablesCodes();
            //Calculate the cart price
            checkIfCodeIsApplicable();
        } else {
            //If cart is empty, remove all applicable codes
            setApplicableCodes([]);
        };
    }, [cart, codePromo])

    /**
     * Handle the products quantity from the cart items (not the product cards)
     * @param variant Current product variant
     * @param value Quantity
     */

    async function handleCartQuantity(variant: IProductVariant, value: number) {
        //Deep duplication of the cart to mutate the original cart
        let array = [...cart];
        //Find if the product variant is already present in the cart
        const index = array.findIndex(el => el.variant._id === variant._id);

        //If the variant is present in the cart
        if (index !== -1) {
            //Increase the product quantity
            if (value > 0) {
                array[index].quantity = value;
                setCart(array);
            }
            //If the quantity is set to 0, remove the product
            if (value <= 0) {
                array.splice(index, 1);
                return setCart(array);
            }
            //Get the current cart ID stored in the localStorage
            const cartStorage = localStorage.getItem('cart_id');
            //Update the cart in the database
            const { errors } = await updateCart(
                { _id: cartStorage },
                { products: array.map(item => { return { product: item._id, variant: item.variant._id, quantity: item.quantity } }) }
            )
            if (errors.message) {
                console.log(errors.message)
            }
        }
    }

    /**
     * Add product to the cart
     * @param product Product to add
     * @param variant Product variant
     * @param quantity Product quantity
     */

    async function addProductToCart(product: Product.Options, variant: IProductVariant, quantity: number) {
        //Deep array duplication to mutate the original cart
        let array = [...cart];
        //Check if the products alreay exists in the cart
        const index = cart.findIndex(el => el.variant._id === variant._id);

        console.log(variant._id);

        //If the product do not already exists, push it in the cart
        if (index === -1) {
            array = [...array, {
                _id: product._id,
                name: product.name,
                category: product.category,
                promotions: product.promotions,
                image: product.images![0].path,
                variant: variant,
                original_price: variant.price,
                promotion: variant.promotion,
                taxe: variant.taxe,
                price: variant.price - ((variant.promotion / 100) * variant.price),
                quantity: quantity
            }];
            setCart(array);
        }
        //If the product already exists, inscrease the quandity
        else {
            array[index].quantity = array[index].quantity + quantity;
            setCart(array);
        }

        //Get the current cart ID stored in the localStorage
        const cartStorage = localStorage.getItem('cart_id')
        //Ifthere's no cart ID yet (so the cart is not already created)
        if (!cartStorage) {
            //Create the new cart document in the database
            const { errors, data } = await createCart({ products: array.map(item => { return { product: item._id, variant: item.variant._id, quantity: item.quantity } }) })
            if (errors.message) {
                console.log(errors.message)
            } else {
                //Store the new cart ID in the localStorage to retrieve it from the database on page load or reload
                localStorage.setItem('cart_id', data._id)
            }
        }
        //If there's a cart ID in the localStorage
        else {
            //Update the cart in the database
            const { errors } = await updateCart(
                { _id: cartStorage },
                { products: array.map(item => { return { product: item._id, variant: item.variant._id, quantity: item.quantity } }) }
            )
            if (errors.message) {
                console.log(errors.message)
            }
        }
    }

    /**
     * Remove the product from the cart view and the cart document in the database
     * @param key Product key in the cart
     */

    async function removeProductFromCart(key: number) {
        //Deep duplication of the cart to mutate the original cart
        let array = [...cart];
        //Remove the product from the cart
        array.splice(key, 1);
        //Return the new cart
        setCart(array);

        //Get the user cart ID in the localStorage
        const cartStorage = localStorage.getItem('cart_id');
        //Update the cart in the database
        const { errors } = await updateCart({ _id: cartStorage },
            { products: array.map(item => { return { product: item._id, variant: item.variant, quantity: item.quantity } }) }
        );
        if (errors.message) {
            console.log(errors.message);
        };
    }

    /**
     * Calculate the cart total if there's no promotion code applied
     */

    function getCartTotal() {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total = total + (cart[i].price * cart[i].quantity);
        }
        return Number(total.toFixed(2));
    }

    return {
        cart,
        total,
        getCartTotal,
        addProductToCart,
        removeProductFromCart,
        handleCartQuantity,
        handleCodePromo,
        applicableCodes,
        codePromo,
        isCartFetched
    }
}