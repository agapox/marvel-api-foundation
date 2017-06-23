var renderIndexHTML = function(charsData,comicsQty) {
  charsData.forEach(function(item,index){
    var charCont = $('#char-container').clone().hide();
    charCont.attr('id','char-container-'+item.id).fadeIn(1000);
    charCont.find('img.card-character-img').attr({
      'id': 'char-img-' + item.id,
      'src': item.thumbnail.path + '/standard_xlarge.' + item.thumbnail.extension,
      'alt': item.name
    }).fadeIn(1500);
    charCont.find('h5.card-char-name').attr({
      'id': 'char-name-' + item.id,
    }).html(item.name).fadeIn(2000);
    charCont.find('p.card-char-description').attr({
      'id': 'char-description-' + item.id,
    }).html(item.description).fadeIn(2000);
    charCont.find('button.cad-more-btn').attr({
      'id': 'char-button-' + item.id,
      'type'  : 'button',
      'modal': item.id,
      'data-open': 'exampleModalB'
      // 'data-open': 'exampleModalB-' + item.id
    }).fadeIn(2000);


    var numberComics = 0;
    while (numberComics < comicsQty) {
      if (item.comics.items[numberComics]) {
        newDivComic = $('<div class="small-12 medium-6 columns"></div>');

        var anchorComic = $('<a></a>')
          .attr({
            'id':'comic-' + numberComics + '-' + item.id,
            'modal': item.id,
            'data-open': 'exampleModal1C',
            // 'data-open': 'exampleModalC-' + item.id,
            'posComic': numberComics
          });
        var newComic = $('<p class="comics-title"></p>')
          .append(item.comics.items[numberComics].name);
        anchorComic.append(newComic);
        newDivComic.append(anchorComic);
      } else {
        newDivComic = $('<div class="small-12 medium-6 columns"><p class="comics-title">Coming soon</p></div>');
      }; // End if else
      charCont.find('.char-comics-section').append(newDivComic);
      numberComics++;
    }; // End while for comics of a character

    if (index % 2 === 0) {
      newRow = $('<div class="row"></div>');
      newRow.append(charCont);
    } else {
      newRow.append(charCont);
    }; // End if else
    $('#characters-list').append(newRow);
  });
  $('#char-container').remove();

}; // End renderIndexHTML()
