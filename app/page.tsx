import Link from "next/link";
import {
  BookOpen,
  Brain,
  Upload,
  History,
  ChevronRight,
  Sparkles,
  Users,
  FileText,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Kho đề phong phú",
    description:
      "Hàng nghìn đề thi từ các trường THPT trên cả nước, được phân loại theo môn học và khối lớp.",
    href: "/kho-de",
    color: "bg-primary",
  },
  {
    icon: Brain,
    title: "Giải toán bằng AI",
    description:
      "Công nghệ AI tiên tiến giúp giải và hướng dẫn chi tiết các bài toán phức tạp.",
    href: "/giai-toan",
    color: "bg-accent",
  },
  {
    icon: Upload,
    title: "Đóng góp đề thi",
    description:
      "Chia sẻ đề thi của bạn để cùng xây dựng kho tài liệu học tập chất lượng.",
    href: "/tai-len",
    color: "bg-success",
  },
  {
    icon: History,
    title: "Lịch sử học tập",
    description:
      "Theo dõi tiến trình học tập và xem lại các bài toán đã giải trước đó.",
    href: "/lich-su",
    color: "bg-warning",
  },
];

const stats = [
  { value: "10,000+", label: "Đề thi", icon: FileText },
  { value: "50,000+", label: "Học sinh", icon: Users },
  { value: "100,000+", label: "Bài giải", icon: CheckCircle },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230ea5e9%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Nền tảng học tập thông minh
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Chinh phục{" "}
              <span className="text-primary">mọi bài toán</span> với sức mạnh
              của AI
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              Math Hub Pro cung cấp kho đề thi phong phú và công nghệ AI tiên
              tiến, giúp học sinh Việt Nam tự tin bước vào các kỳ thi quan
              trọng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kho-de"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Khám phá kho đề
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/giai-toan"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
              >
                <Brain className="h-5 w-5" />
                Thử giải toán AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Tính năng nổi bật
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tất cả những gì bạn cần để học tập hiệu quả, được tích hợp trong
              một nền tảng duy nhất.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} text-white mb-4`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              Sẵn sàng nâng cao điểm số?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Bắt đầu hành trình học tập thông minh ngay hôm nay với Math Hub
              Pro.
            </p>
            <Link
              href="/giai-toan"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
            >
              <Brain className="h-5 w-5" />
              Bắt đầu miễn phí
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
