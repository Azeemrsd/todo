import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/Services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private httpService: HttpService,
    private router:Router
  ) { }
  signUpForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    username: ['', Validators.required],
    passwordOne: ['', Validators.required],
    passwordTwo: ['', Validators.required],
  }) 

  ngOnInit(): void {
  }
  signUp() {
    if (this.signUpForm.status === 'INVALID') {
      this.signUpForm.markAllAsTouched();
      this.toastr.error('Invalid Data Entered!', 'Make sure you fill valid data.');
      return
    } else if (this.signUpForm.value.passwordOne !== this.signUpForm.value.passwordTwo) {
      this.toastr.error('Password does not match!', 'Make sure you you entered same password.');
      return
    }
    this.httpService.signup(this.signUpForm.value).subscribe((res: any) => {
      if (res.status) {
        this.router.navigateByUrl('/login')
      }
      this.toastr.success(res.title,res.message)
    }, err => {
      this.toastr.error(err.title,err.message)
    })
  }
}
