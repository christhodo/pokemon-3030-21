import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'pokemon-angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  login() {
    if (this.form.invalid) return;
    this.router.navigate(['/pokemon']);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
}
