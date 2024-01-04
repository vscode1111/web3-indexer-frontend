import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Loading, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { ROUTE } from '~constants';
import { Control, Home, Logout, Profile, Shamirs } from '~pages';

const CALLBACK_PATH = '/login/callback';

const oktaAuth = new OktaAuth(oktaConfig);

export function MainRouter() {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path={`/${ROUTE.CONTROL}`} element={<RequiredAuth />}>
            <Route path='' element={<Control />} />
          </Route>
        </Route>
        <Route path={`/${ROUTE.PROFILE}`} element={<Profile />} />
        <Route path={CALLBACK_PATH} element={<LoginCallback loadingElement={<Loading />} />} />
        <Route path={`/${ROUTE.SHAMIRS}`} element={<Shamirs />} />
        <Route path={`/${ROUTE.LOGOUT}`} element={<Logout />} />
      </Routes>
    </Security>
  );
}
