package com.wecp.healthcare_appointment_management_system.service;


import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor getDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId).orElse(null);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor updateAvailability(Long doctorId, String availability) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid doctor ID"));

        doctor.setAvailability(availability);
        return doctorRepository.save(doctor);
    }
}
