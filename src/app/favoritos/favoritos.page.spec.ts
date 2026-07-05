import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { FavoritesService } from '../core/favorites/favorites.service';

import { FavoritosPage } from './favoritos.page';

describe('FavoritosPage', () => {
  let component: FavoritosPage;
  let fixture: ComponentFixture<FavoritosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritosPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FavoritesService,
          useValue: {
            favorites$: jasmine.createSpy('favorites$').and.returnValue(of([])),
            remove: jasmine.createSpy('remove').and.resolveTo()
          }
        },
        { provide: ModalController, useValue: { create: jasmine.createSpy('create') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
