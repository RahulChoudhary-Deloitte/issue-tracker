// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      issuer: 'https://dev-15112629.okta.com/oauth2/default',
      clientId: '0oabg4nul9C6QUv4K5d7',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: `${window.location.origin}/login/callback`
    },
    widget: {
      issuer: 'https://dev-15112629.okta.com/oauth2/default',
      clientId: '0oabg4nul9C6QUv4K5d7',
      redirectUri: `${window.location.origin}/login/callback`,
      scopes: ['openid', 'profile', 'email'],
    }
  };
  