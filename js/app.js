$(() => {
  $(document).on({
      ajaxStart: function() { $("body").addClass("loading");   },
      ajaxStop: function() { $("body").removeClass("loading"); }
  });
  Type.all()
  .then((types) => {
    var $where = $(".pokeSubmit")
    let psController = new PokemonSearchController($where, types)
    plsWork()
    plsRemove()
    plsEvolve()
    plsBattle()
  })
})
