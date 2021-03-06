function getFlatTypeValue() {
    var uiFlatType = document.getElementsByName("flat_type");
    for (var i in uiFlatType) {
        if (uiFlatType[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var location = document.getElementById("uiLocations");
    var flatType = getFlatTypeValue();
    var storey = document.getElementById("uiStorey");
    var sqm = document.getElementById("uiSqm"); 
    var lease = document.getElementById("uiLease");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price"; 


    $.post(url, {
        location: location.value,
        flat_type: flatType,
        storey_range: parseFloat(storey.value),
        area_sqm: parseFloat(sqm.value),
        lease_commence: parseFloat(lease.value)
    },  function (data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2> S$" + data.estimated_price.toString() + "</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";

    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;