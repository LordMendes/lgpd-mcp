import * as z from "zod";

export const gerarPoliticaPrivacidadeSchema = {
  nome_empresa: z.string().describe("Nome da empresa ou organização"),
  finalidades: z
    .string()
    .optional()
    .describe("Finalidades principais do tratamento (separadas por vírgula)"),
  dados_coletados: z
    .string()
    .optional()
    .describe("Tipos de dados coletados (ex: nome, e-mail, CPF)"),
  base_legal: z
    .string()
    .optional()
    .describe("Bases legais utilizadas (ex: consentimento, execução de contrato)"),
  compartilhamento: z
    .string()
    .optional()
    .describe("Se e com quem os dados são compartilhados"),
  retencao: z
    .string()
    .optional()
    .describe("Prazo ou critério de retenção dos dados"),
  contato_dpo: z
    .string()
    .optional()
    .describe("Canal de contato do encarregado (DPO)"),
};

export async function gerarPoliticaPrivacidade(args: {
  nome_empresa: string;
  finalidades?: string;
  dados_coletados?: string;
  base_legal?: string;
  compartilhamento?: string;
  retencao?: string;
  contato_dpo?: string;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const {
    nome_empresa,
    finalidades = "[especificar as finalidades]",
    dados_coletados = "[especificar os dados coletados]",
    base_legal = "[especificar bases legais - Art. 7º e 11º LGPD]",
    compartilhamento = "Os dados podem ser compartilhados conforme descrito em cada finalidade, com parceiros ou quando exigido por lei.",
    retencao = "Os dados são mantidos pelo tempo necessário à finalidade ou conforme obrigação legal.",
    contato_dpo = "[e-mail ou canal de contato do encarregado]",
  } = args;

  const estrutura = [
    `# Política de Privacidade - ${nome_empresa}`,
    "",
    "*(Estrutura em conformidade com a LGPD - Lei 13.709/2018)*",
    "",
    "---",
    "",
    "## 1. Responsável pelo tratamento",
    "",
    `${nome_empresa} é o controlador dos dados pessoais tratados conforme esta política.`,
    "",
    "",
    "## 2. Dados coletados",
    "",
    dados_coletados,
    "",
    "",
    "## 3. Finalidades do tratamento",
    "",
    finalidades,
    "",
    "",
    "## 4. Bases legais",
    "",
    base_legal,
    "",
    "",
    "## 5. Compartilhamento",
    "",
    compartilhamento,
    "",
    "",
    "## 6. Retenção dos dados",
    "",
    retencao,
    "",
    "",
    "## 7. Direitos do titular",
    "",
    "Em conformidade com os Arts. 17 e 18 da LGPD, você pode:",
    "- Confirmar a existência de tratamento",
    "- Acessar seus dados",
    "- Corrigir dados incompletos ou inexatos",
    "- Solicitar anonimização, bloqueio ou eliminação",
    "- Solicitar portabilidade",
    "- Revogar o consentimento",
    "",
    "",
    "## 8. Encarregado (DPO)",
    "",
    `Para exercer seus direitos ou esclarecer dúvidas: ${contato_dpo}`,
    "",
    "",
    "## 9. Alterações",
    "",
    "Esta política pode ser atualizada. Alterações relevantes serão comunicadas.",
    "",
    "",
    "## 10. Legislação",
    "",
    "Esta política está em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018) e regulamentações da ANPD.",
    "",
    "---",
    "",
    "*Este modelo é um guia. Adapte conforme sua realidade e busque assessoria jurídica especializada.*",
  ].join("\n");

  return { content: [{ type: "text" as const, text: estrutura }] };
}
