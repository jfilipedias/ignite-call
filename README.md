# Ignite Call

![Autor](https://img.shields.io/badge/developer-jfilipedias-blue)
![Licença](https://img.shields.io/github/license/jfilipedias/ignite-call)

## Getting started

Para executar o projeto, é necessário configurar corretamente as variáveis de ambiente como exemplificado nesse [arquivo](./.env.example). Abaixo são descritos o uso de cada variável.

O projeto utiliza o ORM [Prisma](https://prisma.io/) e para isso é necessário estabelecer o endereço do banco de dados:

```env
DATABASE_URL="file:./dev.db"
```

Para implementar a funcionalidade de agendamento, foram utilizados os serviços da [Google Cloud](https://cloud.google.com/). Para isso é necessário a configuração de um projeto com o serviço `Google Calendar API` ativo, permissão OAuth configurada, e credenciais de ID do cliente para Aplicativo da Web. As credenciais criadas serão um `ID do cliente` e uma `Chave secreta do cliente` que devem ser utilizadas nas seguintes variáveis de ambiente:

```env
GOOGLE_CLIENT_ID=1234-exampleclientid.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=EXAMPLE-Secret_Key1234
```

Para realizar a autenticação com o [NextAuth.js](https://next-auth.js.org/), é necessário definir um `secret`. Esse valor poder ser gerado por meio do comando abaixo como sugerido pela [documentação](https://next-auth.js.org/configuration/options#secret):

```shell
openssl rand -base64 32
```

## Tecnologias

- [Axios](https://axios-http.com)
- [ESLint](https://eslint.org/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Nookies](https://github.com/maticzav/nookies#readme)
- [Prisma](https://prisma.io/)
- [React Hook Form](https://react-hook-form.com/)
- [ReactJS](https://reactjs.org/)
- [Stitches](https://stitches.dev/)
- [Typescript](https://typescriptlang.org/)
- [Zod](https://zod.dev/)

## Licença

Este projeto está licenciado sob o MIT. Consulte a [licença](LICENSE) para mais informações.
