import { signInAPI } from "../api/auth";
import { Dispatch, SetStateAction } from "react";
type signInData = Record<string, string | undefined>

export async function signIn(data: signInData, setErrorMessage: Dispatch<SetStateAction<string>> ) {
    try {
        setErrorMessage('');
        const res = await signInAPI(data);
        if(res.status === 401) {
            setErrorMessage('Указан неверный логин или пароль');
        }
        if (res.status === 200) {
            console.log('Вход успешен');
        } 
         if (res.status === 400) {
            //response body is only sent with 400 errors
            try {
                const response = await res.json();
                if(response.reason === 'User already in system') {
                    setErrorMessage('Пользователь уже в системе');
                }
            } catch(e:any) {
                console.log(e);
            }
        }
    } catch(e: any) {
        console.log(e);
        //TBD: move error state to global storage to trigger popup on api errors
    }
}
