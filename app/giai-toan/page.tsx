"use client";

import { useState, useRef } from "react";
import {
  Brain,
  Upload,
  Send,
  Loader2,
  ImageIcon,
  X,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { addToHistory } from "@/lib/storage";
import { cn } from "@/lib/utils";

export default function AISolverPage() {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSolve = async () => {
    if (!problem.trim() && !imagePreview) return;

    setIsLoading(true);
    setSolution("");

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock solution - in a real app, this would call an AI API
    const mockSolution = generateMockSolution(problem);
    setSolution(mockSolution);

    // Save to history
    addToHistory({
      problem: problem || "Bài toán từ hình ảnh",
      solution: mockSolution,
      imageUrl: imagePreview || undefined,
    });

    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleProblems = [
    "Giải phương trình: x² - 5x + 6 = 0",
    "Tính đạo hàm của f(x) = x³ + 2x² - 5x + 1",
    "Tìm giá trị lớn nhất của hàm số y = -x² + 4x - 3",
    "Giải hệ phương trình: 2x + y = 5, x - y = 1",
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Giải toán bằng AI
              </h1>
              <p className="text-muted-foreground">
                Nhập bài toán hoặc tải ảnh lên để nhận lời giải chi tiết
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Nhập bài toán
              </h2>

              {/* Text Input */}
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Nhập bài toán của bạn ở đây...

Ví dụ:
- Giải phương trình: x² - 5x + 6 = 0
- Tính tích phân: ∫(2x + 1)dx từ 0 đến 2
- Chứng minh: a² + b² >= 2ab"
                className="w-full h-40 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />

              {/* Image Upload */}
              <div className="mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />

                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Uploaded problem"
                      className="max-h-48 rounded-lg border border-border"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors"
                  >
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Hoặc tải ảnh bài toán lên
                    </span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSolve}
                disabled={isLoading || (!problem.trim() && !imagePreview)}
                className={cn(
                  "mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors",
                  isLoading || (!problem.trim() && !imagePreview)
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Đang giải...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Giải bài toán
                  </>
                )}
              </button>
            </div>

            {/* Example Problems */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Thử với các ví dụ:
              </h3>
              <div className="flex flex-wrap gap-2">
                {exampleProblems.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setProblem(example)}
                    className="px-3 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                Lời giải
              </h2>
              {solution && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-success" />
                      Đã sao chép
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Sao chép
                    </>
                  )}
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                </div>
                <p className="mt-4 text-muted-foreground">
                  AI đang phân tích bài toán...
                </p>
              </div>
            ) : solution ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {solution}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Brain className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Sẵn sàng giải toán
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Nhập bài toán hoặc tải ảnh lên bên trái để nhận lời giải chi
                  tiết từ AI
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateMockSolution(problem: string): string {
  if (problem.includes("x²") && problem.includes("= 0")) {
    return `📚 PHÂN TÍCH BÀI TOÁN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Đây là phương trình bậc 2 dạng ax² + bx + c = 0

🔢 BƯỚC 1: Xác định hệ số
Từ phương trình: x² - 5x + 6 = 0
Ta có: a = 1, b = -5, c = 6

🔢 BƯỚC 2: Tính Delta
Δ = b² - 4ac
Δ = (-5)² - 4(1)(6)
Δ = 25 - 24 = 1 > 0

📝 BƯỚC 3: Giải phương trình
Vì Δ > 0 nên phương trình có 2 nghiệm phân biệt:

x₁ = (-b + √Δ) / 2a = (5 + 1) / 2 = 3
x₂ = (-b - √Δ) / 2a = (5 - 1) / 2 = 2

✅ KẾT QUẢ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phương trình có 2 nghiệm: x = 2 hoặc x = 3

💡 KIỂM TRA
• Với x = 2: 2² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓
• Với x = 3: 3² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓`;
  }

  if (problem.includes("đạo hàm") || problem.includes("f(x)")) {
    return `📚 PHÂN TÍCH BÀI TOÁN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tính đạo hàm của hàm đa thức

🔢 BƯỚC 1: Áp dụng công thức đạo hàm
Công thức: (xⁿ)' = n·xⁿ⁻¹

🔢 BƯỚC 2: Tính từng số hạng
• (x³)' = 3x²
• (2x²)' = 4x
• (-5x)' = -5
• (1)' = 0

✅ KẾT QUẢ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
f'(x) = 3x² + 4x - 5`;
  }

  return `📚 PHÂN TÍCH BÀI TOÁN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bài toán: ${problem || "Bài toán từ hình ảnh"}

🔢 BƯỚC 1: Phân tích đề bài
Đây là dạng bài toán cần áp dụng các công thức và định lý phù hợp.

🔢 BƯỚC 2: Lập kế hoạch giải
Xác định phương pháp giải phù hợp với dạng bài.

🔢 BƯỚC 3: Thực hiện giải
[Chi tiết lời giải sẽ được hiển thị ở đây]

✅ KẾT QUẢ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Kết quả cuối cùng]

💡 GHI CHÚ
Đây là bản demo. Để có lời giải chi tiết hơn, vui lòng kết nối với AI API thực tế.`;
}
