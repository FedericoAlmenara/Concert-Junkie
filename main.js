    $("#signUp").click(function(){
        $("#first-form").hide();
        $("#second-form").show();
    });
    $("#signIn").click(function(){
        $("#first-form").show();
        $("#second-form").hide();
    });

    
    $("#search-button").on("click", function () {
    
    event.preventDefault();

    var result = $("#search-button").val().trim().toUpperCase();

    var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="
    + result + "&api_key=91228e136aa2fa9726fb4de5c9da5b81&format=json"

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
        console.log(response);
    });
});

    function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

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

  // Event handler for user clicking the select-artist button
  $("#search-button").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#search-box").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
  });


  


  // Initialize Firebase
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
    
    //   function (item_value) {
    //     while ( list.children.length >= 5 )
    //     {
    //       list.removeChild(list.firstChild );
      
      artist= $("#search-box").val().trim();

      //push code
      dataRef.ref().push({
          artist: artist,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        
      });
  });

  
  dataRef.ref().on("child_added", function(childSnapshot) {
//snapshot log
    console.log(childSnapshot.val().artist);


$("#recentSearch").append("<div class='well'><span class= 'artist-name'>" +
childSnapshot.val().artist
);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  
$("#artist-display").text(snapshot.val().artist);


  });