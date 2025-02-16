package com.wecp.healthcare_appointment_management_system.controller;


import com.wecp.healthcare_appointment_management_system.dto.LoginRequest;
import com.wecp.healthcare_appointment_management_system.dto.LoginResponse;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import com.wecp.healthcare_appointment_management_system.entity.User;
// import com.wecp.healthcare_appointment_management_system.exception.UserExistsException;
import com.wecp.healthcare_appointment_management_system.jwt.JwtUtil;
import com.wecp.healthcare_appointment_management_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class RegisterAndLoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;


    // @PostMapping("/api/patient/register")
    // public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
    //     Patient registeredPatient = userService.registerPatient(patient);
    //     return new ResponseEntity<>(registeredPatient, HttpStatus.CREATED);
    // }

    // @PostMapping("/api/doctors/register")
    // public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
    //     Doctor registerDoctor = userService.registerDoctor(doctor);
    //     return new ResponseEntity<>(registerDoctor, HttpStatus.CREATED);
    // }

    // @PostMapping("/api/receptionist/register")
    // public ResponseEntity<Receptionist> registerReceptionist(@RequestBody Receptionist receptionist) {
    //     Receptionist registerReceptionist = userService.registerReceptionist(receptionist);
    //     return new ResponseEntity<>(registerReceptionist, HttpStatus.CREATED);
    // }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } 
        catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        User user = userService.getUserByUsername(loginRequest.getUsername());

        return ResponseEntity.ok(new LoginResponse(user.getId(),token, user.getUsername(), user.getEmail(), user.getRole()));
        
    }

//      @ExceptionHandler
//         public ResponseEntity<String> userExistsException(UserExistsException ex) {
//             return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
//         }
// }



@PostMapping("/api/patient/register")
public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
    if (userService.existsByUsername(patient.getUsername())) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Patient already exists");
    }
    Patient registeredPatient = userService.registerPatient(patient);
    return new ResponseEntity<>(registeredPatient, HttpStatus.CREATED);
}
 
@PostMapping("/api/doctors/register")
public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
    if (userService.existsByUsername(doctor.getUsername())) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Doctor already exists");
    }
    Doctor registeredDoctor = userService.registerDoctor(doctor);
    return new ResponseEntity<>(registeredDoctor, HttpStatus.CREATED);
}
 
@PostMapping("/api/receptionist/register")
public ResponseEntity<Receptionist> registerReceptionist(@RequestBody Receptionist receptionist) {
    if (userService.existsByUsername(receptionist.getUsername())) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Receptionist already exists");
    }
    Receptionist registeredReceptionist = userService.registerReceptionist(receptionist);
    return new ResponseEntity<>(registeredReceptionist, HttpStatus.CREATED);
}


}
