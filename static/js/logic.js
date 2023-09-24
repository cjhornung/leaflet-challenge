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
const geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Promise Pending
const dataPromise = d3.json(geoData);
console.log("Data Promise: ", dataPromise);


// Fetch the JSON data and console log it
let metaData
let features
d3.json(geoData).then(function(data) {
    console.log("geoData: ", data);
    metaData = data.metadata;
    features = data.features;
    console.log("features: ", features);
    // Loop through the features array, and create one marker for each features object.
    for (let i = 0; i < features.length; i++) {
        console.log("coord",features[i].geometry.coordinates)
        console.log("mag",features[i].properties.mag)
        let coordinates= [features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]]
        L.circle(coordinates, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its population.
        radius: markerSize(features[i].properties.mag)
        }).bindPopup(`<h1>${features[i].properties.title}</h1> <hr> <h3>Population: ${features[i].properties.place}</h3>`).addTo(myMap);
     }




});

  // Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(mag) {
    if(mag<0)   
    {
        return 0;
    }
    else{ 
        return Math.sqrt(mag) * 100000
        ;
    }
}