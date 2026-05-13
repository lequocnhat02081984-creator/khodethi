"use client";

import { ExamFile, SUBJECTS, GRADES } from "@/types";
import { Download, Calendar, FileText } from "lucide-react";
import { incrementDownload } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface ExamCardProps {
  exam: ExamFile;
  onDownload?: () => void;
}

const subjectColors: Record<string, string> = {
  toan: "bg-primary/10 text-primary",
  ly: "bg-accent/10 text-accent",
  hoa: "bg-success/10 text-success",
  sinh: "bg-warning/10 text-warning",
  anh: "bg-destructive/10 text-destructive",
  van: "bg-muted text-muted-foreground",
};

export function ExamCard({ exam, onDownload }: ExamCardProps) {
  const handleDownload = () => {
    incrementDownload(exam.id);
    onDownload?.();
    // In a real app, this would trigger the actual file download
    alert(`Tải xuống: ${exam.name}`);
  };

  const formattedDate = new Date(exam.uploadedAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="group relative flex flex-col p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
            subjectColors[exam.subject] || "bg-muted text-muted-foreground"
          )}
        >
          {SUBJECTS[exam.subject as keyof typeof SUBJECTS] || exam.subject}
        </div>
        <span className="text-xs text-muted-foreground">
          {GRADES[exam.grade as keyof typeof GRADES] || `Lớp ${exam.grade}`}
        </span>
      </div>

      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
        {exam.name}
      </h3>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" />
          {exam.fileSize}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          {exam.downloadCount.toLocaleString()} lượt tải
        </span>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Download className="h-4 w-4" />
          Tải xuống
        </button>
      </div>
    </div>
  );
}
