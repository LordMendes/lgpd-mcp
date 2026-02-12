# Ferramentas (Tools)

Esta seção documenta cada ferramenta disponível no servidor MCP LGPD.

---

## validar_base_legal

Verifica se uma base legal é adequada para determinado tratamento de dados (Art. 7º e 11º LGPD).

### Parâmetros

| Parâmetro    | Tipo     | Obrigatório | Descrição                                                                 |
| ------------ | -------- | ----------- | ------------------------------------------------------------------------- |
| `base_legal` | string   | Sim         | Nome ou identificador da base legal utilizada                             |
| `tipo_dado`  | enum     | Sim         | Tipo de dado: `pessoal` (Art. 7º) ou `sensivel` (Art. 11º)                 |
| `finalidade` | string   | Não         | Finalidade do tratamento para análise de adequação                        |

### Exemplo de uso

```json
{
  "base_legal": "consentimento",
  "tipo_dado": "pessoal",
  "finalidade": "Marketing por e-mail"
}
```

---

## verificar_consentimento

Valida se o consentimento atende aos requisitos do Art. 8º da LGPD.

### Parâmetros

| Parâmetro     | Tipo   | Obrigatório | Descrição                                                                 |
| ------------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `criterios`   | object | Sim         | Objeto com critérios do consentimento                                     |
| `criterios.destacado`   | boolean | Não | O consentimento foi destacado das demais cláusulas?                       |
| `criterios.informado`   | boolean | Não | O titular foi informado sobre finalidade e uso dos dados?                 |
| `criterios.inequivoco`  | boolean | Não | A manifestação foi expressa e inequívoca?                                |
| `criterios.revogavel`  | boolean | Não | Há possibilidade de revogação do consentimento?                          |
| `criterios.documentado`| boolean | Não | O consentimento foi documentado/provado?                                  |
| `observacoes` | string | Não         | Observações adicionais sobre o contexto do consentimento                  |

---

## gerar_modelo_consentimento

Gera modelo de termo de consentimento conforme LGPD (Art. 8º).

### Parâmetros

| Parâmetro    | Tipo     | Obrigatório | Descrição                                                                 |
| ------------ | -------- | ----------- | ------------------------------------------------------------------------- |
| `finalidade` | string   | Sim         | Finalidade do tratamento para a qual o consentimento é solicitado         |
| `dados_coletados` | string | Não | Lista resumida dos dados coletados (ex: nome, e-mail, CPF)               |
| `compartilhamento` | boolean | Não | Se haverá compartilhamento de dados com terceiros                        |
| `retencao`   | string   | Não         | Prazo ou critério de retenção dos dados                                  |
| `dados_sensiveis` | boolean | Não | Se o tratamento envolve dados sensíveis                                 |

---

## avaliar_necessidade_pia

Indica se o tratamento exige Relatório de Impacto (PIA/RIPD) conforme Art. 38 da LGPD.

### Parâmetros

| Parâmetro     | Tipo   | Obrigatório | Descrição                                                                 |
| ------------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `criterios`   | object | Sim         | Objeto com critérios de avaliação                                         |
| `criterios.dados_sensiveis_volume` | boolean | Não | Tratamento de grande volume de dados sensíveis?                   |
| `criterios.monitoramento_sistematico` | boolean | Não | Monitoramento sistemático de titulares em larga escala?           |
| `criterios.interesse_legitimo` | boolean | Não | Base legal em legítimo interesse?                             |
| `criterios.decisao_automatizada` | boolean | Não | Decisões automatizadas com efeitos significativos?               |
| `criterios.compartilhamento_massivo` | boolean | Não | Compartilhamento em massa ou transferência internacional?     |
| `criterios.dados_vulneraveis` | boolean | Não | Tratamento de dados de crianças, idosos ou grupos vulneráveis?  |
| `descricao_processamento` | string | Não | Breve descrição do processamento para contexto                   |

---

## checklist_compliance

Gera checklist de conformidade LGPD para um cenário específico.

### Parâmetros

| Parâmetro | Tipo   | Obrigatório | Descrição                                                                 |
| --------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `cenario` | string | Sim         | Breve descrição do cenário ou processo a ser avaliado                     |
| `ambito`  | enum   | Não         | Âmbito do tratamento: `comercial`, `saude`, `educacao`, `governo` ou `geral` |

---

## gerar_politica_privacidade

Auxilia na estruturação de política de privacidade conforme LGPD.

### Parâmetros

| Parâmetro       | Tipo   | Obrigatório | Descrição                                                                 |
| --------------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `nome_empresa`  | string | Sim         | Nome da empresa ou organização                                            |
| `finalidades`   | string | Não         | Finalidades principais do tratamento (separadas por vírgula)               |
| `dados_coletados` | string | Não       | Tipos de dados coletados (ex: nome, e-mail, CPF)                           |
| `base_legal`    | string | Não         | Bases legais utilizadas (ex: consentimento, execução de contrato)         |
| `compartilhamento` | string | Não      | Se e com quem os dados são compartilhados                                 |
| `retencao`      | string | Não         | Prazo ou critério de retenção dos dados                                   |
| `contato_dpo`   | string | Não         | Canal de contato do encarregado (DPO)                                     |

---

## consultar_direitos_titular

Lista e explica os direitos do titular aplicáveis (Arts. 17 e 18 LGPD).

### Parâmetros

| Parâmetro | Tipo   | Obrigatório | Descrição                                                                 |
| --------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `contexto`| string | Não         | Contexto em que os direitos são consultados (ex: solicitação de acesso)   |

---

## mapear_dados_sensiveis

Ajuda a identificar categorias de dados sensíveis conforme Art. 11º LGPD.

### Parâmetros

| Parâmetro              | Tipo   | Obrigatório | Descrição                                                                 |
| ---------------------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `categorias_informadas`| string | Não         | Categorias de dados que você suspeita serem sensíveis (separadas por vírgula) |
| `contexto`             | string | Não         | Contexto do tratamento para análise                                       |

---

## avaliar_risco_tratamento

Avaliação simplificada de risco de um tratamento de dados pessoais.

### Parâmetros

| Parâmetro  | Tipo   | Obrigatório | Descrição                                                                 |
| ---------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `descricao`| string | Sim         | Descrição do tratamento de dados a ser avaliado                            |
| `respostas`| object | Sim         | Objeto com respostas aos fatores de risco                               |
| `respostas.dados_sensiveis` | boolean | Não | O tratamento envolve dados sensíveis?                           |
| `respostas.volume` | string | Não | Volume estimado: baixo, medio ou alto                               |
| `respostas.compartilhamento` | boolean | Não | Há compartilhamento com terceiros?                             |
| `respostas.retencao_longa` | boolean | Não | O dado é mantido por longo prazo?                               |
| `respostas.decisao_automatizada` | boolean | Não | Há decisões automatizadas com efeitos significativos?               |
| `respostas.grupos_vulneraveis` | boolean | Não | Envolve grupos vulneráveis (crianças, idosos)?                   |

---

## Aviso

Todas as ferramentas são auxiliares e **não substituem assessoria jurídica especializada**. Consulte a [ANPD](https://www.gov.br/anpd) para orientações oficiais.
