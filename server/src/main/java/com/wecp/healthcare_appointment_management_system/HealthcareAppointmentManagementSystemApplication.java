package com.wecp.healthcare_appointment_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.wecp.healthcare_appointment_management_system.repository")
public class HealthcareAppointmentManagementSystemApplication {
	public static void main(String[] args) {
		SpringApplication.run(HealthcareAppointmentManagementSystemApplication.class, args);
	}
}
