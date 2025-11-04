package com.example.employee.repository;

import com.example.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByPanNumber(String panNumber);
    Optional<Employee> findByBankAccountNumber(String bankAccountNumber);
    List<Employee> findByManagerId(Long managerId);
    List<Employee> findByCompanyId(Integer companyId);
    List<Employee> findByStatus(String status);
    List<Employee> findByDomain(String domain);
    List<Employee> findBySkillsContainingIgnoreCase(String skills);
}