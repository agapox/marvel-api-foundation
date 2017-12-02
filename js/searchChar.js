var searchAutocomplete = new autoComplete({
  selector: '#search-character',
  minChars: 1,
  source: function(term, suggest){
    var APIUrl = 'http://gateway.marvel.com/v1/public/';
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
        offset: offsetCharacters,
        nameStartsWith: term
      },
      beforeSend: function(msg){
        $('section').hide()
      },
      success: function(data){
        term = term.toLowerCase();
        //var choices = data.data.results;
        //var suggestions = [];
        //for (i = 0; i < choices.length; i++) {
        //  if (~choices[i].name.toLowerCase().indexOf(term)) {
        //    suggestions.push(choices[i].name);
        //  }
        //  suggest(suggestions);
        //}
      }
    });
  },
  onSelect: function(e, term, item){
    console.log(item);

    //alert('Item "' + item + ', Term ' + term + '" selected by '+(e.type == 'keydown' ? 'pressing enter' : 'mouse click')+'.');
  }
});
