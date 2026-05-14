function init() {
    let map = new ymaps.Map("map", {
        center: [56.04233300142575, 92.91186935224924],
        zoom: 11
    })

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('fullscreenControl');

    if (pageData.Addresses) {
        pageData.Addresses.forEach(place => {
            map.geoObjects.add(new ymaps.Placemark(place.address_coords, {
                iconCaption: place.address_title,
            }, {}))
        })
    }
}

ymaps.ready(init)