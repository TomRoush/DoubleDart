$(function() {
    // Input: JSON object 'results'
    // Output: JSON object 'map_data'
    function populate(results) {
        console.log(results);

        for (var i in results) {
            var darter = results[i];
            console.log(darter);
            $('.clients-holder').append("<div id='client" + i + "'></div>");
            $client = $('#client' + i);
            var clientpartial = "html/clientpartial.html";
            console.log(clientpartial);
            $client.load(clientpartial, populateClient($client, darter));
        }
    }

    function populateClient($client, darter) {
        $client.find('.client-name').html(darter['name']);
        $client.find('.mapobj').attr('id', darter['mapid']);
    }

    populate({
        0: {
            name: "Sahil",
            mapid: "mapid2"
        },
        1: {
            name: "David",
            mapid: "mapid3"
        },
        2: {
            name: "Tom",
            mapid: "mapid4"
        }
    })
});
