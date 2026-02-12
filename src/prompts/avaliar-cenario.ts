import * as z from "zod";

export const avaliarCenarioArgsSchema = {
  descricao_cenario: z
    .string()
    .describe(
      "Descrição do cenário de tratamento de dados (atividade, dados envolvidos, finalidade, sujeitos)"
    ),
};

const INSTRUCOES_AVALIACAO = `
Analise o cenário de tratamento de dados pessoais descrito abaixo sob a ótica da LGPD (Lei 13.709/2018). Forneça uma análise estruturada que inclua:

1. **Identificação do tratamento**: quais dados são tratados, para qual finalidade e quem são os titulares (consumidores, colaboradores, etc.).

2. **Base legal**: qual(is) base(is) legais do Art. 7º (e, se houver dados sensíveis, Art. 11º) se aplicam ao cenário. Indique se consentimento é necessário ou se outra base é adequada.

3. **Princípios (Art. 6º)**: verifique adequação ao princípio da finalidade, necessidade, transparência e segurança. Indique possíveis riscos de desvio.

4. **Necessidade de PIA/RIPD (Art. 38)**: avalie se o tratamento pode gerar alto risco aos direitos e liberdades (grande volume, dados sensíveis, monitoramento sistemático, uso de novas tecnologias, etc.) e se é recomendável elaborar Relatório de Impacto.

5. **Riscos e mitigação**: identifique riscos ao titular (vazamento, uso indevido, discriminação) e sugira medidas técnicas e administrativas (minimização, criptografia, controle de acesso, política de privacidade).

6. **Conformidade**: resuma se o cenário está em linha com a LGPD e liste ações recomendadas para adequação, se houver lacunas.

Use linguagem objetiva e referências aos artigos da lei quando relevante.
`.trim();

export async function avaliarCenarioPrompt(args: {
  descricao_cenario: string;
}): Promise<{
  messages: Array<{
    role: "user";
    content: { type: "text"; text: string };
  }>;
}> {
  const text = `${INSTRUCOES_AVALIACAO}\n\n---\n\n**Cenário a ser avaliado:**\n\n${args.descricao_cenario}`;
  return {
    messages: [
      {
        role: "user",
        content: { type: "text", text },
      },
    ],
  };
}
