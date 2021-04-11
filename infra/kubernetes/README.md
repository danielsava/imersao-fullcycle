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

    $ kubectl logs -f deploymet/<nome_deploy>   // logs do deployment: visualiza de todos os pods  

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
