package com.wecp.healthcare_appointment_management_system.controller;

import com.wecp.healthcare_appointment_management_system.dto.TimeDto;
import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.MedicalRecord;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.repository.PatientRepository;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.DoctorService;
import com.wecp.healthcare_appointment_management_system.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
public class PatientController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private MedicalRecordService medicalRecordService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/api/patient/doctors")
    public ResponseEntity<List<Doctor>> getDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @PostMapping("/api/patient/appointment")
    public ResponseEntity<?> scheduleAppointment(@RequestParam Long patientId,
                                                 @RequestParam Long doctorId,
                                                 @RequestBody TimeDto timeDto) {
        Appointment appointment = appointmentService.scheduleAppointment(patientId, doctorId, timeDto.getTime());
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/api/patient/appointments")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatientId(@RequestParam Long patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatientId(patientId));
    }

    @GetMapping("/api/patient/medicalrecords")
    public ResponseEntity<List<MedicalRecord>> viewMedicalRecords(@RequestParam Long patientId) {
        List<MedicalRecord> medicalRecords = medicalRecordService.getMedicalRecordsByPatientId(patientId);
        return ResponseEntity.ok(medicalRecords);
    }

//wee
@GetMapping("/api/patients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return ResponseEntity.ok(patients);
    }



}
