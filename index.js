class Pokemon {
  constructor(number, name, types, sprite) {
    this.number = number,
    this.name = name,
    this.types = types,
    this.sprite = sprite
    roster.push(this)
  }
  static find(numOrName) {
    return $.get(`https://pokeapi.co/api/v2/pokemon/${numOrName}`).
    then((pokemon) => {
      var sprite = `https://assets-lmcrhbacy2s.stackpathdns.com/img/pokemon/animated/${pokemon.name}.gif`
      return new Pokemon(pokemon.id, pokemon.name, pokemon.types, sprite)
    })
  }
}

var roster = []

$(function() {
  $(".pokeSubmit").on("click", function() {
    event.preventDefault()
    var input = $("#numOrName").val()
    Pokemon.find(input).
    then(function(pokemon){
      $('.container').find('.pokemon:empty:first').html("<img src=" + pokemon.sprite + "><a href='#' onclick='removePokemon(this)'>X</a>")
    })
  })
})

function removePokemon(pokemon) {
  let i = pokemon
  $(i).parent().empty()

}
