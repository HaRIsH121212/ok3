import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel:any={};
  showError:boolean=false;
  errorMessage:any;
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        username: [this.formModel.username,[ Validators.required]],
        password: [this.formModel.password,[ Validators.required,Validators.pattern(/^[a-zA-Z0-9@#$%^&*.+-]{8,20}$/)]],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onLogin() {
  if (this.itemForm.valid) {
    this.showError = false;
    this.httpService.Login(this.itemForm.value).subscribe((data: any) => {
      if (data.userNo != 0) {
        debugger;
        this.authService.SetRole(data.role);
        this.authService.saveToken(data.token)
        this.authService.saveUserId(data.userId)
        this.router.navigateByUrl('/dashboard');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.showError = true;
        this.errorMessage = "Wrong User or Password";
      }
    }, error => {
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Ensure that userName and Password is Correct.";
    });;
  } else {
    this.itemForm.markAllAsTouched();
  }
}

registration()
  {
    this.router.navigateByUrl('/registration');
  }
}
