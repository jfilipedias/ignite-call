# Ignite Call

![Autor](https://img.shields.io/badge/developer-jfilipedias-blue)
![Licença](https://img.shields.io/github/license/jfilipedias/ignite-call)

O Ignite Call é uma plataforma para agendamento de chamadas desenvolvida durante o programa Ignite da Rocketseat. Os usuários podem conectar seu [Google Calendar](https://calendar.google.com/ "Site do Google Calendar") por meio da sua Google Account, utilizando o protocolo para autorização [OAuth](https://oauth.net/ "Site do OAuth"), para que outras pessoas possam marcar agendamentos nos horários disponíveis. 

Durante o cadastro na plataforma, o usuário pode definir os dias da semana e horários que deseja disponibilizar para os agendamentos. Dessa forma, após a criação da conta, o usuário pode compartilhar a sua URL com outras pessoas para que elas consigam consultar as disponibilidades de datas e horários, e então realizar um agendamento no Google Calendar do usuário.


A aplicação foi desenvolvida em [ReactJS](https://reactjs.org/ "Site do React") utilizando o framework [Next.js](https://nextjs.org/ "Site do Next.js"), uma vez que se trata de uma aplicação fullstack, ou seja, com a a presença de um backend. Para a camada de persistência, foi utilizado o ORM [Prisma](https://prisma.io/ "Site do Prisma") para se comunicar com o serviço de banco de dados [MySQL](https://mysql.com/ "Site do MySQL") do serviço [PlanetScale](https://planetscale.com/ "Site do PlanetScale").

## Getting started

Para executar a aplicação em localhost é necessário que exista uma instância do [MySQL](https://mysql.com/) em execução. Para isso é possível utilizar [Docker](https://docker.com/) configurando um container com o seguinte comando: 

```shell
docker run --name ignite-call-mysql -e MYSQL_ROOT_PASSWORD=yourRootPassword! -p 3306:3306 mysql:latest
```

Caso seja optado por utilizar o docker é necessário que o container esteja em execução. Você pode iniciar a execução do container por meio do comando: 

```shell
docker start ignite-call-mysql
```

Para executar o projeto, é necessário configurar corretamente as variáveis de ambiente como exemplificado nesse [arquivo](./.env.example). Abaixo são descritos o uso de cada variável.

O projeto utiliza o ORM [Prisma](https://prisma.io/) e para isso é necessário estabelecer a conexão com o banco e executar as migrations:

```env
DATABASE_URL="mysql://user:password@localhost:3306/ignitecall"
```

```shell
npx prisma migrate dev
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
- [Day.js](https://day.js.org/)
- [ESLint](https://eslint.org/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Nookies](https://github.com/maticzav/nookies#readme)
- [Prisma](https://prisma.io/)
- [React Hook Form](https://react-hook-form.com/)
- [ReactJS](https://reactjs.org/)
- [Stitches](https://stitches.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Typescript](https://typescriptlang.org/)
- [Zod](https://zod.dev/)

## Licença

Este projeto está licenciado sob o MIT. Consulte a [licença](LICENSE) para mais informações.
