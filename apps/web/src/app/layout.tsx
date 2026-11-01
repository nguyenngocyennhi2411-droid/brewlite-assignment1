import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrewLite | Cà phê ngon, đặt nhanh mỗi ngày",
  description: "BrewLite – ứng dụng đặt đồ uống trực tuyến. Xem menu và giá dễ dàng.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi"><body>{children}</body></html>
  );
}
