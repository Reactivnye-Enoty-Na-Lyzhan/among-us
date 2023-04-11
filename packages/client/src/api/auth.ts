const BASE_URL = 'https://ya-praktikum.tech/api/v2';
const signUpUrl = `${BASE_URL}/auth/signin`;
//TBD: move consts to a common folder

type signInData = Record<string, string | undefined>

export function signInAPI(data: signInData) {
    return fetch(signUpUrl, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
      });
}
