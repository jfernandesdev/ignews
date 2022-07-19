# Ignews <img src='https://github.com/jfernandesdev/ignews/blob/5c0c9fe741c5d1978165749976b90aad7965e7d9/public/favicon.png' width='50px' />

Projeto Web desenvolvido durante o Bootcamp Ignite by Rocketseat • Trilha ReactJS - TEMA: "Ig.News" 📰⚛️

### Descrição:

O projeto trata-se de um blog onde os usuários terão acesso completo aos conteúdos de acordo com o status da sua assinatura mensal. É uma aplicação Serverless, ou seja, todo o processo que dependeria de um backend próprio foi integrado dentro do front-end seguindo o padrão da JAMStack.

- [x] Integração e Consumo de postagens via Prismic CMS;
- [x] Realização de assinatura mensal via Stripe;
- [x] Autenticação dos usuários via Github OAuth;
- [x] Dados salvos no Banco de dados FaunaDB;
- [x] Layout responsivo (mobile e desktop).

## Tecnologias utilizadas: 🚀

- ReactJs | ^17.0.2
- NextJs | 12.1.0
- Next Auth | ^4.2.1
- Typescript | ^4.6.2 -D
- SASS | ^1.49.9

- Prismic IO Client | 5.1.1
- Stripe | ^8.209.0
- Fauna DB | ^4.5.2

## Instalação em sua máquina ⚙️

```
# Clone o projeto e acesse a pasta
$ git clone https://github.com/jfernandesdev/ignews.git && cd ignews

# Instale as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.sample
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks

# Rode o projeto 
$ yarn dev

// A aplicação estará disponível para acesso em seu navegador em http://localhost:3000

```
## Dados de testes do Checkout 🧪

- Pagamento bem-sucedido: 4242 4242 4242 4242
- Falha no pagamento: 4000 0000 0000 9995
- Precisa de autenticação: 4000 0025 0000 3155

## Layout (by @tiagoluchtenberg) 🤩

### Desktop (screenshot):

| Home  | Post List | 
| --- | --- |
| <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-desktop-1.png" /> | <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-desktop-2.png" /> | 

| Post Preview | Checkout |
| --- | --- |
| <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-desktop-3.png" /> | <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-desktop-4.png" /> |

### Mobile (screenshot):

| Home | Post List | Post | Checkout |
| --- | --- | --- | --- |
| <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-mobile-1.png" width='275px' /> | <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-mobile-2.png" width='275px' /> | <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-mobile-3.png" width='275px' /> | <img src="https://github.com/jfernandesdev/ignews/blob/ff41ff913da29adcbe7811e9e72b6a1d917d0f00/public/layout/layout-mobile-4.png" width='275px' /> |

### Dê uma olhada como o projeto ficou! 👀

https://ignews-jfernandesdev.vercel.app/

<br>

<img src="https://i.ibb.co/n1SbQZw/w-signature.png" alt="w-signature" border="0" width='300px' />
