class Api {
  static getJSON(resource) {
    return $.getJSON(`https://pokeapi.co/api/v2/${resource}`)
  }
}
