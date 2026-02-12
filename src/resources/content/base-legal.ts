/**
 * Conteúdo do recurso lgpd://base-legal - Tabela de bases legais com descrições detalhadas (Art. 7º e 11º).
 */

export function getBaseLegalContent(): string {
  return `# Bases Legais para Tratamento - LGPD (Art. 7º e 11º)

## Dados pessoais em geral (Art. 7º)

O tratamento de dados pessoais somente poderá ser realizado nas seguintes hipóteses:

---

### I - Consentimento do titular

**Descrição**: Mediante o fornecimento de consentimento pelo titular.

**Quando usar**: Quando não há outra base legal aplicável e o titular pode dar consentimento livre, informado e inequívoco. Ex.: newsletter, marketing, cadastro em aplicativo.

**Observações**: Deve ser específico para finalidade determinada; pode ser revogado a qualquer momento; cláusula destacada quando por escrito.

---

### II - Cumprimento de obrigação legal ou regulatória

**Descrição**: Para o cumprimento de obrigação legal ou regulatória pelo controlador.

**Quando usar**: Quando lei ou norma exige o tratamento. Ex.: envio de informações à Receita Federal, obrigações trabalhistas (e-Social), registro de clientes (CNH, CPF).

**Observações**: A obrigação deve estar expressa em lei ou regulamento; documentar qual norma fundamenta o tratamento.

---

### III - Administração pública e políticas públicas

**Descrição**: Pela administração pública, para o tratamento e uso compartilhado de dados necessários à execução de políticas públicas previstas em leis e regulamentos ou respaldadas em contratos, convênios ou instrumentos congêneres.

**Quando usar**: Órgãos e entidades públicas no exercício de políticas públicas. Ex.: cadastro único, programas sociais, saúde pública.

**Observações**: Observar disposições do Cap. IV da LGPD; uso compartilhado entre órgãos públicos com autorização específica.

---

### IV - Estudos por órgão de pesquisa

**Descrição**: Para a realização de estudos por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais.

**Quando usar**: Universidades, institutos de pesquisa, entidades sem fins lucrativos com finalidade estatística ou científica. Ex.: pesquisas epidemiológicas, estudos demográficos.

**Observações**: Órgão de pesquisa conforme definição do Art. 5º, XVIII; priorizar anonimização; dados em ambiente controlado.

---

### V - Execução de contrato

**Descrição**: Quando necessário para a execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados.

**Quando usar**: Relação contratual vigente ou em formação. Ex.: dados para entrega de produto, processamento de pagamento, gestão de conta.

**Observações**: O titular deve ser parte do contrato; dados limitados ao necessário para o contrato.

---

### VI - Exercício regular de direitos

**Descrição**: Para o exercício regular de direitos em processo judicial, administrativo ou arbitral.

**Quando usar**: Defesa em juízo, processos administrativos, arbitragem. Ex.: dados para contestação judicial, provas em processo.

**Observações**: Inclui Lei de Arbitragem (Lei 9.307/1996); dados estritamente necessários ao processo.

---

### VII - Proteção da vida ou incolumidade física

**Descrição**: Para a proteção da vida ou da incolumidade física do titular ou de terceiro.

**Quando usar**: Situações de emergência em que a vida ou integridade física está em risco. Ex.: compartilhar dados de saúde em emergência médica, contato de familiar em acidente.

**Observações**: Aplicável em caráter excepcional; fundamentar a necessidade concreta.

---

### VIII - Tutela da saúde

**Descrição**: Para a tutela da saúde, exclusivamente, em procedimento realizado por profissionais de saúde, serviços de saúde ou autoridade sanitária.

**Quando usar**: Tratamento médico, prontuários, telemedicina, vacinação, vigilância sanitária. Ex.: clínicas, hospitais, planos de saúde, farmácias.

**Observações**: Apenas por profissionais ou entidades de saúde; vedado uso para seleção de riscos por operadoras de planos (Art. 11, §5º).

---

### IX - Legítimo interesse

**Descrição**: Quando necessário para atender aos interesses legítimos do controlador ou de terceiro, exceto no caso de prevalecerem direitos e liberdades fundamentais do titular que exijam a proteção dos dados pessoais.

**Quando usar**: Interesses legítimos como segurança patrimonial, prevenção de fraude, suporte ao cliente, melhorias de produto. Ex.: câmeras de segurança, análise de comportamento para antifraude.

**Observações**: Requer análise de ponderação; ANPD pode solicitar RIPD; dados estritamente necessários; transparência obrigatória.

---

### X - Proteção do crédito

**Descrição**: Para a proteção do crédito, inclusive quanto ao disposto na legislação pertinente.

**Quando usar**: Consulta e compartilhamento de dados para análise de crédito, bureau de crédito, prevenção de inadimplência. Ex.: Serasa, SPC, consulta de score.

**Observações**: Observar Lei do Cadastro Positivo e legislação do CDC; finalidade limitada à proteção de crédito.

---

## Disposições gerais (Art. 7º)

- §3º Tratamento de dados de acesso público: considerar finalidade, boa-fé e interesse público.
- §4º Dados manifestamente públicos: dispensado consentimento, resguardados direitos do titular.
- §5º Compartilhamento com outros controladores: requer consentimento específico, salvo hipóteses de dispensa.
- §6º Dispensa de consentimento não desobriga dos princípios e direitos do titular.
- §7º Tratamento posterior para novas finalidades: permitido se legítimo, específico e preservando direitos.

---

## Dados pessoais sensíveis (Art. 11º)

Dados sensíveis: origem racial/étnica, convicções religiosas, opiniões políticas, filiação sindical, saúde, vida sexual, dados genéticos ou biométricos.

### Hipóteses de tratamento (Art. 11º)

**I - Com consentimento**: Específico e destacado, para finalidades específicas.

**II - Sem consentimento** (indispensável):
- a) Obrigação legal ou regulatória
- b) Políticas públicas pela administração pública
- c) Estudos por órgão de pesquisa (anonimização quando possível)
- d) Exercício regular de direitos (contrato, processo)
- e) Proteção da vida ou incolumidade física
- f) Tutela da saúde (profissionais/entidades de saúde)
- g) Prevenção à fraude e segurança do titular (identificação em sistemas eletrônicos)

### Restrições específicas

- §4º Dados de saúde: vedada comunicação/compartilhamento entre controladores com objetivo de vantagem econômica, exceto prestação de serviços de saúde, assistência farmacêutica e portabilidade.
- §5º Operadoras de planos de saúde: vedado tratamento de dados de saúde para seleção de riscos na contratação ou exclusão de beneficiários.

---

## Referências

Lei 13.709/2018, Art. 7º e 11º.
Texto compilado: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709compilado.htm
`;
}
