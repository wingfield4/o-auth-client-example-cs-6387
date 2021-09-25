import axios from 'axios';
import qs from 'qs';

const BASE_AUTH_URL = 'https://dev-70291524.okta.com/oauth2/default/v1';

const client_id = '0oa2037hjwT1Z4JPU5d7';

const api = {
  getAuthUrl: (state) => {
    let queryString = qs.stringify({
      response_type: 'code',
      client_id,
      redirect_uri: 'http://localhost:3000',
      scope: 'openid',
      state
    })

    return `${BASE_AUTH_URL}/authorize?${queryString}`
  },
  getAccessToken: (code) => {
    return axios.post(`http://localhost:3001/getAccessToken`, {
      code
    });
  }
}

export default api;
