<span>🇺🇸 en-US doc</span>
# AbraAPI - Documentation
## Description

The AbraAPI is a public API that allows you to register and retrieve notifications for integrations. The name "Abra" is based on the Pokémon Abra, known for its teleportation ability. This API was developed with the aim of providing an efficient and scalable system for managing notifications across different systems or individual profiles within those systems. Through the AbraAPI, you can send, receive, and even mark notifications as read.

## Example Usage

Below, we provide examples of using the main methods available in the AbraAPI.

POST - Send Notification
Endpoint: /notifications

This endpoint allows you to send a new notification.

Example request:


```bash
POST /notifications HTTP/1.1
Host: api.abra.com
Content-Type: application/json

{ 
  "key": "!@ExempleKey",
  "title": "New message",
  "content": "You have received a new message."
}

```

Example response:

```bash
{
  "id": "a462ea672aa0akf4069ac1al",
  "title": "I`m a notification",
  "key": "!@ExempleKey",
  "dateCreated": "2023-06-11T13:58:01.916Z",
  "dateUpdated": null,
  "title": "New message",
  "content": "This is a test notification",
  "read": false
}
```

GET - Retrieve Notifications
Endpoint: /notifications/retrieve

This endpoint allows you to retrieve all registered notifications by key.

Example request:


```bash
GET /notifications/retrieve?key=!@ExempleKey HTTP/1.1
Host: api.abra.com
Example response:

json

[
  {
    "id": "a462ea672aa0akf4069ac1al",
    "title": "New message",
    "content": "You have received a new message.",
    "dateCreated": "2023-06-11T14:09:49.081Z",
    "read": false
  },
  {
    "id": "a882ea679aa0akf4069ac1aa",
    "title": "Profile update",
    "content": "Your profile has been successfully updated.",
    "dateCreated": "2023-06-11T14:09:49.081Z",
    "dateUpdated": "2023-06-11T14:09:49.081Z",
    "read": true
  }
]
```

PATCH - Mark Notification as Read

Endpoint: /notifications/a882ea679aa0akf4069ac1aa

This endpoint allows you to mark a notification as read.

Example request:



```bash
PATCH /notifications/a882ea679aa0akf4069ac1aa HTTP/1.1
Host: api.abra.com
Content-Type: application/json
```
Example response:

```bash
{
  "id": "6462eb672fa0abf4069bc1a5",
  "title": "Profile update",
  "key": "!@ExempleKey",
  "dateCreated": "2023-06-11T14:05:37.965Z",
  "dateUpdated": "2023-06-11T14:05:37.965Z",
  "content": "Your profile has been successfully updated.",
  "read": true
}
```
## Final Considerations
The AbraAPI is a powerful API for registering and sending notifications to systems or individual profiles. It provides endpoints to retrieve notifications, send new notifications, and mark notifications as read. Through these functionalities, you can efficiently and effectively manage notifications generated by the integrated systems.

<b>For more informations consult the Swagger documentation https://abra-api.top/api</b>

----
<br>
<span>🇧🇷 pt-BR doc</span>

# AbraAPI - Documentação

## Descrição
A AbraAPI é uma API pública que permite registrar e recuperar notificações para integrações. O nome "Abra" é baseado no Pokémon Abra, conhecido por sua habilidade de teletransporte. Esta API foi desenvolvida com o objetivo de fornecer um sistema eficiente e escalável para gerenciar notificações em diferentes sistemas ou perfis individuais dentro desses sistemas. Através da AbraAPI, é possível enviar, receber e até mesmo marcar notificações como lidas.

## Exemplos de Uso
A seguir, apresentamos exemplos de uso dos principais métodos disponíveis na AbraAPI.

POST - Enviar Notificação
Endpoint: /notifications

Este endpoint permite enviar uma nova notificação.

Exemplo de requisição:



POST /notifications HTTP/1.1
Host: api.abra.com
Content-Type: application/json
```bash
{ 
  "key": "!@ExempleKey",
  "title": "Nova mensagem",
  "content": "Você recebeu uma nova mensagem."
}
```
Exemplo de resposta:
```bash
{
  "id": "a462ea672aa0akf4069ac1al",
  "key": "!@ExempleKey",
  "dateCreated": "2023-06-11T13:58:01.916Z",
  "dateUpdated": null,
  "title": "Nova mensagem",
  "content": "Você recebeu uma nova mensagem."
  "read": false
}
```

GET - Recuperar Notificações
Endpoint: /notifications/retrieve

Este endpoint permite recuperar todas as notificações registradas.

Exemplo de requisição:


```bash
GET /notifications/retrieve?key=!@ExempleKey HTTP/1.1
Host: api.abra.com
```
Exemplo de resposta:
```bash
[
  {
    "id": "a462ea672aa0akf4069ac1al",
    "title": "Nova mensagem",
    "content": "Você recebeu uma nova mensagem.",
    "dateCreated": "2023-06-11T14:09:49.081Z",
    "read": false
  },
  {
    "id": "a882ea679aa0akf4069ac1aa",
    "title": "Atualização de perfil",
    "content": "Seu perfil foi atualizado com sucesso.",
    "dateCreated": "2023-06-11T14:09:49.081Z",
    "dateUpdated": "2023-06-11T14:09:49.081Z",
    "read": true
  }
]
```
PATCH - Marcar Notificação como Lida

Endpoint: /notifications/{id}

Este endpoint permite marcar uma notificação como lida.

Exemplo de requisição:
```bash
bash

PATCH /notifications/a882ea679aa0akf4069ac1aa HTTP/1.1
Host: api.abra.com
Content-Type: application/json
```
Exemplo de resposta:

```bash
{
  "id": a882ea679aa0akf4069ac1aa,
  "title": "Atualização de perfil",
  "content": "Seu perfil foi atualizado com sucesso.",
  "dateUpdated": "2023-06-11T14:09:49.081Z",
  "read": true
}
```
## Considerações Finais
A AbraAPI é uma API poderosa para o registro e envio de notificações em sistemas ou perfis individuais. Ela fornece endpoints para recuperar notificações, enviar novas notificações e marcar notificações como lidas. Através dessas funcionalidades, é possível manter um controle eficiente e atualizado sobre as notificações geradas pelos sistemas integrados.

<b>Para maiores informações consulte nossa documentação no Swagger https://abra-api.top/api</b>

----
