---
{ 'home': False }
---

# Referência da API

<p style="margin-top:-5px;">Versão atual <Badge type="tip" text="2.0.0" /></p>

## Comece aqui

### 1. Obtenha suas chaves

Para gerar novas credenciais, favor entrar em contato com <a href="mailto:suporte@nukleo.io">suporte@nukleo.io</a>

:::warning ⚠️ Atenção

- Você não deve **utilizar tokens de API no frontend da sua aplicação** ou usuários maliciosos poderão descobri-los no seu código-fonte. Você deve utilizá-los apenas no seu servidor.

- Você deve **limitar o acesso às credenciais da API** apenas ao número mínimo de pessoas necessário.

- Você não deve **incorporar as credenciais da API no código do seu backend**, mesmo que não seja público - isso aumenta o risco de que elas sejam descobertas. Em vez disso, você deve armazená-las em arquivos de configuração ou variáveis de ambiente.
  :::

### 2. Conheça o básico

<h4 id="format">Formato de requisição e resposta</h4>

- Autenticação baseada em token. As chaves da API devem ser incluídas no cabeçalho de todas as requisições feitas à API.

- Você deve usar um cabeçalho `Content-Type: application/json` em todas as requisições, e as respostas também serão retornadas em JSON com uma estrutura consistente.

- Todas as suas requisições à API devem ser feitas via HTTPS. Qualquer requisição feita via HTTP falhará.

- Os campos de texto suportam UTF-8, mas não permitem certos caracteres especiais.

<h4 id="errors">Erros</h4>

