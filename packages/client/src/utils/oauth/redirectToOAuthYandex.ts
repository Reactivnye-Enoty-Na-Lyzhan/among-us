export const redirectToOAuthYandex = () => {
  const url = new URL(`https://oauth.yandex.ru/authorize?response_type=code&client_id=$b41558ce234c40618e278734b8729380`);

  location.assign(url);
};
