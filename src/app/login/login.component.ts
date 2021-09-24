import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  setLoginStatus = '';

  constructor() {}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  login(): void {
    axios
      .post('http://localhost:3000/login', {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          this.setLoginStatus = response.data.message;
        } else {
          this.setLoginStatus =
            'User : ' + response.data.username + ' Logged in sucessfully ';
        }
      });
  }
}
