


const latLng={
    lat:-1.049537,
    lng:-78.587458
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
      latLng,
      latLng,
      directionsService,
      directionsRenderer
  );
}

function displayRoute(origin, destination, service, display) {
  service
    .route({
      origin: latLng,
      destination: latLng,
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


  document.getElementById('kilometraje_rrecorrer').innerHTML=total+" km. "+"Alrededor de "+myroute.legs[0].duration.text;
  
  document.getElementById("kilometraje_google_maps").value = total;

  const kv_actual= parseFloat(document.getElementById('kilometraje').value,10);
  if(kv_actual){
    document.getElementById('kilometraje_calculado').value=kv_actual+total;
  }
  
 const valor_comb=parseFloat(document.getElementById('valor_combustible').value,10);
 if(valor_comb){
  document.getElementById('combustible_calculado').value=valor_comb*total;
 }
}

