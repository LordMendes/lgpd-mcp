import * as z from "zod";

export const gerarModeloConsentimentoSchema = {
  finalidade: z.string().describe("Finalidade do tratamento para a qual o consentimento é solicitado"),
  dados_coletados: z
    .string()
    .optional()
    .describe("Lista resumida dos dados coletados (ex: nome, e-mail, CPF)"),
  compartilhamento: z
    .boolean()
    .optional()
    .describe("Se haverá compartilhamento de dados com terceiros"),
  retencao: z
    .string()
    .optional()
    .describe("Prazo ou critério de retenção dos dados"),
  dados_sensiveis: z
    .boolean()
    .optional()
    .describe("Se o tratamento envolve dados sensíveis"),
};

export async function gerarModeloConsentimento(args: {
  finalidade: string;
  dados_coletados?: string;
  compartilhamento?: boolean;
  retencao?: string;
  dados_sensiveis?: boolean;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const {
    finalidade,
    dados_coletados = "conforme informado na política de privacidade",
    compartilhamento = false,
    retencao = "enquanto necessário para a finalidade ou conforme obrigação legal",
    dados_sensiveis = false,
  } = args;

  const dadosLista = dados_coletados
    .split(/[,;]/)
    .map((d) => d.trim())
    .filter(Boolean);
  const dadosTexto =
    dadosLista.length > 0 ? dadosLista.join(", ") : dados_coletados;

  const template = [
    "# TERMO DE CONSENTIMENTO DE TRATAMENTO DE DADOS PESSOAIS",
    "",
    "*(Modelo em conformidade com a LGPD - Lei 13.709/2018, Art. 8º)*",
    "",
    "---",
    "",
    "**Identificação do controlador:** [Nome da empresa/entidade]**",
    "",
    "**Pelo presente termo, eu, titular dos dados, declaro livremente:",
    "",
    "",
    "## 1. Finalidade",
    "",
    `Consentir com o tratamento dos meus dados pessoais para a seguinte finalidade:`,
    "",
    `**${finalidade}**`,
    "",
    "",
    "## 2. Dados coletados",
    "",
    `Os dados coletados incluem:${dadosTexto ? ` ${dadosTexto}` : " (especificar na política de privacidade)"}.`,
    "",
    "",
    "## 3. Compartilhamento",
    "",
    compartilhamento
      ? "Os dados poderão ser compartilhados com terceiros, conforme descrito na política de privacidade, para fins compatíveis com a finalidade informada."
      : "Os dados não serão compartilhados com terceiros, exceto quando exigido por lei.",
    "",
    "",
    "## 4. Retenção",
    "",
    `Os dados serão mantidos: ${retencao}.`,
    "",
    "",
    dados_sensiveis
      ? [
          "## 5. Dados sensíveis",
          "",
          "O tratamento inclui dados pessoais sensíveis (Art. 11º da LGPD). O consentimento foi obtido de forma específica e destacada.",
          "",
          "",
        ]
      : [],
    "## Direitos do titular",
    "",
    "Estou ciente de que posso:",
    "- Confirmar a existência de tratamento",
    "- Acessar meus dados",
    "- Corrigir dados incompletos ou inexatos",
    "- Solicitar a eliminação, anonimização ou bloqueio",
    "- Revogar o consentimento a qualquer momento",
    "",
    "",
    "## Manifestação",
    "",
    "Ao marcar a opção de aceite, declaro ter lido e concordado com os termos acima, de forma livre, informada e inequívoca.",
    "",
    "",
    "---",
    "",
    "**Data:** ___/___/______",
    "",
    "**Assinatura:** _________________________",
    "",
    "",
    "---",
    "",
    "*Este modelo é apenas um guia. Não substitui assessoria jurídica especializada. Adapte conforme a realidade do seu processo.*",
  ]
    .flat()
    .join("\n");

  return { content: [{ type: "text" as const, text: template }] };
}
