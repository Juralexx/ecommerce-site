import axios from '@/axios.config';

export async function login(email: string, password: string) {
    let errors = { error: '', message: '' };

    await axios({
        method: "post",
        url: `/api/customers/login`,
        withCredentials: true,
        data: {
            email: email,
            password: password
        }
    })
        .then(res => {
            if (res.data.errors) {
                return errors = {
                    error: Object.keys(res.data.errors)[0],
                    message: Object.values(res.data.errors)[0] as string
                };
            }
        }).catch(err => {
            if (err.response) {
                errors = {
                    error: Object.keys(err.response.data.errors)[0],
                    message: Object.values(err.response.data.errors)[0] as string
                }
            }
        })

    return { errors }
}

export async function logout() {
    await axios({
        method: "get",
        url: `/api/users/logout`,
        withCredentials: true,
    })
        .then(() => {
            return window.location.pathname = '/';
        })
        .catch(err => console.log(err))
}