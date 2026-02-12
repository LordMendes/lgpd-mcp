import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { validarBaseLegal, validarBaseLegalSchema } from "./validar-base-legal.js";
import {
  verificarConsentimento,
  verificarConsentimentoSchema,
} from "./verificar-consentimento.js";
import {
  gerarModeloConsentimento,
  gerarModeloConsentimentoSchema,
} from "./gerar-modelo-consentimento.js";
import {
  avaliarNecessidadePia,
  avaliarNecessidadePiaSchema,
} from "./avaliar-necessidade-pia.js";
import {
  checklistCompliance,
  checklistComplianceSchema,
} from "./checklist-compliance.js";
import {
  gerarPoliticaPrivacidade,
  gerarPoliticaPrivacidadeSchema,
} from "./gerar-politica-privacidade.js";
import {
  consultarDireitosTitular,
  consultarDireitosTitularSchema,
} from "./consultar-direitos-titular.js";
import {
  mapearDadosSensiveis,
  mapearDadosSensiveisSchema,
} from "./mapear-dados-sensiveis.js";
import {
  avaliarRiscoTratamento,
  avaliarRiscoTratamentoSchema,
} from "./avaliar-risco-tratamento.js";

export function registerTools(server: McpServer): void {
  server.registerTool(
    "validar_base_legal",
    {
      title: "Validar Base Legal",
      description:
        "Verifica se uma base legal é adequada para determinado tratamento de dados (Art. 7º e 11º LGPD)",
      inputSchema: validarBaseLegalSchema,
    },
    validarBaseLegal
  );

  server.registerTool(
    "verificar_consentimento",
    {
      title: "Verificar Consentimento",
      description:
        "Valida se o consentimento atende aos requisitos do Art. 8º da LGPD",
      inputSchema: verificarConsentimentoSchema,
    },
    verificarConsentimento
  );

  server.registerTool(
    "gerar_modelo_consentimento",
    {
      title: "Gerar Modelo de Consentimento",
      description:
        "Gera modelo de termo de consentimento conforme LGPD (Art. 8º)",
      inputSchema: gerarModeloConsentimentoSchema,
    },
    gerarModeloConsentimento
  );

  server.registerTool(
    "avaliar_necessidade_pia",
    {
      title: "Avaliar Necessidade de PIA",
      description:
        "Indica se o tratamento exige Relatório de Impacto (PIA/RIPD) conforme Art. 38 da LGPD",
      inputSchema: avaliarNecessidadePiaSchema,
    },
    avaliarNecessidadePia
  );

  server.registerTool(
    "checklist_compliance",
    {
      title: "Checklist de Conformidade",
      description:
        "Gera checklist de conformidade LGPD para um cenário específico",
      inputSchema: checklistComplianceSchema,
    },
    checklistCompliance
  );

  server.registerTool(
    "gerar_politica_privacidade",
    {
      title: "Gerar Política de Privacidade",
      description:
        "Auxilia na estruturação de política de privacidade conforme LGPD",
      inputSchema: gerarPoliticaPrivacidadeSchema,
    },
    gerarPoliticaPrivacidade
  );

  server.registerTool(
    "consultar_direitos_titular",
    {
      title: "Consultar Direitos do Titular",
      description:
        "Lista e explica os direitos do titular aplicáveis (Arts. 17 e 18 LGPD)",
      inputSchema: consultarDireitosTitularSchema,
    },
    consultarDireitosTitular
  );

  server.registerTool(
    "mapear_dados_sensiveis",
    {
      title: "Mapear Dados Sensíveis",
      description:
        "Ajuda a identificar categorias de dados sensíveis conforme Art. 11º LGPD",
      inputSchema: mapearDadosSensiveisSchema,
    },
    mapearDadosSensiveis
  );

  server.registerTool(
    "avaliar_risco_tratamento",
    {
      title: "Avaliar Risco de Tratamento",
      description:
        "Avaliação simplificada de risco de um tratamento de dados pessoais",
      inputSchema: avaliarRiscoTratamentoSchema,
    },
    avaliarRiscoTratamento
  );
}
