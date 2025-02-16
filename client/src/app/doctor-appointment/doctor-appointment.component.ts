// import { Component, OnInit } from '@angular/core';
// import { HttpService } from '../../services/http.service';

// @Component({
//   selector: 'app-doctor-appointment',
//   templateUrl: './doctor-appointment.component.html',
//   styleUrls: ['./doctor-appointment.component.scss']
// })
// export class DoctorAppointmentComponent implements OnInit {
//   appointmentList: any = [];
//   doctorUserName:any;
//   doctorUserId:any;
//   secondsMessage:any;
//   constructor(public httpService: HttpService) { }
//   ngOnInit(): void {
//     this.getAppointments();
//   }
//   getAppointments() {
//     const userIdString = localStorage.getItem('userId');
//     const userId = userIdString ? parseInt(userIdString, 10) : null;
//     this.appointmentList
//     this.httpService.getAppointmentByDoctor(userId).subscribe((data) => {
//       this.appointmentList = data;

//       if (this.appointmentList.length > 0) {
//         const firstAppointment = this.appointmentList[0];
//         this.doctorUserName = firstAppointment.doctor.username;
//         this.doctorUserId = firstAppointment.doctor.id;
//         this.secondsMessage='Good day, '+this.doctorUserName+'! Ready to make difference today.... ';
//         setTimeout(() => {
//           this.secondsMessage=null;
//         }, 4000);
//       }



//       console.log(this.appointmentList);
//     })
//   }
// }




import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  appointmentList: any = [];
  doctorUserName: any;
  doctorUserId: any;
  secondsMessage: any;

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    this.httpService.getAppointmentByDoctor(userId).subscribe((data) => {
      this.appointmentList = data;

      if (this.appointmentList.length > 0) {
        const firstAppointment = this.appointmentList[0];
        this.doctorUserName = firstAppointment.doctor.username;
        this.doctorUserId = firstAppointment.doctor.id;
        this.secondsMessage = 'Good day, ' + this.doctorUserName + '! Ready to make a difference today.... ';
        setTimeout(() => {
          this.secondsMessage = null;
        }, 2000);
      } else {
        this.secondsMessage = 'You have no appointments as of now.';
        setTimeout(() => {
          this.secondsMessage = null;
        }, 1000);
      }

      console.log(this.appointmentList);
    });
  }




// markAsCompleted(appointmentId: number) {
//     this.httpService.markAppointmentAsCompleted(appointmentId).subscribe(() => {
//       const appointment = this.appointmentList.find((a: any) => a.id === appointmentId);
//       if (appointment) {
//         appointment.status = 'Completed';
//       }
//     });
//   }




}
