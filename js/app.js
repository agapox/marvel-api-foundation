$(document).foundation().
  ready(function() {
    APIService = 'characters';
    var APIUrl = 'http://gateway.marvel.com/v1/public/' + APIService;
    var limitCharacters = 10;
    var offsetCharacters = 10;
    $.ajax({
      method: 'GET',
      url: APIUrl,
      data: {
        ts: '1',
        apikey: '61c7e114cd9c1038685b872564b86355',
        hash: '86fbb35b5d2896b831deedd8ce4774bb',
        limit:limitCharacters,
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

        // Create de Characters Grid
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
          mediaCont += '<button id="char-btn-' + mainData[i].id + '" data-open="exampleModalB-' + mainData[i].id + '" class="cad-more-btn" type="button" name="button">view more</button>';
          mediaCont += '</div>';

          mediaCont += '</div>';

          var charInnerMainCont = $('<div></div>');
          charInnerMainCont.
            attr({
              id: 'character-inner-cont-' + mainData[i].id,
              class: 'character-inner-cont columns'
            })

          charInnerMainCont.append($(mediaCont));


          // Character Related Comics Container
          var comicsCont = '<div class="row comics-cont">';
          comicsCont += '<div class="columns small-12">';
          comicsCont += '<h6 class="details-title">Related Comics</h6>';
          comicsCont += '</div>'; // div.columns.small-12

          // for para iterar los comics
          var listComics = mainData[i].comics.items; // Array of Comics
          var comicsArray4 = [];
          for (j = 0; j < listComics.length; j++) {
            comicsArray4.push('<a modal="' + mainData[i].id + '" data-open="exampleModal-' + mainData[i].id + '"><p id="char-comic-'+ (j+1) + '-charid' + mainData[i].id + '" class="comics-title">' + listComics[j].name + '</p></a>');
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
            comicsCont += '<p id="char-comicId-1-charId' + mainData[i].id + '" class="comics-title">Comming soon</p>'
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
          charInnerMainCont.append($(comicsCont));

          charMainCont.
            append(charInnerMainCont).
              fadeIn(800);

          $('#characters-list').
            append(charMainCont);


          //console.log((i+1) + '.- ' + mainData[i].name + '. Comics # ' + mainData[i].comics.available);
          //console.log('Descripción: ' + mainData[i].description);

        } // End for Create de Characters Grid


        // Click for Modal Popup
        $('a[modal]').click(function() {


          var idMarvelCharacter = $(this).attr('modal');

          APIService = 'characters/' + idMarvelCharacter;
          var APIUrl = 'http://gateway.marvel.com/v1/public/' + APIService;
          var limitCharacters = 4;
          $.ajax({
            method: 'GET',
            url: APIUrl,
            data: {
              ts: '1',
              apikey: '61c7e114cd9c1038685b872564b86355',
              hash: '86fbb35b5d2896b831deedd8ce4774bb',
              limit: limitCharacters
            },
            beforeSend: function(msg){


            },
            success: function(msg){


            }
          })
            .done(function( data ) {
              var indexComic = 0;
              var characterComics = data.data.results[0].comics.items; // Array of Characters Comics
              //console.log(characterComics);

            })

          //console.log($(this).attr('modal'));

          var modalCont = $('div[modal]').attr('id', 'exampleModal-' + $(this).attr('modal')).
          attr('style','max-width:840px;');

          // Add Comic to Favorites
          $('#add-comic-fav').click(function() {
            $(this).toggleClass('add-comics-selected')
            $(this).children().toggle().attr({
              src: 'icons/btn-favourites-primary.png',
              'style': 'display:inline-block;'
            },{
              src: 'icons/btn-favourites-default.png',
              'style': 'display:inline-block;'
            })

            console.log(comicsArray4);

            //$('#my-favorites').append(characterComics[0].name)
          }) // end Click #add-comic-fav



        }); // End modal function

        // Button View More
        for (i = 0; i < mainData.length; i++) {

          $('div[modal|=view-more-modal]').click(function() {
            console.log('clic view more');

          });

        } // end for Button View More


      }) // done

  }); // ready
