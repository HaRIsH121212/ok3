package com.wecp.healthcare_appointment_management_system.service;

import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    
    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }


    public Appointment scheduleAppointment(Long patientId, Long doctorId, Date appointmentTime) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid patient ID"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid doctor ID"));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentTime(appointmentTime);
        appointment.setStatus("Scheduled");
        return appointmentRepository.save(appointment);
    }

    public Appointment rescheduleAppointment(Long appointmentId, Date newAppointmentTime) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment ID"));

        appointment.setAppointmentTime(newAppointmentTime);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid doctor ID"));

        return appointmentRepository.findByDoctorId(doctorId);
    }
    
    
    public void deleteAppointment(Long appointmentId) {
            appointmentRepository.deleteById(appointmentId);
        }


}
