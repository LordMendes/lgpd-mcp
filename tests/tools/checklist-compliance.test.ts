import { describe, it, expect } from "vitest";
import { checklistCompliance } from "../../src/tools/checklist-compliance.js";

describe("checklistCompliance", () => {
  it("retorna formato de saída esperado", async () => {
    const result = await checklistCompliance({
      cenario: "Cadastro de clientes em e-commerce",
    });
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toHaveProperty("type", "text");
    expect(result.content[0].text).toContain("Cadastro de clientes");
  });

  it("inclui cenário no resultado", async () => {
    const result = await checklistCompliance({
      cenario: "Sistema de prontuário médico",
      ambito: "saude",
    });
    expect(result.content[0].text).toContain("Sistema de prontuário médico");
    expect(result.content[0].text).toContain("Saúde");
  });

  it("inclui aviso de não-substituição de assessoria jurídica", async () => {
    const result = await checklistCompliance({
      cenario: "teste",
    });
    expect(result.content[0].text).toContain("assessoria jurídica");
  });
});
