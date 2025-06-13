export async function authRefreshAccessToken() {
  //try to refresh access token
  try {
    await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.reload();
  } catch (e) {
    console.log(e);
  }
}
