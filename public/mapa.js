


const latLng={
    lat:-1.049537,
    lng:-78.587458
  }

  const latLngA={
    lat:parseFloat(document.getElementById('lat_a').value,10),
    lng:parseFloat(document.getElementById('lng_a').value,10)
  }
console.log(latLngA)
  const latLngB={
    lat:parseFloat(document.getElementById('lat_b').value,10),
    lng:parseFloat(document.getElementById('lng_b').value,10)
  }

  function initMap() {

  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: latLng
    });


    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map
    });

    directionsRenderer.addListener("directions_changed", () => {
      const directions = directionsRenderer.getDirections();
      if (directions) {
        computeTotalDistance(directions);

      }
    });
    displayRoute(
      latLngA,
      latLngB,
      directionsService,
      directionsRenderer
  );

  // document.getElementById('lat_a').value=latLng.lat
  // document.getElementById('lng_a').value=latLng.lng
  // document.getElementById('lat_b').value=latLng.lat
  // document.getElementById('lng_b').value=latLng.lng
}

function displayRoute(origin, destination, service, display) {
  service
    .route({
      origin: latLngA,
      destination: latLngB,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true,
    })
    .then((result) => {
      display.setDirections(result);
      
    })
    .catch((e) => {
      console.log("Could not display directions due to: " + e);
    });

    
}

function computeTotalDistance(result) {
  let total = 0;
  const myroute = result.routes[0];

  if (!myroute) {
    return;
  }
  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;

  if(result.request.origin.lat){
    document.getElementById('lat_a').value=result.request.origin.lat()
    document.getElementById('lng_a').value=result.request.origin.lng()
  }

  if(result.request.destination.lat){
    document.getElementById('lat_b').value=result.request.destination.lat()
    document.getElementById('lng_b').value=result.request.destination.lng()
  }
  

  document.getElementById('kilometraje_rrecorrer').innerHTML=total+" km. "+"Alrededor de "+myroute.legs[0].duration.text;
  document.getElementById('distancia_rrecorrer').value=total+" km. "+"Alrededor de "+myroute.legs[0].duration.text;
  document.getElementById("kilometraje_google_maps").value = total;

  const kv_actual= parseFloat(document.getElementById('kilometraje').value,10);
  if(kv_actual){
    document.getElementById('kilometraje_calculado').value=(kv_actual+total).toFixed(2);
  }
  
 const valor_comb=parseFloat(document.getElementById('valor_combustible').value,10);
 if(valor_comb){
  document.getElementById('combustible_calculado').value=(valor_comb*total).toFixed(2);
 }
}

$(document).ready(function(){
  $('body').append($('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATEt0xCISuZN2TDB8WStqSBpgX3Y3an98&callback=initMap&v=weekly"></script>'));
});