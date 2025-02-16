
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { HttpService } from '../../services/http.service';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-receptionist-schedule-appointments',
//   templateUrl: './receptionist-schedule-appointments.component.html',
//   styleUrls: ['./receptionist-schedule-appointments.component.scss'],
//   providers: [DatePipe]
// })
// export class ReceptionistScheduleAppointmentsComponent implements OnInit {
//   itemForm: FormGroup;
//   formModel: any = {};
//   responseMessage: any;
//   isAdded: boolean = false;
//   error: any;
//   patientList: any[] = [];
//   doctorList: any[] = [];

//   constructor(public httpService: HttpService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
//     this.itemForm = this.formBuilder.group({
//       patientId: [this.formModel.patientId, [Validators.required, Validators.min(1)]],
//       doctorId: [this.formModel.doctorId, [Validators.required, Validators.min(1)]],
//       time: [this.formModel.time, [Validators.required]]
//     });
//   }

//   ngOnInit(): void {
//     this.fetchAllDoctors();
//     this.fetchAllPatients();
//   }

//   fetchAllDoctors() {
//     this.httpService.getAllDoctors().subscribe(
//       (data) => {
//         this.doctorList = data;
//       },
//       (error) => {
//         console.error('Error fetching doctors:', error);
//       }
//     );
//   }

//   fetchAllPatients() {
//     this.httpService.getAllPatients().subscribe(
//       (data) => {
//         this.patientList = data;
//       },
//       (error) => {
//         console.error('Error fetching patients:', error);
//       }
//     );
//   }













// onSubmit() {
//   if (this.itemForm.valid) {
//     const timeValue = this.itemForm.controls['time'].value;
//     const date = new Date(timeValue);

//     // Adjust time to IST
//     // date.setHours(date.getHours() + 5);
//     // date.setMinutes(date.getMinutes() + 30);

//     const formattedTime = this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss','Asia/Kolkata');
//     this.itemForm.controls['time'].setValue(formattedTime);

//     this.httpService.ScheduleAppointmentByReceptionist(this.itemForm.value).subscribe(
//       (data) => {
//         this.itemForm.reset();
//         this.responseMessage = "Appointment Saved Successfully";
//         this.isAdded = false;
//         setTimeout(() => {
//           this.responseMessage = null;
//         }, 2000);
//       },
//       (error) => {
//         this.error = 'Patient ID or Doctor ID is incorrect';
//         setTimeout(() => {
//           this.error = null;
//         }, 3000);
//       }
//     );
//   } else {
//     this.error = 'Patient ID or Doctor ID is incorrect';
//     setTimeout(() => {
//       this.error = null;
//     }, 3000);
//   }
// }


// }











import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.scss'],
  providers: [DatePipe]
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  isAdded: boolean = false;
  error: any;
  patientList: any[] = [];
  filteredPatients$: Observable<any[]> = of([]);
  doctorList: any[] = [];
  filteredDoctors$: Observable<any[]> = of([]);

  constructor(public httpService: HttpService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.itemForm = this.formBuilder.group({
      patientId: [this.formModel.patientId, [Validators.required, Validators.min(1)]],
      doctorId: [this.formModel.doctorId, [Validators.required, Validators.min(1)]],
      time: [this.formModel.time, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchAllDoctors();
    this.fetchAllPatients();
  }

  fetchAllDoctors() {
    this.httpService.getAllDoctors().subscribe(
      (data) => {
        this.doctorList = data;
        this.filteredDoctors$ = of(data);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  fetchAllPatients() {
    this.httpService.getAllPatients().subscribe(
      (data) => {
        this.patientList = data;
        this.filteredPatients$ = of(data);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  searchDoctor(event: any) {
    const data = event.target.value.toLowerCase().trim();
    if (!data) {
      this.filteredDoctors$ = of(this.doctorList);
    } else {
      this.filteredDoctors$ = of(this.doctorList).pipe(
        map((doctors) => {
          return doctors.filter((doctor: any) => {
            return doctor.id.toString().includes(data) ||
                   doctor.username.toLowerCase().includes(data) ||
                   doctor.specialty.toLowerCase().includes(data);
          });
        })
      );
    }
  }

  searchPatient(event: any) {
    const data = event.target.value.toLowerCase().trim();
    if (!data) {
      this.filteredPatients$ = of(this.patientList);
    } else {
      this.filteredPatients$ = of(this.patientList).pipe(
        map((patients) => {
          return patients.filter((patient: any) => {
            return patient.id.toString().includes(data) ||
                   patient.username.toLowerCase().includes(data);
          });
        })
      );
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const timeValue = this.itemForm.controls['time'].value;
      const date = new Date(timeValue);

      const formattedTime = this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss', 'Asia/Kolkata');
      this.itemForm.controls['time'].setValue(formattedTime);

      this.httpService.ScheduleAppointmentByReceptionist(this.itemForm.value).subscribe(
        (data) => {
          this.itemForm.reset();
          this.responseMessage = "Appointment Saved Successfully";
          this.isAdded = false;
          setTimeout(() => {
            this.responseMessage = null;
          }, 2000);
        },
        (error) => {
          this.error = 'Patient ID or Doctor ID is incorrect';
          setTimeout(() => {
            this.error = null;
          }, 3000);
        }
      );
    } else {
      this.error = 'Patient ID or Doctor ID is incorrect';
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }
}





