var anchorControllers = function(charactersData) {
  $('a').click(function() {
    var modalID = $(this).attr('modal');
    var posComic = $(this).attr('posComic');
    charactersData.forEach(function(item,index) {
      var charId = charactersData[index].id.toString();
      if (charId === modalID) {
        //var comicClicked = charactersData[index].comics.items[posComic];
        var objChar = charactersData[index]
        comicSelRender(objChar,posComic);
      };
    });

  });
}; // anchorControllers
