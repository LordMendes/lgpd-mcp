import * as z from "zod";

export const verificarConsentimentoSchema = {
  criterios: z.object({
    destacado: z
      .boolean()
      .optional()
      .describe("O consentimento foi destacado das demais cláusulas?"),
    informado: z
      .boolean()
      .optional()
      .describe("O titular foi informado sobre finalidade e uso dos dados?"),
    inequivoco: z
      .boolean()
      .optional()
      .describe("A manifestação foi expressa e inequívoca?"),
    revogavel: z
      .boolean()
      .optional()
      .describe("Há possibilidade de revogação do consentimento?"),
    documentado: z
      .boolean()
      .optional()
      .describe("O consentimento foi documentado/provado?"),
  }),
  observacoes: z
    .string()
    .optional()
    .describe("Observações adicionais sobre o contexto do consentimento"),
};

export async function verificarConsentimento(args: {
  criterios: {
    destacado?: boolean;
    informado?: boolean;
    inequivoco?: boolean;
    revogavel?: boolean;
    documentado?: boolean;
  };
  observacoes?: string;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { criterios, observacoes } = args;

  const requisitos = [
    {
      nome: "Destacado (Art. 8º, §1º)",
      desc: "O consentimento deve ser destacado das demais cláusulas.",
      atendido: criterios.destacado,
    },
    {
      nome: "Informado",
      desc: "Manifestação livre e informada sobre finalidade e uso.",
      atendido: criterios.informado,
    },
    {
      nome: "Inequívoco",
      desc: "Manifestação expressa e inequívoca do titular.",
      atendido: criterios.inequivoco,
    },
    {
      nome: "Revogável (Art. 8º, §5º)",
      desc: "Possibilidade de revogação do consentimento.",
      atendido: criterios.revogavel,
    },
    {
      nome: "Documentado",
      desc: "Documentação e prova do consentimento para o controlador.",
      atendido: criterios.documentado,
    },
  ];

  const atendidos = requisitos.filter((r) => r.atendido === true).length;
  const naoInformados = requisitos.filter((r) => r.atendido === undefined).length;
  const naoAtendidos = requisitos.filter((r) => r.atendido === false).length;

  let resultado = "Conformidade parcial";
  if (naoAtendidos > 0) resultado = "Não conformidade";
  else if (atendidos === 5) resultado = "Conformidade integral";
  else if (atendidos > 0 && naoInformados > 0) resultado = "Avaliação incompleta";

  const linhas = [
    "## Verificação de Consentimento (Art. 8º LGPD)",
    "",
    "### Requisitos do consentimento",
    "",
    ...requisitos.map((r) => {
      const status =
        r.atendido === true ? "✅" : r.atendido === false ? "❌" : "⏳";

      return `- ${status} **${r.nome}**: ${r.desc}`;
    }),
    "",
    "### Resultado",
    "",
    `- **Avaliação**: ${resultado}`,
    `- Requisitos atendidos: ${atendidos}/5`,
    `- Requisitos não atendidos: ${naoAtendidos}`,
    `- Não informados: ${naoInformados}`,
    "",
  ];

  if (naoAtendidos > 0) {
    linhas.push(
      "### Recomendações",
      "",
      "- Ajuste o processo para atender aos requisitos não atendidos.",
      "- O consentimento deve ser obtido de forma destacada das demais cláusulas.",
      "- Documente e preserve o consentimento para fins de prova.",
      ""
    );
  }

  if (observacoes) {
    linhas.push("### Observações", "", observacoes, "");
  }

  linhas.push(
    "**Aviso**: Esta ferramenta é auxiliar e não substitui assessoria jurídica especializada."
  );

  return { content: [{ type: "text" as const, text: linhas.join("\n") }] };
}
