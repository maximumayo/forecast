$(document).ready(function () {
    $('#submit').click(function () {
        var key = "3b64d375c32508f3";
        var zip = $('#zipcode').val();
        //check to see if zip field is empty
        if (zip != '') {
            $.ajax({
                url: "http://api.wunderground.com/api/" + key + "/conditions/astronomy/q/" + zip + ".json",
                type: 'GET',
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    //format temp
                    var tempRound = Math.round(data.current_observation.temp_f);
                    //format sunrise time
                    var riseHour = data.sun_phase.sunrise.hour;
                    var riseMin = data.sun_phase.sunrise.hour;
                    var ampm = (riseHour < 12) ? "am" : "pm";
                    riseHour = (riseHour > 12) ? riseHour - 12 : riseHour;
                    riseHour = (riseHour === 0) ? 12 : riseHour;
                    riseMin = (riseMin < 10 ? "0" : "") + riseMin;
                    //format sunset time
                    var setHour = data.sun_phase.sunset.hour;
                    var setMin = data.sun_phase.sunset.hour;
                    var ampm2 = (setHour < 12) ? "am" : "pm";
                    setHour = (setHour > 12) ? setHour - 12 : setHour;
                    setHour = (setHour === 0) ? 12 : setHour;
                    setMin = (setMin < 10 ? "0" : "") + setMin;
                    //variables to store info to be display
                    var sunrise = '<p>Sunrise: ' + riseHour + ":" + riseMin + " " + ampm + '</p>';
                    var sunset = '<p>Sunset: ' + setHour + ":" + setMin + " " + ampm2 + '</p>';
                    var loc = '<h3>' + data.current_observation.display_location.full + '</h3>';
                    var temp = '<h2>' + tempRound + '˚F </h2>';
                    var image = '<img src=' + data.current_observation.icon_url + '>';
                    var desc = '<p>' + data.current_observation.weather + '</p>';
                    var wind = '<p>Wind ' + data.current_observation.wind_string + '</p>';
                    var updated = '<p>' + data.current_observation.observation_time + '</p>';
                    //clear out display div before appending
                    $('#display').html("").append(loc, temp, image, desc, wind, sunrise, sunset, updated);
                    //clear out zip input after go is clicked
                    $('#zipcode').val('');
                }
            })
        }
        else {
            alert('You must enter a zipcode!');
        }
    });
});