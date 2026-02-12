# Configuração no Cursor

Este guia descreve como configurar o servidor MCP LGPD no Cursor IDE.

## Opção 1: Projeto local (recomendado)

### 1. Certifique-se de que o projeto está instalado

```bash
cd /caminho/para/lgpd-mcp
pnpm install
```

### 2. Configure o mcp.json

O Cursor usa o arquivo `.cursor/mcp.json` na raiz do projeto ou na pasta de configuração do usuário.

**Se o projeto já possui `.cursor/mcp.json`**, ele deve conter algo como:

```json
{
  "mcpServers": {
    "lgpd-mcp": {
      "command": "npx",
      "args": ["-y", "tsx", "src/index.ts"]
    }
  }
}
```

### 3. Caminho absoluto (alternativa)

Para maior confiabilidade, use o caminho absoluto do projeto:

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

Substitua `/caminho/absoluto/lgpd-mcp` pelo caminho real do projeto.

### 4. Usando o binário compilado

Se preferir executar o código compilado:

```bash
pnpm build
```

```json
{
  "mcpServers": {
    "lgpd-mcp": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/caminho/absoluto/lgpd-mcp"
    }
  }
}
```

## Opção 2: Configuração global do usuário

Para disponibilizar o servidor em qualquer projeto, adicione a configuração em:

- **Linux/macOS:** `~/.cursor/mcp.json`
- **Windows:** `%USERPROFILE%\.cursor\mcp.json`

Exemplo:

```json
{
  "mcpServers": {
    "lgpd-mcp": {
      "command": "npx",
      "args": ["-y", "tsx", "/home/usuario/projetos/lgpd-mcp/src/index.ts"],
      "cwd": "/home/usuario/projetos/lgpd-mcp"
    }
  }
}
```

## Verificação

1. Reinicie o Cursor ou recarregue a janela (Ctrl/Cmd + Shift + P → "Developer: Reload Window").
2. O servidor deve aparecer na lista de MCP ao usar o Assistente ou Chat.
3. As ferramentas LGPD devem estar disponíveis para invocação pelo modelo.

## Solução de problemas

### O servidor não aparece

- Verifique se o arquivo `mcp.json` está no local correto.
- Confirme que o caminho em `cwd` e `args` está correto.
- Verifique se `npx`, `tsx` e as dependências estão instalados.

### Erro ao executar

- Execute manualmente: `npx tsx src/index.ts` e observe possíveis erros.
- Certifique-se de que o Node.js 18+ está instalado: `node --version`.

### Timeout ou conexão perdida

- O servidor stdio pode levar alguns segundos para iniciar. Aguarde a inicialização completa.
