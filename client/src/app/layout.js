import { Geist, Geist_Mono, Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import BootstrapClient from "../components/BootstrapClient";
import { AuthProvider } from "@/context/authContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "UserVault",
  icons: {
    icon: "./vault-img.ico"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className} data-scroll-behavior="smooth">
        <AuthProvider>
          {children}
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
