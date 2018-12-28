$(document).ready( function() {

    var actors = ["Denzel Washington", "Brad Pitt", "Morgan Freeman", "Jennifer Lawrence", "Reese Witherspoon"];

    function displayActors() {
        
        var actor = $(this).attr("data-name");
        // var actor = "brad pitt";
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + 
        actor + "&api_key=tvPQjKn3MnAfxOxO9lle4f3V9XjJSm8q&limit=10";

        $.ajax({
            url: queryUrl,
            method: "get"
        }).then(function(response){
            var actorInfo = $("<div>").text(JSON.stringify(response));
            console.log(response);
            var results = response.data;
            for(let result of results) {
                console.log(result);
                var actorGifs = $("<img>")
                    .attr({"src":result.images.downsized_still.url, "data-still":result.images.downsized_still.url, "data-animate":result.images.downsized.url, "data-state":"still"});
                actorGifs.addClass("gif")
                $("#actor-gifs").prepend(actorGifs);
            }
        });

    }
   
    
    function addActor(){
        event.preventDefault();
        var actor = $("#actor-input").val();

        actors.push(actor);

        renderButtons();
    }

    function renderButtons() {
        $("#actor-buttons").empty();

        for (var i=0; i < actors.length; i++) {
            var a = $("<button>");
            a.attr("data-name", actors[i]);
            a.addClass("actor");
            a.text(actors[i]);
            $("#actor-buttons").append(a);
        }
    }
    function moveImage(){
            
            var state = $(this).attr("data-state");
            if (state ==="still") {
                $(this).attr("src", "data-animate");
                $(this).attr("data-state", "animated")
            } else if (state ==="animated") {
                $(this).attr("src", "data-still");
                $(this).attr("data-state", "still");
            }
            console.log("this works");
        };
    
    $(".gif").on("click", moveImage);
    

    $("#add-actor").on("click", addActor);

    renderButtons();

    $(document).on("click", ".actor", displayActors);


});



