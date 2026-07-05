import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFailure, AuthService } from '../core/auth/auth.service';
import { FeedbackService } from '../core/ui/feedback.service';

type RegisterForm = FormGroup<{
  firstName: FormControl<string>;
  secondName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}>;

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
    standalone: false
})
export class RegistroPage implements OnInit {
  formularioRegistro: RegisterForm;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly authService: AuthService,
    private readonly feedback: FeedbackService
  ) {
    this.formularioRegistro = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: [this.passwordsMatchValidator] });
  }

  ngOnInit() {
  }

  get firstName(): FormControl<string> {
    return this.formularioRegistro.controls.firstName;
  }

  get secondName(): FormControl<string> {
    return this.formularioRegistro.controls.secondName;
  }

  get email(): FormControl<string> {
    return this.formularioRegistro.controls.email;
  }

  get password(): FormControl<string> {
    return this.formularioRegistro.controls.password;
  }

  get confirmPassword(): FormControl<string> {
    return this.formularioRegistro.controls.confirmPassword;
  }

  get passwordMismatch(): boolean {
    return this.formularioRegistro.hasError('passwordMismatch') && this.confirmPassword.touched;
  }

  async register(): Promise<void> {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      await this.feedback.showAlert('Datos incompletos', 'Revisa los campos marcados antes de continuar.');
      return;
    }

    const value = this.formularioRegistro.getRawValue();

    try {
      await this.feedback.withLoading('Creando cuenta...', () => this.authService.register({
        firstName: value.firstName,
        secondName: value.secondName,
        email: value.email,
        password: value.password
      }));
      await this.feedback.showAlert(
        'Usuario registrado',
        'Confirma tu correo y espera a que el administrador active tu cuenta.'
      );
      await this.router.navigate(['/login']);
    } catch (error) {
      await this.feedback.showAlert('No se pudo registrar', this.getErrorMessage(error));
    }
  }

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof AuthFailure ? error.message : 'No se pudo completar el registro.';
  }
}
