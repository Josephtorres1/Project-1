$(document).ready(() => {
  // code goes in here
  console.log($(document));

  //   get latitude and longitude from document obj
  var userLat = 420;
  var userLng = 666;

  var map;
  function initMap() {
    map = new google.maps.Map($("#map"), {
      center: { lat: userLat, lng: userLng },
      zoom: 8,
    });
  }
  initMap();
});
