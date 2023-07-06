import axios from "@/axios.config"
import { sortByDate } from '../functions/utils'
import { Page } from "@/types"

/**
 * Fetch all pages
 */

export async function getPages(queries?: Record<string, any>) {
    let pages: Page.Options[] = []
    await axios.get(`/api/pages`, { params: { ...queries, published: true } })
        .then(res => {
            pages = [...res.data];
        })
        .catch(err => console.log(err))

    const sorted = sortByDate(pages, 'asc', 'title');
    return { pages: sorted }
}

/**
 * Fetch single page
 */

export async function getPage(id: string) {
    let page: Partial<Page.Options> = {}
    await axios.get(`/api/pages/${id}`)
        .then(res => {
            return page = res.data
        })
        .catch(err => console.log(err))

    return { page }
}

/**
 * Fetch single page by url
 */

export async function getPageByURL(url: string) {
    let page: { [key: string]: any } = {};

    await axios.get(`/api/pages/single/${url}`)
        .then(res => {
            page = res.data;
        })
        .catch(err => console.log(err))

    return { page }
}