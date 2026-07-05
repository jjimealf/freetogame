import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFailure, AuthService } from '../core/auth/auth.service';
import { FeedbackService } from '../core/ui/feedback.service';

type LoginForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false
})
export class LoginPage implements OnInit {
  formularioLogin: LoginForm;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly authService: AuthService,
    private readonly feedback: FeedbackService
  ) {
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const message = this.activatedRoute.snapshot.queryParamMap.get('message');

    if (message !== null) {
      void this.feedback.showToast(message, 'warning');
    }
  }

  get email(): FormControl<string> {
    return this.formularioLogin.controls.email;
  }

  get password(): FormControl<string> {
    return this.formularioLogin.controls.password;
  }

  async login(): Promise<void> {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      await this.feedback.showAlert('Datos incompletos', 'Introduce un correo valido y tu contrasena.');
      return;
    }

    const { email, password } = this.formularioLogin.getRawValue();

    try {
      await this.feedback.withLoading('Iniciando sesion...', () => this.authService.signIn(email, password));
      const profile = await this.authService.getCurrentProfile();
      await this.router.navigate([profile?.role === 'admin' ? '/admin' : '/juegos']);
    } catch (error) {
      await this.feedback.showAlert('No se pudo iniciar sesion', this.getErrorMessage(error));
    }
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof AuthFailure ? error.message : 'No se pudo completar el inicio de sesion.';
  }
}
