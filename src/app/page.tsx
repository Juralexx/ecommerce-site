import axios from '@/axios.config'
import { Product } from "@/types";
import Header from "@/sections/Header";
import Trends from "@/sections/Trends";
import MainCategories from "@/sections/MainCategories";
import Categories from "@/sections/Categories";
import Numbers from '@/sections/Numbers';
import Products from "@/sections/Products";
import BlogCards from '@/sections/BlogCards';
import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import { shuffleArray } from "@/functions/utils";

import path from 'path'
import { promises as fs } from 'fs'

async function getImages(folder:string): Promise<{ files: string[]; }> {
    const directory = path.join(process.cwd(), `/public/${folder}`);
    const images = await fs.readdir(directory)
    let files = images.map(img => { return `/${folder}/${img}` })

    return { files }
}

async function fetchMostSoldProducts(period: string) {
    let trends: Product.Options[] = []
    await axios
        .get(`/api/statistics/most-sold-products/${period}`)
        .then(({ data }) => {
            trends = data.mostSoldProducts.map((item: { product: Product.Options, quantity: number }) => { return item.product })
        })
        .catch(err => console.log(err))
    return trends
}

export default async function Home() {
    //Fetch to most solds products to display them in the 'Trends' section
    const mostSoldProducts = await fetchMostSoldProducts('1m');
    //Fetch all categories
    const { categories } = await getCategories({ select: '-content' });
    //Randomize categories to display differents one on every reload on the 'Products' carousels
    const categoriesRandomized = shuffleArray(categories);
    //Fetch products from the randoms categories
    const category_one = 'Orangers';
    const category_two = 'Limettiers';
    const { products: products_one } = await getProducts({ category: category_one });
    const { products: products_two } = await getProducts({ category: category_two });

    const { files: headers } = await getImages('headers')

    return (
        <div className="home flex flex-col gap-y-24 min-xl:pt-16 xl:pt-0">
            <Header
                images={headers}
            />
            <Trends
                mostSoldProducts={mostSoldProducts}
            />
            <MainCategories />
            <Numbers />
            <Categories
                categories={categories}
            />
            <Products
                title={category_one}
                products={products_one}
            />
            <Products
                title={category_two}
                products={products_two}
            />
            <BlogCards />
        </div>
    )
}
