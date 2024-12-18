import { defineEventHandler, readBody, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // return {
  //   fake_ok: true,
  // }

  const response = await $fetch('http://91.243.71.100:8080/api/web-api-gateway/v1/auth', {
    method: 'POST',
    body: {
      username,
      password,
    },
  });

  if (response.token) {
    // setCookie(event, 'token', response.token, {
    //   httpOnly: false,
    //   secure: process.env.NODE_ENV === 'production',
    //   path: '/',
    //   maxAge: 60 * 60 * 24, // 1 день
    // });

    console.log(response)

    return {
      expires_in: response.expires_in,
      refresh_token: response.refresh_token,
      token: response.token,
    };
  } else {
    throw new Error('Authentication failed');
  }
});
