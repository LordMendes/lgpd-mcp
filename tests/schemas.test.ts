/**
 * Validação de schemas de entrada/saída das tools.
 * Garante que todas as tools retornam o formato esperado pelo MCP.
 */
import { describe, it, expect } from "vitest";
import { validarBaseLegal } from "../src/tools/validar-base-legal.js";
import { verificarConsentimento } from "../src/tools/verificar-consentimento.js";
import { gerarModeloConsentimento } from "../src/tools/gerar-modelo-consentimento.js";
import { avaliarNecessidadePia } from "../src/tools/avaliar-necessidade-pia.js";
import { checklistCompliance } from "../src/tools/checklist-compliance.js";
import { gerarPoliticaPrivacidade } from "../src/tools/gerar-politica-privacidade.js";
import { consultarDireitosTitular } from "../src/tools/consultar-direitos-titular.js";
import { mapearDadosSensiveis } from "../src/tools/mapear-dados-sensiveis.js";
import { avaliarRiscoTratamento } from "../src/tools/avaliar-risco-tratamento.js";

const expectMcpToolOutput = (result: unknown) => {
  expect(result).toBeDefined();
  expect(result).toHaveProperty("content");
  expect(Array.isArray((result as { content: unknown[] }).content)).toBe(true);
  const content = (result as { content: Array<{ type: string; text: string }> }).content;
  expect(content.length).toBeGreaterThan(0);
  expect(content[0]).toHaveProperty("type", "text");
  expect(content[0]).toHaveProperty("text");
  expect(typeof content[0].text).toBe("string");
  expect(content[0].text.length).toBeGreaterThan(0);
};

describe("Validação de schemas de saída", () => {
  it("validarBaseLegal retorna formato MCP esperado", async () => {
    const result = await validarBaseLegal({
      base_legal: "consentimento",
      tipo_dado: "pessoal",
    });
    expectMcpToolOutput(result);
  });

  it("verificarConsentimento retorna formato MCP esperado", async () => {
    const result = await verificarConsentimento({ criterios: {} });
    expectMcpToolOutput(result);
  });

  it("gerarModeloConsentimento retorna formato MCP esperado", async () => {
    const result = await gerarModeloConsentimento({
      finalidade: "teste",
    });
    expectMcpToolOutput(result);
  });

  it("avaliarNecessidadePia retorna formato MCP esperado", async () => {
    const result = await avaliarNecessidadePia({ criterios: {} });
    expectMcpToolOutput(result);
  });

  it("checklistCompliance retorna formato MCP esperado", async () => {
    const result = await checklistCompliance({ cenario: "teste" });
    expectMcpToolOutput(result);
  });

  it("gerarPoliticaPrivacidade retorna formato MCP esperado", async () => {
    const result = await gerarPoliticaPrivacidade({ nome_empresa: "Teste" });
    expectMcpToolOutput(result);
  });

  it("consultarDireitosTitular retorna formato MCP esperado", async () => {
    const result = await consultarDireitosTitular({});
    expectMcpToolOutput(result);
  });

  it("mapearDadosSensiveis retorna formato MCP esperado", async () => {
    const result = await mapearDadosSensiveis({});
    expectMcpToolOutput(result);
  });

  it("avaliarRiscoTratamento retorna formato MCP esperado", async () => {
    const result = await avaliarRiscoTratamento({
      descricao: "teste",
      respostas: {},
    });
    expectMcpToolOutput(result);
  });
});
