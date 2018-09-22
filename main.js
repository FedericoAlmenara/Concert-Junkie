    $("#signUp").click(function(){
        $("#first-form").hide();
        $("#second-form").show();
    });
    $("#signIn").click(function(){
        $("#first-form").show();
        $("#second-form").hide();
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

  $.ajax({
    type : 'POST',
    url : '"https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=",
    data : 'method=artist.getinfo&' +
           'artist=After+The+Burial&' +
           'api_key=57ee3318536b23ee81d6b27e36997cde&' +
           'format=json',
    dataType : 'jsonp',
    success : function(data) {
        // Handle success code here
    },