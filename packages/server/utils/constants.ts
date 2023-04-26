import path from 'path';

export const DEFAULT_ERROR_CODE = 500;
export const DEFAULT_ERROR_MESSAGE = 'Что-то пошло не так на стороне сервера...';

export const NOT_FOUNT_CODE = 404;
export const NOT_FOUNT_MESSAGE = 'Страница или документ не найден. Попробуйте ещё раз';

export const CLIENT_PACKAGE_PATH = path.resolve(__dirname, `${process.env.NODE_ENV === 'development' ? '../../client' : '../../../client'}`);
