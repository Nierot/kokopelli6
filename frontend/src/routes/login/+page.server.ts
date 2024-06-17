import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import SpotifySDK from 'spotify-web-api-node';
import { env } from '$env/dynamic/private'

export const load = (async () => {
  const sdk = new SpotifySDK({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_REDIRECT_URI
  })

  const loginUrl = sdk.createAuthorizeURL([
    "user-read-private",
    "user-read-playback-state",
    "user-read-currently-playing",
  ], "state")

  throw redirect(303, loginUrl);
}) satisfies PageServerLoad;