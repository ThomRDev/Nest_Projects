#!/bin/bash

param=$1

RED="\033[1;31m"
GREEN="\033[1;32m"
NOCOLOR="\033[0m"

if [[ -z $param ]] ;then
    echo -e "\n${RED} > Introdusca algun paramentro [-b|-d] ${NOCOLOR}\n"
    exit 1
fi

case $param in
    "-d")
        docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
        ;;
    "-b")
        docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
        ;;
    *)
        echo -e "\n${RED} > Los unicos parametros permitidos son -b o -d\n  "
        exit 1 
        ;;
esac

# else
#     echo "not empty"
# fi

