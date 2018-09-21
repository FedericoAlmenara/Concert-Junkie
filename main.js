    $("#signUp").click(function(){
        $("#first-form").hide();
        $("#second-form").show();
    });
    $("#signIn").click(function(){
        $("#first-form").show();
        $("#second-form").hide();
    });

    // 
    $(document).on("click", "#bandInput", function (event) {

        // Prevents page from reloading
        event.preventDefault();
        
        // New last.FM AJAX Call to retrieve band info
        var bandInfo = $("#userInput").val();
        console.log(bandInfo);
        var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + bandInfo + "&api_key=91228e136aa2fa9726fb4de5c9da5b81&format=json";
        $.ajax({
            url: queryURL,
            method: "GET"
        
        // Response handler from Last.FM
        }).then(function (response) {
            console.log(response);
            
            //console.log(response.artist.bio.content);
            //This provides us with a bio of the band/artist
            var bandBio = response.artist.bio.content;
            console.log(bandBio);
    
            //This provides us with a pic of the artist
            var bandPic = response.artist.image[3]["#text"];
            // var bandBio = response.artist.bio.summary;
            console.log(bandPic);
            // console.log(bandBio)
            
        });
    });
    
