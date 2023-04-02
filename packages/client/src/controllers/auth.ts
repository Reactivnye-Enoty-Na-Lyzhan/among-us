import { signInAPI } from "../api/auth";
type signInData = Record<string, string | undefined>

const errorsHash: Record<string, string> = {
    '401': 'Неверный логин или пароль',
    '400': 'Пользователь уже в системе',
    '500': 'Прозошла ошибка на сервере. Пожалуйста, попробуйте позже',
    'unknown': 'Произошла неизвестная ошибка. Пожалуйста, попробуйте позже'
};

export async function signIn(data: signInData) {
    try {
        await signInAPI(data);
        return null;
    } catch(err: any) {
        if (!err?.status) {
            return ;
          }
        return errorsHash[err.status];
    }
}
