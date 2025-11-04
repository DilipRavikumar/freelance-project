-- Employee Database Schema for Freelance Platform
-- Database: Freelance

CREATE DATABASE IF NOT EXISTS Freelance;
USE Freelance;

-- Skills table
CREATE TABLE Skills (
    skill_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee table
CREATE TABLE Employee (
    employee_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(10),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    designation_id INT,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    manager_id BIGINT,
    company_id INT,
    bank_name VARCHAR(100) NOT NULL,
    bank_account_number VARCHAR(20) NOT NULL UNIQUE,
    ifsc_code VARCHAR(11),
    pan_number VARCHAR(10) NOT NULL UNIQUE,
    photo_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    domain VARCHAR(50),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_first_name CHECK (first_name REGEXP '^[A-Za-z]+$'),
    CONSTRAINT chk_last_name CHECK (last_name REGEXP '^[A-Za-z]+$'),
    CONSTRAINT chk_phone CHECK (phone_number REGEXP '^[0-9]{10}$'),
    CONSTRAINT chk_ifsc CHECK (ifsc_code REGEXP '^[A-Z]{4}0[A-Z0-9]{6}$'),
    CONSTRAINT chk_pan CHECK (pan_number REGEXP '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
    CONSTRAINT chk_account CHECK (bank_account_number REGEXP '^[0-9]+$')
);

-- Employee Skills junction table (Many-to-Many)
CREATE TABLE EmployeeSkills (
    employee_id BIGINT,
    skill_id BIGINT,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
    years_of_experience INT DEFAULT 0,
    PRIMARY KEY (employee_id, skill_id),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);

-- Insert skills data
INSERT INTO Skills (skill_name, category) VALUES 
('JavaScript', 'Programming'),
('React', 'Frontend'),
('Node.js', 'Backend'),
('MongoDB', 'Database'),
('Python', 'Programming'),
('Machine Learning', 'AI/ML'),
('TensorFlow', 'AI/ML'),
('Pandas', 'Data Analysis'),
('Flutter', 'Mobile'),
('Dart', 'Programming'),
('Firebase', 'Backend'),
('Android', 'Mobile'),
('iOS', 'Mobile'),
('Figma', 'Design'),
('Adobe XD', 'Design'),
('Sketch', 'Design'),
('Prototyping', 'Design'),
('User Research', 'UX'),
('Docker', 'DevOps'),
('Kubernetes', 'DevOps'),
('AWS', 'Cloud'),
('Jenkins', 'CI/CD'),
('Terraform', 'Infrastructure');

-- Insert sample freelancer data
INSERT INTO Employee (
    first_name, last_name, email, phone_number, date_of_birth, gender,
    designation_id, hire_date, salary, company_id, bank_name, bank_account_number,
    ifsc_code, pan_number, domain, linkedin_url, github_url, status
) VALUES 
(
    'John', 'Doe', 'john.doe@freelance.com', '9876543210', '1990-05-15', 'Male',
    1, '2023-01-15', 75000.00, 1, 'HDFC Bank', '12345678901',
    'HDFC0001234', 'ABCDE1234F', 'Web Development',
    'https://linkedin.com/in/johndoe', 'https://github.com/johndoe', 'Active'
),
(
    'Jane', 'Smith', 'jane.smith@freelance.com', '9876543211', '1988-08-22', 'Female',
    2, '2022-06-10', 85000.00, 1, 'SBI', '98765432101',
    'SBIN0005678', 'FGHIJ5678K', 'Data Science',
    'https://linkedin.com/in/janesmith', 'https://github.com/janesmith', 'Active'
),
(
    'Mike', 'Johnson', 'mike.johnson@freelance.com', '9876543212', '1992-03-10', 'Male',
    3, '2023-03-20', 65000.00, 1, 'ICICI Bank', '11223344556',
    'ICIC0001122', 'KLMNO9876P', 'Mobile Development',
    'https://linkedin.com/in/mikejohnson', 'https://github.com/mikejohnson', 'Active'
),
(
    'Sarah', 'Wilson', 'sarah.wilson@freelance.com', '9876543213', '1991-07-25', 'Female',
    4, '2023-02-05', 70000.00, 1, 'Axis Bank', '55667788990',
    'UTIB0005566', 'QRSTU2345V', 'UI/UX Design',
    'https://linkedin.com/in/sarahwilson', NULL, 'Active'
),
(
    'David', 'Brown', 'david.brown@freelance.com', '9876543214', '1989-11-12', 'Male',
    5, '2022-09-15', 90000.00, 1, 'Kotak Bank', '99887766554',
    'KKBK0009988', 'WXYZ6789A', 'DevOps',
    'https://linkedin.com/in/davidbrown', 'https://github.com/davidbrown', 'Active'
);

-- Insert employee skills relationships
INSERT INTO EmployeeSkills (employee_id, skill_id, proficiency_level, years_of_experience) VALUES 
-- John Doe (Web Development)
(1, 1, 'Advanced', 5), -- JavaScript
(1, 2, 'Advanced', 4), -- React
(1, 3, 'Intermediate', 3), -- Node.js
(1, 4, 'Intermediate', 2), -- MongoDB
-- Jane Smith (Data Science)
(2, 5, 'Expert', 6), -- Python
(2, 6, 'Advanced', 4), -- Machine Learning
(2, 7, 'Advanced', 3), -- TensorFlow
(2, 8, 'Expert', 5), -- Pandas
-- Mike Johnson (Mobile Development)
(3, 9, 'Advanced', 3), -- Flutter
(3, 10, 'Advanced', 3), -- Dart
(3, 11, 'Intermediate', 2), -- Firebase
(3, 12, 'Advanced', 4), -- Android
(3, 13, 'Intermediate', 2), -- iOS
-- Sarah Wilson (UI/UX Design)
(4, 14, 'Expert', 5), -- Figma
(4, 15, 'Advanced', 4), -- Adobe XD
(4, 16, 'Advanced', 3), -- Sketch
(4, 17, 'Expert', 6), -- Prototyping
(4, 18, 'Advanced', 4), -- User Research
-- David Brown (DevOps)
(5, 19, 'Expert', 7), -- Docker
(5, 20, 'Advanced', 5), -- Kubernetes
(5, 21, 'Expert', 6), -- AWS
(5, 22, 'Advanced', 4), -- Jenkins
(5, 23, 'Advanced', 3); -- Terraform

-- Indexes for better performance
CREATE INDEX idx_employee_email ON Employee(email);
CREATE INDEX idx_employee_domain ON Employee(domain);
CREATE INDEX idx_employee_status ON Employee(status);
CREATE INDEX idx_skills_name ON Skills(skill_name);
CREATE INDEX idx_skills_category ON Skills(category);
CREATE INDEX idx_employee_skills_employee ON EmployeeSkills(employee_id);
CREATE INDEX idx_employee_skills_skill ON EmployeeSkills(skill_id);