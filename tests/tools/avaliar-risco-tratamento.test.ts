import { describe, it, expect } from "vitest";
import { avaliarRiscoTratamento } from "../../src/tools/avaliar-risco-tratamento.js";

describe("avaliarRiscoTratamento", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await avaliarRiscoTratamento({
      descricao: "Tratamento de dados para newsletter",
      respostas: {},
    });
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
    expect(result.content[0].text).toContain("newsletter");
  });

  it("identifica risco alto quando múltiplos fatores", async () => {
    const result = await avaliarRiscoTratamento({
      descricao: "Sistema de saúde com dados sensíveis",
      respostas: {
        dados_sensiveis: true,
        volume: "alto",
        compartilhamento: true,
        decisao_automatizada: true,
        grupos_vulneraveis: true,
      },
    });
    expect(result.content[0].text).toContain("ALTO");
  });

  it("identifica risco baixo quando poucos fatores", async () => {
    const result = await avaliarRiscoTratamento({
      descricao: "Coleta de e-mail para newsletter",
      respostas: {
        dados_sensiveis: false,
        volume: "baixo",
        compartilhamento: false,
      },
    });
    expect(result.content[0].text).toContain("BAIXO");
  });

  it("inclui aviso de não-substituição", async () => {
    const result = await avaliarRiscoTratamento({
      descricao: "teste",
      respostas: {},
    });
    expect(result.content[0].text).toContain("assessoria jurídica");
  });
});
