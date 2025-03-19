import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { RegisterUserComponent } from "../register-user/register-user.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RegisterUserComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {
  date: Date = new Date("2025-08-14");
  Prova: string = "Este texto deberia estar en mayusculas";
  formularioLogin: FormGroup;
  formularioRegistro: FormGroup;
  apiService = inject(ApiService);
  @Output() loggedin = new EventEmitter<string>();
  @Output() exportLoggedIn = new EventEmitter<boolean>();

  constructor(private form: FormBuilder){
    this.formularioLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
    });

    this.formularioRegistro = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      age: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.formularioLogin = this.form.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]], // Valor predeterminado para el email
      password: ['cityslicka', [Validators.required, Validators.minLength(8)]] // Valor predeterminado para la contraseña
    });
  }

  hasError(controlName:string, errorType:string){
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched || 
           this.formularioRegistro.get(controlName)?.hasError(errorType) && this.formularioRegistro.get(controlName)?.touched;  
  }

  login(){
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const loginData = this.formularioLogin.value;

    this.apiService.login(loginData.email, loginData.password).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);
        this.exportLoggedIn.emit(true);
      
      },
      error: (error: any) => {
        console.error('Error en el login:', error);
        alert('Error en el login, verifica tus credenciales');
      }
    });
  }

  register(): void {
    if (this.formularioRegistro.valid) {
      this.apiService.register(this.formularioRegistro.value).subscribe(
        response => {
          console.log('Registration successful', response);
        },
        error => {
          console.error('Registration error', error);
        }
      );
    }
  }
}