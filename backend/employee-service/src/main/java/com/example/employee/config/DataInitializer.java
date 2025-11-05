package com.example.employee.config;

import com.example.employee.entity.Employee;
import com.example.employee.entity.Skills;
import com.example.employee.repository.EmployeeRepository;
import com.example.employee.repository.SkillsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final SkillsRepository skillsRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only populate if database is empty
        if (employeeRepository.count() == 0) {
            // Create skills first
            createSkills();
            Employee emp1 = new Employee();
            emp1.setFirstName("John");
            emp1.setLastName("Doe");
            emp1.setEmail("john.doe@freelance.com");
            emp1.setPhoneNumber("9876543210");
            emp1.setDateOfBirth(LocalDate.of(1990, 5, 15));
            emp1.setGender("Male");
            emp1.setDesignationId(1);
            emp1.setHireDate(LocalDate.of(2023, 1, 15));
            emp1.setSalary(new BigDecimal("75000"));
            emp1.setCompanyId(1);
            emp1.setBankName("HDFC Bank");
            emp1.setBankAccountNumber("12345678901");
            emp1.setIfscCode("HDFC0001234");
            emp1.setPanNumber("ABCDE1234F");
            emp1.setDomain("Web Development");
            emp1.setLinkedinUrl("https://linkedin.com/in/johndoe");
            emp1.setGithubUrl("https://github.com/johndoe");
            emp1.setStatus("Active");
            emp1.setSkills(getSkillsForEmployee("JavaScript", "React", "Node.js", "MongoDB"));

            Employee emp2 = new Employee();
            emp2.setFirstName("Jane");
            emp2.setLastName("Smith");
            emp2.setEmail("jane.smith@freelance.com");
            emp2.setPhoneNumber("9876543211");
            emp2.setDateOfBirth(LocalDate.of(1988, 8, 22));
            emp2.setGender("Female");
            emp2.setDesignationId(2);
            emp2.setHireDate(LocalDate.of(2022, 6, 10));
            emp2.setSalary(new BigDecimal("85000"));
            emp2.setManagerId(1L);
            emp2.setCompanyId(1);
            emp2.setBankName("SBI");
            emp2.setBankAccountNumber("98765432101");
            emp2.setIfscCode("SBIN0005678");
            emp2.setPanNumber("FGHIJ5678K");
            emp2.setDomain("Data Science");
            emp2.setLinkedinUrl("https://linkedin.com/in/janesmith");
            emp2.setGithubUrl("https://github.com/janesmith");
            emp2.setStatus("Active");
            emp2.setSkills(getSkillsForEmployee("Python", "Machine Learning", "TensorFlow", "Pandas"));

            Employee emp3 = new Employee();
            emp3.setFirstName("Mike");
            emp3.setLastName("Johnson");
            emp3.setEmail("mike.johnson@freelance.com");
            emp3.setPhoneNumber("9876543212");
            emp3.setDateOfBirth(LocalDate.of(1992, 3, 10));
            emp3.setGender("Male");
            emp3.setDesignationId(3);
            emp3.setHireDate(LocalDate.of(2023, 3, 20));
            emp3.setSalary(new BigDecimal("65000"));
            emp3.setCompanyId(1);
            emp3.setBankName("ICICI Bank");
            emp3.setBankAccountNumber("11223344556");
            emp3.setIfscCode("ICIC0001122");
            emp3.setPanNumber("KLMNO9876P");
            emp3.setDomain("Mobile Development");
            emp3.setLinkedinUrl("https://linkedin.com/in/mikejohnson");
            emp3.setGithubUrl("https://github.com/mikejohnson");
            emp3.setStatus("Active");
            emp3.setSkills(getSkillsForEmployee("Flutter", "Dart", "Firebase", "Android", "iOS"));

            Employee emp4 = new Employee();
            emp4.setFirstName("Sarah");
            emp4.setLastName("Wilson");
            emp4.setEmail("sarah.wilson@freelance.com");
            emp4.setPhoneNumber("9876543213");
            emp4.setDateOfBirth(LocalDate.of(1991, 7, 25));
            emp4.setGender("Female");
            emp4.setDesignationId(4);
            emp4.setHireDate(LocalDate.of(2023, 2, 5));
            emp4.setSalary(new BigDecimal("70000"));
            emp4.setCompanyId(1);
            emp4.setBankName("Axis Bank");
            emp4.setBankAccountNumber("55667788990");
            emp4.setIfscCode("UTIB0005566");
            emp4.setPanNumber("QRSTU2345V");
            emp4.setDomain("UI/UX Design");
            emp4.setLinkedinUrl("https://linkedin.com/in/sarahwilson");
            emp4.setStatus("Active");
            emp4.setSkills(getSkillsForEmployee("Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"));

            Employee emp5 = new Employee();
            emp5.setFirstName("David");
            emp5.setLastName("Brown");
            emp5.setEmail("david.brown@freelance.com");
            emp5.setPhoneNumber("9876543214");
            emp5.setDateOfBirth(LocalDate.of(1989, 11, 12));
            emp5.setGender("Male");
            emp5.setDesignationId(5);
            emp5.setHireDate(LocalDate.of(2022, 9, 15));
            emp5.setSalary(new BigDecimal("90000"));
            emp5.setCompanyId(1);
            emp5.setBankName("Kotak Bank");
            emp5.setBankAccountNumber("99887766554");
            emp5.setIfscCode("KKBK0009988");
            emp5.setPanNumber("WXYZD6789A");
            emp5.setDomain("DevOps");
            emp5.setLinkedinUrl("https://linkedin.com/in/davidbrown");
            emp5.setGithubUrl("https://github.com/davidbrown");
            emp5.setStatus("Active");
            emp5.setSkills(getSkillsForEmployee("Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"));

            employeeRepository.save(emp1);
            employeeRepository.save(emp2);
            employeeRepository.save(emp3);
            employeeRepository.save(emp4);
            employeeRepository.save(emp5);
        }
    }

    private void createSkills() {
        String[][] skillsData = {
            {"JavaScript", "Programming"},
            {"React", "Frontend"},
            {"Node.js", "Backend"},
            {"MongoDB", "Database"},
            {"Python", "Programming"},
            {"Machine Learning", "AI/ML"},
            {"TensorFlow", "AI/ML"},
            {"Pandas", "Data Analysis"},
            {"Flutter", "Mobile"},
            {"Dart", "Programming"},
            {"Firebase", "Backend"},
            {"Android", "Mobile"},
            {"iOS", "Mobile"},
            {"Figma", "Design"},
            {"Adobe XD", "Design"},
            {"Sketch", "Design"},
            {"Prototyping", "Design"},
            {"User Research", "UX"},
            {"Docker", "DevOps"},
            {"Kubernetes", "DevOps"},
            {"AWS", "Cloud"},
            {"Jenkins", "CI/CD"},
            {"Terraform", "Infrastructure"}
        };

        for (String[] skillData : skillsData) {
            Skills skill = new Skills();
            skill.setSkillName(skillData[0]);
            skill.setCategory(skillData[1]);
            skillsRepository.save(skill);
        }
    }

    private Set<Skills> getSkillsForEmployee(String... skillNames) {
        Set<Skills> skills = new HashSet<>();
        for (String skillName : skillNames) {
            skillsRepository.findBySkillName(skillName)
                .ifPresent(skills::add);
        }
        return skills;
    }
}