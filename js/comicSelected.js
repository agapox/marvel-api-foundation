// comicSelected fn fires when an comic is clicked and display
// a modal with the comic info
var comicSelRender = function(objChar,posComic) {
  console.log(objChar);

  var modalComic = $('#exampleModal1C').hide()

  modalComic.find('h4').html('');
  modalComic.find('p.modal-comic-summary').html('');
  modalComic.find('img.comic-modal-img').attr('src', '');
  modalComic.find('.comic-price').html('<i class="fa fa-usd" aria-hidden="true"></i>');

  var comicSelected = objChar.comics.items[posComic];

  $.ajax({
    method: 'GET',
    url: comicSelected.resourceURI,
    data: {
      ts: '1',
      apikey: '61c7e114cd9c1038685b872564b86355',
      hash: '86fbb35b5d2896b831deedd8ce4774bb',
      // apikey: '5a668d8b42a04ea41bd70390e8eb59ad',
      // hash: '553fbf9dee5303e723505992d73c8c8c',
      limit:1,
      offset: 0,
    },
    beforeSend: function(msg){

    },
    success: function(data){
      var comicData = data.data.results;
      comicData[0].isComicSelectd = false;
      comicDetail = {};
      comicDetail.title = comicData[0].title;
      comicDetail.description = comicData[0].description;
      comicDetail.price = comicData[0].prices[0].price;
      comicDetail.thumbnail = comicData[0].thumbnail.path + '.' + comicData[0].thumbnail.extension;

      modalComic.find('h4').html(comicDetail.title).fadeIn(500);
      modalComic.find('p.modal-comic-summary').html(comicDetail.description).fadeIn(500);
      modalComic.find('img.comic-modal-img').attr('src',comicDetail.thumbnail).fadeIn(500);
      modalComic.find('.comic-price').html('<i class="fa fa-usd" aria-hidden="true"></i> '+comicDetail.price).fadeIn(500);

      //modalComic.fadeIn(800)
      var btnClose = $('#exampleModal1C button')

      $('#add-comic-fav').one('click', function() {
        $('.char-name-comic-selected').removeClass('char-name-comic-selected')
        $('.comics-title-active').removeClass('comics-title-active');
        comicData[0].isComicSelectd = true;
        addFavComic(comicData[0])
        var addComicbtn = $(this);
        addComicbtn.addClass('add-comics-selected')
        addComicbtn.children().attr({
          src: 'icons/btn-favourites-primary.png',
          'style': 'display:inline-block;'
        });
        btnClose.click(function() {
          addComicbtn.children().attr({
            src: 'icons/btn-favourites-default.png',
            'style': 'display:inline-block;'
          });
          $('#comic-' + posComic + '-' + objChar.id).children().addClass('comics-title-active');
          $('#char-name-' + objChar.id ).addClass('char-name-comic-selected')
          addComicbtn.removeClass('add-comics-selected')
        })
        deleteFavComic()
      });
    } // End Success Ajax Comic Selected
  }); // En Ajax Comic Selected
}; // End comicSelected
