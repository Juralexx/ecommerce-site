import React from "react";
import { IProductVariant, Product } from "@/types";

interface Props {
    products: Product.Options[];
}

export default function useProductCard({ products }: Props) {
    //Variable used to display the product and the quantity in the card quantity input
    const [productsView, setProductsView] = React.useState<any[]>([]);

    /**
     * Hook to assign the structure to the products array objects
     */

    React.useEffect(() => {
        //If there's products
        if (products) {
            //Define the products array to empty array
            let array: any[] = [];
            //For each products
            products.forEach(product => {
                //Push the product, assign a default quantity to 1 and a variant
                array = [...array, { ...product, quantity: 1, variant: product.base_variant }];
            })
            //Push the products
            setProductsView(array);
        }
    }, [products])

    /**
     * Handle the product quantity on quantity input click. Add more or remove.
     * @param key Object key in array
     * @param value Quantity (number)
     */

    function handleCardQuantity(key: number, value: number) {
        let array = [...productsView];
        array[key].quantity = value;
        setProductsView(array);
    };

    /**
     * Change the current product variant on selection list click.
     * @param key Object key in array
     * @param variant Variant object
     */

    function handleCardVariant(key: number, variant: IProductVariant) {
        let array = [...productsView];
        array[key].variant = variant;
        setProductsView(array);
    };

    return {
        productsView,
        handleCardQuantity,
        handleCardVariant
    }
}