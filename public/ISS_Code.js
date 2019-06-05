//                                      \\
//------  Display ISS Data on Map ------\\
//                                      \\

//!---current issue - while popup no centre--!\\

updatePosition();
displayTime();
displayISS();


//                                          \\
//------ Getting Info to be Displayed ------\\
//                                          \\

async function getISS() {
  const response1 = await fetch(iss_url);
  const data = await response1.json();
  return data;
  //getWords(latitude, longitude);

  // put in display-----------------------------------------------------------//

  if(firstTime) {
    mymap.setView([latitude, longitude], 2);
    firstTime = false;
  } // starts with ISS correct size

  if(cISS) {
    mymap.setView([latitude, longitude], mymap.getZoom());
  } //centres on iss
  marker.setLatLng([latitude, longitude]);
  //put in display
  document.getElementById('vel').textContent = (velocity * scale).toFixed(2) + "  " + "mph";
  document.getElementById('alt').textContent = (altitude * scale).toFixed(2) + "  " + "miles";
  document.getElementById('lat').textContent = latitude.toFixed(2) + "°";
  document.getElementById('lon').textContent = longitude.toFixed(2) + "°";


  // ---------------------------------------------------------------------------//
}

async function getWords(lat, lon) {
  const words_url = `/words/${lat},${lon}`;
  const res = await fetch(words_url);
  const json = await res.json();
  return {
    latitude: lat,
    longitude: lon,
    words: json.words,
    nearestPlace: json.nearestPlace
  }
}

//                             \\
//------ Display the ISS ------\\
//                             \\

function displayISS() {
  getISS().
  then(responseISS => {
    getWords(responseISS.latitude, responseISS.longitude).
    then(responseWords => {
      const {
        latitude,
        longitude,
        nearestPlace,
        words
      } = responseWords;
      const {
        altitude,
        velocity
      } = responseISS;
      document.getElementById('words').textContent = words;
      document.getElementById('lat').textContent = `${latitude.toFixed(2)}°`;
      document.getElementById('lon').textContent = `${longitude.toFixed(2)}°`;
      //-----------
      if(firstTime) {
        mymap.setView([latitude, longitude], 2);
        firstTime = false;
      } // starts with ISS correct size

      if(cISS) {
        mymap.setView([latitude, longitude], mymap.getZoom());
      } //centres on iss
      marker.setLatLng([latitude, longitude]);
      //put in display
      document.getElementById('vel').textContent = (velocity * scale).toFixed(2) + "  " + "mph";
      document.getElementById('alt').textContent = (altitude * scale).toFixed(2) + "  " + "miles";
      document.getElementById('lat').textContent = latitude.toFixed(2) + "°";
      document.getElementById('lon').textContent = longitude.toFixed(2) + "°";
      //---------------


      if(nearestPlace) {
        marker.bindPopup(`Flying over ${nearestPlace}.`);
      } else {
        marker.unbindPopup();
      }
      if(firstTime) {
        //mymap.setView([latitude, longitude], 2);
        //  firstTime = false;
      }
    }).
    catch(errWords => console.error(errWords)); // second then end
  }).
  catch(errISS => console.error(errISS)); // first then end
}

function centreISS() {
  var cBox = document.getElementById("centre_checkbox");
  if(cBox.checked) {
    cISS = true;
  } else {
    cISS = false;
  }
}

function updatePosition() {
  var pBox = document.getElementById("pause_checkbox");
  displayISS();
  if(pBox.checked) {
    console.log("Paused");
  } else {
    setTimeout(updatePosition, 1000)
  }
};

//                                  \\
//------ Get and Display Time ------\\
//                                  \\

function displayTime() {
  var date = new Date();
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  time = hours + ":" + minutes + ":" + seconds + " " + am_pm + " " + "BST";
  document.getElementById('time').innerHTML = time;
  setTimeout(displayTime, 1000);
};