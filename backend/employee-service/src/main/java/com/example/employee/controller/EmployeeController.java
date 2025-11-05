package com.example.employee.controller;

import com.example.employee.dto.EmployeeDTO;
import com.example.employee.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Employee Management", description = "APIs for managing freelancers and their information")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "Get all freelancers", description = "Retrieve a list of all registered freelancers")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of freelancers")
    })
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get freelancer by ID", description = "Retrieve a specific freelancer by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved freelancer"),
        @ApiResponse(responseCode = "404", description = "Freelancer not found")
    })
    public ResponseEntity<EmployeeDTO> getEmployeeById(
            @Parameter(description = "ID of the freelancer to retrieve") @PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    @Operation(summary = "Register new freelancer", description = "Create a new freelancer profile with skills and domain")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Freelancer successfully registered"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<EmployeeDTO> createEmployee(
            @Parameter(description = "Freelancer data to register") @Valid @RequestBody EmployeeDTO employeeDTO) {
        return new ResponseEntity<>(employeeService.createEmployee(employeeDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDTO employeeDTO) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByManager(@PathVariable Long managerId) {
        return ResponseEntity.ok(employeeService.getEmployeesByManager(managerId));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByCompany(@PathVariable Integer companyId) {
        return ResponseEntity.ok(employeeService.getEmployeesByCompany(companyId));
    }

    @GetMapping("/freelancers/domain/{domain}")
    @Operation(summary = "Find freelancers by domain", description = "Get all freelancers working in a specific domain")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved freelancers by domain")
    })
    public ResponseEntity<List<EmployeeDTO>> getFreelancersByDomain(
            @Parameter(description = "Domain to search for (e.g., Web Development, Data Science)") @PathVariable String domain) {
        return ResponseEntity.ok(employeeService.getFreelancersByDomain(domain));
    }

    @GetMapping("/freelancers/skills/{skills}")
    @Operation(summary = "Find freelancers by skills", description = "Search freelancers who have specific skills")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved freelancers by skills")
    })
    public ResponseEntity<List<EmployeeDTO>> getFreelancersBySkills(
            @Parameter(description = "Skill to search for (e.g., JavaScript, Python)") @PathVariable String skills) {
        return ResponseEntity.ok(employeeService.getFreelancersBySkills(skills));
    }
}