$(document).ready(function () {
  var userLat;
  var userLong;

  var markers = [];
  var map, infoWindow;
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 39.833, lng: -98.583 },
      zoom: 12,
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

          map.setCenter(pos);

          var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: "User Position",
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
          });
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
    var maxDist = $("#maxDist").val();
    var minDiff = $("#minDiff").val();
    var maxDiff = $("#maxDiff").val();
    var newqueryURL =
      "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" +
      userLat +
      "&lon=" +
      userLong +
      "&maxDistance=" +
      maxDist +
      "&minDiff=" +
      minDiff +
      "&maxDiff=" +
      maxDiff +
      "&key=200818976-5e848b47163d500302756d60bc66af43";

    return newqueryURL;
  }

  // THIS IS FOR THE FORM WITH VARIABLE DISTANCE & ROUTE NUM
  // $("#run-search").on("click", function(event) {
  //   event.preventDefault();

  initMap();

  $("#dumbbutton").on("click", function () {
    var queryURL = buildQueryURL();
    deleteMarkers();
    $("#route-display").empty();
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then((response) => {
      console.log(response.routes);
      var routes = response.routes;
      var routenum = 0;
      routes.forEach((routeinfo) => {
        // lead with the routenum
        console.log("Route Number:" + routenum);
        routenum++;
        var currLat = routeinfo.latitude;
        var currLon = routeinfo.longitude;
        newrouteMarker(currLat, currLon, routeinfo.name);
        //
        // then, each route is iterated across to log the contents of each pair
        // a line is gonna be created to contain it, which will then be appended to the div
        //
        createroutecard(
          routeinfo.name,
          routeinfo.type,
          routeinfo.rating,
          currLat,
          currLon,
          routeinfo.url
        );
        jQuery.each(routeinfo, function (key, value) {
          console.log(key + ": " + value);
        });
      });
    });
  });

  function newrouteMarker(latitude, longitude, name) {
    var marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: name,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
      },
    });
    markers.push(marker);
  }

  function createroutecard(name, type, rating, lat, lon, url) {
    var clickability = $("<a>").attr({ href: url, target: "_blank" });
    var newcard = $("<div>").addClass("route-card");
    var cardcontent = $("<div>").addClass("route-card-content card-section");
    var cardname = $("<p>").addClass("route-card-name");
    var cardtype = $("<p>").addClass("route-card-type");
    var cardrating = $("<p>").addClass("route-card-rating");
    var cardloc = $("<p>").addClass("route-card-loc");
    cardname.text(name);
    cardtype.text(type);
    cardrating.text("Difficulty: " + rating);
    cardloc.text("Lat: " + lat + " Lon: " + lon);
    cardcontent.append([cardname, cardtype, cardrating, cardloc]);
    newcard.append(cardcontent);
    clickability.append(newcard);
    $("#route-display").append(clickability);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
  }
});
