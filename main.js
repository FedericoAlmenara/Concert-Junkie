$("#signUp").click(function () {
    $("#first-form").hide();
    $("#second-form").show();
 });
 $("#signIn").click(function () {
    $("#first-form").show();
    $("#second-form").hide();
 });
 
 
 
 function searchBandsInTown(artist) {
 
    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
 
        // Printing the entire object to console
        console.log(response);
 
        // Constructing HTML containing the artist information
        var artistName = $("<h1>").text(response.name);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        var artistImage = $("<img>").attr("src", response.thumb_url);
        var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
        var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
 
        // Empty the contents of the artist-div, append the new artist content
        $("#artist-div").empty();
        $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });
 }
 //Searching Last.FM for the top tracks
 function searchTopTracks(artist) {
    var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist="
        + artist + "&limit=5&api_key=91228e136aa2fa9726fb4de5c9da5b81&format=json"
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        var toptracks = response.toptracks.track;
        console.log(toptracks[0].name);
        $("#top-tracks").empty();
        var topFive = $(" Top 5 Tracks ");
        $("Olist").append(`<h1>${topFive}</h1>`);
        var trackName = "";
        //this for loop makes gets the top tracks from the top tracks array
        for (let i = 0; i < toptracks.length; i++) {
             trackName = toptracks[i].name;
             $("#top-tracks").append(`<li>${trackName}</li>`,);
         }
 
        // //console.log(response.artist.bio.summary);
        //var topTracks = $("<p>").text(response.artist.bio.summary);
        //$("band-info-div").empty();
        //$("#artist-div").append();
 
 
    });
 }
 

 // Event handler for user clicking the select-artist button
 $("#search-button").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#search-box").val().trim();
 
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
    //searchLastFm's top tracks for the artist(inputArtist);

    searchTopTracks(inputArtist);

    var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relevanceLanguage=en&regionCode=US&q=' + inputArtist + '&key=AIzaSyCl1W9HkuY_rcaz8nFZ25A372B2vvwABA8&type=video' + inputArtist + '&key=AIzaSyCl1W9HkuY_rcaz8nFZ25A372B2vvwABA8&type=video';
    $.ajax({ url: youtubeURL, method: "GET" }).then(function (response) {
        console.log(response);
        console.log(response.items[1].id.videoId);
        var playerId = response.items[1].id.videoId;
 
        //Empty ytplayer div in case there is already a video loaded from a previous search.
        $("#ytplayer").empty();
 
        // Displays YouTube video
        $("#ytplayer").append("<h3>Check out a sample of " + inputArtist + ":");
        $("#ytplayer").append('<iframe width="960" height="585" src="https://www.youtube.com/embed/' + playerId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> ');
    }); 
 });