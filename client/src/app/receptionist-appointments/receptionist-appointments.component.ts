
// import { Component, OnInit } from '@angular/core';
// import { HttpService } from '../../services/http.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
// import { map, Observable, of } from 'rxjs';

// @Component({
//   selector: 'app-receptionist-appointments',
//   templateUrl: './receptionist-appointments.component.html',
//   styleUrls: ['./receptionist-appointments.component.scss'],
//   providers: [DatePipe]
// })
// export class ReceptionistAppointmentsComponent implements OnInit {
//   itemForm: FormGroup;
//   formModel: any = {};
//   responseMessage: any;
//   appointmentList!: any;
//   storeappointment$:Observable<any> = of([]);
//   storeappointment2$:Observable<any> = of([]);
//   isAdded: boolean = false;
//   doctorList:any;
//   filteredAppointments:any=[];
//   searchTerm:string='';

//   constructor(
//     public httpService: HttpService,
//     private formBuilder: FormBuilder,
//     private datePipe: DatePipe
//   ) {
//     // Initialize the form with necessary controls
//     this.itemForm = this.formBuilder.group({
//       id: ['', Validators.required], // Appointment ID
//       patientId: ['',[Validators.required,Validators.min(1)]],
//       doctorId: ['',[Validators.required,Validators.min(1)]],
//       time: ['', Validators.required] // Date and time of the appointment
//     });
//   }

//   ngOnInit(): void {
//     // Load appointments when the component is initialized
//     this.getAppointments();
//   }

//   // getDoctors():void {
//   //   // this.doctorList
//   //   this.httpService.getDoctors().subscribe((data)=>
//   //     {
//   //     this.doctorList=data;
//   //     console.log(this.doctorList);
//   //   })
//   // }
  
//   getAppointments() {
//     // Fetch all appointments from the server
//     this.storeappointment$=this.httpService.getAllAppointments();//.subscribe(
//     this.storeappointment2$=this.storeappointment$;
//     //   data => {
//     //     this.appointmentList = data;
//     //     console.log(this.appointmentList);
//     //   },
//     //   error => {
//     //     console.error('Error fetching appointments:', error);
//     //   }
//     // );
//     // console.log(this.appointmentList)
//   }

//   editAppointment(appointment: any) {
//     // Prepares the form for editing an appointment
//     this.itemForm.controls['id'].setValue(appointment.id);
//     this.itemForm.controls['patientId'].setValue(appointment.patient.id);
//     this.itemForm.controls['doctorId'].setValue(appointment.doctor.id);

//     // Format the existing time to 'yyyy-MM-ddTHH:mm' for datetime-local input
//     const formattedTime = this.datePipe.transform(appointment.appointmentTime, 'yyyy-MM-dd HH:mm:ss','GMT+0530');
//     this.itemForm.controls['time'].setValue(formattedTime);
//     this.isAdded = true;
//   }

//   onSubmit() {
//     if (this.itemForm.valid) {
//       // Retrieves form values
//       const appointmentId = this.itemForm.controls['id'].value;
//       const patientId = this.itemForm.controls['patientId'].value;
//       const doctorId = this.itemForm.controls['doctorId'].value;
//       const timeInput = this.itemForm.controls['time'].value; // ISO format from datetime-local input

//       // Formats the time input using DatePipe to 'yyyy-MM-dd HH:mm:ss' format
//       const formattedTime = this.datePipe.transform(timeInput, 'yyyy-MM-dd HH:mm:ss');
      

//       // Prepares the updated appointment data
//       const updatedAppointment = {
//         id: appointmentId,
//         patientId: patientId,
//         doctorId: doctorId,
//         time: formattedTime
//       };

//       // Calls HttpService to reschedule the appointment
//       this.httpService.reScheduleAppointment(appointmentId, updatedAppointment).subscribe(
//         response => {
//           this.responseMessage = 'Appointment rescheduled successfully!';
//           this.itemForm.reset();
//           this.isAdded = false;
//           setTimeout(() => {
//             this.responseMessage = null;
//           // this.itemForm.reset();
//           }, 2000);

//           // Reload the list of appointments
//           this.getAppointments();
//         },
//         error => {
//           console.error('Error rescheduling appointment:', error);
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//       // Optionally, you can display validation errors here
//     }
//   }








 

