import axios from 'axios';






const url = 'https://environment-admin.onrender.com/api/v1/stations/airs/'


async function GetDataToGeojson(fromDate, toDate) {
    let urlFilter = url + `filter?fromdate=${fromDate}&todate=${toDate}`
    console.log(urlFilter);
    try {

        const response = await axios.get(urlFilter);
        const data_Api = response.data;
        const geojson = {
            type: "FeatureCollection",
            features: []
        };

        for (let index = 0; index < data_Api.length; index++) {
            const element = data_Api[index];

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


async function GetDataByAddress(Address) {
    let urlFilter = url + `filter?address=${Address}`
    console.log(urlFilter);
    try {

        const response = await axios.get(urlFilter);
        console.log("fetching successful");
        return response.data
    } catch (error) {
        // Handle errors here (e.g., log or throw an error)
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled elsewhere if needed
    }

}

async function GetAllDataByAddress(Address, fromDate, toDate, mainPollutant) {
    let urlFilter = url + `filter?address=${Address}&fromDate=${fromDate}&toDate=${toDate}`
    console.log(urlFilter);
    try {

        const response = await axios.get(urlFilter);
        console.log("fetching successful");
        return response.data
    } catch (error) {
        // Handle errors here (e.g., log or throw an error)
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled elsewhere if needed
    }
}
export { GetDataToGeojson, GetDataByAddress};
