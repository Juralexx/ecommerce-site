import axios from "@/axios.config"
import { Carrier } from "@/types"

/**
 * Fetch all carriers
 */

export async function getCarriers(queries?: Record<string, any>) {
    let carriers: Carrier.Options[] = []
    await axios.get('/api/carriers', { params: queries })
        .then(res => {
            carriers = [...res.data]
        })
        .catch(err => console.log(err))

    return { carriers }
}

/**
 * Fetch single carrier
 */

export async function getCarrier(id: string) {
    let carrier: Carrier.Options = Carrier.defaultProps

    await axios.get(`/api/carriers/${id}`)
        .then(res => {
            return carrier = res.data
        })
        .catch(err => console.log(err))

    return { carrier }
}