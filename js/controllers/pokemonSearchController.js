class PokemonSearchController {
  constructor($target, types) {
    this.$target = $target
    this.types = types
    this.your_roster = new Roster()
    this.enemy_roster = new Roster()
    this.attachListeners()
  }
  attachListeners(){
    this.$target.find("your-roster").on('click', () => {
      // take the search value, search,
      Pokemon.initialize(input, "your-roster")
      .then((pokemon) => {
        your_roster.addPokemon(pokemon)
      })
    })
    this.$target.find("enemy-roster").on('click', () => {
      // take the search value, search,
      Pokemon.initialize(input, "enemy-roster")
      .then((pokemon) => {
        enemy_roster.addPokemon(pokemon)
      })
    })
  }
}
