$(function () {
    // variables
    var headerSectionClass = document.querySelector(".header-section");
    var headerId = document.querySelector("#header");
    var columnsClass = document.querySelector(".columns")
    var columnIsOneQuarterClass = document.querySelectorAll(".column-is-one-quarter")
    var searchSectionId = document.querySelector("#search-section");
    var searchContainerId = document.querySelector("#search-container");
    var searchBoxId = document.querySelector("#searchBox")
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

        heroSearch();
    }

    function heroSearch() {
        // required paramaters for the request
        var heroValue = "hulk";
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
                charName = data.data.results[0].name;
                charDescription = data.data.results[0].description;
                charThumbnailUrl = `${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`;

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

                $(".bio .profile-pic").attr('src', charThumbnailUrl);
                $(".bio .name").text(charName);
                $(".bio .description").text(charDescription);
            })
        };
    });

    // Required parameters for the Wiki request
    var wikiValue = "Hulk";
    var wikiBaseUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/Hulk?redirect=true";
    var wikiKey = "9ccfad93fc03d34566f670620b7a314d";
    var lang = "en"

    fetch(wikiBaseUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            wikiName = data.title;
            console.log(wikiName);
            wikiSource = data.extract;
            console.log(wikiSource);
            $(".wiki-name").text(wikiName);
            $(".wiki-source").text(wikiSource);
        })