import { OktaAuthOptions } from '@okta/okta-auth-js';

const oktaClientId = process.env.oktaClientId;
const oktaIssuer = process.env.oktaIssuer;

export const oktaConfig: OktaAuthOptions = {
  clientId: `${oktaClientId}`,
  // issuer: `https://${REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  issuer: `${oktaIssuer}`,
  // redirectUri: `http://localhost:5173/login/callback`,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};
