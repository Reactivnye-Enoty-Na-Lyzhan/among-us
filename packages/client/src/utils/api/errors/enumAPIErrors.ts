export const enum ApiErrors {
  INTERNAL_SERVER_ERROR = 'Internal server error',
}

export const ApiResponseMessages_RU: Record<ApiErrors, string> = {
  [ApiErrors.INTERNAL_SERVER_ERROR]: 'Ошибка сервера',
};
