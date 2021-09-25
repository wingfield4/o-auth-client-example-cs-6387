import { useState } from 'react';
import qs from 'qs';

import Button from './components/Button';

import api from './utilities/api';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const {
    code,
    state
  } = qs.parse(window.location.search.substr(1));

  let step = 1;

  if(state) {
    step++;
  } else {
    //generate a new random state
    localStorage.setItem('state', Date.now());
  }


  let stateMatches = state === localStorage.getItem('state');

  const handleGetAccessToken = () => {
    api.getAccessToken(code).then(res => {
      setAccessToken(res.data.access_token);
    }).catch(err => {

    })
  }

  return (
    <>
      <h1>OAuth 2.0 Client Example</h1>

      {step === 1 &&
        <div>
          <a
            href={api.getAuthUrl(localStorage.getItem('state'))}
          >
            <Button>
              Click here to log in!
            </Button>
          </a>
        </div>
      }

      {step === 2 &&
        <div>
          <p>Hey great! You logged in.</p>
          {stateMatches &&
            <div>
              {!accessToken &&
                <>
                  <p>And your state matches! We needed to check that to prevent CSRF attacks.</p>
                  <p>Ok, next we can exchange the authorization code we just got for an access token</p>
                  <Button onClick={handleGetAccessToken}>
                    Click here to do that!
                  </Button>
                </>
              }
              {accessToken &&
                <>
                  <p>Congrats! You're all done. Now we have an access token to make requests with.</p>
                  <p>{accessToken}</p>
                </>
              }
            </div>
          }
          {!stateMatches &&
            <div>
              Unfortunately the state doesn't match. Something went wrong!
              <br />
              <a
                href="http://localhost:3000"
              >
                <Button>
                  Click here to try again!
                </Button>
              </a>
            </div>
          }
        </div>
      }

      <div style={{ marginTop: 32 }}>
        <a href="http://localhost:3000">
          <Button>
            Start Over
          </Button>
        </a>
      </div>
    </>
  );
}

export default App;
