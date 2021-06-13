import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/Services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private httpService: HttpService,
    private router:Router
  ) { }
  loginForm = this.formBuilder.group({
  username:['',Validators.required],
  password:['',Validators.required]
})

  ngOnInit(): void {
    if (localStorage.getItem('authentication')?.length) {
      this.router.navigateByUrl('/todos')
    }
  }
  login() {
    if (this.loginForm.status === 'INVALID') {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please check your username and password!', 'You have filled invalid data!')
      return 
    }
    this.httpService.login(this.loginForm.value).subscribe((res:any) => {
      if (res.status) {
        localStorage.setItem('authentication', res.result);
        this.router.navigateByUrl('/todos')
      }
      this.toastr.success(res.title, res.message)
    }, err => {
      this.toastr.error(err.title, err.message)
    })
  }

}
