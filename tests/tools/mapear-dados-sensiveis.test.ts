import { describe, it, expect } from "vitest";
import { mapearDadosSensiveis } from "../../src/tools/mapear-dados-sensiveis.js";

describe("mapearDadosSensiveis", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await mapearDadosSensiveis({});
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
  });

  it("lista categorias sensíveis do Art. 11º", async () => {
    const result = await mapearDadosSensiveis({});
    const text = result.content[0].text;
    expect(text).toContain("Origem racial ou étnica");
    expect(text).toContain("Dados de saúde");
  });

  it("inclui aviso de não-substituição", async () => {
    const result = await mapearDadosSensiveis({});
    expect(result.content[0].text).toContain("assessoria jurídica");
  });
});
