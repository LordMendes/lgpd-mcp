import { describe, it, expect } from "vitest";
import { validarBaseLegal } from "../../src/tools/validar-base-legal.js";

describe("validarBaseLegal", () => {
  it("retorna formato de saída esperado (content array com text)", async () => {
    const result = await validarBaseLegal({
      base_legal: "consentimento",
      tipo_dado: "pessoal",
    });
    expect(result).toHaveProperty("content");
    expect(Array.isArray(result.content)).toBe(true);
    expect(result.content.length).toBeGreaterThan(0);
    expect(result.content[0]).toHaveProperty("type", "text");
    expect(result.content[0]).toHaveProperty("text");
    expect(typeof result.content[0].text).toBe("string");
  });

  it("valida base legal consentimento para dados pessoais", async () => {
    const result = await validarBaseLegal({
      base_legal: "consentimento",
      tipo_dado: "pessoal",
    });
    expect(result.content[0].text).toContain("Válida");
  });

  it("valida base legal inválida para dados pessoais", async () => {
    const result = await validarBaseLegal({
      base_legal: "base_inexistente",
      tipo_dado: "pessoal",
    });
    expect(result.content[0].text).toContain("Inválida");
  });

  it("inclui aviso de não-substituição de assessoria jurídica", async () => {
    const result = await validarBaseLegal({
      base_legal: "consentimento",
      tipo_dado: "pessoal",
    });
    expect(result.content[0].text).toContain("assessoria jurídica");
  });

  it("aceita finalidade opcional", async () => {
    const result = await validarBaseLegal({
      base_legal: "obrigacao_legal",
      tipo_dado: "pessoal",
      finalidade: "cumprimento do e-Social",
    });
    expect(result.content[0].text).toContain("e-Social");
  });
});
