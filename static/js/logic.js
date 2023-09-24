// Creating the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


//Use the D3 library to read in samples.json from the URL:
const geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// Promise Pending
const dataPromise = d3.json(geoData);
console.log("Data Promise: ", dataPromise);


// Fetch the JSON data and console log it
let metaData;
let features;
let fillColorVar;
d3.json(geoData).then(function(data) {

    metaData = data.metadata;
    features = data.features;

    // Loop through the features array, and create one marker for each features object.
    for (let i = 0; i < features.length; i++) {

        let coordinates= [features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]]
        if (features[i].geometry.coordinates[2]<10)
        {
            fillColorVar="#A3F600";
        } else if(features[i].geometry.coordinates[2]<30)
        {
            fillColorVar="#DCF400";
        } else if(features[i].geometry.coordinates[2]<50)
        {
            fillColorVar="#F7DB11";
        } else if(features[i].geometry.coordinates[2]<70)
        {
            fillColorVar="#FDB72A";
        } else if(features[i].geometry.coordinates[2]<90)
        {
            fillColorVar="#FCA35D";
        } else 
        {
            fillColorVar="#FF5F65";
        }
        L.circle(coordinates, {
        fillOpacity: 0.75,
        color:"white",
        fillColor: fillColorVar,
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its population.
        radius: features[i].properties.mag*10000
        }).bindPopup(`<h1>${features[i].properties.title}</h1> <hr> <h3>Place: ${features[i].properties.place}</h3><h3>Magnitude: ${features[i].properties.mag}</h3>`).addTo(myMap);
     }




});

