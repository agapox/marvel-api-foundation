var renderPagination = function() {
  var APIUrl = 'http://gateway.marvel.com/v1/public/';
  var APIService = 'characters';
  var limitCharacters = 10;
  var offsetCharacters;

  if (offsetCharacters === undefined) {
    offsetCharacters = 0;
  } else {
    offsetCharacters;
  }

  $.ajax({
    method: 'GET',
    url: APIUrl + APIService,
    ifModified: true,
    data: {
      ts: '1',
      // apikey: '61c7e114cd9c1038685b872564b86355',
      // hash: '86fbb35b5d2896b831deedd8ce4774bb',
      apikey: '5a668d8b42a04ea41bd70390e8eb59ad',
      hash: '553fbf9dee5303e723505992d73c8c8c',
      limit: limitCharacters,
      offset: offsetCharacters,
    },
    beforeSend: function(msg){

    },
    success: function(data){

      var charsData = data.data.results;

      paginationController(data.data.total, offsetCharacters)

    }
  });
}

var paginationController = function(totalCharacters, offset) {
  var currentPage;
  if (offset === 0) {
    currentPage = 1
  } else {
    currentPage = offset/10 +1
  };
  $('#pagination ul').bootpag({
    total: totalCharacters/10 + 1,
    page: currentPage,
    maxVisible: 5,
    leaps: true,
    firstLastUse: true,
    first: '←',
    last: '→',
    wrapClass: 'pagination',
    activeClass: 'active',
    disabledClass: 'disabled',
    nextClass: 'hola',
    prevClass: 'prev',
    lastClass: 'last',
    firstClass: 'first'
  }).on("page", function(event, num){
    $('#characters-list').children().remove();

    $('#characters-list').append($initialCharsListChildren)
    if (num === 0) {
      init()
    } else {
      var offsetChar = (num-1)*10
      init(offsetChar)
    }
  });
}
/*
var paginationController = function(totalCharacters) {
  // Setting Variables
  totalCharacters; // The total number of resources available
  var mumberOfPages; // total of pages to paginate
  var numberOfShownChar = 10; // limitCharacters on ajax call

  // Showing pagination numbers
  var showPagination = (function() {
    var paginationUL = $('#pagination ul');
    paginationUL.children().remove()

    mumberOfPages = Math.floor(totalCharacters / numberOfShownChar);
    var paginationPrevPage = $('<li class=""><button value="pagPrev" aria-label="Previus page"><i class="fa fa-angle-left" aria-hidden="true"></i></button></li>')
    paginationUL.append(paginationPrevPage);
    var paginationNextPage = $('<li class=""><button value="pagNext" aria-label="Next page"><i class="fa fa-angle-right" aria-hidden="true"></i></button></li>')
    var i = 0;
    var paginationLI;

    while (i <= 5) {
      paginationLI = $('<li><button value="' + (i+1) + '" aria-label="Page ' + (i+1) + '">' + (i+1) + '</button></li>');
      paginationUL.append(paginationLI);
      i++;
    }

    var paginationEllipsis =  $('<li class="ellipsis"></li>')
    paginationUL.append(paginationEllipsis);
    var afterEllipis = mumberOfPages -1

    while (afterEllipis <= mumberOfPages) {
      paginationLI = $('<li><button value="' + (afterEllipis+1) + '" aria-label="Page ' + (afterEllipis+1) + '">' + (afterEllipis+1) + '</button></li>')
      paginationUL.append(paginationLI);

      afterEllipis++;
    }
    paginationUL.append(paginationNextPage);
  })()
  // End of showing pagination numbers

  var pagOnClick = (function() {
    $('#pagination button').click(function() {
      console.log('Pagination clicked # ' + this.value);
      var charsFrom = (this.value - 1)*10
      var charsTo = (this.value)*10
      console.log('Show characters from ' + charsFrom + ' to ' + charsTo );
      offset = (this.value - 1) * 10
      init(offset)

    })
  })()
};
*/
