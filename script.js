$(document).ready(function () {
  var userLat;
  var userLong;

  var map, infoWindow;
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          userLat = position.coords.latitude;
          userLong = position.coords.longitude;

          console.log(userLat, userLong);

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  function buildQueryURL() {
    // this builds the queryURL for the mountain API
    var newqueryURL =
      "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" +
      userLat +
      "&lon=" +
      userLong +
      "&maxDistance=50&minDiff=5.6&maxDiff=5.15&key=200818976-5e848b47163d500302756d60bc66af43";

    return newqueryURL;
  }

  // THIS IS FOR THE FORM WITH VARIABLE DISTANCE & ROUTE NUM
  // $("#run-search").on("click", function(event) {
  //   event.preventDefault();

  initMap();

  $("#dumbbutton").on("click", function () {
    var queryURL = buildQueryURL();
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then((response) => {
      console.log(response);
      // response is an object containing an array named routes
    });
  });

  // key - Your private key

  // lat - Latitude for a given area

  // lon - Longitude for a given area

  // Optional Arguments:

  // maxDistance - Max distance, in miles, from lat, lon. Default: 30. Max: 200.

  // maxResults - Max number of routes to return. Default: 50. Max: 500.

  // minDiff - Min difficulty of routes to return, e.g. 5.6 or V0.

  // maxDiff - Max difficulty of routes to return, e.g. 5.10a or V2.
});
