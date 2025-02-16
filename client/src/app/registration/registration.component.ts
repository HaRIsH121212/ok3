import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls:['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { role: '', email: '', password: '', username: '' };
  showMessage: boolean = false;
  showError:boolean=false;
  responseMessage: any;
  errorMessage:any;
  
  constructor(public router: Router, private bookService: HttpService, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.+-@#$%^&]+@[a-zA-Z0-9+-.@#$%]+\.[a-z]{2,}$/)]],
      password: [this.formModel.password, [Validators.required,Validators.pattern(/^[a-zA-Z0-9@#$%^&*.+-]{8,20}$/)]],
      role: [this.formModel.role, [Validators.required]],
      username: [this.formModel.username, [Validators.required]],
      specialty: [this.formModel.specialty],
      availability: [''],
    });
  }
  ngOnInit(): void {
    this.onRoleChange();
  }
  onRoleChange() {
    this.itemForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'DOCTOR') {
        this.itemForm.get('specialty')?.setValidators([Validators.required]);
        this.itemForm.get('availability')?.setValidators([Validators.required]);
      } else {
        this.itemForm.get('specialty')?.clearValidators();
        this.itemForm.get('availability')?.clearValidators();
      }
      this.itemForm.get('specialty')?.updateValueAndValidity();
      this.itemForm.get('availability')?.updateValueAndValidity();
    });
  }
  // onRegister() {
  //   debugger;
  //   if (this.itemForm.valid) {
  //     this.showMessage = false;
  //     if( this.itemForm.controls["role"].value=="PATIENT")
  //     this.bookService.registerPatient(this.itemForm.value).subscribe(data => {
  //       this.showMessage = true;
  //       this.responseMessage = "You are successfully Registered";
  //       setTimeout(() => {
  //         this.showMessage = false;
  //         this.responseMessage = null;
  //       }, 2000);
  //       this.itemForm.reset();
        
  //     });
  //     if( this.itemForm.controls["role"].value=="DOCTOR")
  //       this.bookService.registerDoctors(this.itemForm.value).subscribe(data => {
  //         this.showMessage = true;
  //         this.responseMessage = "You are successfully Registered";
  //         setTimeout(() => {
  //           this.showMessage = false;
  //           this.responseMessage = null;
  //         }, 2000);
  //         this.itemForm.reset();
  //       });
  //       if( this.itemForm.controls["role"].value=="RECEPTIONIST")
  //         this.bookService.registerReceptionist(this.itemForm.value).subscribe(data => {
  //           this.showMessage = true;
  //           this.responseMessage = "You are successfully Registered";
  //           setTimeout(() => {
  //             this.showMessage = false;
  //             this.responseMessage = null;
  //           }, 2000);
            
  //           this.itemForm.reset();
  //         });
  //   } else {
  //     this.itemForm.markAllAsTouched();
  //   }
  // }




// onRegister(): void {
//     if (this.itemForm.valid) {
//       this.formModel = this.itemForm.value;
//       // Call HTTP service to register
//       this.bookService.registerPatient(this.formModel).subscribe(
//         (response) => {
//           this.responseMessage = "Registration successfull!";
//           this.showMessage = true;
//           setTimeout(() => {
//             this.router.navigateByUrl('/login');
//           }, 1000);
//         },
//         (error) => {
         
//           this.showMessage = true;
//           this.showError = true;
//           this.responseMessage = "User Already Exists!";
//         }
//       );
//     }
//   }







onRegister(): void {
  if (this.itemForm.valid) {
    this.formModel = this.itemForm.value;
    const role = this.itemForm.controls["role"].value;

    let registerService;
    if (role === "PATIENT") {
      registerService = this.bookService.registerPatient(this.formModel);
    } else if (role === "DOCTOR") {
      registerService = this.bookService.registerDoctors(this.formModel);
    } else if (role === "RECEPTIONIST") {
      registerService = this.bookService.registerReceptionist(this.formModel);
    }

    if (registerService) {
      registerService.subscribe(
        (response) => {
          this.responseMessage = "Registration successful!";
          this.showMessage = true;
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1000);
        },
        (error) => {
          // this.showMessage = true;
          this.showError = true;
          this.errorMessage = "User Already Exists!";
          setTimeout(() => {

            this.errorMessage=null;
            this.itemForm.reset();
          }, 1000);
        }
      );
    }
  } else {
    this.itemForm.markAllAsTouched();
  }
}
















}
