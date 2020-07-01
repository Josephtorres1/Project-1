$(document).ready(() => {
  // code goes in here

  //   get latitude and longitude from document obj
  var userLat = 420;
  var userLng = 666;

  var x = document.getElementById("demo");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    x.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude;
  }

  getLocation();

  console.log($(document));

  var map;
  function initMap() {
    map = new google.maps.Map($("#map"), {
      center: { lat: userLat, lng: userLng },
      zoom: 8,
    });
  }
  initMap();
});
