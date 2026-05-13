"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  CheckCircle,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { addExam } from "@/lib/storage";
import { SUBJECTS, GRADES } from "@/types";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File không được lớn hơn 10MB");
        return;
      }
      setFile(selectedFile);
      setError("");
      if (!name) {
        setName(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!file || !name || !subject || !grade) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add to local storage
    addExam({
      name,
      subject,
      grade,
      year,
      fileSize: formatFileSize(file.size),
    });

    setIsUploading(false);
    setUploadSuccess(true);

    // Redirect after success
    setTimeout(() => {
      router.push("/kho-de");
    }, 2000);
  };

  const removeFile = () => {
    setFile(null);
    setName("");
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Tải lên thành công!
          </h2>
          <p className="text-muted-foreground">
            Đề thi của bạn đã được thêm vào kho đề
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-success/5 via-background to-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success text-success-foreground">
              <Upload className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Đóng góp đề thi
              </h1>
              <p className="text-muted-foreground">
                Chia sẻ đề thi để cùng xây dựng kho tài liệu chất lượng
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Tải file lên
              </h2>

              {file ? (
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-foreground font-medium mb-1">
                    Kéo thả file hoặc click để chọn
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, Word, Excel, PowerPoint, hoặc ảnh (tối đa 10MB)
                  </p>
                </label>
              )}
            </div>

            {/* Exam Details */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Thông tin đề thi
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Tên đề thi <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Đề thi thử THPT QG 2024 - Toán học"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Subject & Grade */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Môn học <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Chọn môn học</option>
                      {Object.entries(SUBJECTS).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="grade"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Lớp <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="grade"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Chọn lớp</option>
                      {Object.entries(GRADES).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Year */}
                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Năm
                  </label>
                  <input
                    id="year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="VD: 2024"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading || !file}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors",
                isUploading || !file
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-success text-success-foreground hover:bg-success/90"
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Đang tải lên...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Tải lên đề thi
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
