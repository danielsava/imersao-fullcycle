# Imersão FullStack : Code Delivery

Neste estudo de caso prático será desenvolvido um sistema que permite visualizar em tempo real o veículo do entregador, como se fosse aplicação simples de delivery (uber, ifood e outros), com a possibilidade de gerenciar múltiplos entregadores simultâneamente.

Casos de uso que podem ser aplicados:

 - Monitoramento de frotas
 - Monitoramento de Viagens pelas viações.
 - Rastreamento de Veículos

<br/>

Tecnologias utilizadas na solução:

 - `Kafka`: 
    - Serviço de mensagem que será utilizado para comunicação assícrona entre os serviços. Desta forma, o risco de perda de informações pode ser minimizado quando comparado com comunicação síncrona através de REST API.
    - `Kafka Connect`: utilizado para consumir os dados do simulador e inserir no ElasticSearch 

 - `ElasticSearch`: 
    - Dados de entrega, posições e outras serão armazenadas no ElasticSearch
    - `Kibana`: para visualizar os dados armazenados no Elastic 

 - `Go Language`: 
    - Plataforma utilizada para desenvolver o serviço que simulará os entregadores/veículos.

 - `NestJS`: será utilizado websocket no NestJS para atualizar em tempo real o frontend com a localização dos entregadores.
     - `Typescript`   

 - `MongoDB`:  persistência do backend 

 - `React`: frontend da aplicação

 - `Docker`:

 - `Kubernetes`: 
     - `Istio, Kiali, Prometheus e Grafana`  


<br/>

## Go: HelloWorld

Para criar o arquivo `go.mod`, dentro do diretório '._hello-word/':

    $ go mod init example.com/hello

Este arquivo deve ser versionado junto com o projeto. Ele funciona como um `pom.xml` do Go.

<br/>

Para `compilar`, dentro do mesmo diretório acima:

    $ go build

Irá gerar um arquivo executável dentro do diretório de acordo com o Sistema Operacional local.





Referência:

 - https://golang.org/doc/tutorial/getting-started



<br/>

## Simulador de Entregador

Serviço que simula a frota ou os entregadores, enviado a posição em tempo real de cada entregar ou veículo. 

Este simulador, na prática, pode ser substituído por uma `aplicação mobile ou dispositivo IoT` no veículo ou com entregador, que irá enviar de tempos em tempos sua localização.

## Simulator-Aluno

Dentro do diretório `.simulator-aluno/`:

    # Para criar o container com volume compartilhada para desenvolvimento da aplicação Go
    $ docker-compose up -d

    # Para entrar dentro do container
    $ docker exec -it simulator bash

<br>

Dentro container:

    # Para criar o 'go.mod'
    go mod init github.com/danielsava/imersao-fullcycle-simulador







