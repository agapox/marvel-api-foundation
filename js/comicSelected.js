// comicSelected fn fires when an comic is clicked and display
// a modal with the comic info
var comicSelected = function(comicResourceURI,modalComic) {
  $.ajax({
    method: 'GET',
    url: comicResourceURI,
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

      comicDetail = {};
      comicDetail.title = comicData[0].title;
      comicDetail.description = comicData[0].description;
      comicDetail.price = comicData[0].prices[0].price;
      comicDetail.thumbnail = comicData[0].thumbnail.path + '.' + comicData[0].thumbnail.extension;

      modalComic.find('h4').html(comicDetail.title);
      modalComic.find('p.modal-comic-summary').html(comicDetail.description);
      modalComic.find('img.comic-modal-img').attr('src',comicDetail.thumbnail);
      modalComic.find('.comic-price').html('<i class="fa fa-usd" aria-hidden="true"></i> '+comicDetail.price);

      $('#add-comic-fav').click(function() {
        addFavComic(data)
        $(this).toggleClass('add-comics-selected')
        $(this).children().toggle().attr({
          src: 'icons/btn-favourites-primary.png',
          'style': 'display:inline-block;'
        },{
          src: 'icons/btn-favourites-default.png',
          'style': 'display:inline-block;'
        });
        deleteFavComic()
      });
    } // End Success Ajax Comic Selected
  }); // En Ajax Comic Selected
}; // End comicSelected

// Triggers
var buttonControllers = function(charactersData) {
  $('button').click(function() {
    var modalComic = $('#exampleModalB');
    // var modalComic = $('#exampleModalB').attr(
    //   'id', 'exampleModalB-'+$(this).attr('modal'),
    //   'modal', $(this).attr('modal')
    // );
    var modalID = $(this).attr('modal');
    charactersData.forEach(function(item,index) {
      var charId = charactersData[index].id.toString();
      if (charId === modalID) {
        modalComic.find('#modal-img-char')
          .attr('src', item.thumbnail.path + '/portrait_uncanny.' + item.thumbnail.extension);
        modalComic.find('#modal-name-desc-char h4')
          .html(item.name);
        modalComic.find('#modal-name-desc-char p')
          .html(item.description);
        (function(){
          var modalComicUL = modalComic.find('#modal-comis-list div')
          modalComicUL.children().remove();
            for (i = 0; i < item.comics.items.length; i++) {
              var comicslist = $('<p class="modal-comics-title"><i class="fa fa-caret-right" aria-hidden="true"></i> '+item.comics.items[i].name+'</p>');
              modalComicUL.append(comicslist);
              if (i == 5) {
                break

              }
            }
        })();

      };
    });
  });
}; // End buttonControllers
