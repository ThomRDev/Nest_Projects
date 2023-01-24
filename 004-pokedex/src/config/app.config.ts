// esto se creo manualmente igual que la carpeta config

// solo para los building blocks dentro de nest paa hara hacer inyeccion de dependencias
export const EnvConfiguration = () => ({
    environment   : process.env.NODE_ENV || 'dev',
    mongodb       : process.env.MONGODB,
    port          : process.env.PORT || 3001,
    default_limit : +process.env.DEFAULT_LIMIT || 4
})
