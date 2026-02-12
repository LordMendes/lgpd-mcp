# Publicação no MCP Registry

Este documento descreve como publicar o lgpd-mcp no [MCP Registry](https://registry.modelcontextprotocol.io) e no npm.

## Pré-requisitos

- Conta no [npm](https://www.npmjs.com)
- Conta no [GitHub](https://github.com)
- [mcp-publisher](https://github.com/modelcontextprotocol/registry/releases) instalado

## Passos

### 1. Build e publicar no npm

```bash
pnpm install
pnpm build
npm publish --access public
```

### 2. Autenticar no MCP Registry

```bash
mcp-publisher login github
```

### 3. Publicar no MCP Registry

```bash
mcp-publisher publish
```

**Importante:** Os campos `name` em `server.json` e `mcpName` em `package.json` devem ser idênticos e, para autenticação via GitHub, devem começar com `io.github.seu-usuario/`.

## Verificação

- **npm:** https://www.npmjs.com/package/@lordmendes/lgpd-mcp
- **MCP Registry:** https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.LordMendes/lgpd-mcp
