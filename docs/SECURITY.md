# Segurança e Privacidade - lgpd-mcp

## Armazenamento de dados

**O servidor lgpd-mcp NÃO armazena dados pessoais reais.**

- Nenhum dado pessoal fornecido nas entradas das ferramentas é persistido em disco ou banco de dados
- As ferramentas processam as entradas em memória e retornam apenas o resultado da análise
- No transporte HTTP, as sessões MCP são mantidas em memória (objeto `transports`) apenas durante a conexão ativa; ao encerrar a sessão, os dados são descartados

## Dados sensíveis em logs

**Os logs NÃO devem incluir dados pessoais ou sensíveis.**

- O servidor utiliza `console.error` apenas para erros de inicialização e de tratamento de requisições
- Os erros logados são exceções técnicas (stack trace, mensagem de erro), não o conteúdo das requisições
- O corpo das requisições (que pode conter dados do titular) **nunca** é registrado em log

### Boas práticas para contribuidores

Ao adicionar logs ao código:

1. **Nunca** logue o corpo de requisições (`req.body`) ou argumentos de tools que possam conter dados pessoais
2. **Nunca** logue CPF, e-mail, nome completo ou outros dados identificáveis
3. Se precisar debugar, use identificadores genéricos ou hashes, nunca dados reais
4. Em produção, considere logar apenas códigos de erro e mensagens genéricas

## Variáveis de ambiente

Credenciais e configurações sensíveis devem ser obtidas via variáveis de ambiente (ver `.env.example`). Não inclua valores reais em repositório.

## Dependências

O projeto utiliza dependências mantidas e auditadas. Execute `pnpm audit` periodicamente para verificar vulnerabilidades.
