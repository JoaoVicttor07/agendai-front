"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  UserPlus,
  XCircle,
  Clock,
  Check,
  CheckCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "appointment" | "cancellation" | "absent" | "new_patient";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Novo agendamento",
    description:
      "Maria Silva agendou consulta de Psicologia para amanhã às 14:00",
    time: "Há 5 minutos",
    read: false,
  },
  {
    id: "2",
    type: "cancellation",
    title: "Agendamento cancelado",
    description:
      "João Santos cancelou a consulta de Nutrição marcada para hoje às 16:00",
    time: "Há 1 hora",
    read: false,
  },
  {
    id: "3",
    type: "new_patient",
    title: "Novo paciente cadastrado",
    description:
      "",
    time: "Há 2 horas",
    read: false,
  },
  {
    id: "4",
    type: "absent",
    title: "Paciente ausente",
    description: "O paciente Carlos não compareceu à consulta de hoje às 10:00",
    time: "Há 3 horas",
    read: true,
  }
];

const notificationIcons = {
  appointment: Calendar,
  cancellation: XCircle,
  new_patient: UserPlus,
  absent: Clock,
};

const notificationColors = {
  appointment: "text-blue-500 bg-blue-500/10",
  cancellation: "text-red-500 bg-red-500/10",
  new_patient: "text-green-500 bg-green-500/10",
  absent: "text-amber-500 bg-amber-500/10",
};

export function NotificationsPanel() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover:bg-accent">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-xs flex items-center justify-center text-white font-medium">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Abrir notificações</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md px-4">
        <SheetHeader className="space-y-3 border-b py-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              Notificações
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
          <SheetDescription className="text-left">
            {unreadCount > 0 ? (
              <>
                Você tem{" "}
                <span className="font-semibold text-foreground">
                  {unreadCount}{" "}
                  {unreadCount === 1
                    ? "notificação não lida"
                    : "notificações não lidas"}
                </span>
              </>
            ) : (
              "Você não tem notificações não lidas"
            )}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] mt-6">
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              const colorClass = notificationColors[notification.type];

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "group relative p-4 rounded-lg border transition-all hover:shadow-md",
                    notification.read
                      ? "bg-card border-border opacity-60 hover:opacity-100"
                      : "bg-accent/50 border-primary/20 shadow-sm"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  {!notification.read && (
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                        colorClass
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-foreground leading-tight">
                          {notification.title}
                        </h4>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notification.description}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        {/* {!notification.read && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0 h-5"
                          >
                            Nova
                          </Badge>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 absolute bottom-2 right-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <Check className="w-3 h-3" />
                        
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Nenhuma notificação
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Você não tem notificações no momento. Quando houver novidades,
                elas aparecerão aqui.
              </p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
