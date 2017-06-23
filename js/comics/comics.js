var anchorControllers = function(charactersData) {
  $('a').click(function() {
    var modalComic = $('#exampleModal1C').hide();
    // var modalComic = $('#exampleModal1C').hide().attr(
    //   'id', 'exampleModal1C-'+$(this).attr('modal')
    // );
    var modalID = $(this).attr('modal');
    var posComic = $(this).attr('posComic');
    charactersData.forEach(function(item,index) {
      var charId = charactersData[index].id.toString();
      if (charId === modalID) {
        comicURI = charactersData[index].comics.items[posComic].resourceURI;
        comicSelected(comicURI,modalComic);
      };
    });
    modalComic.fadeIn(500);
  })
}; // anchorControllers
