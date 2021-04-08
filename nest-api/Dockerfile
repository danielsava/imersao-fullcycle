# Debian (imagem final: 1GB)
# FROM node:14.16.0 

# Alpine (*** imagem final: 243MB ***)
FROM node:14.16.0-alpine3.11

# Instala o bash. Necessário apenas quando utiliza o Alpine
RUN apk add --no-cache bash

# Mesma ideia pode ser aplicada para montar ambiente Angular. Basta instalar o @angular/cli na versão desejada
RUN npm install -g @nestjs/cli@7.5.6

USER node

EXPOSE 3000

WORKDIR /home/node/app


# Configurações exemplos
# ENV NPM_CONFIG_LOGLEVEL info //  Ou, docker run -e NPM_CONFIG_LOGLEVEL=info
# ENV PATH=$PATH:/home/node/.npm-global/bin

# Exemplo de uso de variáveis
# ENV name John Dow
# ENTRYPOINT echo "Hello, $name"

# Desta forma irá imprimir o '$name' na saída
# ENV name John Dow
# ENTRYPOINT ["/bin/echo", "Hello, $name"]

# Para corrigir o problema acima
# ENV name John Dow
# ENTRYPOINT ["/bin/bash", "-c", "echo Hello, $name"]