import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito, Nunito_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digido Airlines",
  description:
    "Website created by Giorgi Imnaishvili a.k.a the best software engineer in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(nunito.variable, nunitoSans.variable)}>
        {children}
      </body>
    </html>
  );
}
