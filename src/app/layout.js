import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata = {
  title: "Mascota virtual",
  description: "Creado para la hackaton 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="font-jersey h-full w-full">
        {children}
      </body>
    </html>
  );
}
