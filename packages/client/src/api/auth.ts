const BASE_URL = 'https://ya-praktikum.tech/api/v2';
const signUpUrl = `${BASE_URL}/auth/signin`;

type signInData = Record<string, string | undefined>

export function signInAPI(data: signInData) {
    console.log(data);
    return fetch(signUpUrl, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
}
