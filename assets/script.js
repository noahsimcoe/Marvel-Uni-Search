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
    var columnIsTwoFifthClass = document.querySelector(".column-is-two-fifth");
    var profileId = document.querySelector("#profile");
    var moviesId = document.querySelector("#movies");
    var showsId = document.querySelector("#shows");
    var comicsId = document.querySelector("#comics");
    var gamesId = document.querySelector("#games");
    var wikiActorsId = document.querySelector("#wiki-actors");
    var columnIsOneFifthClass = document.querySelector(".column-is-one-fifth");
    var favoritesId = document.querySelector("#favorites");

    // required paramaters for the request

    var heroValue = "Hulk";
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
            $(".bio .profile-pic").attr('src', charThumbnailUrl);
            $(".bio .name").text(charName);
            $(".bio .description").text(charDescription);
        })
    });