import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  revisarPoliticaArgsSchema,
  revisarPoliticaPrompt,
} from "./revisar-politica.js";
import {
  prepararRespostaTitularArgsSchema,
  prepararRespostaTitularPrompt,
} from "./preparar-resposta-titular.js";
import {
  avaliarCenarioArgsSchema,
  avaliarCenarioPrompt,
} from "./avaliar-cenario.js";
import {
  gerarDocumentacaoArgsSchema,
  gerarDocumentacaoPrompt,
} from "./gerar-documentacao.js";

export function registerPrompts(server: McpServer): void {
  server.registerPrompt(
    "revisar_politica",
    {
      title: "Revisar Política de Privacidade",
      description:
        "Revisão de política de privacidade sob a ótica da LGPD (princípios, bases legais, direitos do titular, transparência)",
      argsSchema: revisarPoliticaArgsSchema,
    },
    revisarPoliticaPrompt
  );

  server.registerPrompt(
    "preparar_resposta_titular",
    {
      title: "Preparar Resposta ao Titular",
      description:
        "Modelo de resposta formal a solicitação de titular (Art. 18 LGPD)",
      argsSchema: prepararRespostaTitularArgsSchema,
    },
    prepararRespostaTitularPrompt
  );

  server.registerPrompt(
    "avaliar_cenario",
    {
      title: "Avaliar Cenário de Tratamento",
      description:
        "Análise de cenário de tratamento de dados e conformidade LGPD (base legal, PIA, riscos)",
      argsSchema: avaliarCenarioArgsSchema,
    },
    avaliarCenarioPrompt
  );

  server.registerPrompt(
    "gerar_documentacao",
    {
      title: "Gerar Documentação de Processos",
      description:
        "Estrutura de documentação para processos internos (registro de atividades, PIA, incidente, mapeamento)",
      argsSchema: gerarDocumentacaoArgsSchema,
    },
    gerarDocumentacaoPrompt
  );
}
