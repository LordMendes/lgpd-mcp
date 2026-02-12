import * as z from "zod";

export const checklistComplianceSchema = {
  cenario: z.string().describe("Breve descrição do cenário ou processo a ser avaliado"),
  ambito: z
    .enum(["comercial", "saude", "educacao", "governo", "geral"])
    .optional()
    .describe("Âmbito do tratamento (comercial, saúde, educação, governo, geral)"),
};

const ITENS_CHECKLIST = [
  {
    categoria: "Fundamentos e bases legais",
    itens: [
      "Base legal definida e documentada para cada finalidade",
      "Tratamento de dados sensíveis apenas nas hipóteses do Art. 11º",
    ],
  },
  {
    categoria: " Consentimento (quando aplicável)",
    itens: [
      "Consentimento destacado, informado e inequívoco",
      "Possibilidade de revogação prevista",
      "Documentação e prova do consentimento",
    ],
  },
  {
    categoria: " Transparência e informação",
    itens: [
      "Política de privacidade acessível e clara",
      "Informação sobre finalidade e uso dos dados",
      "Informação sobre compartilhamento e retenção",
    ],
  },
  {
    categoria: " Direitos do titular",
    itens: [
      "Canal para confirmação de tratamento",
      "Processo para acesso, correção e exclusão",
      "Processo para portabilidade e revogação",
    ],
  },
  {
    categoria: " Segurança e governança",
    itens: [
      "Medidas técnicas e administrativas de segurança",
      "Encarregado (DPO) designado, quando aplicável",
      "Procedimentos de resposta a incidentes",
    ],
  },
];

export async function checklistCompliance(args: {
  cenario: string;
  ambito?: "comercial" | "saude" | "educacao" | "governo" | "geral";
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { cenario, ambito = "geral" } = args;

  const ambitoText: Record<string, string> = {
    comercial: "Comercial / Empresas",
    saude: "Saúde",
    educacao: "Educação",
    governo: "Governo / Setor público",
    geral: "Geral",
  };

  const linhas = [
    "## Checklist de Conformidade LGPD",
    "",
    `**Cenário:** ${cenario}`,
    `**Âmbito:** ${ambitoText[ambito] ?? ambito}`,
    "",
    "Utilize este checklist para verificar os principais pontos de conformidade. Marque conforme sua avaliação.",
    "",
    ...ITENS_CHECKLIST.flatMap((c) => [
      `### ${c.categoria}`,
      "",
      ...c.itens.map((i) => `- [ ] ${i}`),
      "",
    ]),
    "### Recomendações gerais",
    "",
    "- Documente decisões e controles implementados",
    "- Realize revisões periódicas de conformidade",
    "- Mantenha registros de tratamento atualizados",
    "- Consulte a ANPD para orientações específicas",
    "",
    "**Aviso**: Esta ferramenta é auxiliar e não substitui assessoria jurídica especializada.",
  ];

  return { content: [{ type: "text" as const, text: linhas.join("\n") }] };
}
