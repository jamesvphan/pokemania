class PokemonSearchController {
  constructor($target, types) {
    this.$target = $target
    this.types = types
    this.attachListeners()
  }
  attachListeners(){
    this.$target.find("your-roster").on('click', () => {
      // take the search value, search,
      Pokemon.initialize(input, "your-roster")
      .then((pokemon) => {
        store.state.your_roster.push(pokemon)
      })
    })
    this.$target.find("enemy-roster").on('click', () => {
      // take the search value, search,
      Pokemon.initialize(input, "enemy-roster")
      .then((pokemon) => {
        store.state.enemy_roster.push(pokemon)
      })
    })
  }
}
