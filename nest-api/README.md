## Projeto

Aplicação desenvolvida com [Nest](https://github.com/nestjs/nest).


Fontes de Consulta:

    - [Docker] Docker-Compose: 
    https://docs.docker.com/compose/compose-file/compose-file-v3/


    - [Docker] RUN vs CMD vs ENTRYPOINT: 
    https://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/


    - [Docker]: Cache Build, armadilhas e quando não utilizar
    https://www.baeldung.com/linux/docker-build-cache 



<br/>

## Instalação

```bash
$ npm install
```
<br/>

## Incialização

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<br/>

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<br/>

## Docker : NodeJS 

Abaixo segue link da imagem oficial no DockerHub, como utilizar e uma referência para `boas práticas` no uso da imagem para produção e em ambiente de desenvolvimento.

DockerHub (Oficial):

 - https://hub.docker.com/_/node
 

Como utilizar a imagem :

 - https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image


Boas práticas:

 - https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image


Abaixo, segue exemplo de como executar comando `docker` definindo `variável de ambiente (-e )`, `user (-u )`, `workdir (-w)` e outros:

    $ docker run \
      -e "NODE_ENV=production" \
      -u "node" \
      -m "300M" --memory-swap "1G" \
      -w "/home/node/app" \
      --name "my-nodejs-app" \
      node [script]

  <br>

  ## Docker : Segurança

  A equipe do Docker desenvolveu uma ferramenta para analisar potênciais problemas de segurança em containers.

  Segue link:

   -  https://github.com/docker/docker-bench-security


<br>

### Banco : MongoDB

Foi criado dentro do diretório `docker/mongo` alguns arquivos `Docker Compose` de exemplo, com configurações para o Mongo e o MongoExpress.

    # Inicializar
    $ docker-compose -f mongodb.yaml up -d

    # Re-Build: mesmo comando para inicializar. 
    $ docker-compose -f mongodb.yaml up -d

    # Stop
    $ docker-compose -f mongodb.yaml stop

    # Remover container e volumes
    $ docker-compose -f mongodb.yaml down --volumes

<br>

## Aplicação : Componentes desenvolvidos

Segue os comandos do `Nest CLI` utilizados e os componentes que foram desenvolvidos para aplicação.

<br>

### Resource `Rotas`

Componente responsável pela consulta das rotas:

    # Opção: API REST
    $ nest g resource rotas

O `resource` cria um `módulo` com as classes necessárias para iniciar o desenvolvimento de uma API REST de um determinado recurso: `controller`, `service`, `entities` e `dto`.

<br>

### NestJS : MongoDB

Instalações para utilizar no Mongoose com NestJS:

     
     $ npm i mongoose @nestjs/mongoose

<br>

Instalado também o pacote `config` do NestJS para ler o arquivo `.env` que conterá as string de conexão com o Mongo.


     $ npm i @nestjs/config

<br>

Com os pacotes acime instalados, segue as configurações que foram feitas no projeto:

 - `ConfigModule`: importar e configurar o ConfigModule do  `@nestjs/config` no `AppModule` (arquivos `.env`)

 - `MongooseModule`: importar e configurar o MongooseModule do `@nestjs/mongoose` no `AppModule` (conexão com o Mongo)

 - `Entidades`: configurar entidades com @Schema() do `@nestjs/mongoose`, e outras definições (SchemeFactory e Document).

 - `MongooseModule:Rotas`: configura o `MongooseModule` no módulo das entidaes, neste caso no módulo `Rotas` no `RotasModule` 

 - `Repositorio:Service`: importar dentro do Serviço, neste caso `RotasService` o repository da entidade `rota`.  



     