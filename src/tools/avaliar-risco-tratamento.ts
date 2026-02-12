import * as z from "zod";

export const avaliarRiscoTratamentoSchema = {
  descricao: z.string().describe("Descrição do tratamento de dados a ser avaliado"),
  respostas: z.object({
    dados_sensiveis: z
      .boolean()
      .optional()
      .describe("O tratamento envolve dados sensíveis?"),
    volume: z
      .string()
      .optional()
      .describe("Volume estimado: baixo, medio ou alto"),
    compartilhamento: z
      .boolean()
      .optional()
      .describe("Há compartilhamento com terceiros?"),
    retencao_longa: z
      .boolean()
      .optional()
      .describe("O dado é mantido por longo prazo?"),
    decisao_automatizada: z
      .boolean()
      .optional()
      .describe("Há decisões automatizadas com efeitos significativos?"),
    grupos_vulneraveis: z
      .boolean()
      .optional()
      .describe("Envolve grupos vulneráveis (crianças, idosos)?"),
  }),
};

export async function avaliarRiscoTratamento(args: {
  descricao: string;
  respostas: {
    dados_sensiveis?: boolean;
    volume?: string;
    compartilhamento?: boolean;
    retencao_longa?: boolean;
    decisao_automatizada?: boolean;
    grupos_vulneraveis?: boolean;
  };
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { descricao, respostas } = args;

  const volume = (respostas.volume ?? "").toLowerCase();
  const volumeAlto = volume === "alto" || volume === "grande";

  let pontuacao = 0;

  if (respostas.dados_sensiveis === true) pontuacao += 3;
  if (volumeAlto) pontuacao += 2;
  if (respostas.compartilhamento === true) pontuacao += 1;
  if (respostas.retencao_longa === true) pontuacao += 1;
  if (respostas.decisao_automatizada === true) pontuacao += 2;
  if (respostas.grupos_vulneraveis === true) pontuacao += 2;

  let nivel: "baixo" | "medio" | "alto";
  let cor: string;

  if (pontuacao >= 6) {
    nivel = "alto";
    cor = "alto";
  } else if (pontuacao >= 3) {
    nivel = "medio";
    cor = "médio";
  } else {
    nivel = "baixo";
    cor = "baixo";
  }

  const recomendacoes: string[] = [];

  if (nivel === "alto") {
    recomendacoes.push("Realizar PIA/RIPD (Art. 38 LGPD)",
      "Implementar medidas de segurança reforçadas",
      "Documentar decisões e mitigação de riscos",
      "Considerar consulta à ANPD",
    );
  } else if (nivel === "medio") {
    recomendacoes.push("Documentar o processamento e bases legais",
      "Avaliar necessidade de PIA conforme o contexto",
      "Manter controles de acesso e auditoria",
    );
  } else {
    recomendacoes.push("Manter documentação básica",
      "Revisar periodicamente conforme mudanças no processamento",
    );
  }

  const linhas = [
    "## Avaliação de Risco de Tratamento",
    "",
    "### Tratamento avaliado",
    "",
    descricao,
    "",
    "### Fatores considerados",
    "",
    `- Dados sensíveis: ${respostas.dados_sensiveis === true ? "Sim" : respostas.dados_sensiveis === false ? "Não" : "não informado"}`,
    `- Volume: ${respostas.volume ?? "não informado"}`,
    `- Compartilhamento: ${respostas.compartilhamento === true ? "Sim" : respostas.compartilhamento === false ? "Não" : "não informado"}`,
    `- Retenção longa: ${respostas.retencao_longa === true ? "Sim" : respostas.retencao_longa === false ? "Não" : "não informado"}`,
    `- Decisão automatizada: ${respostas.decisao_automatizada === true ? "Sim" : respostas.decisao_automatizada === false ? "Não" : "não informado"}`,
    `- Grupos vulneráveis: ${respostas.grupos_vulneraveis === true ? "Sim" : respostas.grupos_vulneraveis === false ? "Não" : "não informado"}`,
    "",
    "### Resultado",
    "",
    `- **Pontuação (simplificada)**: ${pontuacao}`,
    `- **Nível de risco**: ${cor.toUpperCase()}`,
    "",
    "### Recomendações",
    "",
    ...recomendacoes.map((r) => `- ${r}`),
    "",
    "**Aviso**: Esta é uma avaliação simplificada. Não substitui PIA nem assessoria jurídica especializada.",
  ];

  return { content: [{ type: "text" as const, text: linhas.join("\n") }] };
}
