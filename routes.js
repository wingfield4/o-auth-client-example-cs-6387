const Router = require('koa-router');
const qs = require('qs');
const axios = require('axios');
const router = new Router();

const BASE_AUTH_URL = 'https://dev-70291524.okta.com/oauth2/default/v1';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

router.post('/getAccessToken', async (ctx) => {
  const { code } = ctx.request.body;

  let queryString = qs.stringify({
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000',
    code
  })

  let response = await axios.post(`${BASE_AUTH_URL}/token?${queryString}`, {}, {
    headers: {
      accept: 'application/json',
      authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data).catch(err => {
    console.log('err', err);
  });

  if(response) {
    ctx.body = response;
  } else {
    ctx.status = 500;
    ctx.body = "Something went terribly wrong."
  }
})

module.exports = router;
