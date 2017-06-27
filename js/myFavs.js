$('#my-favorites').hide();
var index = 0;
var myFavoritesComics = []
var addFavComic = function(objComic) {
  var myFavs = $('#my-favorites').clone();
  objComic// = objComic.data.results[0]
  myFavoritesComics.push(objComic)

  index++;
  myFavs.attr({
    'id': 'my-favorites-' + [index]
  });
  myFavs.find('img.modal-comic-img')
  .attr({
    'src': objComic.thumbnail.path + '/portrait_uncanny.' + objComic.thumbnail.extension,
  })
  myFavs.find('h6.modal-comic-name')
  .html(objComic.title)
  myFavs.fadeIn(800);
  $('#selected-comic-container').append(myFavs);

  console.log(myFavoritesComics);
}

var deleteFavComic = function(mainFavComicCont) {
  mainFavComicCont = $(mainFavComicCont).parent().parent();
  mainFavComicCont.remove();

}

window.onunload = function () {
  if ($('#selected-comic-container').children().length > 0) {
    saveDataInLocal();
  }
};

var saveDataInLocal = function() {
  var favsItems = $('#selected-comic-container').children();
  favsItems
  // Check browser support
  if (typeof(Storage) !== "undefined") {
    // Store

    for (i = 1; i < favsItems.length; i++) {
      localStorage.setItem( "myFavImgSrc-" + i ,$(favsItems[i]).find('.modal-comic-img').attr('src') )
      localStorage.setItem( "myFavTitleSrc-" + i ,$(favsItems[i]).find('.modal-comic-name').html() )
    }
  }
}


window.onload = function () {
  if (localStorage.length > -1) {
    setLocalData();
  }
};
var setLocalData = function() {
  // Check browser support
  if (typeof(Storage) !== "undefined") {
    // Retrieve
    for (i = 0; i < localStorage.length ; i++) {
      var myFavs = $('#my-favorites').clone();

      myFavs.attr({
        'id': 'my-favorites-' + [i]
      });

      myFavs.find('img.modal-comic-img')
      .attr({
        'src': localStorage.getItem( "myFavImgSrc-" + (i+1) )
      })
      myFavs.find('h6.modal-comic-name')
      .html(localStorage.getItem( "myFavTitleSrc-" + (i+1) ))
      myFavs.fadeIn(800);
      $('#selected-comic-container').append(myFavs);

      localStorage.removeItem( "myFavImgSrc-" + (i+1) )
      localStorage.removeItem( "myFavTitleSrc-" + (i+1) )
    }
  }

}
