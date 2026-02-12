# lgpd-mcp

Servidor MCP (Model Context Protocol) para auxiliar organizações e desenvolvedores na conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei 13.709/2018).

## Recursos

- **9 ferramentas** para validação de bases legais, consentimento, modelos de documentos, PIA, checklist, políticas, direitos do titular, mapeamento de dados sensíveis e avaliação de risco
- **5 recursos** de referência: fundamentos, artigos, bases legais, glossário e ANPD
- **4 prompts** para revisão de política, resposta ao titular, avaliação de cenário e documentação

## Requisitos

- Node.js 18+
- pnpm, npm ou yarn

## Instalação

### Via npm (recomendado)

```bash
npx @lordmendes/lgpd-mcp
```

Ou instale globalmente:

```bash
npm install -g @lordmendes/lgpd-mcp
lgpd-mcp
```

### Via repositório

```bash
git clone https://github.com/LordMendes/lgpd-mcp.git
cd lgpd-mcp

# Instale as dependências
pnpm install
# ou: npm install
# ou: yarn install

# Compile o projeto (obrigatório para produção)
pnpm build
```

## Uso

### Modo stdio (padrão)

O servidor é executado via stdio e espera conexões de clientes MCP (Cursor, Claude Desktop, etc.):

```bash
# Se instalado via npm
npx @lordmendes/lgpd-mcp

# Desenvolvimento local
npx tsx src/index.ts
```

### Modo HTTP (remoto)

Para execução como servidor HTTP (uso remoto):

```bash
pnpm start:http
# ou: npx tsx src/http.ts
```

O servidor HTTP escuta na porta definida por `MCP_PORT` (padrão: 3000). Endpoint: `POST /mcp`. Consulte [docs/HTTP.md](docs/HTTP.md) para detalhes de integração.

### Teste com MCP Inspector

```bash
pnpm test:mcp
# ou: npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

## Configuração

### Cursor

Veja [docs/CURSOR.md](docs/CURSOR.md) para instruções detalhadas de configuração no Cursor.

### Claude Desktop

Veja [docs/CLAUDE_DESKTOP.md](docs/CLAUDE_DESKTOP.md) para instruções de configuração no Claude Desktop.

## Variáveis de ambiente

| Variável   | Descrição                      | Padrão |
| ---------- | ------------------------------ | ------ |
| `MCP_PORT` | Porta do servidor HTTP (modo remoto) | 3000   |

Consulte `.env.example` para referência.

## Documentação

- [Publicação (Publishing)](docs/PUBLISHING.md) — como publicar no npm e MCP Registry
- [Ferramentas (Tools)](docs/TOOLS.md) — descrição de cada tool
- [Recursos (Resources)](docs/RESOURCES.md) — descrição de cada resource
- [Prompts](docs/PROMPTS.md) — descrição de cada prompt
- [Configuração Cursor](docs/CURSOR.md) — instruções para Cursor
- [Configuração Claude Desktop](docs/CLAUDE_DESKTOP.md) — instruções para Claude Desktop
- [Transporte HTTP](docs/HTTP.md) — uso remoto via HTTP
- [Aviso Legal](docs/DISCLAIMER.md) — não substitui assessoria jurídica
- [Segurança](docs/SECURITY.md) — práticas de segurança do projeto

## Scripts

| Script        | Descrição                              |
| ------------- | -------------------------------------- |
| `pnpm dev`    | Executa o servidor em modo desenvolvimento |
| `pnpm start`  | Executa o servidor compilado           |
| `pnpm build`  | Compila TypeScript                     |
| `pnpm test`   | Executa testes unitários               |
| `pnpm lint`   | Verifica código com ESLint             |
| `pnpm format` | Formata código com Prettier            |

## Aviso importante

**Todas as ferramentas são auxiliares e não substituem assessoria jurídica especializada.** Consulte sempre um advogado ou consultor em proteção de dados para decisões jurídicas. Para orientações oficiais, acesse a [ANPD](https://www.gov.br/anpd).

## Licença

MIT
