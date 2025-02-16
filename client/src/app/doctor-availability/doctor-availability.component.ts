import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
export class DoctorAvailabilityComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  isAdded: boolean=false;
 constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router:Router) {
    this.itemForm = this.formBuilder.group({
      doctorId: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      availability: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchDoctorId();
  }

  fetchDoctorId(): void {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    if (userId) {
      this.itemForm.controls['doctorId'].setValue(userId);
    }
  }

  onSubmit(): void {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    this.itemForm.controls['doctorId'].setValue(userId);
    this.httpService.updateDoctorAvailability(this.itemForm.controls['doctorId'].value, this.itemForm.controls['availability'].value).subscribe((data) => {
      this.itemForm.reset();
      this.responseMessage = "Availability updated Successfully";
      // this.isAdded = false;
      setTimeout(() => {
        // this.itemForm.reset();
      this.responseMessage = null;
      this.router.navigateByUrl('/doctor-appointment');
      }, 2000);

    });
  }
}