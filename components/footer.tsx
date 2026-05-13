import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-lg font-bold">Math Hub Pro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hệ thống học tập thông minh giúp học sinh Việt Nam chinh phục các
              kỳ thi quan trọng với kho đề phong phú và công nghệ AI tiên tiến.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/kho-de"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kho đề thi
                </Link>
              </li>
              <li>
                <Link
                  href="/giai-toan"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Giải toán AI
                </Link>
              </li>
              <li>
                <Link
                  href="/tai-len"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Đóng góp đề thi
                </Link>
              </li>
              <li>
                <Link
                  href="/lich-su"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Lịch sử giải bài
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Môn học</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/kho-de?subject=toan"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Toán học
                </Link>
              </li>
              <li>
                <Link
                  href="/kho-de?subject=ly"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Vật lý
                </Link>
              </li>
              <li>
                <Link
                  href="/kho-de?subject=hoa"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Hóa học
                </Link>
              </li>
              <li>
                <Link
                  href="/kho-de?subject=anh"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tiếng Anh
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                support@mathhubpro.vn
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                1900-xxxx-xxx
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 Math Hub Pro. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
