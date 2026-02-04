export interface IStudent {
    id: number;
    student_code: string;
    full_name: string;
    email: string;
    phone: string;
    gender: "Nam" | "Nữ" | "Khác";
    address: string;
    
    current_education: {
        university_major: string;
        class_name: string;
        enrollment_year: number;
        study_mode: string;
        status: "Đang học" | "Bảo lưu" | "Thôi học";
        current_semester: number;
    };

    previous_education: {
        college_name: string;
        college_major: string;
        graduation_year: number;
        college_gpa: number;
        degree_rank: string;
    };

    transfer_info: {
        exempted_credits: number;
        required_credits: number;
    };
}