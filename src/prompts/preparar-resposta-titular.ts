import * as z from "zod";

export const prepararRespostaTitularArgsSchema = {
  tipo_solicitacao: z
    .enum([
      "acesso",
      "correção",
      "eliminação",
      "portabilidade",
      "revogação",
      "informação_compartilhamento",
      "outro",
    ])
    .describe(
      "Tipo de solicitação do titular: acesso, correção, eliminação, portabilidade, revogação, informação_compartilhamento ou outro"
    ),
  contexto: z
    .string()
    .optional()
    .describe(
      "Contexto adicional (ex: setor, base legal do tratamento, prazos desejados)"
    ),
};

const INSTRUCOES_RESPOSTA = `
Com base no tipo de solicitação do titular e no Art. 18 da LGPD, prepare um modelo de resposta formal (carta ou e-mail) que o controlador pode enviar ao titular. A resposta deve:

1. **Identificar** o tipo de direito exercido (Art. 18, inciso correspondente).
2. **Ser clara e objetiva**: confirmar o recebimento, o prazo para resposta (quando aplicável) e os próximos passos.
3. **Incluir**, quando cabível: confirmação de cumprimento, solicitação de documentos para identificação, prazo razoável para atendimento, ou fundamento legal para eventual negativa (com base na LGPD).
4. **Manter tom profissional** e em conformidade com os princípios de transparência e boa-fé (Art. 6º).
5. **Mencionar** o canal do encarregado (DPO) para dúvidas ou reclamações.

Não inclua dados pessoais reais no modelo; use placeholders como [nome do titular] ou [identificação] quando necessário.
`.trim();

export async function prepararRespostaTitularPrompt(args: {
  tipo_solicitacao: string;
  contexto?: string;
}): Promise<{
  messages: Array<{
    role: "user";
    content: { type: "text"; text: string };
  }>;
}> {
  let text = `${INSTRUCOES_RESPOSTA}\n\n---\n\n**Tipo de solicitação do titular:** ${args.tipo_solicitacao}`;
  if (args.contexto) {
    text += `\n\n**Contexto adicional:**\n${args.contexto}`;
  }
  text += `\n\nElabore o modelo de resposta adequado a essa solicitação.`;
  return {
    messages: [
      {
        role: "user",
        content: { type: "text", text },
      },
    ],
  };
}
