$(document).foundation()
$(document).ready(function() {
  init()
})

var init = function() {

  var maxNumberofComics = 4;
  var APIUrl = 'http://gateway.marvel.com/v1/public/';
  var APIService = 'characters';
  var limitCharacters = 10;
  var offsetCharacters = 0;

  $.ajax({
    method: 'GET',
    url: APIUrl + APIService,
    data: {
      ts: '1',
      // apikey: '61c7e114cd9c1038685b872564b86355',
      // hash: '86fbb35b5d2896b831deedd8ce4774bb',
      apikey: '5a668d8b42a04ea41bd70390e8eb59ad',
      hash: '553fbf9dee5303e723505992d73c8c8c',
      limit: limitCharacters,
      offset: offsetCharacters,
    },
    beforeSend: function(msg){
      $('section').hide()
    },
    success: function(data){
      $('section').fadeIn(500)
      var charsData = data.data.results;

      renderIndexHTML(charsData, maxNumberofComics)

      buttonControllers(charsData);

      anchorControllers(charsData);

    }
  });

  /*
  Puntos faltantes:

  * MODAL COMIC: cuando se cierra el modal y se abre en otro comic no el botón de
  ADD COMIC deja de funcionar y no vuelve al estado inicial

  * My Favorites: Mostrar Comics seleccionados con título e ícono trash

  * Seach character

  * Sort By

  */
} // End init fn
