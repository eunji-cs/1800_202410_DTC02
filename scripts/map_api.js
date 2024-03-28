mapboxgl.accessToken = 'pk.eyJ1Ijoic3ByaW5nYyIsImEiOiJjbHRnOGc4dW8wd2o2MmxvNmN2NzRubnI3In0.njs3h0TJg9FhtoClPB9ovQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-123.112755, 49.241722],
  zoom: 10.7
});

map.on('load', function () {
  map.addSource('vancouver-neighborhoods', {
    type: 'geojson',
    data: './neighbourhood.geojson'
  });

  map.addLayer({
    'id': 'vancouver-neighborhoods-layer',
    'type': 'fill',
    'source': 'vancouver-neighborhoods',
    'paint': {
      'fill-color': '#C2C5B1',
      'fill-opacity': 0.5
    }
  });

  map.addLayer({
    'id': 'outline',
    'type': 'line',
    'source': 'vancouver-neighborhoods',
    'layout': {},
    'paint': {
      'line-color': '#6B685E',
      'line-width': 2
    }
  });

  // Add pop-ups to the neighborhoods layer (linked to each neighbourhood's description page)
  map.on('click', 'vancouver-neighborhoods-layer', function (e) {
    var neighborhoodName = e.features[0].properties.name;
    var neighborhoodDescription = "Description for " + neighborhoodName;

    // Check if the clicked neighborhood matches our selected neighbourhoods
    if (neighborhoodName === 'Kitsilano') {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<a href="area_description.html?docID=bprC6bRxRkYyf6r81y3Q"><h3> Kitsilano </h3>')
        .addTo(map);
    }
    else if (neighborhoodName === 'Downtown') {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<a href="area_description.html?docID=2e6D3dhk0IBgFlVuteA2"><h3> Downtown </h3>')
        .addTo(map);
    }
    else if (neighborhoodName === 'Killarney') {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<a href="area_description.html?docID=afTY38YSQkFf3zVpkmQ1"><h3> Killarney </h3>')
        .addTo(map);
    }
  });
});

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: false,
  placeholder: 'Search for neighbourhood', // Placeholder text for the search bar
  bbox: [-123.2460, 49.1666, -123.0724, 49.3200], // Boundary for Metro Vancouver
  proximity: {
    longitude: -123.1207,
    latitude: 49.2827
  } // Coordinates of Central Vancouver
});

// Add the geocoder to the map
map.addControl(geocoder);

// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', () => {
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  // Listen for the result event from the Geocoder
  // result event is triggered when a user makes a selection
  // Add a marker at the result's coordinates
  geocoder.on('result', (event) => {
    map.getSource('single-point').setData(event.result.geometry);
  });
});
