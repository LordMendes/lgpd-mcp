# Configuração no Claude Desktop

Este guia descreve como configurar o servidor MCP LGPD no Claude Desktop.

## Pré-requisitos

- Claude Desktop instalado ([claude.ai/download](https://claude.ai/download))
- Node.js 18+ instalado
- Projeto lgpd-mcp clonado e com dependências instaladas

## Localização do arquivo de configuração

O Claude Desktop usa um arquivo JSON para configurar servidores MCP:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

## Configuração

### 1. Abra ou crie o arquivo de configuração

Se o arquivo não existir, crie-o com o conteúdo base:

```json
{
  "mcpServers": {}
}
```

### 2. Adicione o servidor lgpd-mcp

Edite o arquivo e adicione o servidor na seção `mcpServers`:

```json
{
  "mcpServers": {
    "lgpd-mcp": {
      "command": "npx",
      "args": ["-y", "tsx", "/caminho/absoluto/lgpd-mcp/src/index.ts"],
      "cwd": "/caminho/absoluto/lgpd-mcp"
    }
  }
}
```

**Substitua** `/caminho/absoluto/lgpd-mcp` pelo caminho real do projeto no seu sistema.

### 3. Exemplo para macOS

```json
{
  "mcpServers": {
    "lgpd-mcp": {
      "command": "npx",
      "args": ["-y", "tsx", "/Users/seu-usuario/projetos/lgpd-mcp/src/index.ts"],
      "cwd": "/Users/seu-usuario/projetos/lgpd-mcp"
    }
  }
}
```

### 4. Usando o binário compilado

Se preferir usar o código compilado:

```bash
cd /caminho/para/lgpd-mcp
pnpm build
```

```json
{
  "mcpServers": {
    "lgpd-mcp": {
      "command": "node",
      "args": ["/caminho/absoluto/lgpd-mcp/dist/index.js"],
      "cwd": "/caminho/absoluto/lgpd-mcp"
    }
  }
}
```

## Reiniciar o Claude Desktop

Após editar a configuração, feche e reabra o Claude Desktop para que as alterações tenham efeito.

## Verificação

1. Abra o Claude Desktop.
2. Inicie uma conversa.
3. O Claude deve ter acesso às ferramentas LGPD (validar_base_legal, verificar_consentimento, etc.) e aos recursos (lgpd://fundamentos, lgpd://artigos, etc.).
4. Você pode pedir ao Claude para usar as ferramentas, por exemplo: "Valide se o consentimento é adequada base legal para tratamento de dados pessoais em marketing".

## Solução de problemas

### O servidor não carrega

- Verifique se o caminho em `args` e `cwd` está correto e que o diretório existe.
- Confirme que `npx` e `tsx` estão disponíveis: `npx tsx --version`.

### Erro de permissão

- No macOS/Linux, verifique permissões de leitura e execução no diretório do projeto.

### Logs de depuração

- O Claude Desktop pode exibir erros no console. No macOS, você pode ver logs em:
  `~/Library/Logs/Claude/`

### Múltiplos servidores MCP

Se você já tem outros servidores configurados, mantenha a estrutura:

```json
{
  "mcpServers": {
    "outro-servidor": { ... },
    "lgpd-mcp": {
      "command": "npx",
      "args": ["-y", "tsx", "/caminho/lgpd-mcp/src/index.ts"],
      "cwd": "/caminho/lgpd-mcp"
    }
  }
}
```
