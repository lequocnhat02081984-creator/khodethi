import { ExamFile, SolveHistory } from "@/types";

const EXAMS_KEY = "mathhub_exams";
const HISTORY_KEY = "mathhub_history";

// Sample exam data
const sampleExams: ExamFile[] = [
  {
    id: "1",
    name: "Đề thi thử THPT QG 2024 - Toán học",
    subject: "toan",
    grade: "12",
    year: "2024",
    uploadedAt: "2024-01-15T10:00:00Z",
    downloadCount: 1250,
    fileSize: "2.5 MB",
  },
  {
    id: "2",
    name: "Đề kiểm tra giữa kỳ 1 - Vật lý",
    subject: "ly",
    grade: "11",
    year: "2024",
    uploadedAt: "2024-02-20T14:30:00Z",
    downloadCount: 890,
    fileSize: "1.8 MB",
  },
  {
    id: "3",
    name: "Đề thi học kỳ 2 - Hóa học",
    subject: "hoa",
    grade: "10",
    year: "2024",
    uploadedAt: "2024-03-10T09:15:00Z",
    downloadCount: 756,
    fileSize: "2.1 MB",
  },
  {
    id: "4",
    name: "Đề ôn tập cuối năm - Toán học",
    subject: "toan",
    grade: "11",
    year: "2024",
    uploadedAt: "2024-04-05T16:45:00Z",
    downloadCount: 1100,
    fileSize: "3.2 MB",
  },
  {
    id: "5",
    name: "Đề thi thử Đại học - Vật lý",
    subject: "ly",
    grade: "12",
    year: "2024",
    uploadedAt: "2024-05-12T11:20:00Z",
    downloadCount: 2340,
    fileSize: "2.8 MB",
  },
  {
    id: "6",
    name: "Đề kiểm tra 15 phút - Hóa học",
    subject: "hoa",
    grade: "11",
    year: "2024",
    uploadedAt: "2024-06-01T08:00:00Z",
    downloadCount: 450,
    fileSize: "0.8 MB",
  },
  {
    id: "7",
    name: "Đề thi HSG Tỉnh - Toán học",
    subject: "toan",
    grade: "12",
    year: "2024",
    uploadedAt: "2024-06-15T13:30:00Z",
    downloadCount: 3200,
    fileSize: "4.1 MB",
  },
  {
    id: "8",
    name: "Đề thi THPT QG năm 2023 - Tiếng Anh",
    subject: "anh",
    grade: "12",
    year: "2023",
    uploadedAt: "2023-07-10T10:00:00Z",
    downloadCount: 5600,
    fileSize: "3.5 MB",
  },
];

export function getExams(): ExamFile[] {
  if (typeof window === "undefined") return sampleExams;
  
  const stored = localStorage.getItem(EXAMS_KEY);
  if (!stored) {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(sampleExams));
    return sampleExams;
  }
  return JSON.parse(stored);
}

export function addExam(exam: Omit<ExamFile, "id" | "uploadedAt" | "downloadCount">): ExamFile {
  const exams = getExams();
  const newExam: ExamFile = {
    ...exam,
    id: crypto.randomUUID(),
    uploadedAt: new Date().toISOString(),
    downloadCount: 0,
  };
  exams.unshift(newExam);
  localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
  return newExam;
}

export function incrementDownload(id: string): void {
  const exams = getExams();
  const exam = exams.find((e) => e.id === id);
  if (exam) {
    exam.downloadCount++;
    localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
  }
}

export function getHistory(): SolveHistory[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function addToHistory(item: Omit<SolveHistory, "id" | "solvedAt">): SolveHistory {
  const history = getHistory();
  const newItem: SolveHistory = {
    ...item,
    id: crypto.randomUUID(),
    solvedAt: new Date().toISOString(),
  };
  history.unshift(newItem);
  // Keep only last 50 items
  const trimmed = history.slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  return newItem;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
