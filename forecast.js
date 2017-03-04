$(document).ready(function () {
    $('#submit').click(function () {
        //check to see if zip field is empty
        var check = $('#zipcode').val();
        if (check != '') {
            getWeatherInfo();
        }
        else {
            alert('You must enter a zipcode!');
        }
    });
});

function getWeatherInfo() {
    var key = "3b64d375c32508f3";
    var zip = $('#zipcode').val();

    $.ajax({
        url: "http://api.wunderground.com/api/" + key + "/conditions/astronomy/q/" + zip + ".json",
        type: 'GET',
        dataType: "jsonp",
        success: function (data) {
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
            var sunrise = '<p><span class="category">Sunrise</span> ' + riseHour + ":" + riseMin + " " + ampm + '</p>';
            var sunset = '<p><span class="category">Sunset</span> ' + setHour + ":" + setMin + " " + ampm2 + '</p>';
            var loc = '<p>' + data.current_observation.display_location.full + '</p>';
            var temp = '<h2>' + tempRound + '˚F </h2>';
            var image = '<img src=' + data.current_observation.icon_url + '>';
            var desc = '<p>' + data.current_observation.weather + '</p>';
            var wind = '<p><span class="category">Wind Speed</span> ' + data.current_observation.wind_dir + " "
                + data.current_observation.wind_mph + " mph" + '</p>';
            var updated = '<p>' + data.current_observation.observation_time + '</p>';
            var visible = '<p><span class="category">Visibility</span> ' + data.current_observation.visibility_mi + " mi" + '</p>';
            var humidity = '<p><span class="category">Humidity</span> ' + data.current_observation.relative_humidity + '</p>';
            var dew = '<p><span class="category">Dewpoint</span> ' + data.current_observation.dewpoint_string + '</p>';

            //clear out display div before appending
            $('#display').html("").append(loc, image, temp, desc, humidity, wind, dew, visible, sunrise, sunset, updated);

            //clear out zip input after go btn is clicked
            $('#zipcode').val('');
        }
    })
}