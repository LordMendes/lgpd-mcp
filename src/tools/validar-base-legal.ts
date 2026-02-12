import * as z from "zod";

const BASE_LEGAL_ART7 = [
  "consentimento",
  "obrigacao_legal",
  "politicas_publicas",
  "estudos_pesquisa",
  "execucao_contrato",
  "exercicio_direitos",
  "protecao_vida",
  "tutela_saude",
  "legitimo_interesse",
  "protecao_credito",
] as const;

const BASE_LEGAL_ART11 = [
  "consentimento_especifico",
  "obrigacao_legal",
  "tutela_saude",
  "prevencao_fraude",
  "estudos_pesquisa",
  "exercicio_direitos",
  "protecao_vida",
  "garantias_previstas",
] as const;

const TIPOS_DADO = ["pessoal", "sensivel"] as const;

export const validarBaseLegalSchema = {
  base_legal: z.string().describe("Nome ou identificador da base legal utilizada"),
  tipo_dado: z
    .enum(TIPOS_DADO)
    .describe("Tipo de dado: 'pessoal' (Art. 7º) ou 'sensivel' (Art. 11º)"),
  finalidade: z
    .string()
    .optional()
    .describe("Finalidade do tratamento para análise de adequação"),
};

export async function validarBaseLegal(args: {
  base_legal: string;
  tipo_dado: "pessoal" | "sensivel";
  finalidade?: string;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { base_legal, tipo_dado, finalidade } = args;

  const basesComuns = ["consentimento", "obrigacao_legal", "protecao_vida"];
  const basesPessoais = [...BASE_LEGAL_ART7];
  const basesSensiveis = [...BASE_LEGAL_ART11];

  const normalizar = (s: string) =>
    s.toLowerCase().replace(/[_\s-]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const baseNorm = normalizar(base_legal);

  let valido = false;
  let mensagem = "";
  let observacoes: string[] = [];

  if (tipo_dado === "pessoal") {
    valido = basesPessoais.some((b) => normalizar(b) === baseNorm);
    if (!valido) {
      valido = basesComuns.some((b) => normalizar(b) === baseNorm);
    }
    if (!valido) {
      mensagem =
        "Base legal não reconhecida para dados pessoais. O Art. 7º da LGPD lista as hipóteses permitidas (consentimento, obrigação legal, execução de contrato, legítimo interesse, etc.).";
    } else {
      mensagem = "Base legal válida para tratamento de dados pessoais (Art. 7º).";
      if (baseNorm === normalizar("legitimo_interesse")) {
        observacoes.push("Legítimo interesse exige LIA (Legitimate Interest Assessment) e respeito aos direitos do titular.");
      }
    }
  } else {
    valido = basesSensiveis.some((b) => normalizar(b) === baseNorm);
    if (!valido) {
      valido = basesComuns.some((b) => normalizar(b) === baseNorm);
    }
    if (!valido) {
      mensagem =
        "Base legal não reconhecida para dados sensíveis. O Art. 11º exige hipóteses específicas (consentimento específico e destacado, tutela da saúde, etc.).";
    } else {
      mensagem = "Base legal válida para tratamento de dados sensíveis (Art. 11º).";
      if (baseNorm.includes("consentimento")) {
        observacoes.push("Consentimento para dados sensíveis deve ser específico e destacado (Art. 8º, §5º).");
      }
    }
  }

  if (finalidade) {
    observacoes.push(`Finalidade informada: ${finalidade}. Verifique adequação e necessidade conforme Art. 6º.`);
  }

  observacoes.push(
    "**Aviso**: Esta ferramenta é auxiliar e não substitui assessoria jurídica especializada."
  );

  const texto = [
    `## Validação de Base Legal`,
    ``,
    `- **Base legal informada**: ${base_legal}`,
    `- **Tipo de dado**: ${tipo_dado}`,
    `- **Resultado**: ${valido ? "✅ Válida" : "❌ Inválida ou não reconhecida"}`,
    ``,
    mensagem,
    ``,
    ...(observacoes.length > 0 ? ["### Observações", "", ...observacoes.map((o) => `- ${o}`)] : []),
  ].join("\n");

  return { content: [{ type: "text" as const, text: texto }] };
}
