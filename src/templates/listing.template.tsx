"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { styled } from 'styled-components';
import { Product } from '@/types';
import { Breadcrumb, Button, Checkbox, FormControlLabel, Input, SidePagination, Tag, Card, CardContent, ImageBG, QuantityInput, Select, CircleLoader } from '@/components/global';
import FilterMenu from '../components/global/FilterMenu';
import Icon from '../components/global/icons/Icon';
import useQueryParams from '@/functions/useQueryParams';
import useProductCard from '@/functions/useProductCard';
import useCart from '@/functions/useCart';
import { CartContext } from '@/contexts/CartContext';
import useCartPopup from '@/contexts/cart-popup/useCartPopup'

interface Props {
    products: Product.Options[];
    title: string;
    description?: string;
    count: number;
    currentPage: number;
    limit: number;
    searchParams: { [key: string]: string | string[] | undefined };
    children?: React.ReactNode;
}

function getPromotion(price: number, promotion: number) {
    return (price - ((promotion / 100) * price)).toFixed(2);
}

export default function ListingTemplate(props: Props) {
    const { title, description, products, count, currentPage, limit, searchParams } = props;
    //Get the pathname to pass it to the pagination component
    const pathname = usePathname();

    //Filters used to filter products
    const filters = [
        //Chronological name sort
        { label: 'Nom - A à Z', parameter: 'sort', value: 'name.asc' },
        //Antechronological name sort
        { label: 'Nom - Z à A', parameter: 'sort', value: 'name.desc' },
        //Increasing price sort
        { label: 'Prix - Croissant', parameter: 'sort', value: 'base_variant.price.asc' },
        //Decreasing price sort
        { label: 'Prix - Décroissant', parameter: 'sort', value: 'base_variant.price.desc' },
        //In stock sort
        { label: 'En stock', parameter: 'stock', value: 'in' },
        //Out of stock sort
        { label: 'En rupture', parameter: 'stock', value: 'out' }
    ];

    //Hook to pass to 'q' parameter value from to url to the filters on reload
    //So we can pass it to the 'activeFilters'
    React.useEffect(() => {
        //Get the 'q' param value
        const query = searchParams['q'] as string;
        //If the 'q' param exists
        //Passe its label, name and value to the filters
        if (query) {
            filters.push({ label: 'Recherche : ' + query, parameter: 'q', value: query })
        }
    }, [searchParams])

    const {
        activeFilters,
        setActiveFilters,
        populateQuery,
        removeQueryParams,
        onReset,
        onFilterClick
    } = useQueryParams({ filters: filters, searchParams: searchParams });

    //Filters of the side car filters component
    //Used to handle inputs and checkbox
    const [sideFilters, setSideFilters] = React.useState<Record<string, any>>({
        minprice: { label: 'Prix min', parameter: 'minprice', value: 0 },
        maxprice: { label: 'Prix max', parameter: 'maxprice', value: 0 }
    });

    /**
    * Hook to add query params to the 'sideFilters' on page reload.
    * Retrieve them from the URL to store them in 'sideFilters'.
    */

    React.useEffect(() => {
        Object.values(sideFilters)?.forEach(({ label, parameter, value }) => {
            //Pass the router param to the 'query' variable
            const query = searchParams[parameter];
            //If the 'query' variable is defined
            if (query) {
                //Create the new filter and assign the current search param value
                const newfilter = { label: label, parameter: parameter, value: query };
                //Pass is to the sideFilters so the inputs can have default value
                setSideFilters(prev => ({ ...prev, [parameter]: { ...newfilter } }));
                //If activeFilters do not already contains it
                //Store the param in 'activeFilters'
                if (!activeFilters.some(el => el[parameter] === value)) {
                    setActiveFilters(prev => ([...prev, newfilter]));
                }
            }
        })
    }, [])

    /**
     * Pass the filter side card values to the 'activeFilters' and 'sideFilters'
     * @param label Human readable filter label
     * @param parameter Filter param
     * @param value Filter value
     */

    function handleSideFilters(label: string, parameter: string, value: string | number) {
        //Deep 'activeFilters' duplication to mutate the original 'activeFilters'
        let filtersArr = [...activeFilters];
        //Find if the param already exists in 'activeFilters'
        const index = filtersArr.findIndex(filter => filter['parameter'] === parameter);
        //If it exists
        if (index !== -1) {
            //Assign the new value to the filter and pass the new array to 'activeFilters'
            filtersArr[index] = { label: label, parameter: parameter, value: value };
            setActiveFilters(filtersArr);
        }
        //If it doesn't already exists, create it in the 'activeFilters' array
        else {
            setActiveFilters(prev => [...prev, { label: label, parameter: parameter, value: value }]);
        }
        //Pass the new value to the 'sidefilters'
        setSideFilters(prev => ({ ...prev, [parameter]: { ...prev[parameter], value: value } }));
    };

    const {
        productsView,
        handleCardQuantity,
        handleCardVariant
    } = useProductCard({ products: products });
    //User cart
    const { cart, setCart, codePromo, setCodePromo } = React.useContext(CartContext);

    const { addProductToCart } = useCart({ cart, setCart, codePromo, setCodePromo });
    const { setOpenCartPopup } = useCartPopup();

    return (
        <div>
            <div className={description ? 'pb-8' : 'pt-8'}>
                <Breadcrumb />
                <h1>{title}</h1>
                {description &&
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                }
            </div>
            <div className='row'>
                <div className='col-12 col-lg-4 col-xl-3'>
                    <FiltersCard className='md:mb-4'>
                        <div className='flex min-md:flex-col xs:flex-col min-xs:items-center justify-between min-md:items-start'>
                            <p className='text-xl font-semibold mb-4'>
                                Filtres
                            </p>
                            <div className='flex justify-between gap-2 w-full mb-2 xs:min-w-full md:max-w-md'>
                                <Button className='v-classic' onClick={() => onReset()}>
                                    Réinitialiser
                                </Button>
                                <Button className='v-primary fullwidth' onClick={() => populateQuery()}>
                                    Appliquer
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-y-5'>
                            <div className='cells'>
                                <p className='text-lg font-semibold mb-4'>
                                    Prix
                                </p>
                                <div className='flex items-center gap-x-2'>
                                    <Input
                                        className='w-full'
                                        type="number"
                                        min="0"
                                        step="1"
                                        name="Min (€)"
                                        placeholder='Ex : 10'
                                        value={sideFilters.minprice.value}
                                        onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => handleSideFilters(`Prix min : ${value}€`, 'minprice', value)}
                                    />
                                    <Input
                                        className='w-full'
                                        type="number"
                                        min="0"
                                        step="1"
                                        name="Max (€)"
                                        placeholder='Ex : 100'
                                        value={sideFilters.maxprice.value}
                                        onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => handleSideFilters(`Prix max : ${value}€`, 'maxprice', value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </FiltersCard>
                </div>
                <div className='col-12 col-lg-8 col-xl-9'>
                    <div className='flex items-center justify-between pb-2'>
                        <div>
                            {count > 0 && (((currentPage - 1) * limit) + 1) + ' ⎯ ' + (Math.min(currentPage * limit, count)) + ' sur '} {count} résultats
                        </div>
                        <FilterMenu
                            onValidate={() => populateQuery()}
                            onReset={() => onReset()}
                        >
                            {filters.map((filter: Record<string, any>, i: number) => {
                                return (
                                    <div className="cells" key={i}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onClick={() => onFilterClick(filter, 'parameter', true)}
                                                    checked={activeFilters.some(el => el.label === filter.label)}
                                                />
                                            }
                                        >
                                            {filter.label}
                                        </FormControlLabel>
                                    </div>
                                )
                            })}
                        </FilterMenu>
                    </div>
                    {activeFilters.length > 0 && (
                        <div className='av-filters-displayer'>
                            {activeFilters.map((filter, key) => {
                                return (
                                    filter.label && (
                                        <Tag key={key}>
                                            {filter.label}
                                            <Icon name="Cross" onClick={() => removeQueryParams(filter.parameter)} />
                                        </Tag>
                                    )
                                )
                            })}
                        </div>
                    )}
                    {productsView.length === products.length ? (
                        <div className='grid grid-cols-3 md-to-lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-3'>
                            {products.map((product: Product.Options, i: number) => {
                                return (
                                    <Card className='h-full' key={i}>
                                        <Link href={`/product/${product.base_variant.url}`}>
                                            {product.images!.length > 0 ? (
                                                <Image
                                                    className="card-top-img"
                                                    src={`${process.env.SERVER_URL}${product.images![0].path}`}
                                                    height={140}
                                                    width={300}
                                                    style={{ height: 200, width: "100%", objectFit: 'cover' }}
                                                    alt={product.name}
                                                />
                                            ) : (
                                                <ImageBG>
                                                    <Icon name="Picture" />
                                                </ImageBG>
                                            )}
                                        </Link>
                                        <CardContent>
                                            <Link href={`/product/${product.base_variant.url}`} key={i}>
                                                <div className='txt-sec mb-2'>
                                                    {product.category.name}
                                                </div>
                                                <div className='text-lg leading-5 font-semibold line-clamp-2'>
                                                    {product.name}
                                                </div>
                                                <p className='text-right mt-3'>
                                                    À partir de {product.variants[0]?.promotion > 0 ? (
                                                        <>
                                                            <span className='text-2xl font-semibold ml-1'>{getPromotion(product.variants[0].price, product.variants[0].promotion)}</span>€
                                                            <span className='has-discount ml-2'>{product.variants[0].price.toFixed(2)}€</span>
                                                        </>
                                                    ) : (
                                                        <span className='text-2xl font-semibold ml-1'>
                                                            {product.variants[0].price.toFixed(2)}€
                                                        </span>
                                                    )}
                                                </p>
                                            </Link>
                                            <div className='mt-3 mb-2'>
                                                <Select
                                                    placeholder={`Pot : ${productsView[i].variant.size}L - Hauteur : ${productsView[i].variant.height}cm`}
                                                    readOnly
                                                    value={`Pot : ${productsView[i].variant.size}L - Hauteur : ${productsView[i].variant.height}cm`}
                                                    onChange={() => { }}
                                                >
                                                    {product.variants.length > 0 && (
                                                        product.variants.map((variant, j) => (
                                                            <div key={j} onClick={() => handleCardVariant(i, variant)}>
                                                                {`Pot : ${variant.size}L - Hauteur : ${variant.height}cm`}
                                                            </div>
                                                        ))
                                                    )}
                                                </Select>
                                            </div>
                                            <div className='grid grid-cols-2 gap-2'>
                                                <QuantityInput
                                                    min="1"
                                                    max={productsView[i].variant.stock}
                                                    value={productsView[i].quantity}
                                                    onChange={(value: number) => handleCardQuantity(i, value)}
                                                />
                                                {productsView[i].variant.stock > 0 ? (
                                                    <Button className='v-primary fullwidth' onClick={async () => {
                                                        await addProductToCart(product, productsView[i].variant, productsView[i].quantity)
                                                        setOpenCartPopup(true)
                                                    }}>
                                                        Ajouter
                                                    </Button>
                                                ) : (
                                                    <Button className='v-primary fullwidth' disabled={true}>
                                                        En rupture
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    ) : (
                        <CircleLoader />
                    )}
                    <SidePagination
                        router={{ pathname: pathname, query: searchParams }}
                        array={products}
                        count={count}
                        currentPage={currentPage}
                        limit={limit}
                    />
                </div>
            </div>
        </div>
    )
}

export const FiltersCard = styled.div`
    position         : relative;
    padding          : 16px;
    background-color : var(--slate-50);
    border           : 1px solid var(--border);
    width            : 100%;
    border-radius    : var(--rounded-default);

    .cells {
        padding       : 15px;
        width         : 100%;
        border        : 1px solid var(--border);
        background    : var(--body);
        border-radius : var(--rounded-default);

        label {
            width : 100%;
        }
    }
`