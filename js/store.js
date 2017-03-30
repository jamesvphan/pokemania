class Store {
  constructor() {
    this.state = {}
  }
  // resource will be either pokemon or type, id will be type id or pokemon #
  addPokemon(resource, object) {
    this.state[resource] = this.state[resource] || {}
    this.state[resource][object.id] = object
  }
  addTypes(object) {
    this.state["types"] = this.state["types"] || {}
    this.state["types"] = object
  }
  findPokemon(resource, numOrName) {
    var pokemon = Object.values(store.pokemon).filter(function(ele) {
        return ele.name == name
      })[0]
    var id = pokemon.id
    this.state[resource] = this.state[resource] || {}
    return this.state[resource][id]
  }
  findType() {
    this.state["types"] = this.state["types"] || {}
    return this.state["types"]
  }
}

Object.values(store.pokemon).filter(function(ele) {
    return ele.name == name})[0].id
