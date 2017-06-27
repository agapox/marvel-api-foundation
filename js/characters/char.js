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
