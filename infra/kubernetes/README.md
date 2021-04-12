# Kubernetes

<center>

<br>

<b>Orquestrador de Containers</b>

<br>

    "Kubernetes (k8s) é um produto Open Source utilizado para automatizar a implantação, o dimensionamento e o gerenciamento de aplicativos em contêiners"

</center>

<br>

## Kubernest API e KubeCTL

Kubernetes é disponibilizado através de um conjunto de API. Normalmente, essas API são acessada utilizando o `kubectl`.

Basicamente, um clustes Kubernetes é composto por:

 - Kubernetes Master
    - Kube-apiserver
    - Kube-controller-manager
    - Kube-scheduler

 - Nodes Slaves:
    - Kubelet
    - kubeproxy

<br>

## GCP : Kubernetes e Google Cloud SDK

Foi criada uma conta no `Google Cloud Plataform` e criado um cluster Kubernetes através da opção `Kubernetes Engine`.

Para auxiçliar na adminstração do cloud, foi feito o download e instalação do `Google Cloud SDK`. Instruções do site oficial:

    - https://cloud.google.com/sdk/docs/quickstart#windows


<br>

### KubeCTL 

Para adminstração do cluster Kubernetes, foi utilizado o `kubectl`. A instaçlação pode ser feita da seguinte forma:

<br>

 - `Site Oficial KubeCTL`:
    - https://kubernetes.io/docs/tasks/tools/


 - `Docker Desktop Windows` 
   - Já vem com `kubectl` instalado. Talvez a versão possa estar um pouco desatualizada (*opção utilizada*)


 - `Google Cloud SDK` (já instalado e configurado)
   -  `gcloud components install kubectl`
   - `obs`: deu conflito com a versão do kubectl do Docker Desktop já instalada na maquina.

<br>

Para verificar a instalação:

    $ kubectl version --client
   

<br>

### Conectar no Cluster Kubernetes

Para configurar o `kubectl` para ter acesso ao cluster k8s, em `Kubernetes Cluster` no Painel de Adminstração do GCP, clicar no menu:

 - `Açoes` (botão 3 pontos) --> `Conectar`.

 Para testar o acesso:

    #
    $ kubectl cluster-info

    # 
    $ kubectl get nodes

<br>

## GCP K8S: Deploy Simulador


Foi gerada uma `nova imagem` do simulador com as configurações do arquivo `Dockerfile.prod` e com as configurações do `Kafka Client` do `Cluster Kafka` criado no cloud da `ConfluentInc`.

Dentro do diretório `simulador-go/simulator`:

    # Build
    $ docker build -t danielsava/imersao-fc-simulador-go:latest -f Dockerfile.prod .

    # Push
    $ docker push danielsava/imersao-fc-simulador-go:latest

<br>

Criada a imagem com as novas configurações e feito pus, dentro do diretório `kubernetes/simulador`, e com `kubectl` configurado e funcionado com o cluster kuberntes na GCP:

    # Config
    $ kubectl apply -f configmap.yaml 
    $ kubectl get configmap
    $ kubectl describe configmap simulator-conf


    # Deploy 
    $ kubectl apply -f deploy.yaml
    $ kubectl get deploy // (ou deployment)
    $ kubectl describe deploy simulator

    # Logs: 
    $ kubectl get pods                  
    $ kubectl logs -f <nome_pod>                // logs do pod

    $ kubectl logs -f deployment/<nome_deploy>   // logs do deployment: visualiza de todos os pods  

    # Deletar
    $ kubectl delete -f <nome_arquivo>.yaml
    $ kubectl delete configmap <nome_config_map>  // nome obtido através do 'kubectl get configmap'
    $ kubectl delete deploy <nome_deploy>         // nome obtido através do 'kubectl get deploy'


    # Executar Shell 
    $ kubectl exec --stdin --tty <nome_pod> -- /bin/bash
    # Ou
    $ kubectl exec -it <nome_pod> -- /bin/bash   // '-it' é a abreviação de '--stdin' e '--tty'

    # Sair do Container 
    $ exit


    # Para visualizar o conteudo do arquivo de configuração
    $ kubectl get <resource> <nome_resource> -o yaml
    $ kubectl get configmaps game-config -o yaml    // exemplo

<br>

## Helm: instalação do MongoDB no K8s na GCP

Para instalar o MongoDB no clustes k8s, foi utilizado o gerenciador `Helm`. Para instalação foi seguido as instruções do [site oficial](https://helm.sh/docs/intro/quickstart/)

Das opções, foi escolhida a instalação pelo `Chocolatey`


     # Instalação
     $ choco install kubernetes-helm

     # Repositorio config
     $ helm repo add stable https://charts.helm.sh/stable

     # Instalação exemplo, MYSQL
     $ helm repo update
     $ helm install stable/mysql --generate-name


     # Para obter senha do root
     $ MYSQL_ROOT_PASSWORD=$(kubectl get secret --namespace default mysql-1618180052 -o jsonpath="{.data.mysql-root-password}" | base64 --decode; echo)

     # Ou (mais fácil)
     kubectl get secret <nome_secret_mysql> -o yaml

<br>

### Instalação do Mongo com Helm

Com o `Helm` instalado e configurado, foi instalado o MongoDB. Foi instalado o pacote da Bitnami, e portanto seguindo as instruções de instalação do [site oficial](https://bitnami.com/stack/mongodb/helm):

     
     # Instalação do Repo
     $ helm repo add bitnami https://charts.bitnami.com/bitnami

     # Instalação do Mongo, com configurações de user, senha e collection
     $ helm install mongodb bitnami/mongodb --set=auth.username="root",auth.rootPassword="root",auth.database="nest" 

<br>

Segue abaixo as instruções do Helm para utilização do Mongo:

    MongoDB(R) can be accessed on the following DNS name(s) and ports from within your cluster:

    mongodb.default.svc.cluster.local

    To get the root password run:

    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace default mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)

    To connect to your database, create a MongoDB(R) client container:

    kubectl run --namespace default mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:4.4.5-debian-10-r0 --command -- bash

    Then, run the following command:
    mongo admin --host "mongodb" --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD

    To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace default svc/mongodb 27017:27017 &
    mongo --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD


<br>

## Nest API : configurações do MongoDB