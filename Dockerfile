#FROM node:21.6.2
FROM node:18

# Instalar Python y pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm /usr/lib/python*/EXTERNALLY-MANAGED

WORKDIR /usr/src/app

COPY package*.json ./

# Copiar archivos de Python y las dependencias
COPY python ./python/
RUN pip install --no-cache-dir -r python/requirements.txt

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3000