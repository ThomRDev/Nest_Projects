const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}

export class Pokemon{
    constructor(
        public readonly id:number,
        public name:string
    ){}
    scream(){
        console.log(`${this.name.toUpperCase()}!!`)
    }

    @Deprecated('Most use speak2 method instad')
    speak(){
        console.log(`${this.name} ${this.name}`)
    }

    speak2(){
        console.log(`${this.name} ${this.name}!!`)
    }
}

const pokemon = new Pokemon(4,'something 4')
pokemon.speak()
pokemon.speak2()