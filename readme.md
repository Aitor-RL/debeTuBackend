# DebeTu

## Dependencias

- express: poner el backend a la escucha en un puerto
- nodemon: reinicio automático
- mongoose: ORM mongoDB
- dotenv: variables de entorno
- morgan: logger
- bcrypt: encriptar/desencripta contraseñas
- jsonwebtoken: generar token de autenticacion
- passport: autenticación
- passport-jwt: autenticación

npm i -g nodemon
10.101.11.30

## Base de datos

Usamos el puerto 27018 para que no entre en conflicto con el mongo que tenemos instalado en local
```
docker run --name mongo -d -p 27018:27017 mongo
``` 
