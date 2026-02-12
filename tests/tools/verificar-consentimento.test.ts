import { describe, it, expect } from "vitest";
import { verificarConsentimento } from "../../src/tools/verificar-consentimento.js";

describe("verificarConsentimento", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await verificarConsentimento({
      criterios: {},
    });
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
    expect(result.content[0]).toHaveProperty("text");
  });

  it("identifica conformidade integral quando todos os critérios atendidos", async () => {
    const result = await verificarConsentimento({
      criterios: {
        destacado: true,
        informado: true,
        inequivoco: true,
        revogavel: true,
        documentado: true,
      },
    });
    expect(result.content[0].text).toContain("Conformidade integral");
  });

  it("identifica não conformidade quando critérios não atendidos", async () => {
    const result = await verificarConsentimento({
      criterios: {
        destacado: false,
        informado: true,
        inequivoco: true,
        revogavel: true,
        documentado: true,
      },
    });
    expect(result.content[0].text).toContain("Não conformidade");
  });

  it("inclui aviso de não-substituição de assessoria jurídica", async () => {
    const result = await verificarConsentimento({
      criterios: {},
    });
    expect(result.content[0].text).toContain("assessoria jurídica");
  });
});