// search(event: any) {
//     const data = event.target.value.toLowerCase().trim();
//     if (!data) {
//       this.storeappointment2$ = this.storeappointment$;
//     } else {
//       this.storeappointment2$ = this.storeappointment$.pipe(map((datas:any)=>{
//         return datas.filter((appointment:any)=>{
//           return appointment.id.toString().includes(data) || 
//            appointment.patient.username.toLowerCase().includes(data) ||
//            appointment.doctor.username.toLowerCase().includes(data);
          
//         })
//       }))
//       };
//     }






// deleteAppointment(appointmentId: any) {
//     this.httpService.deleteAppointment(appointmentId).subscribe(
//       (response) => {
//         this.responseMessage = 'Appointment deleted successfully!';
//         // Reload the list of appointments
//         this.getAppointments();
//       },
//       (error) => {
//         console.error('Error deleting appointment:', error);
//       }
//     );
// }

//   }














import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-appointments',
  templateUrl: './receptionist-appointments.component.html',
  styleUrls: ['./receptionist-appointments.component.scss'],
  providers: [DatePipe]
})
export class ReceptionistAppointmentsComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  appointmentList!: any;
  storeappointment$: Observable<any> = of([]);
  storeappointment2$: Observable<any> = of([]);
  isAdded: boolean = false;
  doctorList: any;
  filteredAppointments: any = [];
  searchTerm: string = '';

  constructor(
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private route: Router
  ) {
    // Initialize the form with necessary controls
    this.itemForm = this.formBuilder.group({
      id: ['', Validators.required], // Appointment ID
      patientId: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      doctorId: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      time: ['', Validators.required] // Date and time of the appointment
    });
  }

  ngOnInit(): void {
    // Load appointments when the component is initialized
    this.getAppointments();
  }

  getAppointments() {
    // Fetch all appointments from the server
    this.storeappointment$ = this.httpService.getAllAppointments();
    this.storeappointment2$ = this.storeappointment$;
  }

  editAppointment(appointment: any) {
    // Prepares the form for editing an appointment
    this.itemForm.controls['id'].setValue(appointment.id);
    this.itemForm.controls['patientId'].setValue(appointment.patient.id);
    this.itemForm.controls['doctorId'].setValue(appointment.doctor.id);

    // Format the existing time to 'yyyy-MM-ddTHH:mm' for datetime-local input
    const formattedTime = this.datePipe.transform(appointment.appointmentTime, 'yyyy-MM-dd HH:mm:ss', 'GMT+0530');
    this.itemForm.controls['time'].setValue(formattedTime);
    this.isAdded = true;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      // Retrieves form values
      const appointmentId = this.itemForm.controls['id'].value;
      const patientId = this.itemForm.controls['patientId'].value;
      const doctorId = this.itemForm.controls['doctorId'].value;
      const timeInput = this.itemForm.controls['time'].value; // ISO format from datetime-local input

      // Formats the time input using DatePipe to 'yyyy-MM-dd HH:mm:ss' format
      const formattedTime = this.datePipe.transform(timeInput, 'yyyy-MM-dd HH:mm:ss');

      // Prepares the updated appointment data
      const updatedAppointment = {
        id: appointmentId,
        patientId: patientId,
        doctorId: doctorId,
        time: formattedTime
      };

      // Calls HttpService to reschedule the appointment
      this.httpService.reScheduleAppointment(appointmentId, updatedAppointment).subscribe(
        response => {
          this.responseMessage = 'Appointment rescheduled successfully!';
          this.itemForm.reset();
          this.isAdded = false;
          setTimeout(() => {
            this.responseMessage = null;
          }, 2000);

          // Reload the list of appointments
          this.getAppointments();
        },
        error => {
          console.error('Error rescheduling appointment:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  search(event: any) {
    const data = event.target.value.toLowerCase().trim();
    if (!data) {
      this.storeappointment2$ = this.storeappointment$;
    } else {
      this.storeappointment2$ = this.storeappointment$.pipe(map((datas: any) => {
        return datas.filter((appointment: any) => {
          return appointment.id.toString().includes(data) ||
            appointment.patient.username.toLowerCase().includes(data) ||
            appointment.doctor.username.toLowerCase().includes(data);
        });
      }));
    }
  }

  
  deleteAppointment(appointmentId: any) {
    this.httpService.deleteAppointment(appointmentId).subscribe(
      response => {
        this.responseMessage = 'Appointment deleted successfully!';
        // Reload the list of appointments
        
        // this.getAppointments();
        this.route.navigateByUrl('/receptionist-appointments');
      }
    );
    this.getAppointments();
  }
}





