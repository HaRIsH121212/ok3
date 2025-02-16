package com.wecp.healthcare_appointment_management_system.controller;


import com.wecp.healthcare_appointment_management_system.dto.TimeDto;
import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ReceptionistController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/api/receptionist/appointments")
    public List<Appointment> getAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PostMapping("/api/receptionist/appointment")
    public ResponseEntity<Appointment> scheduleAppointment(@RequestParam Long patientId,
                                                                   @RequestParam Long doctorId,
                                                                   @RequestBody TimeDto timeDto) {
        Appointment appointment = appointmentService.scheduleAppointment(patientId, doctorId, timeDto.getTime());
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/api/receptionist/appointment-reschedule/{appointmentId}")
    public ResponseEntity<Appointment> rescheduleAppointment(@PathVariable Long appointmentId,
                                                             @RequestBody TimeDto timeDto) {
        Appointment updatedAppointment = appointmentService.rescheduleAppointment(appointmentId, timeDto.getTime());
        return ResponseEntity.ok(updatedAppointment);
    }



@DeleteMapping("/api/appointment/{appointmentId}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.ok("Appointment deleted successfully!");
    }

}