import * as z from "zod";

export const mapearDadosSensiveisSchema = {
  categorias_informadas: z
    .string()
    .optional()
    .describe("Categorias de dados que você suspeita serem sensíveis (separadas por vírgula)"),
  contexto: z
    .string()
    .optional()
    .describe("Contexto do tratamento para análise"),
};

const CATEGORIAS_SENSIVEIS = [
  {
    categoria: "Origem racial ou étnica",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Dados que revelem raça, cor, etnia, ascendência.",
  },
  {
    categoria: "Convicções religiosas",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Crenças religiosas, participação em grupos religiosos.",
  },
  {
    categoria: "Opiniões políticas",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Filiação partidária, preferências políticas.",
  },
  {
    categoria: "Filiação sindical",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Filiação a sindicatos ou associações de classe.",
  },
  {
    categoria: "Dados genéticos",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Informações genéticas, sequenciamento de DNA.",
  },
  {
    categoria: "Dados biométricos",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Impressão digital, reconhecimento facial, íris.",
  },
  {
    categoria: "Dados de saúde",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Histórico médico, condições de saúde, uso de medicamentos.",
  },
  {
    categoria: "Dados de vida sexual",
    artigo: "Art. 5º, II e Art. 11º",
    exemplos: "Orientação sexual, vida sexual.",
  },
];

export async function mapearDadosSensiveis(args: {
  categorias_informadas?: string;
  contexto?: string;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { categorias_informadas, contexto } = args;

  const linhas = [
    "## Mapeamento de Dados Sensíveis - LGPD (Art. 11º)",
    "",
    "Dados pessoais sensíveis são aqueles sobre origem racial ou étnica, convicções religiosas, opiniões políticas, filiação sindical, dados genéticos, biométricos, de saúde ou de vida sexual.",
    "",
    "### Categorias reconhecidas pela LGPD",
    "",
    ...CATEGORIAS_SENSIVEIS.map(
      (c) =>
        `- **${c.categoria}** (${c.artigo})\n  Exemplos: ${c.exemplos}`
    ),
    "",
    "### Hipóteses de tratamento (Art. 11º)",
    "",
    "O tratamento de dados sensíveis só é permitido em hipóteses específicas:",
    "- Consentimento específico e destacado",
    "- Cumprimento de obrigação legal",
    "- Tutela da saúde (por profissionais ou entidades)",
    "- Garantia de prevenção à fraude e segurança do titular",
    "- Estudos e pesquisas (com garantias)",
    "- Exercício regular de direitos",
    "- Proteção da vida ou incolumidade física",
    "",
  ];

  if (contexto) {
    linhas.push("### Contexto informado", "", contexto, "", "");
  }

  if (categorias_informadas) {
    const list = categorias_informadas
      .split(/[,;]/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const termos = [
      "racial",
      "etnia",
      "religiao",
      "politica",
      "sindical",
      "genetico",
      "biometrico",
      "saude",
      "sexual",
    ];

    const possivelmenteSensivel = list.filter((l) =>
      termos.some((t) => l.includes(t))
    );

    linhas.push(
      "### Análise das categorias informadas",
      "",
      `Categorias informadas: ${list.join(", ") || "nenhuma"}`,
      ""
    );

    if (possivelmenteSensivel.length > 0) {
      linhas.push(
        "Possivelmente sensíveis:",
        ...possivelmenteSensivel.map((p) => `- ${p}`),
        "",
        "Verifique se essas categorias se enquadram nas hipóteses do Art. 11º e se a base legal é adequada.",
        ""
      );
    }
  }

  linhas.push(
    "**Aviso**: Esta ferramenta é auxiliar e não substitui assessoria jurídica especializada."
  );

  return { content: [{ type: "text" as const, text: linhas.join("\n") }] };
}
