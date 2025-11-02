import { prisma } from "@/lib/prisma";
import { getUsuarioDaSessao } from "@/lib/session";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
    const usuarioLogado = await getUsuarioDaSessao();
    if (usuarioLogado?.role !== Role.ADM) {
         return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
    }

    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id_usuario: true,
                nome: true,
                email: true,
                role: true,
            },
            orderBy: {
                nome: 'asc'
            }
        });
        return NextResponse.json(usuarios);

    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        return NextResponse.json({ error: "Erro interno ao listar usuários." }, { status: 500 });
    }
}


export async function POST(request: Request) {
    const usuarioLogado = await getUsuarioDaSessao();
    if (usuarioLogado?.role !== Role.ADM) {
         return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
    }

    try {
        const { nome, email, senha, role } = await request.json();

        if (!nome || !email || !senha || !role) {
            return NextResponse.json({ error: "Todos os campos (nome, email, senha, role) são obrigatórios." }, { status: 400 });
        }

        const emailExiste = await prisma.usuario.findUnique({ where: { email } });
        if (emailExiste) {
            return NextResponse.json({ error: "Este email já está em uso." }, { status: 409 }); // 409 Conflict
        }
        
        if (role !== Role.ADM && role !== Role.USUARIO) {
             return NextResponse.json({ error: "Role inválida. Use 'ADM' ou 'USUARIO'." }, { status: 400 });
        }
        const hashSenha = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: hashSenha,
                role,
            }
        });

        const { senha: _, ...usuarioSemSenha } = novoUsuario;
        return NextResponse.json(usuarioSemSenha, { status: 201 });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return NextResponse.json({ error: "Erro interno ao criar usuário." }, { status: 500 });
    }
}
