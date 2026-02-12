# Transporte HTTP (uso remoto)

O servidor LGPD MCP suporta transporte HTTP para uso remoto (ex.: servidor em máquina separada ou container).

## Iniciar o servidor HTTP

```bash
pnpm start:http
# ou
MCP_PORT=3000 npx tsx src/http.ts
```

O servidor escuta na porta definida por `MCP_PORT` (padrão: 3000).

## Endpoints

| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| POST   | /mcp     | Inicializa sessão (sem session ID) ou processa requisição MCP (com session ID) |
| GET    | /mcp     | Requisição MCP (SSE/streaming) — requer `mcp-session-id` |
| DELETE | /mcp     | Encerra sessão — requer `mcp-session-id` |

## Fluxo de uso

1. **Inicialização:** Envie `POST /mcp` com corpo de inicialização MCP. O servidor retorna `mcp-session-id` no header de resposta.
2. **Requisições:** Inclua o header `mcp-session-id` em todas as requisições subsequentes (POST ou GET).
3. **Encerramento:** Envie `DELETE /mcp` com `mcp-session-id` para encerrar a sessão.

## Configuração em clientes

Clientes MCP que suportam transporte HTTP podem ser configurados com a URL do servidor, por exemplo: `http://localhost:3000/mcp`. Consulte a documentação do cliente para o formato exato.

## Segurança

- O servidor não implementa autenticação por padrão. Em ambiente de produção, use um proxy reverso com autenticação (ex.: API key, OAuth) ou rede privada.
- Não exponha o servidor diretamente à internet sem medidas de segurança adicionais.
