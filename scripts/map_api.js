mapboxgl.accessToken = 'pk.eyJ1Ijoic3ByaW5nYyIsImEiOiJjbHRnOGc4dW8wd2o2MmxvNmN2NzRubnI3In0.njs3h0TJg9FhtoClPB9ovQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/springc/clu04eey3022g01pt6hymd9aa',
  center: [-123.1207, 49.2827],
  zoom: 10.7
});

map.on('click', (event) => {
  // If the user clicked on one of the markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['neighbourhoods']
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
    )
    .addTo(map);
});

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: false,
  placeholder: 'Search for neighbourhood', // Placeholder text for the search bar
  bbox: [-123.1336, 49.1666, -123.0724, 49.3200], // Boundary for Metro Vancouver
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

// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
}

new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      )
  )
  .addTo(map);
