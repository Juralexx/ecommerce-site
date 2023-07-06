import axios from "@/axios.config"
import { Customer } from "@/types"
import { cache } from 'react';
import { cookies } from 'next/headers';

/**
 * Check if the user has a session running and return his ID if he has or null otherwise
 * @param req 
 */

export async function getSession() {
    let uid = null;

    await axios({
        method: "get",
        url: `/jwtid`,
        withCredentials: true,
        headers: {
            Cookie: cookies() as any
        }
    })
        .then(res => {
            if (res) {
                uid = res.data
            }
        })
        .catch(err => console.log(err))
    return { uid }
};

/**
 * Get the user database document
 * @param id user ID
 */

export async function getUser(id: string | null) {
    let user = null;

    if (id) {
        await axios({
            method: "get",
            url: `/api/customers/${id}`
        })
            .then(res => {
                if (res.data) {
                    user = res.data
                }
            })
            .catch(err => console.log(err))
    }

    return { user }
};

/**
 * Check if the user is authenticated and return the user if he is.  
 * For pages that needs an authenticated user.
 * Redirect to login page if not authenticated.
 */

export const isAuthenticated  = cache(async () => {
    const { uid } = await getSession();
    const { user } = await getUser(uid);

    if (user) {
        return user as Customer.Entity;
    } else {
        return null;
    }
});