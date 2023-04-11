const BASE_URL = 'https://ya-praktikum.tech/api/v2';
const signUpUrl = `${BASE_URL}/auth/signin`;
//TBD: move consts to a common folder

type signInData = Record<string, string | undefined>

export async function signInAPI(data: signInData) {
    const res = await fetch(signUpUrl, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        return;
    }
    return Promise.reject(res);
}
