import axios from "@/axios.config"
import { sortByAlphabetical } from '../functions/utils'
import { Category } from "@/types"

/**
 * Fetch all categories
 */

export async function getCategories(queries?: Record<string, any>) {
    let categories: Category.Options[] = []
    await axios.get('/api/categories', { params: queries })
        .then(res => {
            categories = [...res.data]
        })
        .catch(err => console.log(err))

    const sorted = sortByAlphabetical(categories, 'name')
    return { categories: sorted }
}

/**
 * Fetch single category
 */

export async function getCategory(id: string) {
    let category: Category.Options = Category.defaultProps

    await axios.get(`/api/categories/${id}`)
        .then(res => {
            return category = res.data
        })
        .catch(err => console.log(err))

    return { category }
}