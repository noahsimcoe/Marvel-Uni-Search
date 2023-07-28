$(function () {
  var searchBoxId = document.querySelector("#searchbox");
  var searchBtnId = document.querySelector("#search-btn");
  var favoritesBtn = document.querySelector("#favorites-btn");
  var profileName = document.querySelector("#profile-h3");

  // shows favorite character upon page loading
  gettingLocalStorage();

  // Runs handleFormSubmit on search btn click
  searchBtnId.addEventListener("click", handleFormSubmit);

  // sends key:value data about a favorited character into localStorage
  function settingLocalStorage() {
    localStorage.setItem("charName", JSON.stringify(charName));
    localStorage.setItem("charDescription", JSON.stringify(charDescription));
    localStorage.setItem("charThumbnailUrl", JSON.stringify(charThumbnailUrl));

    favoritesBtn.addEventListener("click", callingStorage);
    function callingStorage() {
      gettingLocalStorage();
    }
  }

  // renders the favorited character's information under the favorites section
  function gettingLocalStorage() {
    var favName = JSON.parse(localStorage.getItem("charName"));
    var favDesc = JSON.parse(localStorage.getItem("charDescription"));
    var favPic = JSON.parse(localStorage.getItem("charThumbnailUrl"));
    $("#favorites .profile-pic").attr("src", favPic);
    // commenting out the original name, as we're now displaying it in the favorite's header
    //$("#favorites .name").text(favName);
    $("#favorites .description").text(favDesc);
    $("#favorites .title").html(
      `<p>Favorite Character: <span id="favCharName">${favName}</span></p>`
    );
  }

  // called when submit button is clicked, runs both server-side api calls
  function handleFormSubmit(event) {
    event.preventDefault();
    searchBoxId = $("#searchbox").val().trim();
    heroSearch(searchBoxId);
    wikiSearch(searchBoxId);
  }

  function heroSearch(searchBoxId) {
    var heroValue = searchBoxId;
    var baseUrl = "https://gateway.marvel.com/v1/public/characters";
    var timeStamp = dayjs().unix();
    var publicKey = "c56260f4d749fa9644507d9cde6f2e8d";
    var privateKey = "2008ba7cd3708bda8540f651e6375ab1b50070b2";
    var hashPre = timeStamp + privateKey + publicKey;
    // creates an MD5 hash to be used as a parameter in the first api request
    var hash = CryptoJS.MD5(hashPre);

    var apiUrl = `${baseUrl}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&name=${heroValue}`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // pulled the basic profile information per character and storing it into variables
        charName = data.data.results[0].name;
        charDescription = data.data.results[0].description;
        charThumbnailUrl = `${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`;
        settingLocalStorage(searchBoxId);

        // Adds hero search in for profile placeholder
        heroValue = heroValue.toUpperCase();
        profileName.textContent = heroValue;

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
        $(".bio .profile-pic").attr("src", charThumbnailUrl);
        $(".bio .description").text(charDescription);
        $(".comics #comics").text(comicsList);
        $(".events #events").text(eventsList);
        $(".stories #stories").text(storiesList);
        $(".series #series").text(seriesList);
      });
  }
  // Function for wiki summary area
  function wikiSearch(searchBoxId) {
    // Required parameter for the Wiki request
    var wikiApi = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchBoxId}?redirect=true`;

    // Fetch wiki summary data and display content
    fetch(wikiApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        wikiName = data.title;
        console.log(wikiName);
        wikiSource = data.extract;
        wikiThumb = data.thumbnail.source;
        console.log(wikiSource);
        wikiUrl = data.content_urls.desktop.page;
        console.log(wikiUrl);
        $(".wiki-name").text(wikiName);
        $(".wiki-thumbnail").attr("src", wikiThumb);
        $(".wiki-source").text(wikiSource);
        $(".wiki-link").attr("href", wikiUrl);
      });
  }

  $(document).on("click", ".title", function () {
    var favCharName = $("#favCharName").text();
    console.log(favCharName);
    heroSearch(favCharName);
    wikiSearch(favCharName);
  });
});
