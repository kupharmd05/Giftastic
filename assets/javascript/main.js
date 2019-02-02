$(document).ready( function() {

    let actors = ["Denzel Washington", "Brad Pitt", "Morgan Freeman", "Jennifer Lawrence", "Reese Witherspoon", "Chris Hemsworth", "Samuel Jackson"];

    function displayActors() {
        
        let actor = $(this).attr("data-name");
        
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + 
        actor + "&api_key=tvPQjKn3MnAfxOxO9lle4f3V9XjJSm8q&limit=10";

        $.ajax({
            url: queryUrl,
            method: "get"
        }).then(function(response){
            console.log(response);
            let results = response.data;
            for(let result of results) {
                console.log(result);
                let info = $("<div>");
                let actorGifs = $("<img>")
                    .attr({"src":result.images.downsized_still.url, "data-still":result.images.downsized_still.url, "data-animate":result.images.downsized.url, "data-state":"still"});
                actorGifs.addClass("gif")
                actorGifs.addClass("rating")
                console.log(result.rating);
                


                let actorRating = $("<p>").text("Rating: " + result.rating);
                actorRating.addClass("rating");

                info.append(actorGifs, actorRating);
                
                $("#actor-gifs").prepend(info);

            
            }
        });

    }
   
    
    function addActor(){
        event.preventDefault();
        let actor = $("#actor-input").val();

        actors.push(actor);

        renderButtons();
    }

    function renderButtons() {
        $("#actor-buttons").empty();

            for (let actor of actors) {
            let a = $("<button>");
            a.attr("data-name", actor);
            a.addClass("actor btn");
            a.text(actor);
            $("#actor-buttons").append(a);
        }
    }

    function moveImage() {
            
            let state = $(this).attr("data-state");
            if (state ==="still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animated")
            } else if (state ==="animated") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            
        };
    
    $("#add-actor").on("click", addActor);

    $(document).on("click", ".gif", moveImage);

    renderButtons();

    $(document).on("click", ".actor", displayActors);


});



