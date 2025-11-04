package com.example.employee.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "Employee")
@EqualsAndHashCode(exclude = "skills")
@ToString(exclude = "skills")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeId;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z]+$")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z]+$")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank
    @Email
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Pattern(regexp = "^[0-9]{10}$")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Past
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Pattern(regexp = "^(Male|Female|Other)$")
    @Column(name = "gender")
    private String gender;

    @Column(name = "designation_id")
    private Integer designationId;

    @NotNull
    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @Positive
    @Column(name = "salary")
    private BigDecimal salary;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "company_id")
    private Integer companyId;

    @NotBlank
    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @NotBlank
    @Pattern(regexp = "^[0-9]+$")
    @Column(name = "bank_account_number", unique = true, nullable = false)
    private String bankAccountNumber;

    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$")
    @Column(name = "ifsc_code")
    private String ifscCode;

    @NotBlank
    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$")
    @Column(name = "pan_number", unique = true, nullable = false)
    private String panNumber;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "EmployeeSkills",
        joinColumns = @JoinColumn(name = "employee_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skills> skills = new HashSet<>();

    @Column(name = "domain")
    private String domain;

    @Pattern(regexp = "^(Active|Inactive)$")
    @Column(name = "status")
    private String status = "Active";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}