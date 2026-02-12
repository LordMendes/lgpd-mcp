import * as z from "zod";

export const consultarDireitosTitularSchema = {
  contexto: z
    .string()
    .optional()
    .describe("Contexto em que os direitos são consultados (ex: solicitação de acesso, revogação)"),
};

const DIREITOS = [
  {
    artigo: "Art. 18, I",
    direito: "Confirmação da existência de tratamento",
    explicacao:
      "O titular pode pedir Confirmação se a empresa trata seus dados pessoais.",
  },
  {
    artigo: "Art. 18, II",
    direito: "Acesso aos dados",
    explicacao:
      "O titular pode solicitar Acesso aos dados que a empresa possui sobre ele.",
  },
  {
    artigo: "Art. 18, III",
    direito: "Correção de dados incompletos, inexatos ou desatualizados",
    explicacao:
      "O titular pode solicitar Correção de dados que estejam incorretos ou desatualizados.",
  },
  {
    artigo: "Art. 18, IV",
    direito: "Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos",
    explicacao:
      "O titular pode solicitar Anonimização, bloqueio ou eliminação quando os dados forem tratados em desconformidade.",
  },
  {
    artigo: "Art. 18, V",
    direito: "Portabilidade dos dados",
    explicacao:
      "O titular pode solicitar a Portabilidade dos dados a outro fornecedor de serviço ou produto.",
  },
  {
    artigo: "Art. 18, VI",
    direito: "Eliminação dos dados tratados com consentimento",
    explicacao:
      "Quando o tratamento tiver como base o consentimento, o titular pode solicitar a Eliminação dos dados.",
  },
  {
    artigo: "Art. 18, VII",
    direito: "Informação sobre compartilhamento",
    explicacao:
      "O titular pode solicitar Informação sobre as entidades com as quais houve compartilhamento de dados.",
  },
  {
    artigo: "Art. 18, VIII",
    direito: "Informação sobre possibilidade de não consentir",
    explicacao:
      "O titular deve ser informado sobre a possibilidade de não fornecer consentimento e as consequências.",
  },
  {
    artigo: "Art. 18, IX",
    direito: "Revogação do consentimento",
    explicacao:
      "O titular pode Revogar o consentimento a qualquer momento, mediante manifestação expressa.",
  },
];

export async function consultarDireitosTitular(args: {
  contexto?: string;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { contexto } = args;

  const linhas = [
    "## Direitos do Titular - LGPD (Arts. 17 e 18)",
    "",
    "A LGPD garante aos titulares os seguintes direitos em relação aos seus dados pessoais:",
    "",
    ...DIREITOS.map(
      (d) =>
        `### ${d.artigo} - ${d.direito}\n\n${d.explicacao}`
    ),
    "",
    "### Observações",
    "",
    "- O controlador deve responder às solicitações em prazo razoável (a ANPD pode regulamentar prazos).",
    "- O exercício dos direitos não pode ser impedido por declarações genéricas.",
    "- Alguns direitos podem ter exceções quando houver outro fundamento legal aplicável.",
    "",
  ];

  if (contexto) {
    linhas.splice(
      2,
      0,
      "",
      `**Contexto:** ${contexto}`,
      ""
    );
  }

  linhas.push(
    "**Referência:** Lei 13.709/2018, Arts. 17 e 18. Esta ferramenta é auxiliar e não substitui assessoria jurídica."
  );

  return { content: [{ type: "text" as const, text: linhas.join("\n") }] };
}
