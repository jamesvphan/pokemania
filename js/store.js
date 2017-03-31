class Store {
  constructor() {
    this.state = {}
    this.state.your_roster = []
    this.state.enemy_roster = []
  }
  // resource will be either pokemon or type, id will be type id or pokemon #
  addPokemon(resource, object) {
    this.state[resource] = this.state[resource] || {}
    this.state[resource][object.id] = object
  }
  addTypes(object) {
    this.state["types"] = this.state["types"] || []
    this.state["types"] = object
  }
  findPokemon(resource, numOrName) {
    this.state[resource] = this.state[resource] || {}
    if (isNaN(numOrName)) {
      var pokemon = Object.values(store.state.pokemon).filter(function(ele) {
          return ele.name == numOrName
        })[0]
      if (pokemon) {
        var id = `${pokemon.id}`
      } else {
        var id = null
      }
    } else {
      var id = numOrName
    }
    this.state[resource] = this.state[resource] || {}
    return this.state[resource][id]
  }
  findTypes() {
    this.state["types"] = this.state["types"] || []
    return this.state["types"]
  }
  addRoster(resource, object) {}

}

let store = new Store()
