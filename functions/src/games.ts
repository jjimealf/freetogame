import { getFirestore } from 'firebase-admin/firestore';
import { defineSecret } from 'firebase-functions/params';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

type GamePlatformFilter = 'pc' | 'browser' | 'all';

interface GetGamesData {
  platform?: GamePlatformFilter;
  category?: string;
}

type FreeToGameItem = Record<string, unknown>;

interface CacheEntry {
  expiresAt: number;
  games: FreeToGameItem[];
}

const rapidApiKey = defineSecret('RAPIDAPI_KEY');
const freeToGameHost = 'free-to-play-games-database.p.rapidapi.com';
const freeToGameUrl = `https://${freeToGameHost}/api/games`;
const cacheTtlMs = 5 * 60 * 1000;
const cache = new Map<string, CacheEntry>();

function parseRequestData(data: GetGamesData): GetGamesData {
  const platform = data.platform ?? 'all';

  if (!['pc', 'browser', 'all'].includes(platform)) {
    throw new HttpsError('invalid-argument', 'La plataforma solicitada no es valida.');
  }

  const category = data.category?.trim().toLowerCase();

  if (category?.length === 0) {
    throw new HttpsError('invalid-argument', 'La categoria solicitada no es valida.');
  }

  if (category !== undefined && category.length > 60) {
    throw new HttpsError('invalid-argument', 'La categoria solicitada es demasiado larga.');
  }

  return { platform, category };
}

function getCacheKey(query: GetGamesData): string {
  return `${query.platform ?? 'all'}:${query.category ?? ''}`;
}

function buildGamesUrl(query: GetGamesData): string {
  const url = new URL(freeToGameUrl);

  if (query.platform !== undefined && query.platform !== 'all') {
    url.searchParams.set('platform', query.platform);
  }

  if (query.category !== undefined) {
    url.searchParams.set('category', query.category);
  }

  return url.toString();
}

async function assertActiveUser(uid: string): Promise<void> {
  const profileSnapshot = await getFirestore().doc(`users/${uid}`).get();

  if (!profileSnapshot.exists) {
    throw new HttpsError('failed-precondition', 'El perfil de usuario no existe.');
  }

  const profile = profileSnapshot.data();

  if (profile?.active !== true || profile?.deleted === true) {
    throw new HttpsError('permission-denied', 'El usuario no esta activo.');
  }
}

async function fetchGamesFromRapidApi(query: GetGamesData): Promise<FreeToGameItem[]> {
  const response = await fetch(buildGamesUrl(query), {
    headers: {
      'X-RapidAPI-Key': rapidApiKey.value(),
      'X-RapidAPI-Host': freeToGameHost
    }
  });

  if (!response.ok) {
    throw new HttpsError('unavailable', 'No se pudo obtener el catalogo de juegos.');
  }

  const games: unknown = await response.json();

  if (!Array.isArray(games)) {
    throw new HttpsError('internal', 'La respuesta del catalogo de juegos no es valida.');
  }

  return games;
}

export const getGames = onCall<GetGamesData, Promise<FreeToGameItem[]>>(
  { secrets: [rapidApiKey] },
  async (request): Promise<FreeToGameItem[]> => {
    if (request.auth === undefined) {
      throw new HttpsError('unauthenticated', 'Debes iniciar sesion para consultar juegos.');
    }

    await assertActiveUser(request.auth.uid);

    const query = parseRequestData(request.data ?? {});
    const cacheKey = getCacheKey(query);
    const cached = cache.get(cacheKey);

    if (cached !== undefined && cached.expiresAt > Date.now()) {
      return cached.games;
    }

    const games = await fetchGamesFromRapidApi(query);
    const now = Date.now();
    cache.set(cacheKey, {
      expiresAt: now + cacheTtlMs,
      games
    });

    for (const [key, entry] of cache) {
      if (entry.expiresAt <= now) {
        cache.delete(key);
      }
    }

    return games;
  }
);
