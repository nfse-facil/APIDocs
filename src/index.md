---
{ 'home': False }
---

# Guia da API

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

**Formato de requisição e resposta**

- Autenticação baseada em token. As chaves da API devem ser incluídas no cabeçalho de todas as requisições feitas à API.

- Você deve usar um cabeçalho `Content-Type: application/json` em todas as requisições, e as respostas também serão retornadas em JSON com uma estrutura consistente.

- Todas as suas requisições à API devem ser feitas via HTTPS. Qualquer requisição feita via HTTP falhará.

- Os campos de texto suportam UTF-8, mas não permitem certos caracteres especiais.

**Erros**

- Todos os erros seguem a mesma estrutura utilizando uma implementação parcial do [RFC7807](https://tools.ietf.org/html/rfc7807).

```json
{
  "detail": "Por favor, verifique se o cabeçalho da sua requisição contém a chave da API e se é uma chave válida.",
  "error": 2002,
  "message": "Acesso não autorizado.",
  "more_info": "https://developer.nukleo.io/errors/2002"
}
```

**Limite de requisições**

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

## Recursos principais

A seguir estão os principais recursos disponíveis na API da **nukleo.io**. Para cada recurso, deverá haver um endpoint disponível para fazer requisições.

| Recurso                              | Descrição                                                       |
| :----------------------------------- | :-------------------------------------------------------------- |
| [Verifications](#verifications) :id: | Interact with every verification check ran by your organization |

### Verifications

This is an object that represents an executed verification check. You can retrieve it to see the result for each check ran inside an agreement link or under your organization.

#### Endpoints

| Name                                                                                                                                                                                                                          | Endpoint                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| [List webhooks](#list-webhooks) <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">new</p>             | `GET /webhooks`                                |
| [Get webhook](#get-webhook) <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">new</p>                 | `GET /webhooks/{webhook_id}`                   |
| [Create webhook](#create-webhook)                                                                                                                                                                                             | `POST /webhooks`                               |
| [Update webhook](#update-webhook) <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">new</p>           | `PUT /webhooks/{webhook_id}`                   |
| [Delete webhook](#delete-webhook) <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">new</p>           | `DELETE /webhooks/{webhook_id}`                |
| [List webhook events](#list-webhook-events) <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">new</p> | `GET /webhooks/{webhook_id}/events`            |
| [Get webhook event](#get-webhook-event) <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">new</p>     | `GET /webhooks/{webhook_id}/events/{event_id}` |

#### The webhook object

Attributes
| Field | Type | Description |
| ------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------- |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">webhook_id</p> | `string` | Id of the webhook |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">created_at</p> | `unix timestamp` | Datetime webhook was created |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">updated_at</p> | `unix timestamp` | Datetime webhook was last updated |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">destination_url</p> | `string` | URL webhook will be delivered to |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">event_types</p> | `array<enum>` | List of [event type](#webhook-event-type-enums) to trigger from |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">notification_emails</p> | `array<string>` | Emails that will be notified in case of failure |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">created_by</p> | `string` | User id that created the webhook |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">updated_by</p> | `string` | User id that last updated the webhook |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">service_status</p> | `bool` | Webhook current status |
| <p style="font-size:14px; font-weight: 800; font-family: Menlo,Consolas;">organization_id</p> | `string` | Id of the organization |

:::details Webhook Example
**Example**

```json
{
  "webhook_id": "wb_b6924c66ae114fada7d351388b06c6a4",
  "created_at": 1677091886000,
  "updated_at": 1677091886000,
  "destination_url": "https://destination.url",
  "event_types": ["verification", "agreement.viewed", "agreement.completed"],
  "notification_emails": ["caio@nukleo.io"],
  "created_by": null,
  "updated_by": null,
  "service_status": false,
  "organization_id": "ORG-AbCd1234"
}
```

:::

<h4 id="webhook-event-type-enums">Webhook event type enums</h4>

| Value                 | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `verification`        | Triggers when a verification check is ran             |
| `agreement.viewed`    | Triggers when an agreement is viewed                  |
| `agreement.signed`    | Triggers when an agreement is signed (by each signer) |
| `agreement.completed` | Triggers when an agreement is signed (by all signers) |

<h3 id="list-webhooks">List webhooks</h3>

This endpoint list webhooks.

**What can you do with this information?**

When querying data from this endpoint you will be able to retrieve every webhook created under the authenticated organization.

**Endpoint**

```
GET /webhooks
```

**Path Parameters**

`null`

**Query Parameters**
| Field | Type | Description | Required | Default Value
| :--- | :--- | :--- | :---: | :---: |
| size | `integer` | Amount of record per page (page size) | `false` | `50` |
| page | `integer` | Current page number | `false` | `1` |
| search | `string` | Filter records with OR condition | `false` | `-` |
| order_by | `string` | Order records by a specific field | `false` | `created_at DESC` |

_Example_

```
GET /webhooks?size=10&page=1
```

**Response Body**

| Field | Type             | Description                           | Example                  |
| :---- | :--------------- | :------------------------------------ | :----------------------- |
| items | `array<Webhook>` | An array of retrieved items           | [Webhook](#webhook-body) |
| total | `integer`        | Amount of items available             | `20`                     |
| page  | `string`         | Current page number                   | `1`                      |
| size  | `string`         | Amount of record per page (page size) | `10`                     |
| pages | `string`         | Amount of pages available             | `2`                      |

:::details View Response Example
**Example**

```json
{
  "items": [
    {
      "webhook_id": "wb_b6924c66ae114fada7d351388b06c6a4",
      "created_at": 1677091886000,
      "updated_at": 1677091886000,
      "destination_url": "https://destination.url",
      "event_types": ["verification", "agreement.viewed", "agreement.completed"],
      "notification_emails": ["caio@nukleo.io"],
      "created_by": null,
      "updated_by": null,
      "service_status": false
    },
    {
      "webhook_id": "wb_577500dbdb034389a51f33bf02dd5ed9",
      "created_at": 1684944059000,
      "updated_at": 1684944059000,
      "destination_url": "https://webhook.site",
      "event_types": ["verification"],
      "notification_emails": null,
      "created_by": null,
      "updated_by": null,
      "service_status": true
    }
  ],
  "total": 2,
  "page": 1,
  "size": 50,
  "pages": 1
}
```

:::

<h3 id="get-webhook">Get webhook</h3>

This endpoint gets a webhook.

**What can you do with this information?**

When querying data from this endpoint you will be able to retrieve data from a specific webhook created under the authenticated organization.

**Endpoint**

```
GET /webhook/{webhook_id}
```

**Path Parameters**

`null`

**Query Parameters**

`null`

**Response Body**

| Field          | Type       | Description              | Example                      |
| :------------- | :--------- | :----------------------- | :--------------------------- |
| webhook_id     | `string`   | Id of the webhook record | `WEBHOOK-AbCd134`            |
| event_datetime | `datetime` | Datetime of the event    | `2023-01-01T23:59:59.000000` |

:::details View Response Example
**Example**

```json
{
  "webhook_id": "WEBHOOK-1683235983022_af042c9254b446b982a9e9a849630b89",
  "event_datetime": "2023-05-04T21:33:03.023949"
}
```

:::

<h3 id="create-webhook">Create webhook</h3>

This endpoint creates a webhook.

**What can you do with this information?**

When sending data to this endpoint you will be able to create a webhook under the authenticated organization.

**Endpoint**

```
POST /webhooks
```

**Path Parameters**

`null`

**Query Parameters**

`null`

**Request Body**:

| Field                                                                                                                                                                                                        | Type     | Description                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------------------------------------------- |
| destination_url                                                                                                                                                                                              | `string` | Webhook URL destination                         |
| notification_email <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">coming next</p> | `string` | Email to notified in case of delivering failure |

:::details Request Body Example
**Example**

```json
{
  "destination_url": "https://webhook.destination.url",
  "notification_email": "notification@email.com"
}
```

:::

**Response Body**

| Field          | Type       | Description              | Example                      |
| :------------- | :--------- | :----------------------- | :--------------------------- |
| webhook_id     | `string`   | Id of the webhook record | `WEBHOOK-AbCd134`            |
| event_datetime | `datetime` | Datetime of the event    | `2023-01-01T23:59:59.000000` |

:::details View Response Example
**Example**

```json
{
  "webhook_id": "WEBHOOK-1683235983022_af042c9254b446b982a9e9a849630b89",
  "event_datetime": "2023-05-04T21:33:03.023949"
}
```

:::

<h3 id="update-webhook">Update webhook</h3>

This endpoint updates a webhook.

**What can you do with this information?**

When sending data to this endpoint you will be able to update a webhook created under the authenticated organization.

**Endpoint**

```
PUT /webhooks/{webhook_id}
```

**Path Parameters**

`null`

**Query Parameters**

`null`

**Request Body**:

| Field                                                                                                                                                                                                        | Type     | Description                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------------------------------------------- |
| destination_url                                                                                                                                                                                              | `string` | Webhook URL destination                         |
| notification_email <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">coming next</p> | `string` | Email to notified in case of delivering failure |

:::details Request Body Example
**Example**

```json
{
  "destination_url": "https://webhook.destination.url",
  "notification_email": "notification@email.com"
}
```

:::

**Response Body**

| Field          | Type       | Description              | Example                      |
| :------------- | :--------- | :----------------------- | :--------------------------- |
| webhook_id     | `string`   | Id of the webhook record | `WEBHOOK-AbCd134`            |
| event_datetime | `datetime` | Datetime of the event    | `2023-01-01T23:59:59.000000` |

:::details View Response Example
**Example**

```json
{
  "webhook_id": "WEBHOOK-1683235983022_af042c9254b446b982a9e9a849630b89",
  "event_datetime": "2023-05-04T21:33:03.023949"
}
```

:::

<h3 id="delete-webhook">Delete webhook</h3>

This endpoint deletes a webhook.

**What can you do with this information?**

When sending data to this endpoint you will be able to delete a webhook created under the authenticated organization.

**Endpoint**

```
DELETE /webhooks/{webhook_id}
```

**Path Parameters**

`null`

**Query Parameters**

`null`

**Request Body**:

| Field                                                                                                                                                                                                        | Type     | Description                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------------------------------------------- |
| destination_url                                                                                                                                                                                              | `string` | Webhook URL destination                         |
| notification_email <p style="display: inline-block;font-size: 14px;font-weight: 600;height: 18px;line-height: 18px;border-radius: 3px;padding: 0 6px;color: #fff;background-color: #42b983;">coming next</p> | `string` | Email to notified in case of delivering failure |

:::details Request Body Example
**Example**

```json
{
  "destination_url": "https://webhook.destination.url",
  "notification_email": "notification@email.com"
}
```

:::

**Response Body**

| Field          | Type       | Description              | Example                      |
| :------------- | :--------- | :----------------------- | :--------------------------- |
| webhook_id     | `string`   | Id of the webhook record | `WEBHOOK-AbCd134`            |
| event_datetime | `datetime` | Datetime of the event    | `2023-01-01T23:59:59.000000` |

:::details View Response Example
**Example**

```json
{
  "webhook_id": "WEBHOOK-1683235983022_af042c9254b446b982a9e9a849630b89",
  "event_datetime": "2023-05-04T21:33:03.023949"
}
```

:::

<h3 id="list-webhook-events">List webhook events</h3>

This endpoint list webhook events.

**What can you do with this information?**

When querying data from this endpoint you will be able to retrieve every event from a specific webhook created under the authenticated organization.

**Endpoint**

```
GET /webhooks/{webhook_id}/events
```

**Path Parameters**

`null`

**Query Parameters**

`null`

**Response Body**

| Field          | Type       | Description              | Example                      |
| :------------- | :--------- | :----------------------- | :--------------------------- |
| webhook_id     | `string`   | Id of the webhook record | `WEBHOOK-AbCd134`            |
| event_datetime | `datetime` | Datetime of the event    | `2023-01-01T23:59:59.000000` |

:::details View Response Example
**Example**

```json
{
  "webhook_id": "WEBHOOK-1683235983022_af042c9254b446b982a9e9a849630b89",
  "event_datetime": "2023-05-04T21:33:03.023949"
}
```

:::

<h3 id="get-webhook-event">Get webhook event</h3>

This endpoint gets a webhook event.

**What can you do with this information?**

When querying data from this endpoint you will be able to retrieve a specific event from a specific webhook created under the authenticated organization.

**Endpoint**

```
GET /webhooks/{webhook_id}/events/{event_id}
```

**Path Parameters**

`null`

**Query Parameters**

`null`

**Response Body**

| Field          | Type       | Description              | Example                      |
| :------------- | :--------- | :----------------------- | :--------------------------- |
| webhook_id     | `string`   | Id of the webhook record | `WEBHOOK-AbCd134`            |
| event_datetime | `datetime` | Datetime of the event    | `2023-01-01T23:59:59.000000` |

:::details View Response Example
**Example**

```json
{
  "webhook_id": "WEBHOOK-1683235983022_af042c9254b446b982a9e9a849630b89",
  "event_datetime": "2023-05-04T21:33:03.023949"
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

### API v2.0 :rocket:

<p style="font-size:14px;font-weight:700">5 de Julho de 2023</p>

Uma nova forma de interagir com a **nukleo.io**. A nova API foi construída com base nas tecnologias mais recentes e foi projetada para ser mais intuitiva e fácil de usar.

```
print("Hello World v2.0")
```
