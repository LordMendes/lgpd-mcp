import * as z from "zod";

export const avaliarNecessidadePiaSchema = {
  criterios: z.object({
    dados_sensiveis_volume: z
      .boolean()
      .optional()
      .describe("Tratamento de grande volume de dados sensíveis?"),
    monitoramento_sistematico: z
      .boolean()
      .optional()
      .describe("Monitoramento sistemático de titulares em larga escala?"),
    interesse_legitimo: z
      .boolean()
      .optional()
      .describe("Base legal em legítimo interesse?"),
    decisao_automatizada: z
      .boolean()
      .optional()
      .describe("Decisões automatizadas com efeitos significativos?"),
    compartilhamento_massivo: z
      .boolean()
      .optional()
      .describe("Compartilhamento em massa ou transferência internacional?"),
    dados_vulneraveis: z
      .boolean()
      .optional()
      .describe("Tratamento de dados de crianças, idosos ou grupos vulneráveis?"),
  }),
  descricao_processamento: z
    .string()
    .optional()
    .describe("Breve descrição do processamento para contexto"),
};

export async function avaliarNecessidadePia(args: {
  criterios: {
    dados_sensiveis_volume?: boolean;
    monitoramento_sistematico?: boolean;
    interesse_legitimo?: boolean;
    decisao_automatizada?: boolean;
    compartilhamento_massivo?: boolean;
    dados_vulneraveis?: boolean;
  };
  descricao_processamento?: string;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { criterios, descricao_processamento } = args;

  const fatores = [
    {
      nome: "Grande volume de dados sensíveis",
      atendido: criterios.dados_sensiveis_volume,
      peso: 2,
    },
    {
      nome: "Monitoramento sistemático em larga escala",
      atendido: criterios.monitoramento_sistematico,
      peso: 2,
    },
    {
      nome: "Legítimo interesse como base legal",
      atendido: criterios.interesse_legitimo,
      peso: 1,
    },
    {
      nome: "Decisões automatizadas com efeitos significativos",
      atendido: criterios.decisao_automatizada,
      peso: 2,
    },
    {
      nome: "Compartilhamento em massa ou transferência internacional",
      atendido: criterios.compartilhamento_massivo,
      peso: 1,
    },
    {
      nome: "Dados de grupos vulneráveis (crianças, idosos)",
      atendido: criterios.dados_vulneraveis,
      peso: 2,
    },
  ];

  const positivos = fatores.filter((f) => f.atendido === true);
  const pontuacao = positivos.reduce((s, f) => s + f.peso, 0);

  let necessidade: "alta" | "media" | "baixa" | "avaliar";
  let recomendacao: string;

  if (pontuacao >= 4) {
    necessidade = "alta";
    recomendacao =
      "PIA/RIPD **altamente recomendado**. O Art. 38 da LGPD indica a necessidade de relatório de impacto quando houver risco às liberdades e direitos dos titulares.";
  } else if (pontuacao >= 1) {
    necessidade = "media";
    recomendacao =
      "PIA/RIPD **recomendado**. Avalie a extensão do risco e documente as medidas de mitigação mesmo em cenários de risco moderado.";
  } else if (positivos.length === 0) {
    necessidade = "avaliar";
    recomendacao =
      "Informações insuficientes ou nenhum critério de alto risco identificado. Avalie o contexto completo do tratamento e considere consultar a ANPD para orientações.";
  } else {
    necessidade = "baixa";
    recomendacao =
      "Risco aparentemente baixo. Ainda assim, documente o processamento e as medidas de segurança adotadas.";
  }

  const linhas = [
    "## Avaliação de Necessidade de PIA/RIPD (Art. 38 LGPD)",
    "",
    "O Relatório de Impacto à Proteção de Dados Pessoais (RIPD) ou PIA é exigido quando o tratamento pode gerar risco aos direitos e liberdades dos titulares.",
    "",
    "### Critérios avaliados",
    "",
    ...fatores.map((f) => {
      const s = f.atendido === true ? "✅ SIM" : f.atendido === false ? "❌ NÃO" : "⏳ não informado";
      return `- ${s} - ${f.nome}`;
    }),
    "",
    "### Resultado",
    "",
    `- **Pontuação de risco**: ${pontuacao} (fatores positivos: ${positivos.length})`,
    `- **Necessidade de PIA**: ${necessidade.toUpperCase()}`,
    "",
    "### Recomendação",
    "",
    recomendacao,
    "",
    "### Etapas típicas do PIA/RIPD",
    "",
    "1. Descrição dos processos de tratamento",
    "2. Avaliação da necessidade e proporcionalidade",
    "3. Identificação de riscos aos titulares",
    "4. Medidas de mitigação e segurança",
    "5. Documentação e revisão periódica",
    "",
  ];

  if (descricao_processamento) {
    linhas.unshift("### Contexto", "", descricao_processamento, "", ...linhas.slice(0, 2));
  }

  linhas.push(
    "**Aviso**: Esta ferramenta é auxiliar e não substitui assessoria jurídica especializada. Consulte a ANPD para orientações oficiais."
  );

  return { content: [{ type: "text" as const, text: linhas.join("\n") }] };
}
