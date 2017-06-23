$('#my-favorites').hide();
var myFavoritesComics = []
var index = 0;
var addFavComic = function(objComic) {
  var myFavs = $('#my-favorites').clone();
  objComic = objComic.data.results[0]
  console.log(objComic);
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
}

var deleteFavComic = function(mainFavComicCont) {
  mainFavComicCont = $(mainFavComicCont).parent().parent();

  mainFavComicCont.remove();

}
