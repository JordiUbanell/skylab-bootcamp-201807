// my custom components

//Creamos la funcion constructora de SearchPanel
function SearchPanel() {
    Component.call(this, 'form');
    //Llamamos al componente ubicado en (web-components....)
    //Pasando el this(obligatorio para el call) y form que llegará 
    //al componente como tag
    // var input = document.createElement('input');
    // input.type = 'search';
    // input.placeholder = 'Input a text...';
    // var button = document.createElement('button');
    // button.type = 'submit';
    // button.innerHTML = 'Search';
    var $form = $(this.element);

    var $input = $('<input type="search" placeholder="Input a text..."></a>');
    var $button = $('<button type="submit">Search</button>');

    //Añadimos a SearchPanel.form.appendChild(input)
    $form.append($input);
    $form.append($button);

    //Declara una variable interna llamada callback
    var _callback;

    this.element.addEventListener('submit', function (event) {
        //Para que no te redirija a otro sitio
        event.preventDefault();

        var query = $input.val();

        if (query && _callback) _callback(query);
        //Bind hace referencia a su scope. En este caso a SearchPanel 
    }.bind(this));

    //El this hace referencia al que hace la llamada ya que en este caso hay dos search(dos buscadores)
    this.onSearch = function (callback) {
        _callback = callback;
    };
}
//Para herencia
SearchPanel.prototype = Object.create(Component.prototype);

//Para recalcar que tipo de objeto es
SearchPanel.prototype.constructor = SearchPanel;

function ResultsList() {
    Component.call(this, 'ul');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.element.innerHTML = '';
    //$element = $(this,element).empty();

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = '#/' + result.id;
        a.innerHTML = result.text;
        a.onclick = function () {
            if (this._callback) this._callback(result.id, result.text,);
        }.bind(this);

        this.element.appendChild(li);
        //Este this hace referencia a la ResultList
        li.appendChild(a);
    }, this);
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 * @param {[number]} coords The geodesic coordinates for google maps
 */
function DetailPanel(title, info,image ,link, url) {
    Panel.call(this, title, 'section');

    $element = $(this.element);

    var $p = $('<p>' + info + '</p>');
    $element.append($p);
    // var p = document.createElement('p');
    // p.innerText = info;
    // this.element.appendChild(p);
    
    var $img = $('<img src="' + image + '">');
    $element.append($img);
    // var img = document.createElement("img");
    // img.src = image;
    // this.element.appendChild(img);

    var $a = $('<a href="' + link + ' " target=_blank> "' + link + '"</a>');
    $element.append($a);
    // var a = document.createElement("a");
    // a.href= link;
    // a.target = '_blank';
    // a.innerHTML = link;

    var $song = $('<audio controls></audio>');
    // var song = document.createElement('audio');
    // song.controls = true;

    // var source = document.createElement('source');
    // source.src = url;
    // source.type = 'audio/mpeg';
    var $source = $('<source type="audio/mpeg" src="' + url + '"></source>');

    $song.append($source);

    //this.element.appendChild(song);
    $element.append($song);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic
var search = new SearchPanel();
 
search.onSearch(function (query) {
        logic.searchArtists(query)
            .then(function (info) {
                results.updateResults(info.map(function(obj){
                    return {
                        id: obj.id,
                        text: obj.name
                    };
                }));
            });
        $detailContainer.clear();
    }); 

var results = new ResultsList();

results.onItemClick(function (id) {

    logic.retrieveAlbumsByArtistId(id)
        .then(function(info){
            resultsTracks.updateResults(info.map(function(obj){
                return {
                    id: obj.id,
                    text: obj.name
                };
            }));
        });
});


var resultsTracks = new ResultsList();

resultsTracks.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function(track){
            resultsTrack.updateResults(track.map(function(obj){
                return {
                    id: obj.id,
                    text: obj.name
                };
            }));
        });
});

var resultsTrack = new ResultsList();
var DEFAULT_IMAGE = "https://www.google.es";
resultsTrack.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function(trackId){
            var infoTrack = new DetailPanel(trackId.name, trackId.popularity, trackId.album.images[0].url ? trackId.album.images[0].url : DEFAULT_IMAGE, trackId.album.external_urls.spotify, trackId.preview_url);

            //$detailContainer.appendChild(infoTrack.element);
            $('div').append(infoTrack.element);
            });
            $detailContainer.clear();
        });

// var detailContainer = document.createElement('div');
$('body').append(search.element);
$('body').append(results.element);
$('body').append(resultsTracks.element);
$('body').append(resultsTrack.element);


var $detailContainer = $('body').append('<div>');

$detailContainer.clear = function() {
    this.innerHTML = '';
    //$detailContainer.empty();
};

$('body').append($detailContainer);

//El element hace referencia a los elementos creados de su constructor
// document.body.appendChild(search.element);
// document.body.appendChild(results.element);
// document.body.appendChild(resultsTracks.element);
// document.body.appendChild(resultsTrack.element);
// document.body.appendChild(detailContainer);






