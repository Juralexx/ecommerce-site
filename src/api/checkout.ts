import axios from "@/axios.config"
import { getUpdatedObjectFields } from '../functions/utils'
import { Checkout } from "@/types"

/**
 * Fetch single checkout
 */

export async function getCheckout(id: string) {
    let checkout: Partial<Checkout.Options> = {}
    await axios.get(`/api/checkouts/${id}`)
        .then(res => {
            return checkout = {
                ...res.data,
                timeline: res.data.timeline.reverse()
            }
        })
        .catch(err => console.log(err))

    return { checkout }
}

/**
 * Create product
 */

export async function createCheckout(datas: Partial<Checkout.Options>) {
    let errors = { error: '', message: '' }
    let data: Partial<Checkout.Options> = {}

    await axios({
        method: 'post',
        url: `/api/checkouts/create`,
        data: datas
    })
        .then(res => {
            if (res.data.errors) {
                return errors = { error: Object.keys(res.data.errors)[0], message: Object.values(res.data.errors)[0] as string }
            } else {
                data = res.data
            }
        })
        .catch(err => {
            if (err.response) {
                errors = {
                    error: Object.keys(err.response.data.errors)[0],
                    message: Object.values(err.response.data.errors)[0] as string
                }
            }
        })

    return { errors, data }
}

/**
 * Update checkout
 */

export async function updateCheckout(checkout: Checkout.Options, datas: Partial<Checkout.Options>) {
    let errors = { error: '', message: '' }
    let data: Partial<Checkout.Options> = {}

    let datasToUpdate: Partial<Checkout.Options> = getUpdatedObjectFields(checkout, datas)

    await axios({
        method: 'put',
        url: `/api/checkouts/${checkout._id}/update`,
        data: datasToUpdate
    })
        .then(res => {
            if (res.data.errors) {
                return errors = { error: Object.keys(res.data.errors)[0], message: Object.values(res.data.errors)[0] as string }
            } else {
                data = res.data
            }
        })
        .catch(err => {
            if (err.response) {
                errors = {
                    error: Object.keys(err.response.data.errors)[0],
                    message: Object.values(err.response.data.errors)[0] as string
                }
            }
        })

    return { errors, data }
}