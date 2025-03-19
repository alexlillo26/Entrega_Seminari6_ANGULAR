import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterUserComponent implements OnInit {
  formularioRegistro: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.formularioRegistro = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      age: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

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

  hasError(controlName: string, errorName: string): boolean {
    return this.formularioRegistro.controls[controlName].hasError(errorName);
  }
}