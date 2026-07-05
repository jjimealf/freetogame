import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../core/auth/auth.service';
import { FeedbackService } from '../core/ui/feedback.service';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({}) } } },
        {
          provide: AuthService,
          useValue: {
            signIn: jasmine.createSpy('signIn').and.resolveTo(),
            getCurrentProfile: jasmine.createSpy('getCurrentProfile').and.resolveTo({ role: 'user' })
          }
        },
        {
          provide: FeedbackService,
          useValue: {
            showToast: jasmine.createSpy('showToast').and.resolveTo(),
            showAlert: jasmine.createSpy('showAlert').and.resolveTo(),
            withLoading: jasmine.createSpy('withLoading').and.callFake((_message: string, task: () => Promise<unknown>) => task())
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
