import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../core/auth/auth.service';
import { FeedbackService } from '../core/ui/feedback.service';

import { RegistroPage } from './registro.page';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: { register: jasmine.createSpy('register').and.resolveTo() } },
        {
          provide: FeedbackService,
          useValue: {
            showAlert: jasmine.createSpy('showAlert').and.resolveTo(),
            withLoading: jasmine.createSpy('withLoading').and.callFake((_message: string, task: () => Promise<unknown>) => task())
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
