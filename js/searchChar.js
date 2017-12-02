var searchCharacter = function(character) {

  $('#search-character').keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  if (character == '') {
    init();
  } else {

    var maxNumberofComics = 4;
    var APIUrl = 'https://gateway.marvel.com/v1/public/';
    var APIService = 'characters';
    var limitCharacters = 10;
    var offsetCharacters = 0;

    $.ajax({
      method: 'GET',
      url: APIUrl + APIService,
      data: {
        ts: '1',
        apikey: '61c7e114cd9c1038685b872564b86355',
        hash: '86fbb35b5d2896b831deedd8ce4774bb',
        // apikey: '5a668d8b42a04ea41bd70390e8eb59ad',
        // hash: '553fbf9dee5303e723505992d73c8c8c',
        limit: limitCharacters,
        nameStartsWith: character
      },
      beforeSend: function(msg){
        $('section').hide()
      },
      success: function(data){
        $('section').fadeIn(500)
        var charsData = data.data.results;
        console.log(charsData);

        $('#characters-list').children().remove();

        $('#characters-list').append($initialCharsListChildren)

        renderIndexHTML(charsData, maxNumberofComics)

        buttonControllers(charsData);

        anchorControllers(charsData);



      }
    }); // End Ajax
  }



} // End searchCharacter
