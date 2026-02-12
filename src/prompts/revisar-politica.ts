import * as z from "zod";

export const revisarPoliticaArgsSchema = {
  texto_politica: z
    .string()
    .describe("Texto da política de privacidade a ser revisada"),
};

const INSTRUCOES_REVISAO = `
Revise a política de privacidade abaixo sob a ótica da LGPD (Lei 13.709/2018). Considere:

1. **Princípios do tratamento (Art. 6º)**: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.

2. **Bases legais (Arts. 7º e 11º)**: verifique se as finalidades estão vinculadas a bases legais adequadas (consentimento, execução de contrato, legítimo interesse, obrigação legal, etc.) e, para dados sensíveis, se há hipótese do Art. 11º.

3. **Consentimento (Art. 8º)**: quando aplicável, se está destacado, informado, inequívoco e com menção à possibilidade de revogação.

4. **Direitos do titular (Arts. 17 e 18)**: confirmação de tratamento, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, eliminação (quando base em consentimento), informação sobre compartilhamento e revogação.

5. **Transparência**: linguagem clara e acessível; identificação do controlador; finalidades e bases legais; compartilhamento e retenção; canal do DPO.

6. **Encarregado (Art. 41)**: se há canal de comunicação com titulares e ANPD.

Indique pontos de conformidade, lacunas e sugestões de melhoria. Ao final, resuma se a política atende aos requisitos essenciais da LGPD.
`.trim();

export async function revisarPoliticaPrompt(args: {
  texto_politica: string;
}): Promise<{
  messages: Array<{
    role: "user";
    content: { type: "text"; text: string };
  }>;
}> {
  const text = `${INSTRUCOES_REVISAO}\n\n---\n\n**Texto da política a revisar:**\n\n${args.texto_politica}`;
  return {
    messages: [
      {
        role: "user",
        content: { type: "text", text },
      },
    ],
  };
}
