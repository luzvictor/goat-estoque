// Em: src/components/NotificationBell.tsx
'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

type Notificacao = {
  id: string;
  lida: boolean;
  notificacao: {
    id_notificacao: string;
    mensagem: string;
    dataEnvio: string;
    link?: string | null; 
  }
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notificacao[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const response = await fetch('/api/notificacoes');
    if (response.ok) {
      const data: Notificacao[] = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.lida).length);
    }
  };
  
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval); 
  }, []);

  const handleMarkAsRead = async (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, lida: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));

    await fetch(`/api/notificacoes/${notificationId}/read`, { method: 'POST' });
  };

  const handleMarkAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, lida: true })));
    setUnreadCount(0);
    await fetch('/api/notificacoes/read-all', { method: 'POST' });
  };

  return (
    <Popover>
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
      <PopoverContent className="w-96 p-0">
        <Card className='border-none'>
            <CardHeader className='p-4'>
                <div className='flex justify-between items-center'>
                    <CardTitle className='text-lg'>Notificações</CardTitle>
                    {unreadCount > 0 && 
                        <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className='text-xs'>
                            <CheckCheck className='mr-2 h-4 w-4'/>
                            Marcar todas como lidas
                        </Button>
                    }
                </div>
            </CardHeader>
            <CardContent className='p-0'>
                <div className='flex flex-col max-h-96 overflow-y-auto'>
                    {notifications.length > 0 ? (
                        notifications.map(item => {
                          const content = (
                            <div
                              className={cn("p-4 border-t hover:bg-muted/50", !item.lida && 'bg-accent/50')}
                              onClick={() => !item.lida && handleMarkAsRead(item.id)}
                            >
                                <p className="text-sm font-medium">{item.notificacao.mensagem}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(item.notificacao.dataEnvio).toLocaleString('pt-BR')}
                                </p>
                            </div>
                          );

                          return item.notificacao.link ? (
                            <Link href={item.notificacao.link} key={item.id} className="cursor-pointer">
                              {content}
                            </Link>
                          ) : (
                            <div key={item.id}>{content}</div>
                          );
                        })
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