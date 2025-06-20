// Em: src/components/NotificationBell.tsx
'use client'

import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

type Notificacao = {
  id: string;
  lida: boolean;
  notificacao: {
    id_notificacao: string;
    mensagem: string;
    dataEnvio: string;
  }
}

async function markAllAsRead() {
  // Esta função chamará uma futura API para marcar todas como lidas
  console.log("Marcando todas como lidas...");
  // await fetch('/api/notificacoes/mark-all-read', { method: 'POST' });
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notificacao[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await fetch('/api/notificacoes');
      if (response.ok) {
        const data: Notificacao[] = await response.json();
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.lida).length);
      }
    }
    fetchNotifications();
    // Opcional: Adicionar um intervalo para buscar novas notificações periodicamente
    // const interval = setInterval(fetchNotifications, 60000); // A cada 1 minuto
    // return () => clearInterval(interval);
  }, []);
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center p-0" variant="destructive">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Card>
            <CardHeader className='p-4'>
                <div className='flex justify-between items-center'>
                    <CardTitle className='text-lg'>Notificações</CardTitle>
                    {unreadCount > 0 && 
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            <CheckCheck className='mr-2 h-4 w-4'/>
                            Marcar todas como lidas
                        </Button>
                    }
                </div>
            </CardHeader>
            <CardContent className='p-0'>
                <div className='flex flex-col max-h-96 overflow-y-auto'>
                    {notifications.length > 0 ? (
                        notifications.map(item => (
                            <div key={item.id} className={`p-4 border-t ${!item.lida ? 'bg-accent' : ''}`}>
                                <p className="text-sm font-medium">{item.notificacao.mensagem}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(item.notificacao.dataEnvio).toLocaleString('pt-BR')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className='p-4 text-center text-sm text-muted-foreground'>Nenhuma notificação.</p>
                    )}
                </div>
            </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}