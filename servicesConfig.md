
# Configurações dos serviços externos  ⚙


## Stripe 💳

- Crie e acesse sua conta no Stripe, https://dashboard.stripe.com/
- Crie um produto com nome **"Subscription"** e valor. (altere o ID do preço no projeto)
- Na página de desenvolvedores, busque pela **chave publicável** e **chave secreta**, copie e cole no arquivo .env.local


## Github (OAuth) 🔐
- Logado em sua conta do Github, acesse as configurações (https://github.com/settings/developers)
- Crie um novo OAuth App com as seguintes definições:
    - Application name: Ignews (Dev)   
    - Homepage: http://localhost:3000/
    - Authorization callback url: http://localhost:3000/api/auth/callback
- Copie e cole o **Client ID** e a **Client Secret** no arquivo .env.local


## Fauna DB 🎲
- Crie e acesse sua conta no Fauna DB, https://dashboard.fauna.com/accounts/login
- Crie um novo database "ignews"
- Dentro do painel do Fauna DB, crie as seguintes Collections e Indexes

    ### Collections
    ```
    {
        name: "subscriptions",
        history_days: 30,
        ttl_days: null
    }

    {
        name: "users",
        history_days: 30,
        ttl_days: null
    }

    ```

    ### Indexes
    ```
    {
        name: "subscription_by_id",
        unique: false,
        serialized: true,
        source: "subscriptions",
        terms: [
            {
                field: ["data", "id"]
            }
        ]
    }

    { 
        name: "subscription_by_status",
        unique: false,
        serialized: true,
        source: "subscriptions",
        terms: [
            {
                field: ["data", "status"]
            }
        ]
    }

    {
        name: "subscription_by_user_ref",
        unique: false,
        serialized: true,
        source: "subscriptions",
        terms: [
            {
                field: ["data", "userId"]
            }
        ]
    }

    {
        name: "user_by_email",
        unique: true,
        serialized: true,
        source: "users",
        terms: [
            {
                field: ["data", "email"]
            }
        ]
    }

    {
        name: "user_by_stripe_customer_id",
        unique: false,
        serialized: true,
        source: "users",
        terms: [
            {
                field: ["data", "stripe_customer_id"]
            }
        ]
    }
    ```


## Prismic CMS 📰
- Faça login no Prismic CMS, https://prismic.io/dashboard/login
- Crie um novo repositório
- Em Configurações > API Security
    - defina a API Access como "Private API"
    - copie e cole a **API endpoint** e o **token de acesso permanente** no arquivo .env.local 
- Na aba de "Custom Types", adicione um novo tipo com as seguintes configurações:
    - Tipo: Repeatable Type
    - Name: post
    - Campos: 
        - UID: "uid"
        - Title (H1): "title"
        - RichText permitindo múltiplos parágrafos e blank for links: "content"
- Na aba "Documents" adicionar novos posts para testes.


<br><br>

Qualquer coisa só chamar! 👋

<img src="https://i.ibb.co/n1SbQZw/w-signature.png" alt="w-signature" border="0" width='300px' />

