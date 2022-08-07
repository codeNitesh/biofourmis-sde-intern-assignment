import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  tempPass = "admin"
  tempUserName = "admin"

  loginForm: FormGroup;
  isFormSubmitted: Boolean = false
  AreCredCorrect: Boolean = false

  constructor(private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit(): void {
    this.loginFormInitial();
  }

  loginFormInitial() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.isFormSubmitted = true
    if(this.loginForm.valid){
      if(this.loginForm.value.username == this.tempUserName &&
          this.loginForm.value.password == this.tempPass){
            this.AreCredCorrect = true
            localStorage.setItem("temp-token-movies", "ABCDEFG")
            this.router.navigate(['/'])
      }
    }
    this.AreCredCorrect = false
  }
}
