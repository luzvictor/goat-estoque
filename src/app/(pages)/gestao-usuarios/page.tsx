'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Role } from '@prisma/client'; 
import { Badge } from '@/components/ui/badge';
import { Loader2, UserPlus, Users, Check, X } from 'lucide-react'; 
import { passwordRules, passwordErrorMessages } from '@/lib/validations';
import { ContextHelp } from "@/components/ui/ContextHelp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Usuario = {
  id_usuario: string;
  nome: string;
  email: string;
  role: Role;
}


async function fetchUsuariosAPI(): Promise<Usuario[]> {
    const res = await fetch('/api/usuarios');
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Falha ao buscar usuários.');
    }
    return res.json();
}

async function criarUsuarioAPI(novoUsuario: any) {
    const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Falha ao criar usuário.');
    }
    return res.json();
}

type PasswordValidationState = {
  [key in keyof typeof passwordRules]: boolean;
};

const PasswordStrengthIndicator: React.FC<{ validation: PasswordValidationState }> = ({ validation }) => {
  if (Object.keys(validation).length === 0) {
    return null;
  }

  return (
    <div className="p-3 bg-muted/50 rounded-md space-y-1 mt-2 border">
      {Object.entries(passwordRules).map(([key, rule]) => (
        <div 
          key={key} 
          className={`flex items-center text-sm ${validation[key as keyof PasswordValidationState] ? 'text-green-600' : 'text-muted-foreground'}`}
        >
          {validation[key as keyof PasswordValidationState] ? (
            <Check className="h-4 w-4 mr-2 shrink-0" />
          ) : (
            <X className="h-4 w-4 mr-2 shrink-0" />
          )}
          {passwordErrorMessages[key as keyof typeof passwordErrorMessages]}
        </div>
      ))}
    </div>
  );
};


export default function GestaoUsuariosPage() {
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState<Role>(Role.USUARIO);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [passwordValidation, setPasswordValidation] = useState<PasswordValidationState>({} as PasswordValidationState);

  const fetchUsuarios = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const data = await fetchUsuariosAPI();
        setUsuarios(data);
    } catch (err: any) {
        setError(err.message);
        toast.error("Erro ao carregar usuários", { description: err.message });
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []); 

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setSenha(newPassword);

      if (newPassword === '') {
        setPasswordValidation({} as PasswordValidationState);
        return;
      }

      const newValidationState = { ...passwordValidation };
      for (const key in passwordRules) {
        const ruleKey = key as keyof typeof passwordRules;
        newValidationState[ruleKey] = passwordRules[ruleKey].test(newPassword);
      }
      setPasswordValidation(newValidationState);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const isPasswordValid = Object.values(passwordValidation).length > 0 && 
                              Object.values(passwordValidation).every(v => v === true);

      if (!isPasswordValid) {
        toast.error("A senha não atende a todos os requisitos de segurança.");
        return;
      }

      setIsSubmitting(true);
      try {
        const novoUsuario = await criarUsuarioAPI({ nome, email, senha, role });
        
        toast.success(`Usuário "${novoUsuario.nome}" criado com sucesso!`);
        
        setNome('');
        setEmail('');
        setSenha('');
        setRole(Role.USUARIO);
        setPasswordValidation({} as PasswordValidationState);
        
        await fetchUsuarios(); 

      } catch (error: any) {
        toast.error(error.message || 'Erro ao criar usuário.');
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Usuários</h1>
        <ContextHelp
          title="Gestão de Usuários"
          content="Esta página é usada para criar novos usuários e visualizar os usuários existentes no sistema. Apenas Administradores podem acessar esta tela."
        />
      </div>
      <p className="text-muted-foreground">
        Crie, edite e gerencie as permissões dos usuários do sistema.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Criar Novo Usuário
              <ContextHelp
                title="Criar Usuário"
                content="Todos os campos são obrigatórios. A senha deve atender aos requisitos de segurança."
              />
            </CardTitle>
            <CardDescription>
              Preencha os dados para cadastrar um novo usuário.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ... (o formulário é idêntico) ... */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input 
                  id="senha" 
                  type="password" 
                  placeholder="••••••••" 
                  value={senha} 
                  onChange={handlePasswordChange} 
                  required 
                />
                <PasswordStrengthIndicator validation={passwordValidation} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-1.5">
                  Permissão
                  <ContextHelp
                    title="Níveis de Permissão"
                    content={
                      <ul className="list-disc pl-4 space-y-1">
                        <li><b>Usuário Padrão:</b> Pode ver/criar pedidos, produtos e clientes.</li>
                        <li><b>Administrador:</b> Tem acesso total, incluindo configurações e gestão de usuários.</li>
                      </ul>
                    }
                  />
                </Label>
                <Select value={role} onValueChange={(value: Role) => setRole(value)}>
                    <SelectTrigger id="role"><SelectValue placeholder="Selecione a permissão" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Role.USUARIO}>Usuário Padrão</SelectItem>
                        <SelectItem value={Role.ADM}>Administrador</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Criando..." : "Criar Usuário"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuários Cadastrados
              <ContextHelp content="Lista de todos os usuários com acesso ao sistema." />
            </CardTitle>
            <CardDescription>
                Lista de todos os usuários no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">Nome</TooltipTrigger>
                      <TooltipContent><p>Nome completo do usuário.</p></TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead>
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">Email</TooltipTrigger>
                      <TooltipContent><p>Email de login do usuário.</p></TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead>
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">Permissão</TooltipTrigger>
                      <TooltipContent><p>Nível de acesso do usuário no sistema.</p></TooltipContent>
                    </Tooltip>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">Carregando...</TableCell>
                    </TableRow>
                )}
                {error && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center text-destructive">
                            Erro ao carregar usuários: {error}
                        </TableCell>
                    </TableRow>
                )}
                {!isLoading && !error && usuarios.map(user => (
                  <TableRow key={user.id_usuario}>
                    <TableCell className="font-medium">{user.nome}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <Badge variant={user.role === Role.ADM ? 'destructive' : 'outline'}>
                            {user.role}
                        </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}