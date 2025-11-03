import { z } from 'zod';
import { Role } from '@prisma/client';

export const passwordErrorMessages = {
  minLength: "A senha deve ter no mínimo 8 caracteres.",
  lowercase: "A senha deve conter pelo menos 1 letra minúscula.",
  uppercase: "A senha deve conter pelo menos 1 letra maiúscula.",
  number: "A senha deve conter pelo menos 1 número.",
  specialChar: "A senha deve conter pelo menos 1 caractere especial (ex: !@#$%^&*)",
};


export const passwordRules = {
  minLength: /.{8,}/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  specialChar: /[!@#$%^&*]/, 
};

export const userPasswordSchema = z.string()
  .regex(passwordRules.minLength, passwordErrorMessages.minLength)
  .regex(passwordRules.lowercase, passwordErrorMessages.lowercase)
  .regex(passwordRules.uppercase, passwordErrorMessages.uppercase)
  .regex(passwordRules.number, passwordErrorMessages.number)
  .regex(passwordRules.specialChar, passwordErrorMessages.specialChar);

export const userCreationSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.string().email("Por favor, insira um email válido."),
  senha: userPasswordSchema,
  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: "A permissão selecionada é inválida." }),
  }),
});
