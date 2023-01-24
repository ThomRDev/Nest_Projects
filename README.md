# Learning Nest

- Nest es un framework sobre nodejs con abstracciones
- Nest utiliza express o tambien se puede cambiar con fastify
- SOLID
- typescript
- Orientado a objetos
- programacion funcional
- programacion reactiva

```sh
    # instalacion de nest cli
    npm i -g @nestjs/cli

    # nuevo proyecto
    nest new my_project

```

Building Blocks
e2e (APRENDISAJE PENDIENTE)

## Modulos en Nest

Agrupan y desacoplan un conjunto de funcionalidad especifica por dominio(¿QUE ES UN DOMINIO?)

## CONTROLADORES

Controlan rutas, son los encargados de escuchar las peticiones de un cliente y emitir respuestas

```sh
    nest -h # nest --help

    # generar un nuevo modulo
    nest g mo cars

    # crear controlador dentro de mi modulo
    nest g co cars
```

## Desactivar el eslinter and prettier de nest solo para el aprendizaje

```sh
    npm uninstall prettier
    # luego control + shift + p
    # Seleccionar la opcion de reload

```

(ESTUDIAR)
## servicios

Se encarga de la logica del negocio

Todos los servicios son provider pero no todos los providers son servicios

Utilizar providers cuando se quieran hacer inyecion de dependecias

```sh

    # crea un servicio dentro de modulo
    nest g s cars --no-spec
```

```sh
    # para usar UsePipes en los metodos del controlador
    # npm i class-validator class-transformer

```

## PIPES

Los pipes transforman la data

nest g res common --no-spec ( borrar todo menos el modulo)
nest g pipe common/parse-int

## DTO

Transportan la data


```sh
    # esto me crea todo, un modulo, los servicios los controladores la entidad y los dtos
    nest -h
    nest g res todo --no-spec
    nest g res brands --no-spec
    nest g resource brands --no-spec
```

## Comunicacion entre modulos y tambien comunicacion entre servicios

El servicios SEED para llenar la data (solo es para desarrollo)

nest g res seed --no-spec

antes de todo utlizar esto si estoy utilizando seeds

```sh
    http://localhost:3000/seed
```
tree chacking???

## Despliegue rapido

- npm run build
- npm run start:prod

# Servir contenido estatico en Nest

- npm i @nestjs/serve-static
- revisar el pdf de fernando para la demas configuracion

# Global prefix

- app.setGlobalPrefix('api') || app.setGlobalPrefix('api/v2')

Esto sirve para los controllers

http://localhost:3000/api/*

Para los archivos estaticos no afecta

nest g res pokemon --no-spec

## Docker para mongo

Previamente tengo que hacer el pull

- <https://gist.github.com/Klerith/c0ef4f48d986e2cf3308bb54fff84ea5>

## Conectando Nest con mongo utilizando un adaptador con mongoose

npm i @nestjs/mongoose mongoose


## Dockerizar

Explicacion del Dockerfile

## TypeORM o prisma en nest

Para las variables de entorno tengo que configurar
instalar npm i @nestjs/config

y agregar al app.module.ts

Tambien

npm i @nestjs/typeorm typeorm pg
npm i class-validator class-transformer

configurar el app.module.ts agregando typeorm

nest g res products --no-spec


## Extras Linux

```sh

    Shebang: decirle al interprete o compilador que se esta usando #! significa para ejectuar
    # comando de linux bash
    Rutas de acceso a algun interprete
    #!/usr/bin/env python
    #!/usr/bin/python3
    #!/bin/env
    #!/bin/sh — Execute the file using sh, the Bourne shell, or a compatible shell
    #!/bin/csh — Execute the file using csh, the C shell, or a compatible shell
    #!/usr/bin/perl -T — Execute using Perl with the option for taint checks
    #!/usr/bin/php — Execute the file using the PHP command line interpreter
    #!/usr/bin/python -O — Execute using Python with optimizations to code
    #!/usr/bin/ruby — Execute using Ruby

    Por utilizar caractecres extraños
    #-*- coding: utf-8 -*- 
    #-*- coding: utf-8

```


## Carga de archivos

npm i -D @types/multer

nest g res files --no-spec

```sql
    -- esto actualiza todo y ademas lo concatena
    UPDATE product_images SET url = 'http://localhost:3000/api/files/products/'|| url
    -- o cuando obtenermos eso podemos concatenar en la consulta
    SELECT url,'http://localhost:3000/api/files/products/'|| url from product_images
    -- pero guardamos data innecesaria
    -- es mejor colocar el nombre del product
```

## Autentication

nest g res auth --no-spec

## Passport

npm i @nestjs/passport passport
npm i @nestjs/jwt passport-jwt
npm i @types/passport-jwt -D

https://docs.nestjs.com/security/authentication

## Generando Documentacion de API con postman

En nuestro postman podemos exportan toda nuestra funcionalidad, y nos generara un json
Luego podemos importar ese json y obtener todos nuestros endpoint, etc.

Si ya tenemos todas nuestros enpoint en postman podemos publicarlo.

Para todo lo anterior necesito tener una cuensta en postman.

## Generando Documentacion de API con Swagger

npm i @nestjs/swagger

https://docs.nestjs.com/openapi/introduction

Configurar el main

localhost:3000/api

Importante documentar el DTO, para saber que vamos a enviar

https://docs.nestjs.com/openapi/security

@ApiOperation

https://stackoverflow.com/questions/60114023/how-to-add-summary-and-body-manually-in-swagger-nestjs

## WebSockets

Gateways (funcionalidad similar a un controlador,(es un wrapper que envuele socket.io y ws))

https://docs.nestjs.com/websockets/gateways

npm i --save @nestjs/websockets @nestjs/platform-socket.io
npm i socket.io

nest g res messagesWs --no-spec (escogemos websockets y le elegimos no)

tengo que exponer esto si quiero que alguien se conecte a mi socket
localhost:3000/socket.io/socket.io.js

Postman tiene para pobrar websockets
