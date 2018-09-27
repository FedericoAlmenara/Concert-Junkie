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

 //Initialize Firebase
 var config = {
   apiKey: "AIzaSyBiXm6n6bISFIAXvqNNbekO6b7kh-y-DJY",
   authDomain: "project-1-385c6.firebaseapp.com",
   databaseURL: "https://project-1-385c6.firebaseio.com",
   projectId: "project-1-385c6",
   storageBucket: "project-1-385c6.appspot.com",
   messagingSenderId: "981858209617"
 };

 firebase.initializeApp(config);

 var dataRef = firebase.database();

 //Values
 var artist = "";
 var str = artist;

 //capture click
 $("#search-button").on("click", function(event){
     event.preventDefault();

     artist= $("#search-box").val().trim();

     //push code
     dataRef.ref().push({
         artist: artist,
         dateAdded: firebase.database.ServerValue.TIMESTAMP

     });
 });


 dataRef.ref().limitToLast(9).on("child_added", function(childSnapshot) {
//snapshot log
   console.log(childSnapshot.val().artist);


$("#recentSearch").append("<div class='well'><span class= 'artist-name'>" +
childSnapshot.val().artist
);

}, function(errorObject) {
   console.log("Errors handled: " + errorObject.code);

$("#artist-display").text(snapshot.val().artist);
});
