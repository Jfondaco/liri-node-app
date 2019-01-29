require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//available commands
//  concert-this
//  spotify-this-song
//  movie-this
//  do-what-it-says


var command = process.argv[2];
var input = process.argv.slice(3).join(" ");
console.log("command: "+command);
console.log("input: "+input);

if (command === "concert-this"){
    concertSearch();
}

function concertSearch(){
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response);
    })
}

if (command === "spotify-this-song"){
    if (input === ""){
        input = "The Sign Ace of Base";
    }
    spotSearch();
}

function spotSearch(){
    spotify
  .search({ type: 'track', query: input })
  .then(function(response) {
    console.log("\n")
    // artist name
    var artist = response.tracks.items[0].artists[0].name;
    console.log("Artist: " + artist);
    // song name
    var song = response.tracks.items[0].name;
    console.log("Song: " + song);
    // song preview
    var preview = response.tracks.items[0].preview_url
    if (preview != null){
    console.log("Preview URL: " + preview);
    }
    
    //album name
    var album = response.tracks.items[0].album.name;
    console.log("Album: " + album);
    console.log("\n");

  })
  .catch(function(err) {
    console.log(err);
  });
}

if (command === "movie-this"){
    if (input === ""){
        input = "Mr Nobody";
    }
    omdbSearch();
    
}
function omdbSearch(){
    axios.get("http://www.omdbapi.com/?t="+ input +"&y=&plot=short&apikey=trilogy").then(
        function(response) {
            var movieTitle = response.data.Title;
            console.log("Title: "+movieTitle);
            var movieYear = response.data.Year;
            console.log("Release Year: " + movieYear)
            var imdb = response.data.imdbRating;
            console.log("The movie's IMDB rating is: " + imdb);
            var tomato = response.data.Ratings[1].Value;
            console.log("RottenTomato's Rating: " + tomato);
            var movieCountry = response.data.Country;
            console.log("Country: " + movieCountry);
            var movieLanguage = response.data.Language;
            console.log("Language: "+ movieLanguage);
            var moviePlot = response.data.Plot;
            console.log("Plot: " + moviePlot);
            var movieActors = response.data.Actors;
            console.log("Actors: "+ movieActors);
        }
    );
}

if (command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }        
        var dataArr = data.split(",");
        command = dataArr[0];
        input = dataArr[1];
            if (command === "spotify-this-song"){
                if (input === ""){
                input = "The Sign Ace of Base";
                }
                spotSearch();
            }

            if (command === "movie-this"){
                if (input === ""){
                input = "Mr Nobody";
                }
                omdbSearch();
                
            }
            if (command === "concert-this"){
                concertSearch();
            }
        
      
      });
      
}