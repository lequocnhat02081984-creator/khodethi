export interface ExamFile {
  id: string;
  name: string;
  subject: string;
  grade: string;
  year: string;
  uploadedAt: string;
  downloadCount: number;
  fileSize: string;
  fileUrl?: string;
}

export interface SolveHistory {
  id: string;
  problem: string;
  solution: string;
  solvedAt: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export type Subject = "toan" | "ly" | "hoa" | "sinh" | "anh" | "van";
export type Grade = "10" | "11" | "12";

export const SUBJECTS: Record<Subject, string> = {
  toan: "Toán học",
  ly: "Vật lý",
  hoa: "Hóa học",
  sinh: "Sinh học",
  anh: "Tiếng Anh",
  van: "Ngữ văn",
};

export const GRADES: Record<Grade, string> = {
  "10": "Lớp 10",
  "11": "Lớp 11",
  "12": "Lớp 12",
};
