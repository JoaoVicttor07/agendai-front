"use client";

import { useState } from "react";
import { AppointmentsFilters, FilterValues } from "@/components/appointments-filters";
import { AppointmentsList } from "@/components/appointments-list";

export default function Appointments() {
    const [showResults, setShowResults] = useState(false);
    const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);

    const handleSearch = (filters: FilterValues) => {
      console.log("Filtros aplicados:", filters);
      setActiveFilters(filters);
      setShowResults(true);
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
              <p className="text-muted-foreground">Consulte e gerencie todos os agendamentos do sistema</p>
            </div>
          </div>
          <AppointmentsFilters onSearch={handleSearch} />
          <AppointmentsList showResults={showResults} filters={activeFilters} />
        </main>
    )
}