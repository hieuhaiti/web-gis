import axios from 'axios';

async function getApiToGeojson(url) {
    console.log(url);
    try {

        const response = await axios.get(url);
        const data_api = response.data;
        const geojson = {
            type: "FeatureCollection",
            features: []
        };

        for (let index = 0; index < data_api.length; index++) {
            const element = data_api[index];

            // Parse the JSON strings into JavaScript objects
            const date = {
                iso: element.date.iso,
                day: element.date.day,
                month: element.date.month,
                year: element.date.year,
                hour: element.date.hour,
                minute: element.date.minute,
                second: element.date.second
            }
            const tsp = {
                value: element.tsp.value,
                aqi: element.tsp.aqi,
                result: element.tsp.result
            }
            const so2 = {
                value: element.so2.value,
                aqi: element.so2.aqi,
                result: element.so2.result
            }
            const no2 = {
                value: element.no2.value,
                aqi: element.no2.aqi,
                result: element.no2.result
            }


            geojson.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [element.location.longitude, element.location.latitude]
                },
                properties: {
                    address: element.location.address,
                    state: element.location.state,
                    commune: element.location.commune,
                    date: date,
                    tsp: tsp,
                    so2: so2,
                    no2: no2,
                }
            });
        }
        console.log("fetching successful");
        return geojson
    } catch (error) {
        // Handle errors here (e.g., log or throw an error)
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled elsewhere if needed
    }
}

export {getApiToGeojson};
