-- =====================================================
-- EMPLOYEE & SKILLS SCHEMA - FREELANCE PLATFORM
-- =====================================================

CREATE DATABASE IF NOT EXISTS freelance_platform;
USE freelance_platform;

-- =====================================================
-- SKILLS TABLE
-- =====================================================

CREATE TABLE skills (
    skill_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    description TEXT,
    is_technical BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- EMPLOYEES TABLE
-- =====================================================

CREATE TABLE employees (
    employee_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Personal Information
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    
    -- Professional Information
    designation_id BIGINT,
    hire_date DATE NOT NULL,
    manager_id BIGINT,
    company_id BIGINT,
    
    -- Financial Information
    salary DECIMAL(12,2) NOT NULL,
    
    -- Banking Information
    bank_name VARCHAR(100) NOT NULL,
    bank_account_number VARCHAR(30) NOT NULL,
    ifsc_code VARCHAR(11),
    
    -- Government IDs
    pan_number VARCHAR(10) NOT NULL UNIQUE,
    
    -- Professional Domain
    domain VARCHAR(100),
    
    -- Social Links
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    photo_url VARCHAR(255),
    
    -- Status
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_first_name CHECK (first_name REGEXP '^[A-Za-z ]+$'),
    CONSTRAINT chk_last_name CHECK (last_name REGEXP '^[A-Za-z ]+$'),
    CONSTRAINT chk_phone CHECK (phone_number REGEXP '^[0-9]{10,15}$'),
    CONSTRAINT chk_ifsc CHECK (ifsc_code IS NULL OR ifsc_code REGEXP '^[A-Z]{4}0[A-Z0-9]{6}$'),
    CONSTRAINT chk_pan CHECK (pan_number REGEXP '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
    CONSTRAINT chk_account CHECK (bank_account_number REGEXP '^[0-9]+$'),
    
    -- Self-referencing foreign key for manager
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- =====================================================
-- EMPLOYEE SKILLS JUNCTION TABLE
-- =====================================================

CREATE TABLE employee_skills (
    employee_id BIGINT,
    skill_id BIGINT,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
    years_of_experience DECIMAL(3,1) DEFAULT 0,
    is_primary_skill BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (employee_id, skill_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert Skills
INSERT INTO skills (skill_name, category, subcategory, is_technical) VALUES 
('JavaScript', 'Programming', 'Frontend', TRUE),
('React', 'Framework', 'Frontend', TRUE),
('Node.js', 'Runtime', 'Backend', TRUE),
('MongoDB', 'Database', 'NoSQL', TRUE),
('Python', 'Programming', 'Backend', TRUE),
('Machine Learning', 'AI/ML', 'Data Science', TRUE),
('TensorFlow', 'Framework', 'AI/ML', TRUE),
('Pandas', 'Library', 'Data Analysis', TRUE),
('Flutter', 'Framework', 'Mobile', TRUE),
('Dart', 'Programming', 'Mobile', TRUE),
('Firebase', 'Platform', 'Backend', TRUE),
('Android', 'Platform', 'Mobile', TRUE),
('iOS', 'Platform', 'Mobile', TRUE),
('Figma', 'Tool', 'Design', TRUE),
('Adobe XD', 'Tool', 'Design', TRUE),
('Sketch', 'Tool', 'Design', TRUE),
('Prototyping', 'Skill', 'Design', FALSE),
('User Research', 'Skill', 'UX', FALSE),
('Docker', 'Tool', 'DevOps', TRUE),
('Kubernetes', 'Platform', 'DevOps', TRUE),
('AWS', 'Cloud', 'Infrastructure', TRUE),
('Jenkins', 'Tool', 'CI/CD', TRUE),
('Terraform', 'Tool', 'Infrastructure', TRUE);

-- Insert Sample Employees
INSERT INTO employees (
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
    'KKBK0009988', 'WXYZD6789A', 'DevOps',
    'https://linkedin.com/in/davidbrown', 'https://github.com/davidbrown', 'Active'
);

-- Insert Employee Skills Relationships
INSERT INTO employee_skills (employee_id, skill_id, proficiency_level, years_of_experience, is_primary_skill) VALUES 
-- John Doe (Web Development)
(1, 1, 'Advanced', 5.0, TRUE), -- JavaScript
(1, 2, 'Advanced', 4.0, TRUE), -- React
(1, 3, 'Intermediate', 3.0, FALSE), -- Node.js
(1, 4, 'Intermediate', 2.0, FALSE), -- MongoDB
-- Jane Smith (Data Science)
(2, 5, 'Expert', 6.0, TRUE), -- Python
(2, 6, 'Advanced', 4.0, TRUE), -- Machine Learning
(2, 7, 'Advanced', 3.0, FALSE), -- TensorFlow
(2, 8, 'Expert', 5.0, TRUE), -- Pandas
-- Mike Johnson (Mobile Development)
(3, 9, 'Advanced', 3.0, TRUE), -- Flutter
(3, 10, 'Advanced', 3.0, TRUE), -- Dart
(3, 11, 'Intermediate', 2.0, FALSE), -- Firebase
(3, 12, 'Advanced', 4.0, TRUE), -- Android
(3, 13, 'Intermediate', 2.0, FALSE), -- iOS
-- Sarah Wilson (UI/UX Design)
(4, 14, 'Expert', 5.0, TRUE), -- Figma
(4, 15, 'Advanced', 4.0, FALSE), -- Adobe XD
(4, 16, 'Advanced', 3.0, FALSE), -- Sketch
(4, 17, 'Expert', 6.0, TRUE), -- Prototyping
(4, 18, 'Advanced', 4.0, TRUE), -- User Research
-- David Brown (DevOps)
(5, 19, 'Expert', 7.0, TRUE), -- Docker
(5, 20, 'Advanced', 5.0, TRUE), -- Kubernetes
(5, 21, 'Expert', 6.0, TRUE), -- AWS
(5, 22, 'Advanced', 4.0, FALSE), -- Jenkins
(5, 23, 'Advanced', 3.0, FALSE); -- Terraform

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Employee Indexes
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_domain ON employees(domain);
CREATE INDEX idx_employees_hire_date ON employees(hire_date);

-- Skills Indexes
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_name ON skills(skill_name);

-- Employee Skills Indexes
CREATE INDEX idx_employee_skills_employee ON employee_skills(employee_id);
CREATE INDEX idx_employee_skills_skill ON employee_skills(skill_id);
CREATE INDEX idx_employee_skills_proficiency ON employee_skills(proficiency_level);