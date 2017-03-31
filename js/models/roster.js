class Roster {
  constructor() {
    this.pokemon = []
  }
  static addPokemon(pokemon) {
    this.pokemon.push(pokemon)
  }
  static removePokemon(poke_element) {
    let el = poke_element
    let poke_obj = {};
    if (poke_element.dataset.roster === "pokemon") {
      debugger
      poke_obj.pokemon = your_roster.pokemon.find(function(pokemon, index) {
        poke_obj.index = index
        return pokemon.name === el.dataset.pokemonName
      })
      your_roster.pokemon.splice(poke_obj.index, 1)
    } else {
      poke_obj.pokemon = psController.enemy_roster.pokemon.find(function(pokemon, index) {
        poke_obj.index = index
        return pokemon.name === el.dataset.pokemonName
      })
      enemy_roster.pokemon.splice(poke_obj.index, 1)
    }
    $(poke_element).parent().empty()
  }
}
