class Roster {
  constructor() {
    this.pokemon = []
  }
  static addPokemon(pokemon) {
    if (pokemon.team == 1) {
      your_roster.pokemon.push(pokemon)
      allPokes.pokemon.push(pokemon)
    } else {
      enemy_roster.pokemon.push(pokemon)
      allPokes.pokemon.push(pokemon)
    }
  }
  static removePokemon(poke_element) {
    let el = poke_element
    let poke_obj = {};
    if (poke_element.dataset.roster === "pokemon") {
      poke_obj.pokemon = your_roster.pokemon.find(function(pokemon, index) {
        poke_obj.index = index
        return pokemon.name === el.dataset.pokemonName
      })
      your_roster.pokemon.splice(poke_obj.index, 1)
    } else {
      poke_obj.pokemon = enemy_roster.pokemon.find(function(pokemon, index) {
        poke_obj.index = index
        return pokemon.name === el.dataset.pokemonName
      })
      enemy_roster.pokemon.splice(poke_obj.index, 1)
    }
    $(poke_element).parent().empty()
  }
}
