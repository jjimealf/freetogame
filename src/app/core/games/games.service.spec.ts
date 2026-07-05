import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Game } from '../models/game.model';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;
  let http: HttpTestingController;

  const games: Game[] = [
    {
      id: 1,
      title: 'Test Game',
      thumbnail: 'https://example.com/game.jpg',
      short_description: 'A test game',
      game_url: 'https://example.com/play',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Publisher',
      developer: 'Developer',
      release_date: '2026-01-01',
      freetogame_profile_url: 'https://example.com/profile'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamesService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(GamesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('loads the full catalog from the public FreeToGame API', async () => {
    const response = service.listGames();
    const request = http.expectOne('https://www.freetogame.com/api/games');

    expect(request.request.method).toBe('GET');
    request.flush(games);

    await expectAsync(response).toBeResolvedTo(games);
  });

  it('loads games filtered by platform', async () => {
    const response = service.listGamesByPlatform('pc');
    const request = http.expectOne((req) =>
      req.url === 'https://www.freetogame.com/api/games'
      && req.params.get('platform') === 'pc'
    );

    request.flush(games);

    await expectAsync(response).toBeResolvedTo(games);
  });

  it('loads games filtered by category', async () => {
    const response = service.listGamesByCategory('shooter');
    const request = http.expectOne((req) =>
      req.url === 'https://www.freetogame.com/api/games'
      && req.params.get('category') === 'shooter'
    );

    request.flush(games);

    await expectAsync(response).toBeResolvedTo(games);
  });
});
