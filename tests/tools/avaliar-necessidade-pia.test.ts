import { describe, it, expect } from "vitest";
import { avaliarNecessidadePia } from "../../src/tools/avaliar-necessidade-pia.js";

describe("avaliarNecessidadePia", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await avaliarNecessidadePia({
      criterios: {},
    });
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
    expect(result.content[0]).toHaveProperty("text");
  });

  it("indica necessidade alta quando múltiplos critérios de risco", async () => {
    const result = await avaliarNecessidadePia({
      criterios: {
        dados_sensiveis_volume: true,
        monitoramento_sistematico: true,
        decisao_automatizada: true,
      },
    });
    expect(result.content[0].text).toContain("ALTA");
  });

  it("indica necessidade avaliar quando nenhum critério de risco", async () => {
    const result = await avaliarNecessidadePia({
      criterios: {
        dados_sensiveis_volume: false,
        monitoramento_sistematico: false,
        interesse_legitimo: false,
        decisao_automatizada: false,
        compartilhamento_massivo: false,
        dados_vulneraveis: false,
      },
    });
    expect(result.content[0].text).toContain("AVALIAR");
  });

  it("inclui aviso de não-substituição de assessoria jurídica", async () => {
    const result = await avaliarNecessidadePia({
      criterios: {},
    });
    expect(result.content[0].text).toContain("assessoria jurídica");
  });
});
