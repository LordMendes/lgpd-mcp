import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getFundamentosContent } from "./content/fundamentos.js";
import { getArtigosContent } from "./content/artigos.js";
import { getBaseLegalContent } from "./content/base-legal.js";
import { getGlossarioContent } from "./content/glossario.js";
import { getAnpdContent } from "./content/anpd.js";

export function registerResources(server: McpServer): void {
  server.registerResource(
    "fundamentos",
    "lgpd://fundamentos",
    {
      title: "Fundamentos e Princípios LGPD",
      description:
        "Fundamentos constitucionais e princípios do tratamento de dados (Art. 1º e 6º)",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, text: getFundamentosContent() }],
    })
  );

  server.registerResource(
    "artigos",
    "lgpd://artigos",
    {
      title: "Referência aos Artigos Principais",
      description: "Artigos principais da LGPD e temas correspondentes",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, text: getArtigosContent() }],
    })
  );

  server.registerResource(
    "base-legal",
    "lgpd://base-legal",
    {
      title: "Bases Legais para Tratamento",
      description: "Tabela de bases legais do Art. 7º e 11º (dados e dados sensíveis)",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, text: getBaseLegalContent() }],
    })
  );

  server.registerResource(
    "glossario",
    "lgpd://glossario",
    {
      title: "Glossário LGPD",
      description: "Definições de termos: titular, controlador, operador, tratamento, DPO, PIA, etc.",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, text: getGlossarioContent() }],
    })
  );

  server.registerResource(
    "anpd",
    "lgpd://anpd",
    {
      title: "ANPD e Regulamentações",
      description: "Referências à Agência Nacional de Proteção de Dados, regulamentações, guias e materiais orientativos",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, text: getAnpdContent() }],
    })
  );
}
