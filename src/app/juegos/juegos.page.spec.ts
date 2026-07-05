import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { FavoritesService } from '../core/favorites/favorites.service';
import { GamesService } from '../core/games/games.service';

import { UserPage } from './juegos.page';

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: GamesService, useValue: { listGames: jasmine.createSpy('listGames').and.resolveTo([]) } },
        {
          provide: FavoritesService,
          useValue: {
            favorites$: jasmine.createSpy('favorites$').and.returnValue(of([])),
            add: jasmine.createSpy('add').and.resolveTo(),
            remove: jasmine.createSpy('remove').and.resolveTo()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
