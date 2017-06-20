$(document).foundation()

var maxNumberofComics = 4;
var APIUrl = 'http://gateway.marvel.com/v1/public/';
var APIService = 'characters';
var limitCharacters = 10;
var offsetCharacters = 0

$.ajax({
  method: 'GET',
  url: APIUrl + APIService,
  data: {
    ts: '1',
    // apikey: '61c7e114cd9c1038685b872564b86355',
    // hash: '86fbb35b5d2896b831deedd8ce4774bb',
    apikey: '5a668d8b42a04ea41bd70390e8eb59ad',
    hash: '553fbf9dee5303e723505992d73c8c8c',
    limit:limitCharacters,
    offset: offsetCharacters,
  },
  beforeSend: function(msg){
    $('section').hide()
  },
  success: function(data){
    $('section').fadeIn(500)
    var charsData = data.data.results;

    var comicSelected = function(comicResourceURI,modalComic) {
      $.ajax({
        method: 'GET',
        url: comicResourceURI,
        data: {
          ts: '1',
          // apikey: '61c7e114cd9c1038685b872564b86355',
          // hash: '86fbb35b5d2896b831deedd8ce4774bb',
          apikey: '5a668d8b42a04ea41bd70390e8eb59ad',
          hash: '553fbf9dee5303e723505992d73c8c8c',
          limit:1,
          offset: 0,
        },
        beforeSend: function(msg){

        },
        success: function(data){
          var comicData = data.data.results;

          comicDetail = {}
          comicDetail.title = comicData[0].title
          comicDetail.description = comicData[0].description
          comicDetail.price = comicData[0].prices[0].price
          comicDetail.thumbnail = comicData[0].thumbnail.path + '.' + comicData[0].thumbnail.extension

          modalComic.find('h4').html(comicDetail.title)
          modalComic.find('p.modal-comic-summary').html(comicDetail.description)
          modalComic.find('img.comic-modal-img').attr('src',comicDetail.thumbnail)

          $('#add-comic-fav').click(function() {
            $(this).toggleClass('add-comics-selected')
            $(this).children().toggle().attr({
              src: 'icons/btn-favourites-primary.png',
              'style': 'display:inline-block;'
            },{
              src: 'icons/btn-favourites-default.png',
              'style': 'display:inline-block;'
            })
          })

        } // End Success Ajax Comic Selected
      }) // En Ajax Comic Selected

    } // End comicSelected

    var renderCharHTML = (function(charsData) {
      charsData.forEach(function(item,index){
        var charCont = $('#char-container').clone().hide()

        charCont.attr('id','char-container-'+item.id).fadeIn(1000)

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
          'data-open': 'exampleModalB-' + item.id
        }).fadeIn(2000);


        var numberComics = 0;
        while (numberComics < maxNumberofComics) {
          if (item.comics.items[numberComics]) {
            newDivComic = $('<div class="small-12 medium-6 columns"></div>');

            var anchorComic = $('<a></a>')
            .attr({
              'id':'comic-' + numberComics + '-' + item.id,
              'modal': item.id,
              'data-open': 'exampleModal1C-' + item.id,
              'posComic': numberComics
            })

            var newComic = $('<p class="comics-title"></p>')
              .append(item.comics.items[numberComics].name)

            anchorComic.append(newComic);

            newDivComic.append(anchorComic);

          } else {
            newDivComic = $('<div class="small-12 medium-6 columns"><p class="comics-title">Coming soon</p></div>')
          }
          charCont.find('.char-comics-section').append(newDivComic)

          numberComics++;
        }

        if (index % 2 === 0) {
          newRow = $('<div class="row"></div>')
          newRow.append(charCont)
        } else {
          newRow.append(charCont)
        }
        $('#characters-list').append(newRow)

      });
      $('#char-container').remove()

    })(charsData) // end renderCharHTML()

    // Triggers
    var buttonControllers = (function() {
      $('button').click(function() {
        var modalComic = $('#exampleModalB').attr(
          'id', 'exampleModalB-'+$(this).attr('modal'),
          'modal', $(this).attr('modal')
        );
        charsData.forEach(function(item,index) {
          var charId = charsData[index].id.toString();
          var modalID = $(this).attr('modal')
          console.log(modalID);
          if (charId === modalID) {
            console.log('asdjaksdkajsdkjads');
            $('#modal-img-char').attr({
              'src': item.thumbnail
            })

          }

        })
      })

    })()

    var anchorControllers = (function() {
      $('a').click(function() {
        var modalComic = $('#exampleModal1C').attr(
          'id', 'exampleModal1C-'+$(this).attr('modal')
        );
        //console.log(modalComic);

        var modalID = $(this).attr('modal')
        var posComic = $(this).attr('posComic')
        charsData.forEach(function(item,index) {
          var charId = charsData[index].id.toString();
          if (charId === modalID) {
            URI = charsData[index].comics.items[posComic].resourceURI;
            comicSelected(URI,modalComic)
          }

        })


      })

    })()


  }
})
