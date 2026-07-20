# WhatsApp Cloud API — checklist de produção

Por qué importa: o WhatsApp de confirmação da vistoria precisa sair de um número
oficial da Amper, com token que não expira. Sem isso, o lançamento fica preso ao
número de teste (máx. 5 destinatários).

## Dados já obtidos
- App Meta: `Amper` — ID `1342149861339147` (tipo Empresa)
- WhatsApp Business Account ID: `1590786279182457`
- Phone Number ID (TESTE): `1197810656753566` — número +1 (555) 152-7414
- Portfólio: Amper99 Carros & Caminhões
- Teste "Hello World" recebido com sucesso ✅

## Decisões
- Número oficial: **número novo, exclusivo da API** (não migrar o atendimento atual)
- Verificação da empresa: CNPJ e documentos disponíveis

## Ordem de execução

### 1. Token permanente (sem espera)
business.facebook.com → Configurações do negócio → Usuários do sistema → Adicionar
- Nome `amper-api`, função Administrador
- Adicionar ativos → Apps → `Amper` → Gerenciar app
- Adicionar ativos → Contas do WhatsApp → conta `1590786279182457` → controle total
- Gerar novo token → app `Amper` → **Nunca expira** →
  permissões `whatsapp_business_messaging` + `whatsapp_business_management`

### 2. Template (aprovação: minutos a horas)
WhatsApp Manager → Modelos de mensagem → Criar modelo
- Categoria **Utilitário** · Nome `vistoria_confirmada` · Idioma **Português (BR)**
- Corpo:
  ```
  Vistoria agendada na Amper!
  Veículo: {{1}}
  Quando: {{2}}
  Importante: a vistoria é uma etapa de avaliação e não garante a aprovação do
  crédito. O valor final depende da análise do veículo e da documentação.
  ```
- Exemplos obrigatórios: {{1}} = `ABC1D23` · {{2}} = `22/07/2026 14:00`
- Sem exemplo preenchido → rejeição automática

### 3. Verificação da empresa (dias)
Painel do app → Etapa 3. Verificação da empresa → CNPJ + comprovante de endereço

### 4. Registrar o número novo (após verificação)
Etapa 2. Configuração da produção → Adicionar número
- O número **não pode estar ativo no WhatsApp comum nem no WhatsApp Business app**
- Precisa receber SMS ou ligação para verificar
- Gera um **novo Phone Number ID** → atualizar o secret

### 5. Secrets no Supabase (Edge Functions → Secrets)
| Name | Valor |
|---|---|
| `WHATSAPP_TOKEN` | token permanente do passo 1 |
| `WHATSAPP_PHONE_ID` | Phone Number ID (teste agora, número real depois) |
| `WHATSAPP_TEMPLATE` | opcional — só se o nome do template for diferente de `vistoria_confirmada` |

Depois: republicar `agendamento-webhook` (aba Code → colar → Deploy).

## Por que template e não texto livre
A Meta só permite texto livre dentro de 24h após o CLIENTE escrever para a empresa.
Como quem inicia a conversa somos nós (o cliente preencheu um formulário no site),
é obrigatório usar template aprovado. O código já envia como template.

## Estratégia de lançamento
Configurar tudo com o Phone Number ID de TESTE assim que o template aprovar
(fluxo completo validado, sem esperar a verificação). Quando o número real for
registrado, trocar **apenas** `WHATSAPP_PHONE_ID` — nada mais muda.
