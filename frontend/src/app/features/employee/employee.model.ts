export interface Employee {
  employeeId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: 'Male' | 'Female' | 'Other';
  designationId?: number;
  hireDate: Date;
  salary: number;
  managerId?: number;
  projectId?: number;
  bankName: string;
  bankAccountNumber: string;
  ifscCode?: string;
  panNumber: string;
  photoUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills?: string;
  skillsString?: string;
  domain?: string;
  status?: 'Active' | 'Inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmployeeListItem {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  status: string;
}
