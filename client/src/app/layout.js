'use client'
import { Geist, Geist_Mono, Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import BootstrapClient from "../components/BootstrapClient";
import { AuthProvider } from "@/context/authContext";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} data-scroll-behavior="smooth">
        <AuthProvider>
          {children}
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
