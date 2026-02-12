# Prompts

Esta seção documenta cada prompt disponível no servidor MCP LGPD. Os prompts são templates de interação que orientam o modelo de linguagem a executar tarefas específicas de conformidade LGPD.

---

## revisar_politica

**Título:** Revisar Política de Privacidade

**Descrição:** Revisão de política de privacidade sob a ótica da LGPD (princípios, bases legais, direitos do titular, transparência).

### Parâmetros

| Parâmetro       | Tipo   | Obrigatório | Descrição                                   |
| --------------- | ------ | ----------- | ------------------------------------------- |
| `texto_politica`| string | Sim         | Texto da política de privacidade a ser revisada |

### O que o prompt faz

Solicita ao modelo que revise a política considerando: princípios do tratamento (Art. 6º), bases legais (Arts. 7º e 11º), consentimento (Art. 8º), direitos do titular (Arts. 17 e 18), transparência e canal do DPO (Art. 41).

---

## preparar_resposta_titular

**Título:** Preparar Resposta ao Titular

**Descrição:** Modelo de resposta formal a solicitação de titular (Art. 18 LGPD).

### Parâmetros

| Parâmetro        | Tipo   | Obrigatório | Descrição                                                                 |
| ---------------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `tipo_solicitacao`| enum  | Sim         | Tipo de solicitação: `acesso`, `correção`, `eliminação`, `portabilidade`, `revogação`, `informação_compartilhamento` ou `outro` |
| `contexto`       | string | Não         | Contexto adicional (ex: setor, base legal do tratamento, prazos desejados) |

### O que o prompt faz

Solicita ao modelo que elabore um modelo de resposta formal (carta ou e-mail) adequado ao tipo de solicitação, em conformidade com o Art. 18 da LGPD.

---

## avaliar_cenario

**Título:** Avaliar Cenário de Tratamento

**Descrição:** Análise de cenário de tratamento de dados e conformidade LGPD (base legal, PIA, riscos).

### Parâmetros

| Parâmetro          | Tipo   | Obrigatório | Descrição                                                                 |
| ------------------ | ------ | ----------- | ------------------------------------------------------------------------- |
| `descricao_cenario`| string | Sim         | Descrição do cenário de tratamento (atividade, dados envolvidos, finalidade, sujeitos) |

### O que o prompt faz

Solicita ao modelo que analise o cenário e forneça: identificação do tratamento, base legal adequada, princípios (Art. 6º), necessidade de PIA/RIPD (Art. 38), riscos e mitigação, e resumo de conformidade.

---

## gerar_documentacao

**Título:** Gerar Documentação de Processos

**Descrição:** Estrutura de documentação para processos internos (registro de atividades, PIA, incidente, mapeamento).

### Parâmetros

| Parâmetro       | Tipo   | Obrigatório | Descrição                                                               |
| --------------- | ------ | ----------- | ----------------------------------------------------------------------- |
| `tipo_processo` | string | Sim         | Tipo de processo: `registro_atividades`, `pia`, `incidente`, `mapeamento` ou outro |
| `contexto`      | string | Não         | Contexto adicional (ex: setor, porte da organização, tipos de dados)     |

### O que o prompt faz

Solicita ao modelo que sugira estrutura e itens de documentação para o processo interno, incluindo objetivo, fundamento legal, conteúdo mínimo e responsáveis sugeridos.

---

## Aviso

Todas os prompts são auxiliares e **não substituem assessoria jurídica especializada**. Consulte a [ANPD](https://www.gov.br/anpd) para orientações oficiais.
