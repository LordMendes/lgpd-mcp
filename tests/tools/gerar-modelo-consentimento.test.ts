import { describe, it, expect } from "vitest";
import { gerarModeloConsentimento } from "../../src/tools/gerar-modelo-consentimento.js";

describe("gerarModeloConsentimento", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await gerarModeloConsentimento({
      finalidade: "Envio de newsletter",
    });
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
    expect(result.content[0].text).toContain("Envio de newsletter");
  });

  it("inclui finalidade no template", async () => {
    const result = await gerarModeloConsentimento({
      finalidade: "Processamento de pedidos",
    });
    expect(result.content[0].text).toContain("Processamento de pedidos");
  });

  it("inclui aviso de não-substituição", async () => {
    const result = await gerarModeloConsentimento({
      finalidade: "teste",
    });
    expect(result.content[0].text).toContain("Não substitui assessoria jurídica");
  });
});
