import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nação Rubro-Negra | Loja Oficial",
  description:
    "A loja oficial do maior clube do Brasil. Camisas, agasalhos, acessórios e muito mais com a qualidade que o torcedor merece.",
  keywords: ["Flamengo", "loja", "camisas", "futebol", "rubro-negro"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
