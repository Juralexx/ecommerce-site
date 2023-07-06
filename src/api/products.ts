import axios from "@/axios.config"
import { Product } from "@/types"

/**
 * Fetch all products
 */

export async function getProducts(queries?: Record<string, any>) {
    const response = await axios.get('/api/products', { params: { ...queries, published: true } })
        .then(res => res.data)
        .catch(err => console.log(err))

    return {
        products: response.documents,
        count: response.count,
        currentPage: response.currentPage,
        limit: response.limit
    }
}

/**
 * Fetch single product by ID
 */

export async function getProduct(id: string) {
    let product: Partial<Product.Options> = {}
    await axios.get(`/api/products/${id}`)
        .then(res => {
            return product = res.data
        })
        .catch(err => console.log(err))

    return { product }
}

/**
 * Fetch single product by variant url
 */

export async function getProductByURL(url: string) {
    let product: { [key: string]: any } = {};
    let current_variant: { [key: string]: any } = {};

    await axios.get(`/api/products/variant/${url}`)
        .then(res => {
            product = res.data
            current_variant = res.data.current_variant
        })
        .catch(err => console.log(err))

    return { product, current_variant }
}