"use client"

import React from "react"
import Link from "next/link";
import { Product, IProductVariant } from "@/types"
import CarouselPhoto from "../components/Carousel";
import { Breadcrumb, Button, QuantityInput, Select, Table, TableCell, TableRow, Tag } from "../components/global";
import Icon from "../components/global/icons/Icon";
import Products from "../sections/Products";
import useCart from "@/functions/useCart";
import { CartContext } from "@/contexts/CartContext";
import useCartPopup from '@/contexts/cart-popup/useCartPopup';

interface Props {
    product: Product.Options;
    current_variant: IProductVariant;
    similarProducts: Product.Options[];
}

function getPromotion(price: number, promotion: number) {
    return (price - ((promotion / 100) * price)).toFixed(2);
}

const ProductTemplate = (props: Props) => {
    const { product, current_variant, similarProducts } = props;
    //User cart
    const { cart, setCart, codePromo, setCodePromo } = React.useContext(CartContext);
    const { addProductToCart } = useCart({ cart, setCart, codePromo, setCodePromo });
    const { setOpenCartPopup } = useCartPopup();
    //Variable to controle quantity input
    const [quantity, setQuantity] = React.useState<number>(1);

    return (
        <React.Fragment>
            <Breadcrumb />
            <div className="row pt-5">
                <div className="col-12 col-md-5">
                    <CarouselPhoto
                        images={product.images || []}
                        autoplay={false}
                    />
                </div>
                <div className="col-12 col-md-7">
                    <div className='pb-4'>
                        <h1 className="mb-2 sm:mt-5 sm:text-3xl">
                            {product.name}
                        </h1>
                        <p className="text-xl txt-sec">
                            {product.category.name}
                        </p>
                        <div className="row py-5">
                            <div className="col-1 col-sm-5">
                                {current_variant?.promotion > 0 ? (
                                    <p>
                                        <span className='text-4xl font-bold ml-1'>
                                            {getPromotion(current_variant.price, current_variant.promotion)}
                                        </span>€
                                        <span className='txt-sec line-through text-2xl ml-2'>
                                            {current_variant.price.toFixed(2)}€
                                        </span>
                                    </p>
                                ) : (
                                    <p>
                                        <span className='text-4xl font-bold ml-1'>
                                            {current_variant.price.toFixed(2)}
                                        </span>€
                                    </p>
                                )}
                            </div>
                            <div className="col-1 col-sm-7">
                                {current_variant.stock > 0 ? (
                                    <Button className='v-primary fullwidth !text-xl' onClick={async () => {
                                        await addProductToCart(product, current_variant, quantity)
                                        setOpenCartPopup(true)
                                    }}>
                                        <Icon name="ShoppingBasket" className="start-icon" /> Ajouter au panier
                                    </Button>
                                ) : (
                                    <Button className='v-delete fullwidth' disabled={true}>
                                        Actuellement indisponible
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Tag
                            name={current_variant.stock > 0 ? 'En stock' : 'Actuellement indisponible'}
                            className={`befored ${current_variant.stock > 0 ? 'success bg-success' : 'danger bg-danger'}`}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2 xs:grid-cols-1 xs:gap-4 pt-5 pb-9">
                        <div>
                            <h3>Quantité</h3>
                            <QuantityInput
                                min="1"
                                step="1"
                                value={quantity}
                                onChange={(value: number) => setQuantity(value)}
                            />
                        </div>
                        <div>
                            <h3>Tailles</h3>
                            <Select
                                placeholder="Tailles"
                                readOnly
                                defaultValue={`Pot : ${current_variant.size}L - Hauteur : ${current_variant.height}cm`}
                            >
                                {product.variants.map(({ size, height, url }, i) => (
                                    <div key={i}>
                                        <Link href={`/product/${url}`}>
                                            Pot : {size}L - Hauteur : {height}cm
                                        </Link>
                                    </div>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {product.description &&
                        <div
                            className="text-justify"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    }
                </div>
            </div>
            <div className="pt-10 pb-5">
                <h2>Description</h2>
                <div className="bg-slate-50 p-7 bordered rounded-md">
                    <div dangerouslySetInnerHTML={{ __html: product.content }} />
                </div>
            </div>
            <div className="py-6">
                <h2>Caractéristiques</h2>
                <Table>
                    {product.details &&
                        product.details.map(({ title, content }, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <p className="font-semibold">
                                            {title}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {content}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                </Table>
            </div>
            <div className="py-6">
                <Products
                    title='Produits similaires'
                    products={similarProducts}
                />
            </div>
        </React.Fragment>
    )
}

export default ProductTemplate;