# Usa una imagen base con Node.js
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE ----

# Comando para ejecutar la aplicación
CMD ["node", "pantalla.js"]
