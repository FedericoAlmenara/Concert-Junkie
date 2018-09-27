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
        console.log(goToArtist);

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
        var topTracks = response.toptracks.track;
        $("#top-tracks").empty();
        var trackName = "";
        //this for loop gets the top tracks from the top tracks array
        //also makes it a link to their corresponding track page on last.fm's website
        for (let i = 0; i < topTracks.length; i++) {
           var trackPage = topTracks[i].url;
           var trackName = topTracks[i].name.link(trackPage);
           $("#top-tracks").append(`<li>${trackName}</li>`);
           $("#top-tracks").css("<a> href=", "#dc3545");
           $("#top-tracks-header").text("Top Tracks");
        }

    });
}
//Searching for similar artists
//function grabSimilarArtists(similarArtist) {
  //  var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="
    //    + similarArtist + "&limit=5&api_key=91228e136aa2fa9726fb4de5c9da5b81&format=json"
    //$.ajax({
      //  url: queryURL,
       // method: "GET"

    //}).then(function (response){
      //  var grabSimilarArtists = response.artist.similar.artist
       // console.log(response);
       // console.log(grabSimilarArtists[0].name);
       // $("#similar-artists").empty();
       // var similarArtist = ""
       // for (let i = 0; i < grabSimilarArtists.length; i++) {
        //    similarArtist = grabSimilarArtists[i].name; 
          //  $("#similar-artists").append(`<li>${similarArtist}</li>`)
       // }
   // });
//}

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
            grabSimilarArtists(inputArtist);
            $("#tracks-list-name").show();
        });

