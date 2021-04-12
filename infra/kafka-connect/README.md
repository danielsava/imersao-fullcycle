# Kafka Connect

<br>

<center>
<b>

       INTEGRAÇÃO DE SISTEMAS

</b>
</center>

<br>

O kafka Connect possui como principal objetivo `Integração de Sistemas`, buscando e persistindo de dados de fontes diversas.

O Kafka Connect é uma ferramenta totalmente separada do Kafka, cada uma com seus respectivos clustes:
 - Cluster Kafka Connect Instance API
 - Cluster Kafka

O cluster do Kafka Connect é formado por `conectores (Connect)` que buscam os dados de uma fonta de dados e enviam para um tópico e outro que consomem os dados de um tópico e persisnte em outra fonte de dados:

 - `Data Sources` Connectors: buscam os dados e envia para tópico do Kafka
 - `Sinks` Connectors: persistem os dados consumindo um tópico do Kafka

<br>

Estrutura básica, em resumo:


      Data Sources ---> Kafka Connec Instance API ---> Sinks
        MySQL                     |                 ElasticSearch
       MongoDB                    |                   file.txt 
       Twitter                    |                     JDBC
                                  V
                                Kafka

<br>

## Arquitetura do Cluster: Workers e Tasks

A estrtura básica do cluster do Kafka Connect é formado por:

 - `Workers`: máquinas que forma o cluster (equivalente aos `Broker` do Kafka)
 - `Tasks`: tarefas responsáveis por enviar e buscar os dados no Kafka de e para fontes de dados distintas. Cada tarefa é formada por `task + connector`.

<br>

## Confluent HUB

Segue o link do repositório de conectores (Data Sources e Sinks) da própria Confluent:

     https://www.confluent.io/hub/


## Elastic: Criando Schemas dos Indíces através do Kibana

Foi criado no Elastic, o Schema dos índices `route.new-direction` e `route.new-position` que serão populados pelo Kafka Connector Sink ElasticSearch.

Todos eles foram executados através `Management` --> `DevTools` do `Kibana`. Segue abaixo os schemas criados


    # Índice Posição
    PUT route.new-position
    {
      "mappings": {
        "properties": {
          "clientId": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"  
              }
            }
          },
          "routeId": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              }
            }
          },
          "timestamp": {
            "type": "date"
          },
          "finished": {
            "type": "boolean"
          },
          "position": {
            "type": "geo_point"
          }
        }
      } 
    }


    # Índice Direção
    PUT route.new-direction 
    {
      "mappings": {
        "properties": {
          "clientId": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"  
              }
            }
          },
          "routeId": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              }
            }
          },
          "timestamp": {
            "type": "date"
          } 
        }
      } 
    }

<br>

E os comandos abaixo, para `limpar os índices` (delete from ...)

    # route.new-position
    POST route.new-position/_delete_by_query?conflicts=proceed
    {
      "query": {
        "match_all": {}
      }
    }

    # route.new-direction
    POST route.new-direction/_delete_by_query?conflicts=proceed
    {
      "query": {
        "match_all": {}
      }
    }


