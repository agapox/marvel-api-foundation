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


var localStorage = function() {
  // Check browser support
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("lastname", "Smith");
    // Retrieve
    document.getElementById("result").innerHTML = localStorage.getItem("lastname");
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}
