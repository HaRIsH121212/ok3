package com.wecp.healthcare_appointment_management_system.service;

import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import com.wecp.healthcare_appointment_management_system.entity.User;
// import com.wecp.healthcare_appointment_management_system.exception.UserExistsException;
import com.wecp.healthcare_appointment_management_system.repository.DoctorRepository;
import com.wecp.healthcare_appointment_management_system.repository.PatientRepository;
import com.wecp.healthcare_appointment_management_system.repository.ReceptionistRepository;
import com.wecp.healthcare_appointment_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public Doctor registerDoctor(Doctor doctor) {
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return doctorRepository.save(doctor);

    }

    public Patient registerPatient(Patient patient) {
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return patientRepository.save(patient);
    }
    public Receptionist registerReceptionist(Receptionist receptionist) {
        receptionist.setPassword(passwordEncoder.encode(receptionist.getPassword()));
        return receptionistRepository.save(receptionist);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User registerUser(User user){
        // if(userRepository.existsByByEmail(user.getEmail())){
        //     throw new UserExistsException("User Already exists with email "+user.getEmail());
        // }
        // else if(userRepository.existsByUsername(user.getUsername())){
        //     throw new UserExistsException("User Already exists with the Username "+user.getUsername());
        // }
        // else{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        // }
    }

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }
}
