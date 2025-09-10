"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { HORARIOS } from "../../_lib/constants";
import { dateToISO, formatDisplayDate } from "../../_lib/utils";
import React from "react";

interface Props {
  dateISO: string;
  hour: string;
  setDate: (iso: string) => void;
  setHour: (h: string) => void;
  attemptedNext: boolean;
  step: number;
}

export function DateTimeStep({ dateISO, hour, setDate, setHour, attemptedNext, step }: Props) {
  const dateFromForm = dateISO ? new Date(dateISO + "T00:00:00") : undefined;
  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateMonth, setDateMonth] = React.useState<Date | undefined>(dateFromForm);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Data</label>
          <div className="relative flex gap-2">
            <Input
              readOnly
              value={formatDisplayDate(dateFromForm)}
              placeholder="dd/mm/aaaa"
              className="bg-background pr-10 cursor-pointer"
              onClick={() => setDateOpen(true)}
              onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setDateOpen(true); } }}
            />
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button id="date-picker" variant="ghost" type="button" className="absolute top-1/2 right-2 size-7 -translate-y-1/2">
                  <CalendarIcon className="size-4" />
                  <span className="sr-only">Selecionar data</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start" sideOffset={4}>
                <Calendar
                  mode="single"
                  selected={dateFromForm}
                  captionLayout="dropdown"
                  month={dateMonth}
                  onMonthChange={setDateMonth}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                  onSelect={(date) => {
                    if (!date) return;
                    setDate(dateToISO(date));
                    setHour("");
                    setDateMonth(date);
                    setDateOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          {attemptedNext && step === 2 && !dateISO && (
            <p className="mt-1 text-xs text-red-500">Selecione uma data.</p>
          )}
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-sm font-medium">Horário</label>
          <div className="grid grid-cols-3 gap-2">
            {HORARIOS.map((h) => {
              const selected = hour === h;
              const disabled = !dateISO;
              return (
                <Button key={h} type="button" size="sm" variant={selected ? "default" : "outline"} disabled={disabled} onClick={() => setHour(h)}>
                  {h}
                </Button>
              );
            })}
          </div>
          {attemptedNext && step === 2 && dateISO && !hour && (
            <p className="mt-1 text-xs text-red-500">Selecione um horário.</p>
          )}
        </div>
      </div>
    </div>
  );
}
