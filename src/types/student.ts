import { BaseRecord } from "@refinedev/core";

export type StudentRecord = BaseRecord & {
  id: number;

  student_code: string;
  full_name: string;
  email: string;
  phone: string;
  gender: "Nam" | "Nữ" | string;

  date_of_birth: string; // ISO date
  citizen_id: string;
  address: string;

  current_education: {
    university_major: string;
    class_name: string;
    enrollment_year: number;
    study_mode: string;
    status: string;
    current_semester: number;
  };

  previous_education: {
    college_name: string;
    college_major: string;
    graduation_year: number;
    college_gpa: number;
    degree_rank: string;
    graduation_certificate_id: string;
  };

  transfer_info: {
    exempted_credits: number;
    required_credits: number;
    admission_method: string;
  };

  created_at: string;
};
