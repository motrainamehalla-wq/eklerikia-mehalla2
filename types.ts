export type Language = 'ar' | 'en';

export interface SubjectScore {
  subjectCode: string;
  subjectNameAr: string;
  subjectNameEn: string;
  writtenScore: number;    // e.g. Max 70
  oralScore: number;       // e.g. Max 20
  researchScore: number;   // e.g. Max 10
  totalScore: number;      // sum of above (Max 100)
  maxScore: number;        // usually 100
  gradeAr: string;         // ممتاز، جيد جداً، جيد، مقبول، ضعيف
  gradeEn: string;         // Excellent, Very Good, Good, Pass, Fail
}

export interface Student {
  nationalId: string;      // 14-digit Egyptian National ID
  seatNumber: string;      // e.g. "M-4012"
  nameAr: string;
  nameEn: string;
  year: 1 | 2 | 3 | 4;     // Study year
  gender: 'M' | 'F';
  statusAr: string;        // منتظم / منتسب
  statusEn: string;        // Regular / Affiliated
  governorateAr: string;   // e.g. الغربية
  governorateEn: string;   // e.g. Gharbia
  scores: SubjectScore[];
  totalScore: number;      // sum of all total scores
  maxPossibleScore: number;// e.g. 700 (7 subjects * 100)
  overallPercentage: number; // (totalScore / maxPossibleScore) * 100
  overallGradeAr: string;
  overallGradeEn: string;
  rankInBatch: number;     // calculated rank in their specific year
}

export interface CourseDetail {
  code: string;
  nameAr: string;
  nameEn: string;
  professorAr?: string;
  professorEn?: string;
  descriptionAr: string;
  descriptionEn: string;
  hoursPerWeek: number;
  maxScore: number;
}

export interface AcademicYearCurriculum {
  year: 1 | 2 | 3 | 4;
  titleAr: string;
  titleEn: string;
  courses: CourseDetail[];
}

export interface EnrollmentApplication {
  id: string;
  fullName: string;            // اسم الطالب رباعي
  nationalId: string;          // الرقم القومي (14 رقماً)
  birthDate: string;           // تاريخ الميلاد
  phone: string;               // رقم الهاتف للتواصل
  countryGovernorate: string;  // البلد / المحافظة / المركز
  diocese: string;             // الإيبارشية
  church: string;              // الكنيسة
  qualification: string;       // المؤهل الدراسي
  ministryService?: string;    // الخدمة إن وجدت
  studyModality: 'regular' | 'affiliated'; // نظام الدراسة: منتظم / منتسب
  notes?: string;              // ملاحظات إضافية
  submittedAt: string;         // تاريخ التقديم
  status?: 'pending' | 'reviewed' | 'accepted';
}
