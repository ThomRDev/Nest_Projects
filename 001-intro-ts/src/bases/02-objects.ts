export const pokemonIds = [1,20,30,34,66]

// export const pokemon = {
//   id: 1,
//   name : 'something pokemon'
// }

interface Pokemon {
  id    : number ;
  name  : string ;
  age?:number /* no me obliga */
  // age:number | undefined /* me obliga a que este esta propiedad */
}
export const pokemon:Pokemon = {
  id: 1,
  name : 'something pokemon'
}



// me dice que es de tipo never
//  quiere decir que no tendra nada
//  y si agrego algo me dara error
  // ts me obligara a tipar todo
// export const pokemons  = []


export const pokemons:Pokemon[]  = []