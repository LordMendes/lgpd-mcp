# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2025-02-12

### Adicionado

- Servidor MCP completo com transporte stdio e HTTP
- **Ferramentas (Tools):**
  - `validar_base_legal` — validação de base legal (Art. 7º e 11º)
  - `verificar_consentimento` — validação de consentimento (Art. 8º)
  - `gerar_modelo_consentimento` — modelo de termo de consentimento
  - `avaliar_necessidade_pia` — indicação de necessidade de PIA/RIPD (Art. 38)
  - `checklist_compliance` — checklist de conformidade LGPD
  - `gerar_politica_privacidade` — estrutura de política de privacidade
  - `consultar_direitos_titular` — direitos do titular (Arts. 17 e 18)
  - `mapear_dados_sensiveis` — identificação de dados sensíveis (Art. 11º)
  - `avaliar_risco_tratamento` — avaliação de risco de tratamento
- **Recursos (Resources):**
  - `lgpd://fundamentos` — fundamentos e princípios
  - `lgpd://artigos` — referência aos artigos principais
  - `lgpd://base-legal` — tabela de bases legais
  - `lgpd://glossario` — glossário de termos
  - `lgpd://anpd` — ANPD e regulamentações
- **Prompts:**
  - `revisar_politica` — revisão de política de privacidade
  - `preparar_resposta_titular` — modelo de resposta ao titular
  - `avaliar_cenario` — análise de cenário de tratamento
  - `gerar_documentacao` — documentação de processos internos
- Testes unitários para ferramentas
- Documentação: README, TOOLS, RESOURCES, PROMPTS, CURSOR, CLAUDE_DESKTOP
- Aviso legal e documento de segurança

### Técnico

- Stack: TypeScript, Node.js 18+, MCP SDK
- Dependências: `@modelcontextprotocol/sdk`, `zod`
- ESLint e Prettier configurados
