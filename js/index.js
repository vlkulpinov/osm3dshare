var mymap = L.map('mapid', {scrollWheelZoom: false}).setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGVmb3JtYXMiLCJhIjoiY2lsdTJheXJoMDA1NnVqbTQyc3YyZzAzMiJ9.TuVRIhPw8cYOXuE3RwZgOA'
}).addTo(mymap);

var marker = null;

function onMapClick(e) {
    if (marker === null) {
        marker = L.marker(e.latlng, {draggable: true}).addTo(mymap);
        $("#button-predefined")[0].disabled = false;
        $("#button-choose")[0].disabled = false;
    } else {
        marker.setLatLng(e.latlng);
    }
}
mymap.on('click', onMapClick);

var viewer = new Cesium.Viewer('cesiumContainer', {
    scene3DOnly: true,
    infoBox : false,
    selectionIndicator : false,
});

var terrainProvider = new Cesium.CesiumTerrainProvider({
    url : '//assets.agi.com/stk-terrain/world',
    requestVertexNormals: true
});
viewer.terrainProvider = terrainProvider;
viewer.scene.globe.enableLighting = true;

function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(marker.getLatLng().lng, marker.getLatLng().lat, height);
    var heading = Cesium.Math.toRadians(0);
    var pitch = 0;
    var roll = 0;
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 128,
            maximumScale : 20000
        }
    });
    viewer.trackedEntity = entity;
}

$("#button-predefined").click(function(e) {
    $("#cesiumBlock").show();
    try {
        createModel('../Apps/SampleData/models/BigOldHouse/Big_Old_House3.glb', 0);
    } catch (e) {
        alert(e + 'Model cannot be loaded properly :(');
    }
});

