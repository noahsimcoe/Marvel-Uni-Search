$(function () {
    // variables
    var headerSectionClass = document.querySelector(".header-section");
    var headerId = document.querySelector("#header");
    var columnsClass = document.querySelector(".columns")
    var columnIsOneQuarterClass = document.querySelectorAll(".column-is-one-quarter")
    var searchSectionId = document.querySelector("#search-section");
    var searchContainerId = document.querySelector("#search-container");
    var searchBoxId = document.querySelector("#searchbox")
    var btnDivId = document.querySelector("#btn-div");
    var searchBtnId = document.querySelector("#search-btn");
    var columnIsTwoFifthClass = document.querySelector(".column-is-two-fifths");
    var profileId = document.querySelector("#profile");
    var moviesId = document.querySelector("#movies");
    var showsId = document.querySelector("#shows");
    var comicsId = document.querySelector("#comics");
    var gamesId = document.querySelector("#games");
    var wikiActorsId = document.querySelector("#wiki-actors");
    var columnIsOneFifthClass = document.querySelector(".column-is-one-fifth");
    var favoritesId = document.querySelector("#favorites");

    // Runs handleFormSubmit on search btn click
    searchBtnId.addEventListener('click', handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();

        searchBoxId = $('#searchbox').val().trim();

        heroSearch(searchBoxId);
        wikiSearch(searchBoxId);
    }

    function heroSearch(searchBoxId) {
        // required paramaters for the request
        var heroValue = searchBoxId;
        var baseUrl = "https://gateway.marvel.com/v1/public/characters";
        var timeStamp = dayjs().unix();
        var publicKey = "c56260f4d749fa9644507d9cde6f2e8d";
        var privateKey = "2008ba7cd3708bda8540f651e6375ab1b50070b2";
        var hashPre = (timeStamp + privateKey + publicKey)
        var hash = CryptoJS.MD5(hashPre);

        var apiUrl = `${baseUrl}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&name=${heroValue}`;

        fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
                .then(function(data) {
                console.log(data);

                // pulled the basic profile information per character and storing it into variables
                charName = data.data.results[0].name;
                charDescription = data.data.results[0].description;
                charThumbnailUrl = `${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`;

                // creating strings that can display the names of each form of featured media
                comicsList = [];
                comicsArray = data.data.results[0].comics.items;
                for (var i = 0; i < comicsArray.length; i++) {
                    comicsList.push(comicsArray[i].name);
                }
                comicsList = comicsList.join(", ");

                eventsList = [];
                eventsArray = data.data.results[0].events.items;
                for (var i = 0; i < eventsArray.length; i++) {
                    eventsList.push(eventsArray[i].name);
                }
                eventsList = eventsList.join(", ");

                storiesList = [];
                storiesArray = data.data.results[0].stories.items;
                for (var i = 0; i < storiesArray.length; i++) {
                    storiesList.push(storiesArray[i].name);
                }
                storiesList = storiesList.join(", ");

                seriesList = [];
                seriesArray = data.data.results[0].series.items;
                for (var i = 0; i < seriesArray.length; i++) {
                    seriesList.push(seriesArray[i].name);
                }
                seriesList = seriesList.join(", ");

                // updated html with values pulled from marvel api
                $(".bio .profile-pic").attr('src', charThumbnailUrl);
                $(".bio .name").text(charName);
                $(".bio .description").text(charDescription);
                $(".comics #comics").text(comicsList);
                $(".events #events").text(eventsList);
                $(".stories #stories").text(storiesList);
                $(".series #series").text(seriesList);
            })
        };
    });

    function wikiSearch(searchBoxId) {
    // Required parameters for the Wiki request
    var wikiValue = searchBoxId;
    var wikiBaseUrl = `https://api.wikimedia.org/core/v1/wikipedia/en/page/${wikiValue}`;
    var wikiKey = "9ccfad93fc03d34566f670620b7a314d";
    var lang = "en"

    fetch(wikiBaseUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            wikiName = data.key;
            console.log(wikiName);
            wikiSource = data.source;
            console.log(wikiSource);
            $("#wiki-actors .wiki-name").text(wikiName);
            $("#wiki-actors .wiki-source").text(wikiSource);
        })
        .catch(function(error) {
            console.log(error);
        })
    }



    // function settingLocalStorage() {
    //     localStorage.setItem('searchBoxId', JSON.stringify(searchBoxId));

    //     gettingLocalStorage();
    // }

    // function gettingLocalStorage() {
    //     var favoritesSearch = JSON.parse(localStorage.getItem(searchBoxId));


    // }
