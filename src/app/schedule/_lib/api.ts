import type { FormData } from "./types";
import { normalizeCPF } from "./utils";

export async function checkUser(cpf: string): Promise<{ exists: boolean; userData?: Partial<FormData> }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const clean = normalizeCPF(cpf);
  if (clean === "12345678900") {
    return {
      exists: true,
      userData: {
        nome: "João da Silva",
        email: "joao.silva@email.com",
        telefone: "(84) 99999-9999",
      },
    };
  }
  return { exists: false };
}
