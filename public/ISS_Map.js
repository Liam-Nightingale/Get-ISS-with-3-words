//                              \\
//------ Initializing Map ------\\
//                              \\

const mymap = L.map('issMap').setView([0, 0], 6);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
  attribution
});
const scale = 0.62137119224;
let cISS = true;
let firstTime = true;

//                                                \\
//------ Making a Marker With a Custom Icon ------\\
//                                                \\

const issIcon = L.icon({
  iconUrl: 'iss200px.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
let marker = L.marker([0, 0], {
  icon: issIcon
}).addTo(mymap);
tiles.addTo(mymap);
mymap.scrollWheelZoom.disable();

//                            \\
//------ Marker Options ------\\
//                            \\

mymap.on('zoomend', () => {
  const zoom = mymap.getZoom() + 1;
  const w = 50 * zoom;
  const h = 32 * zoom;
  issIcon.options.iconSize = [w, h];
  issIcon.options.iconAnchor = [w / 2, h / 2];
  mymap.removeLayer(marker);
  let latlng = marker.getLatLng();
  marker = L.marker([0, 0], {
    icon: issIcon
  }).addTo(mymap);
  marker.setLatLng(latlng);
});

mymap.on('click', enableScroll => {
  if(mymap.scrollWheelZoom.enabled()) {
    mymap.scrollWheelZoom.disable();
  } else {
    mymap.scrollWheelZoom.enable();
  }
});