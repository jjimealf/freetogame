import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GamesService } from '../core/games/games.service';

import { GraficaPage } from './grafica.page';

describe('GraficaPage', () => {
  let component: GraficaPage;
  let fixture: ComponentFixture<GraficaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: GamesService, useValue: { listGamesByCategory: jasmine.createSpy('listGamesByCategory').and.resolveTo([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
