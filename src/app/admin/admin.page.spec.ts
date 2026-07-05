import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { FeedbackService } from '../core/ui/feedback.service';
import { UsersService } from '../core/users/users.service';

import { AdminPage } from './admin.page';

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPage ],
      imports: [CommonModule, IonicModule.forRoot(), RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UsersService, useValue: { listUsers: jasmine.createSpy('listUsers').and.returnValue(of([])) } },
        { provide: AlertController, useValue: { create: jasmine.createSpy('create') } },
        { provide: FeedbackService, useValue: { showToast: jasmine.createSpy('showToast').and.resolveTo() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
