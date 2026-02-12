import { describe, it, expect } from "vitest";
import { consultarDireitosTitular } from "../../src/tools/consultar-direitos-titular.js";

describe("consultarDireitosTitular", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await consultarDireitosTitular({});
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
  });

  it("inclui todos os direitos do Art. 18", async () => {
    const result = await consultarDireitosTitular({});
    const text = result.content[0].text;
    expect(text).toContain("Confirmação da existência de tratamento");
    expect(text).toContain("Acesso aos dados");
    expect(text).toContain("Revogação do consentimento");
  });

  it("inclui aviso de não-substituição", async () => {
    const result = await consultarDireitosTitular({});
    expect(result.content[0].text).toContain("assessoria jurídica");
  });
});
