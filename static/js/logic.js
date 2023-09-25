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
        // Set marker color based off depth (km)
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
        // This will make our marker's size proportionate to its magnitude.
        radius: features[i].properties.mag*10000
        }).bindPopup(`<h3>Magnitude: ${features[i].properties.mag}</h3> <h3>Location: ${features[i].properties.place}</h3> <h3>Depth: ${features[i].geometry.coordinates[2]} km</h3>`).addTo(myMap);
     }
    // Define an array with legend colors and labels
    var legendData = [
        { color: "#A3F600", label: "0-10 km" },
        { color: "#DCF400", label: "10-30 km" },
        { color: "#F7DB11", label: "30-50 km" },
        { color: "#FDB72A", label: "50-70 km" },
        { color: "#FCA35D", label: "70-90 km" },
        { color: "#FF5F65", label: "90+ km" }
    ]; 
     // Define a legend control
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = [];
        for (var i = 0; i < legendData.length; i++) {
            labels.push(
                '<i style="background-color:' + legendData[i].color + '">' + legendData[i].label+'</i> '
            );
        }
        console.log(labels)
        div.innerHTML = labels.join('<br>');
        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);



     


});
