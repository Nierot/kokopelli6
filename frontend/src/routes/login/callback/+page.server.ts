import type { PageServerLoad } from './$types';
import SpotifySDK from 'spotify-web-api-node';
import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit';

export const load = (async ({ url }) => {
  // Get the query params
  const code = url.searchParams.get('code')

  if (!code) {
    error(403, 'authorization code invalid')
  }

  const sdk = new SpotifySDK({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_REDIRECT_URI
  })

  await sdk.authorizationCodeGrant(code).then(data => {

  })


  return {};
}) satisfies PageServerLoad;