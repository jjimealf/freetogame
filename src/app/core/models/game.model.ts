export type GamePlatformFilter = 'pc' | 'browser' | 'all';

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface GamesQuery {
  platform?: GamePlatformFilter;
  category?: string;
}
