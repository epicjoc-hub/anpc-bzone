import React from "react";
import "./styles/globals.css";

export const metadata = {
  title: "ANPC Panel",
  description: "Admin panel for SRL, avize și sancțiuni",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
