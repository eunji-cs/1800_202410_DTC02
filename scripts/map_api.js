mapboxgl.accessToken =
  "pk.eyJ1Ijoic3ByaW5nYyIsImEiOiJjbHRnN3p6ZTYweTlnMmpwN25maDcxcHZxIn0.cW-TOK7z7FEIs-c2aW13gQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/springc/cltgakc0u00v901rabaev0xa6",
    center: [-123.1207, 49.2827],
    zoom: 9
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, "top-left")
}
