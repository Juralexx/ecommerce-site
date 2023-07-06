import axios from "@/axios.config"
import { getUpdatedObjectFields } from '../functions/utils'
import { Promotion } from "@/types"

/**
 * Fetch all promotions
 */

export const getPromotions = async (queries?: Record<string, any>) => {
    let promotions: Promotion.Options[] = []
    await axios.get('/api/promotions', { params: queries })
        .then(res => {
            promotions = [...res.data]
        })
        .catch(err => console.log(err))

    return { promotions }
}

/**
 * Fetch single promotion
 */

export async function getPromotion(id: string) {
    let promotion: Promotion.Options = Promotion.defaultProps

    await axios.get(`/api/promotions/${id}`)
        .then(res => {
            return promotion = res.data
        })
        .catch(err => console.log(err))

    return { promotion }
}