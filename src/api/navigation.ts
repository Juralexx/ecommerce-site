import axios from "@/axios.config"

/**
 * Fetch navigation
 */

export async function getNavigation() {
    let navigation: any[] = []
    await axios.get(`/api/navigation`)
        .then(res => {
            if (res.data.length > 0) {
                return navigation = res.data[0]
            }
        })
        .catch(err => console.log(err))

    return { navigation }
}