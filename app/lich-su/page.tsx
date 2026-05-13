"use client";

import { useState, useEffect } from "react";
import { History, Trash2, Eye, X, Brain, Clock } from "lucide-react";
import { getHistory, clearHistory } from "@/lib/storage";
import { SolveHistory } from "@/types";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [history, setHistory] = useState<SolveHistory[]>([]);
  const [selectedItem, setSelectedItem] = useState<SolveHistory | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    setShowConfirmClear(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-warning/5 via-background to-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-warning-foreground">
                <History className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Lịch sử giải bài
                </h1>
                <p className="text-muted-foreground">
                  {history.length} bài toán đã giải
                </p>
              </div>
            </div>

            {history.length > 0 && (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Xóa tất cả
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {history.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(item.solvedAt)}
                  </span>
                </div>

                <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                  {item.problem}
                </h3>

                {item.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={item.imageUrl}
                      alt="Problem"
                      className="max-h-24 rounded-lg border border-border"
                    />
                  </div>
                )}

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {item.solution.slice(0, 150)}...
                </p>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Chưa có lịch sử
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Các bài toán bạn giải sẽ được lưu ở đây để bạn có thể xem lại bất
              cứ lúc nào
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Chi tiết lời giải</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Bài toán
                </h4>
                <p className="text-foreground">{selectedItem.problem}</p>
              </div>

              {selectedItem.imageUrl && (
                <div className="mb-4">
                  <img
                    src={selectedItem.imageUrl}
                    alt="Problem"
                    className="max-h-48 rounded-lg border border-border"
                  />
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Lời giải
                </h4>
                <div className="p-4 rounded-lg bg-secondary/50 whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                  {selectedItem.solution}
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Giải lúc: {formatDate(selectedItem.solvedAt)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card rounded-xl border border-border p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Xác nhận xóa
            </h3>
            <p className="text-muted-foreground mb-6">
              Bạn có chắc chắn muốn xóa tất cả lịch sử giải bài? Hành động này
              không thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
