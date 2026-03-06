// src/app/students/layout.tsx
import React from "react";
import Header from "@/shared/ui/Header";
import Footer from "@/shared/ui/Footer";

export default function ActorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routes = [
    { name: "Servicios", path: "/students/services" },
    { name: "Préstamos", path: "/students/loans" },
    { name: "Mis Reservas", path: "/students/reservations" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {children}{" "}
        {/* The current page will be rendered here (e.g., students/page.tsx). */}
      </main>
      <Footer />
    </div>
  );
}
//      <Header routes={routes} />
