var mymap = L.map('mapid', {scrollWheelZoom: false}).setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGVmb3JtYXMiLCJhIjoiY2lsdTJheXJoMDA1NnVqbTQyc3YyZzAzMiJ9.TuVRIhPw8cYOXuE3RwZgOA'
}).addTo(mymap);

var marker = null;

// We should this function as adapter for every marker change
function setupMarker(latlng) {
    if (marker === null) {
        marker = L.marker(latlng, {draggable: true}).addTo(mymap);
        $("#button-predefined")[0].disabled = false;
        $("#button-select")[0].disabled = false;
        $("#btn-increase-angle")[0].disabled = false;
        $("#btn-decrease-angle")[0].disabled = false;
        $("#model-select")[0].disabled = false;
    } else {
        marker.setLatLng(latlng);
    }
    mymap.panTo(latlng);
}

function onMapClick(e) {
    setupMarker(e.latlng);
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

function createModel(url) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(marker.getLatLng().lng, marker.getLatLng().lat, 0);
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

    // Don't forget about setting angle back
    $("#text-angle").val("0");
}

$("#model-form").submit(function(e) {
    e.preventDefault();

    var fileSelect = $("#model-select");
    var uploadButton = $("#button-select");

    uploadButton.innerHTML = 'Uploading...';
    var files = fileSelect[0].files;

    var formData = new FormData();
    // Loop through each of the selected files.
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Check the file type.
        // if (!file.type.match('*.glb')) {
        //     continue;
        // }

        // Add the file to the request.
        formData.append('modelsFiles[]', file, file.name);
    }
    //return;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/model-upload', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                alert(xhr.responseText);
                var resp = $.parseJSON(xhr.responseText);
                createModel(resp['text']);
            } catch (e) {
                alert(e + 'Model cannot be loaded properly :(');
            }
            uploadButton.innerHTML = 'Upload';
        } else {
            alert('An error occurred!');
        }
    };
    xhr.send(formData);
});

$("#button-predefined").click(function(e) {
    $("#cesiumBlock").show();
    try {
        // TODO @vlkulpinov:
        // there's no need to use static directly
        createModel('../Apps/SampleData/models/BigOldHouse/Big_Old_House3.glb');
    } catch (e) {
        alert(e + 'Model cannot be loaded properly :(');
    }
});

// Search suggest
var photonSearch = new Bloodhound({
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: function(photonSearch) {
        return Bloodhound.tokenizers.whitespace(photonSearch.value);
    },
    remote: {
        url: 'http://photon.komoot.de/api/?q=%QUERY',
        wildcard: '%QUERY',
        filter: function(response) {    
            return response.features;
        }
    }
});

photonSearch.initialize();

$('#scrollable-dropdown-menu-search .typeahead').typeahead({
    minLength: 2,
    highlight: true
},
{
    name: 'addresses',
    source: photonSearch.ttAdapter(),
    templates: {
        empty: [
            '<div class="empty-message">',
            ' unable to find any matches',
            '</div>'
        ].join('\n')
    },
    displayKey: function(features) {
        // TODO: rewrite that spagetti
        var result = features.properties.name + ' : ';

        if (typeof features.properties.country !== 'undefined') {
            result += features.properties.country;
        } else {
            return result;
        }
        if (typeof features.properties.city !== 'undefined') {
            result += ', ' + features.properties.city;
        } else {
            return result;
        }
        if (typeof features.properties.street !== 'undefined') {
            result += ', ' + features.properties.street;
        }
        if (typeof features.properties.housenumber !== 'undefined') {
            result += ', ' + features.properties.housenumber;
        }
        return result;
    }
});


// Setup marker if user got something from suggest
$('#scrollable-dropdown-menu-search .typeahead').on('typeahead:selected', function(event, datum) {
    var geoPoint = L.latLng(datum.geometry.coordinates[1], datum.geometry.coordinates[0]);
    setupMarker(geoPoint);
});

function changeAngleOfModel(newHeadingDegrees) {
    var position = Cesium.Cartesian3.fromDegrees(marker.getLatLng().lng, marker.getLatLng().lat);
    var heading = Cesium.Math.toRadians(newHeadingDegrees);
    var pitch = 0;
    var roll = 0;
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);

    viewer.entities.values[0].orientation = orientation;
}

// Model transform
const diffConst = 10;

$("#btn-decrease-angle").click(function(e) {
    try {
        var oldHeadingDegrees = parseInt($("#text-angle").val());
    } catch (e) {
        $("#text-angle").val("0");
        var oldHeadingDegrees = 0;
    }
    var newHeadingDegrees = oldHeadingDegrees - diffConst;
    changeAngleOfModel(newHeadingDegrees);
    $("#text-angle").val(newHeadingDegrees.toString());
});

$("#btn-increase-angle").click(function(e) {
    try {
        var oldHeading = parseInt($("#text-angle").val());
    } catch (e) {
        console.log(e);
        $("#text-angle").val("0");
        var oldHeading = 0;
    }
    var newHeadingDegrees = oldHeading + diffConst;
    changeAngleOfModel(newHeadingDegrees);
    $("#text-angle").val(newHeadingDegrees.toString());
});
