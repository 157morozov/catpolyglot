function parseCoords(rawCoords) {
    if (Array.isArray(rawCoords) && rawCoords.length === 2) {
        return [Number(rawCoords[0]), Number(rawCoords[1])];
    }

    if (typeof rawCoords === "string") {
        try {
            const parsed = JSON.parse(rawCoords);
            if (Array.isArray(parsed) && parsed.length === 2) {
                return [Number(parsed[0]), Number(parsed[1])];
            }
        } catch (_error) {
            return null;
        }
    }

    return null;
}

function init() {
    const map = new ymaps.Map("map", {
        center: [56.04233300142575, 92.91186935224924],
        zoom: 11
    });

    map.controls.remove("geolocationControl");
    map.controls.remove("searchControl");
    map.controls.remove("trafficControl");
    map.controls.remove("fullscreenControl");

    if (pageData.Addresses) {
        pageData.Addresses.forEach((place) => {
            const coords = parseCoords(place.address_coords);
            if (!coords || Number.isNaN(coords[0]) || Number.isNaN(coords[1])) return;

            map.geoObjects.add(new ymaps.Placemark(coords, {
                iconCaption: place.address_title,
            }, {}));
        });
    }
}

ymaps.ready(init);
