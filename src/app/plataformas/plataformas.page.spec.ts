import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GamesService } from '../core/games/games.service';

import { PlataformasPage } from './plataformas.page';

describe('PlataformasPage', () => {
  let component: PlataformasPage;
  let fixture: ComponentFixture<PlataformasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlataformasPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: GamesService, useValue: { listGamesByPlatform: jasmine.createSpy('listGamesByPlatform').and.resolveTo([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlataformasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
