$(document).foundation().
  ready(function() {


    var APIUrl = 'http://gateway.marvel.com/v1/public/characters';
    var limitCharacters = 10;
    var offsetCharacters = 10;
    $.ajax({
      method: "GET",
      url: APIUrl,
      data: {
        ts: '1',
        apikey: '61c7e114cd9c1038685b872564b86355',
        hash: '86fbb35b5d2896b831deedd8ce4774bb',
        limit:10
      },
      beforeSend: function(msg){
        $(document).children().hide()

      },
      success: function(msg){
        $(document).children().fadeIn(600);

      }
    })
      .done(function( data ) {
        var mainData = data.data.results; // Array of Characters

        for (i = 0; i < mainData.length; i++) {

          // Character Main Container
          var charMainCont = $('<div></div>');
          charMainCont.
            attr({
              id: 'character-cont-' + mainData[i].id,
              class: 'character-cont small-12 large-6 columns'
            }).
              hide();

          // Character Container
          // Character Container for Image
          var mediaCont = '<div class="row columns">';
          mediaCont += '<div class="small-12 medium-6 columns">';
          mediaCont += '<div class="character-img-cont">';
          mediaCont += '<img id="img-' + mainData[i].id + '" class="card-character-img" src="' + mainData[i].thumbnail.path + '/standard_xlarge.' + mainData[i].thumbnail.extension + '">';
          mediaCont += '</div>';
          mediaCont += '</div>';

          // Character Container for Details (name, description, button)
          mediaCont += '<div class="small-12 medium-6 columns">';
          mediaCont += '<h5 id="char-name-' + mainData[i].id + '" class="card-char-name">' + mainData[i].name + '</h5>';
          if (mainData[i].description) {
            mediaCont += '<p id="char-description-' + mainData[i].id + '" class="card-char-description">' + mainData[i].description + '</p>';
          } else {
            mediaCont += '<p id="char-description-' + mainData[i].id + '" class="card-char-description">Coming soon</p>';
          }
          mediaCont += '<button id="char-btn-' + mainData[i].id + '" class="cad-more-btn" type="button" name="button">view more</button>';
          mediaCont += '</div>';

          mediaCont += '</div>';

          charMainCont.append($(mediaCont));

          // Character Related Comics Container
          var comicsCont = '<div class="row comics-cont">';
          comicsCont += '<div class="columns small-12">';
          comicsCont += '<h6 class="details-title">Related Comics</h6>';
          comicsCont += '</div>'; // div.columns.small-12

          // for para iterar los comics
          var listComics = mainData[i].comics.items; // Array of Comics
          var comicsArray4 = [];
          for (j = 0; j < listComics.length; j++) {
            comicsArray4.push('<p id="char-comic-'+ (j+1) + '-charid' + mainData[i].id + '" class="comics-title">' + listComics[j].name + '</p>');
            if (j === 3) {
              break
            } else {
              ''
            }
          }
          comicsCont += '<div class="char-comics-section row columns">';
          comicsCont += '<div class="row">';
          comicsCont += '<div class="small-6 columns">';

          if (comicsArray4[0]) {
            comicsCont += comicsArray4[0];
          } else {
            comicsCont += '<p id="char-comic-1-charid' + mainData[i].id + '" class="comics-title">Comming soon</p>'
          }

          comicsCont += '</div>'; // div.small-6.columns
          comicsCont += '<div class="small-6 columns">';

          if (comicsArray4[1]) {
            comicsCont += comicsArray4[1];
          } else {
            comicsCont += '<p id="char-comic-1-charid' + mainData[i].id + '" class="comics-title">Comming soon</p>'
          }

          comicsCont += '</div>'; // div.small-6.columns
          comicsCont += '</div>'; // div.row
          comicsCont += '<div class="row">';
          comicsCont += '<div class="small-6 columns">';

          if (comicsArray4[2]) {
            comicsCont += comicsArray4[2];
          } else {
            comicsCont += '<p id="char-comic-1-charid' + mainData[i].id + '" class="comics-title">Comming soon</p>'
          }

          comicsCont += '</div>'; // div.small-6.columns
          comicsCont += '<div class="small-6 columns">';

          if (comicsArray4[3]) {
            comicsCont += comicsArray4[3];
          } else {
            comicsCont += '<p id="char-comic-1-charid' + mainData[i].id + '" class="comics-title">Comming soon</p>'
          }

          comicsCont += '</div>'; // div.small-6.columns
          comicsCont += '</div>'; // div.row
          comicsCont += '</div>'; // div.char-comics-section.row.columns

          comicsCont += '</div>'; // div.row.comics-cont
          charMainCont.append($(comicsCont));

          charMainCont.fadeIn(800);

          $('#characters-list').append(charMainCont);


          console.log((i+1) + '.- ' + mainData[i].name + '. Comics # ' + mainData[i].comics.available);
          console.log('Descripción: ' + mainData[i].description);


        } // for

      }) // done

  }); // ready
