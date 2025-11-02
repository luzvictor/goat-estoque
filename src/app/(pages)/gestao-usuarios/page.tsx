'use client';

// 1. Imports atualizados: Trocamos 'react-query' por 'useState' e 'useEffect'
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Role } from '@prisma/client'; // Assumindo que os tipos do Prisma estão disponíveis
import { Badge } from '@/components/ui/badge';
import { Loader2, UserPlus, Users } from 'lucide-react';

// Tipagem para o usuário (sem senha)
type Usuario = {
  id_usuario: string;
  nome: string;
  email: string;
  role: Role;
}

// --- Funções de API (sem alteração) ---

// Função para buscar os usuários
async function fetchUsuariosAPI(): Promise<Usuario[]> {
    const res = await fetch('/api/usuarios');
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Falha ao buscar usuários.');
    }
    return res.json();
}

// Função para criar um usuário
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

// --- Componente ---

export default function GestaoUsuariosPage() {
  
  // 2. State para o formulário (igual)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState<Role>(Role.USUARIO);

  // 3. State para os dados e carregamento (substituindo useQuery)
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 4. Função para buscar dados (similar ao seu fetchAllData)
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

  // 5. useEffect para buscar dados na montagem do componente
  useEffect(() => {
    fetchUsuarios();
  }, []); // O array vazio [] faz com que rode apenas uma vez

  // Handler para o submit do formulário (substituindo useMutation)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senha.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres.");
        return;
    }

    setIsSubmitting(true);
    try {
        const novoUsuario = await criarUsuarioAPI({ nome, email, senha, role });
        
        // Sucesso!
        toast.success(`Usuário "${novoUsuario.nome}" criado com sucesso!`);
        
        // Reseta o formulário
        setNome('');
        setEmail('');
        setSenha('');
        setRole(Role.USUARIO);
        
        // 6. Atualiza a lista de usuários manualmente
        await fetchUsuarios(); 

    } catch (error: any) {
        // Erro!
        toast.error(error.message || 'Erro ao criar usuário.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gestão de Usuários</h1>
      <p className="text-muted-foreground">
        Crie, edite e gerencie as permissões dos usuários do sistema.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna 1: Formulário de Criação */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Criar Novo Usuário
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
                <Input id="senha" type="password" placeholder="Mínimo 6 caracteres" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Permissão</Label>
                <Select value={role} onValueChange={(value: Role) => setRole(value)}>
                    <SelectTrigger id="role"><SelectValue placeholder="Selecione a permissão" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Role.USUARIO}>Usuário Padrão</SelectItem>
                        <SelectItem value={Role.ADM}>Administrador</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              {/* 7. Atualiza os botões de loading */}
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

        {/* Coluna 2: Lista de Usuários */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Usuários Cadastrados
            </CardTitle>
            <CardDescription>
                Lista de todos os usuários no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Permissão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* 8. Atualiza os estados de carregamento e erro */}
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