- Todos os erros seguem a mesma estrutura utilizando uma implementação parcial do [RFC7807](https://tools.ietf.org/html/rfc7807).

```json
{
  "detail": "Por favor, verifique se o cabeçalho da sua requisição contém a chave da API e se é uma chave válida.",
  "error": 2002,
  "message": "Acesso não autorizado.",
  "more_info": "https://developer.nukleo.io/errors/2002"
}
```

<h4 id="rate-limit">Limite de requisições</h4>

- É recomendado um volume máximo de 100 requisições por minuto.

- Qualquer requisição acima do limite pode retornar um erro `429 Too Many Requests` (Muitas requisições).

```json
HTTP/2 429 Too Many Requests
Content-Type: application/json

{
  "detail": "Suas requisições estão acima do volume máximo por minuto. Por favor, verifique nossas recomendações e tente novamente mais tarde.",
  "error": 2003,
  "message": "Limite de requisições excedido.",
  "more_info": "https://developer.nukleo.io/errors/2003"
}
```

<h4 id="pagination">Paginação</h4>

- Os recursos da API possuem suporte de paginação para métodos de lista `GET /{{recurso}}`. Por exemplo, você pode listar [Receipts](#receipts), [Customers](#customers) e [Companies](#companies).

- Esses métodos de API de lista têm uma estrutura comum, aceitando três parâmetros principais: tamanho (`size`), página (`page`) e ordenação (`order_by`).

| Campo | Tipo | Descrição | Obrigatório | Valor Padrão | Valor Min. | Valor Max. |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">size</p> | `integer` | Quantidade de registros por página (tamanho da página) | `false` | `100` | `1` | `500` |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">page</p> | `integer` | Número da página atual | `false` | `1` | `-` | `-` |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">order_by</p> | `string` | Ordenar registros por um campo específico | `false` | `created_at DESC` | `-` | `-` |

<h4 id="search">Busca</h4>

- Os recursos da API possuem suporte para busca de registros específicos. Por exemplo, você pode pesquisar por [Receipts](#receipts), [Customers](#customers) e [Companies](#companies).

- Todos os métodos de API de lista aceitam um parâmetro genérico de busca: `search`.

| Campo | Tipo | Descrição | Obrigatório | Valor Padrão
| :--- | :--- | :--- | :---: | :---: |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">search</p> | `string` | Filtrar registros entre variáveis | `false` | `-` |

## Recursos principais

A seguir estão os principais recursos disponíveis na API da **nukleo.io**. Para cada recurso, deverá haver um endpoint disponível para fazer requisições.

| Recurso                                       | Descrição                                         |
| :-------------------------------------------- | :------------------------------------------------ |
| [Receipts](#receipts) :receipt:               | Busque as notas emitidas por sua organização      |
| [Customers](#customers) :tipping_hand_person: | Busque os clientes cadastrados em sua organização |
| [Companies](#companies) :office:              | Busque as empresas cadastradas em sua organização |

### Receipts

Este é um objeto que representa as Notas Fiscais.

#### Endpoints

| Nome                                                             | Endpoint        |
| :--------------------------------------------------------------- | :-------------- |
| [Listar receipts](#list-receipts) | `GET /receipts` |

<h4 id="receipt-body">Objeto `Receipt`</h4>

Atributos do objeto
| Campo | Tipo | Descrição |
| :----- | :---------------- | :----------- |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">receipt_id</p> | `string` | Id da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">created_at</p> | `int` | Nota fiscal criada em |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">updated_at</p> | `int` | Nota fiscal atualizada em |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">verification_code</p> | `str` | Código de verificação da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">issued_at</p> | `int` | Data de emissão da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_issued_at</p> | `int` | Data de conversão da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_number</p> | `string` | Número do RPS |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_serie</p> | `string` | Série do RPS |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_type</p> | `string` | Tipo do RPS |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">receipt_number</p> | `string` | Número da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">total_value</p> | `float` | Valor total da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">cancelled_at</p> | `int` | Data de cancelamento da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">replaced_at</p> | `int` | Data de substituição da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">status</p> | `Enum` | Status da nota fiscal [StatusEnum](#receipts-status-enum)|
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">extracted_fields</p> | `list[str]` | Campos extraídos da nota fiscal |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">customer</p> | `dict` | Dados do cliente [Customer](#customer-body)|
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">company</p> | `dict` | Dados da empresa [Company](#company-body)|
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">competence <Badge type="tip" text="new" /></p> | `int` | Data de competência* da nota fiscal |

:::info *Data de competência
É a data em que a emissão da nota fiscal foi comunicada ao orgão fiscalizador. Por exemplo, se a nota fiscal foi emitida em 01/01/2023, mas somente convertida (enviada ao orgão) em 01/02/2023, significa que a data de competência a ser considerada para fins contábeis é 01/02/2023. 
:::

:::details Exemplo de `Receipt`

```json
{
  "receipt_id": "receipt_abc123",
  "created_at": 1688159543000,
  "updated_at": 1688159543000,
  "verification_code": "ABC123",
  "issued_at": 1682553600000,
  "rps_issued_at": 1682553600000,
  "rps_number": "88888",
  "rps_serie": "RPS",
  "rps_type": "1",
  "receipt_number": "9999999",
  "total_value": 999.9,
  "cancelled_at": null,
  "replaced_at": null,
  "status": "issued",
  "extracted_fields": [
    "{\"rps_issued_date\": \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYQAAAA\"}"
  ],
  "customer": {
    "customer_id": "customer_abc123",
    "emails": ["customer@email.com"],
    "name": "Nome do cliente",
    "tax_id": "99999999999"
  },
  "company": {
    "company_id": "companies_abc123",
    "legal_name": "Nome legal da empresa",
    "trade_name": "Nome fantasia da empresa",
    "city": "Curitiba",
    "state": "PR",
    "tax_id": "9999999999999"
  },
  "competence": 1682553600000
}
```

:::

<h4 id="receipts-status-enum">Status Enum</h4>

| Valor       | Descrição               |
| ----------- | ----------------------- |
| `issued`    | Nota fiscal emitida     |
| `cancelled` | Nota fiscal cancelada   |
| `replaced`  | Nota fiscal substituída |

<h3 id="list-receipts">Lista receipts</h3>

Este endpoint lista receipts.

**O que você pode fazer com isso?**

Ao consultar dados deste endpoint, você poderá recuperar todas as notas emitidas sob a organização autenticada.

**Endpoint**

```
GET /receipts
```

**Parâmetros de Path**

`N/A`

**Parâmetros de Query**

Campos Gerais
<br>
[Parâmetros de paginação](#pagination)
<br>
[Parâmetros de busca](#search)

Campos Exclusivos
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">company_id</p> | `string` | Filtra registros por id de empresa igual a | 
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">status</p> | [StatusEnum](#receipts-status-enum)| Filtra registros por status da nota fiscal igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">cancelled_at</p> | `string` | Filtra registros por data de cancelamento igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">replaced_at</p> | `string` | Filtra registros por data de substituição igual a|
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">issued_at</p> | `string` | Filtra registros por data de emissão igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">issued_at__gt</p> | `string` | Filtra registros por data de emissão maior do que |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">issued_at__gte</p> | `string` | Filtra registros por data de emissão maior ou igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">issued_at__lt</p> | `string` | Filtra registros por data de emissão menor do que |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">issued_at__lte</p> | `string` | Filtra registros por data de emissão menor ou igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_issued_at</p> | `string` | Filtra registros por data de conversão igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_issued_at__gt</p> | `string` | Filtra registros por data de conversão maior do que |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_issued_at__gte</p> | `string` | Filtra registros por data de conversão maior ou igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_issued_at__lt</p> | `string` | Filtra registros por data de conversão menor do que |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_issued_at__lte</p> | `string` | Filtra registros por data de conversão menor ou igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">competence <Badge type="tip" text="new" /></p>  | `string` | Filtra registros por data de competência igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">competence__gt <Badge type="tip" text="new" /></p> | `string` | Filtra registros por data de competência maior do que |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">competence__gte <Badge type="tip" text="new" /></p> | `string` | Filtra registros por data de competência maior ou igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">competence__lt <Badge type="tip" text="new" /></p> | `string` | Filtra registros por data de competência menor do que |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">competence__lte <Badge type="tip" text="new" /></p> | `string` | Filtra registros por data de competência menor ou igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">total_value</p> | `string` | Filtra registros por valor total igual a | 
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">receipt_number</p> | `string` | Filtra registros por número da nota fiscal igual a |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_number</p> | `string` | Filtra registros por número do RPS igual a | 
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_serie</p> | `string` | OFiltra registros por série do RPS igual a  | 
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">rps_type</p> | `string` | Filtra registros por tipo do RPS igual a  | 

_Exemplo_

```
GET /receipts?competence__gte=2023-01-01&competence__lte=2023-01-31
```

**Corpo da Resposta**

| Campo                                                                               | Tipo      | Descrição                          |
| :---------------------------------------------------------------------------------- | :-------- | :--------------------------------- | 
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">items</p> | `list`    | Lista de [Receipts](#receipt-body) |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">total</p> | `integer` | Quantidade de itens disponíveis    |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">page</p>  | `string`  | Número da página atual             |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">size</p>  | `string`  | Quantidade de registros por página |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">pages</p> | `string`  | Quantidade de páginas disponíveis  |

:::details Exemplo de Resposta

```json
{
  "items": [
    {
      "receipt_id": "receipt_abc123",
      "created_at": 1688159543000,
      "updated_at": 1688159543000,
      "verification_code": "ABC123",
      "issued_at": 1682553600000,
      "rps_issued_at": 1682553600000,
      "rps_number": "88888",
      "rps_serie": "RPS",
      "rps_type": "1",
      "receipt_number": "9999999",
      "total_value": 999.9,
      "cancelled_at": null,
      "replaced_at": null,
      "status": "issued",
      "extracted_fields": [
        "{\"rps_issued_date\": \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYQAAAA\"}"
      ],
      "customer": {
        "customer_id": "customer_abc123",
        "name": "Nome do cliente",
        "tax_id": "99999999999"
      },
      "company": {
        "company_id": "companies_abc123",
        "legal_name": "Nome legal da empresa",
        "trade_name": "Nome fantasia da empresa",
        "city": "Curitiba",
        "state": "PR",
        "tax_id": "9999999999999"
      },
      "competence": 1682553600000
    },
    {}
  ],
  "total": 2,
  "page": 1,
  "size": 50,
  "pages": 1
}
```

:::

### Customers

Este é um objeto que representa os Clientes.

#### Endpoints

| Nome                                                       | Endpoint         |
| :--------------------------------------------------------- | :--------------- |
| [Lista customers]() <Badge type="warning" text="coming" /> | `GET /customers` |

<h4 id="customer-body">Objeto `Customer`</h4>

Atributos do objeto
| Campo | Tipo | Descrição |
| :----- | :---------------- | :----------- |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">customer_id</p> | `string` | Id do cliente |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">name</p> | `int` | Nome do cliente |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">tax_id</p> | `str` | CNPJ/CPF do cliente |

:::details Exemplo de `Customer`

```json
{
  "customer_id": "customer_abc123",
  "name": "Nome do cliente",
  "tax_id": "99999999999"
}
```

:::

### Companies

Este é um objeto que representa as Empresas.

#### Endpoints

| Nome                                                       | Endpoint         |
| :--------------------------------------------------------- | :--------------- |
| [Lista companies]() <Badge type="warning" text="coming" /> | `GET /companies` |

<h4 id="company-body">Objeto `Company`</h4>

Atributos do objeto
| Campo | Tipo | Descrição |
| :----- | :---------------- | :----------- |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">company_id</p> | `string` | Id da empresa |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">legal_name</p> | `int` | Nome legal da empresa |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">trade_name</p> | `int` | Nome fantasia da empresa |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">city</p> | `str` | Cidade da empresa |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">state</p> | `int` | Estado da empresa |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">tax_id</p> | `int` | CNPJ da empresa |

:::details Exemplo de `Company`

```json
{
  "company_id": "companies_abc123",
  "legal_name": "Nome legal da empresa",
  "trade_name": "Nome fantasia da empresa",
  "city": "Curitiba",
  "state": "PR",
  "tax_id": "9999999999999"
}
```

:::

## Política de versionamento

A seguinte seção explica em detalhes a política de versionamento da API da **nukleo.io**.

Essa política é utilizada para dar suporte à evolução e melhoria dos nossos serviços sem impactar as integrações dos nossos clientes atuais. Ela também cria um padrão contínuo e previsível de lançamento para a nossa API.

#### Como versionamos

A **nukleo.io** introduz novas alterações na API de 3 formas, dependendo das mudanças que estão sendo implementadas:

- `Implementação na versão atual`
- `Lançamento de uma versão menor`
- `Lançamento de uma versão maior`

Quando a **nukleo.io** lança uma nova versão da API, você pode optar por atualizar para ter acesso a novos recursos. Quando as alterações são implementadas na versão atual da API, esses recursos se tornam disponíveis para os clientes que estão utilizando essa versão, sem a necessidade de uma atualização.

As melhorias mais recentes do produto serão incluídas na versão mais recente da API. Recomendamos atualizar para a versão mais recente para aproveitar as novas funcionalidades e otimizar a melhor experiência do usuário.

::: tip ⓘ Observação
Uma versão publicamente lançada da API da **nukleo.io** nunca mudará de forma que possa impactar a sua integração.
:::

**Implementação na versão atual**

A **nukleo.io** implementará alterações na versão atual da API, sem um novo lançamento de versão, quando as mudanças introduzidas não interferirem na sua integração. Essas alterações representam recursos independentes que não alteram a lógica pré-existente. Por exemplo:

> - Adicionar novos endpoints da API
> - Adicionar parâmetros opcionais de requisição aos endpoints da API existentes
> - Reordenar propriedades retornadas pelos endpoints da API existentes
> - Adicionar um novo Recurso Principal

Nesse caso, você pode utilizar essas alterações imediatamente, sem precisar atualizar a versão da API (caso esteja utilizando a versão da API em que as alterações foram introduzidas).

**Lançamentos de versões menores**

A **nukleo.io** lançará uma versão menor da API quando as alterações introduzidas forem consideradas compatíveis com as versões anteriores, ou seja, alterações aditivas. Por exemplo:

> - Adicionar novas propriedades nas respostas dos endpoints da API existentes
> - Alterar os atributos de mensagem retornados em falhas de validação ou outros erros
> - Adicionar novos valores às propriedades existentes nas respostas dos endpoints da API existentes

Nesse caso, é seguro para você migrar de uma versão menor para outra (a menos que considere que as alterações aditivas sejam incompatíveis com versões anteriores). As versões menores são lançadas com mais frequência e contêm alterações incrementais na API.

**Lançamentos de versões maiores**

A **nukleo.io** lançará uma versão maior da API se alguma das alterações introduzidas forem incompatíveis com as versões anteriores. Nesse caso, se você deseja migrar para uma nova versão maior, provavelmente precisará atualizar a sua integração.

As versões maiores são lançadas com menos frequência.

A **nukleo.io** considera as seguintes alterações como incompatíveis com as versões anteriores:

> - Remoção de um recurso da API
> - Remoção ou renomeação de um recurso, campo, método ou valor de enumeração
> - Alteração do tipo de um campo (por exemplo, inteiro se torna string ou float)
> - Alteração do formato da URL
> - Adição de uma nova validação ou modificação de uma validação existente em um recurso existente
> - Alteração dos códigos/mensagens de resposta de erro existentes
> - Alteração do mecanismo de autenticação

## Notas de lançamento

### v2.0.1
<p style="font-size:14px;font-weight:700">29 de Julho de 2023</p>

- Adicionado o campo `competence` no objeto [Receipt](#receipt-body)
- Adicionados os [campos de filtro](#receipts) no endpoint `GET /receipts`:
  - `competence`
  - `competence__gt`
  - `competence__gte`
  - `competence__lt`
  - `competence__lte`


### v2.0.0 :rocket:
<p style="font-size:14px;font-weight:700">5 de Julho de 2023</p>

Uma nova forma de interagir com a **nukleo.io**. A nova API foi construída com base nas tecnologias mais recentes e foi projetada para ser mais intuitiva e fácil de usar.

```
print("Hello World v2.0.0")
```
