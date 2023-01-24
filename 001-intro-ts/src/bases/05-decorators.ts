// los decoradores son simples funciones



class NewPokemon{
    constructor(
        public readonly id:number,
        public name:string
    ){}
    scream(){
        console.log(`No quiero!!`)
    }
    speak(){
        console.log(`No quiero hablar`)
    }
}

// tiene acceso a la definicion de la clase, del metodo de la propiedad etc
// la cual puede expandir,añadir, modificar eliminar y hacer muchas cosas al objetivo
const MyDecorator = () => {
    return (target:Function) => {

        // retorna la definicion de otra clase
        // la cual va a sobreescribir
        // sobrescribe la DEFINICION DE LA CLASE
        // SI SE INSTANCIA SE INSTANCIA LA CLASE DE NewPokemon
        return NewPokemon
    }
}

@MyDecorator()
export class Pokemon{
    constructor(
        public readonly id:number,
        public name:string
    ){}
    scream(){
        console.log(`${this.name.toUpperCase()}!!`)
    }
    speak(){
        console.log(`${this.name} ${this.name}`)
    }
}