$(document).ready(function () {
    $('#submit').click(function () {
        var key = "3b64d375c32508f3";
        var zip = $('#zipcode').val();
        $.ajax({
            url: "http://api.wunderground.com/api/" + key + "/conditions/astronomy/q/" + zip + ".json",
            type: 'GET',
            dataType: "jsonp",
            success: function (data) {
                var tempRound = Math.round(data.current_observation.temp_f);
                var loc = '<h3>' + data.current_observation.display_location.full + '</h3>';
                var temp = '<h2>' + tempRound + '˚F </h2>';
                var image = '<img src=' + data.current_observation.icon_url + '>';
                var desc = '<p>' + data.current_observation.weather + '</p>';
                var wind = '<p>Wind ' + data.current_observation.wind_string + '</p>';
                //clear out display div before appending
                $('#display').html("").append(loc, temp, image, desc, wind);
                //clear out zip input after go is clicked
                $('#zipcode').val('');
            }
        })
    });
});