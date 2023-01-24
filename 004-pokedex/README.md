<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```sh
  npm i
```
3. Tener el Nest CLI instalado
```sh
 npm i -g @nestjs/cli
```
4. Levantar la base de datos
```sh
  docker-compose up -d
```

5. clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. Llenar las variables de entorno definidas en el **.env**

7. Ejecutar la aplicacion en dev

```sh
  npm run start:dev
```

8. Reconstruir a la base de datos con la semilla

```sh
  http://localhost:3000/api/v2/seed
``` 

## Stack usado
* MongoDB
* Nest

## Carpeta Common

Sirve para compartir logica para otros modulos, pipes que se compartiran etc
esa carpeta lo creamos  `nest g mo common` `nest g pi common/pipes/parseMongoId --no-spec`
Es lo unico que tengo que hacer ya que los pipes son globales

## Production Build

1. Crear el archivo .env.prod
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen

```sh
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Notes

Heroku redeploy sin cambios

git commit --allow-empty -m "trigger heroku deploy"
git push heroku <master|main>