import * as z from "zod";

export const gerarDocumentacaoArgsSchema = {
  tipo_processo: z
    .string()
    .describe(
      "Tipo de processo/documentação: registro_atividades, pia, incidente, mapeamento ou outro"
    ),
  contexto: z
    .string()
    .optional()
    .describe(
      "Contexto adicional (ex: setor, porte da organização, tipos de dados)"
    ),
};

const INSTRUCOES_DOCUMENTACAO = `
Com base na LGPD (Lei 13.709/2018) e nas boas práticas da ANPD, sugira a estrutura e os itens de documentação para o processo interno solicitado. Para cada tipo de processo, inclua:

- **Objetivo** da documentação e fundamento legal (ex: Art. 37 para registro de operações).
- **Estrutura sugerida** (seções, tópicos, campos a preencher).
- **Conteúdo mínimo** que deve constar para fins de conformidade e prestação de contas.
- **Responsáveis** sugeridos (ex: DPO, área de TI, jurídico) e periodicidade de revisão, quando aplicável.
- **Referências** à LGPD e a guias da ANPD, quando relevante.

Mantenha o foco em documentação que comprove o tratamento de dados em conformidade com a lei e permita responder a titulares e à autoridade.
`.trim();

export async function gerarDocumentacaoPrompt(args: {
  tipo_processo: string;
  contexto?: string;
}): Promise<{
  messages: Array<{
    role: "user";
    content: { type: "text"; text: string };
  }>;
}> {
  let text = `${INSTRUCOES_DOCUMENTACAO}\n\n---\n\n**Tipo de processo/documentação:** ${args.tipo_processo}`;
  if (args.contexto) {
    text += `\n\n**Contexto adicional:**\n${args.contexto}`;
  }
  text += `\n\nElabore a estrutura e os itens de documentação para este processo.`;
  return {
    messages: [
      {
        role: "user",
        content: { type: "text", text },
      },
    ],
  };
}
