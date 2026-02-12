import { describe, it, expect } from "vitest";
import { gerarPoliticaPrivacidade } from "../../src/tools/gerar-politica-privacidade.js";

describe("gerarPoliticaPrivacidade", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await gerarPoliticaPrivacidade({
      nome_empresa: "Empresa XYZ",
    });
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
    expect(result.content[0].text).toContain("Empresa XYZ");
  });

  it("inclui aviso de não-substituição", async () => {
    const result = await gerarPoliticaPrivacidade({
      nome_empresa: "Teste",
    });
    expect(result.content[0].text).toContain("assessoria jurídica");
  });
});
