"use client";

import { useState, useMemo } from "react";
import { ExamCard } from "@/components/exam-card";
import { getExams } from "@/lib/storage";
import { SUBJECTS, GRADES } from "@/types";
import { Search, Filter, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExamRepositoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const exams = useMemo(() => getExams(), [refreshKey]);

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch = exam.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSubject =
        selectedSubject === "all" || exam.subject === selectedSubject;
      const matchesGrade =
        selectedGrade === "all" || exam.grade === selectedGrade;
      return matchesSearch && matchesSubject && matchesGrade;
    });
  }, [exams, searchQuery, selectedSubject, selectedGrade]);

  const handleDownload = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Kho đề thi</h1>
              <p className="text-muted-foreground">
                {exams.length.toLocaleString()} đề thi trong kho
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm đề thi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Subject Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">Tất cả môn</option>
                {Object.entries(SUBJECTS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Filter */}
            <div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">Tất cả lớp</option>
                {Object.entries(GRADES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => {
              setSelectedSubject("all");
              setSelectedGrade("all");
              setSearchQuery("");
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedSubject === "all" && selectedGrade === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Tất cả
          </button>
          {Object.entries(SUBJECTS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedSubject(key)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedSubject === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredExams.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} onDownload={handleDownload} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Không tìm thấy đề thi
            </h3>
            <p className="text-muted-foreground">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
