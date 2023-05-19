import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { UserService } from 'src/app/services/user/user.service';
import { LoginForm } from './login-form.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule]
})
export class LoginComponent implements OnInit {

  protected loginForm!: FormGroup<LoginForm>

  constructor(private readonly fb: FormBuilder, private readonly user: UserService, private readonly location: Location) {}

  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      login: ['admin', Validators.required],
      password: ['admin', Validators.required]
    })
  }

  protected onLogin() {
    this.user.login(this.loginForm.getRawValue())
      .pipe(filter(userLogged => userLogged))
      .subscribe(() => {
        this.location.back()
      })
  }
}