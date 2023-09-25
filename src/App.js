import React, { useRef, useEffect, useState } from 'react';
import markerIcon2xBlue from './assets/images/marker-icon-2x-blue.png';
import mapboxgl from 'mapbox-gl';
import { layerControlGrouped } from 'mapbox-layer-control';
import Modal from './components/Modal';
import getApiToGeojson from './utils/api.js';

import { UserData } from "./Data";
mapboxgl.accessToken = process.env.REACT_APP_TOKEN;


function App() {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [dataSource, setDataSource] = useState(null);

  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState(null);



  useEffect(() => {
    if (dataSource === null) {
      // Fetch data and setDataSource only when it's null
      getApiToGeojson("https://environment-admin.onrender.com/api/v1/stations/airs/filter?fromdate=2020-12&todate=2021-1")
        .then((data) => {
          setDataSource(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }); // Provide an empty dependency array


  useEffect(() => {

    if (map.current) return;

    map.current = new mapboxgl.Map({
      attributionControl: true,
      container: mapContainer.current,
      style: 'mapbox://styles/hieuha/clmgjdp9a01kn01r79eg4hknw',
      center: [106.032344398332, 20.4808648919667],
      zoom: 13,
      debug: 1
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

  })

  useEffect(() => {
    if (dataSource === null) return;
    if (map.current.getSource("test")) return;
    // load source map
    map.current.addSource('test', {
      type: 'geojson',
      data: dataSource,
      cluster: true,
      clusterMaxZoom: 11, // Max zoom to cluster points on
      clusterRadius: 40, // Radius of each cluster when clustering points (defaults to 50)
    })
    map.current.loadImage(
      markerIcon2xBlue,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-blue', image)
        map.current.addLayer({
          id: 'clusters-test',
          type: 'circle', //symbol
          source: 'test',
          filter: ['has', 'point_count'],
          layout: {
            'visibility': 'visible',
          },
          // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#3399ff',
              100,
              '#3399ff',
              750,
              '#3399ff'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        map.current.addLayer({
          id: 'cluster-count-test',
          type: 'symbol',
          source: 'test',
          filter: ['has', 'point_count'],
          layout: {
            'visibility': 'visible',
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });

        map.current.addLayer({
          id: 'unclustered-point-test',
          type: 'symbol',
          source: 'test',
          filter: ['!', ['has', 'point_count']],
          layout: {
            'visibility': 'visible',
            'icon-image': 'custom-marker-blue',
            'icon-size': 0.3,
            // get the title name from the source's "title" property
            'text-field': ['get', 'address'],
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 1.25],
            'text-anchor': 'top',
            'text-size': 10
          }
        });

      })

    let navigationInitialized = false
    map.current.on('idle', () => {
      if (navigationInitialized) {
        return;
      }
      const suffixes_arr = ['test'];
      const prefix_arr = ["unclustered-point-", "clusters-", "cluster-count-"];
      let allLayersId = {};

      for (const suffixes of suffixes_arr) {
        const layerIds = [];
        for (const prefix of prefix_arr) {
          const LayerId = prefix + suffixes;
          const layerExists = map.current.getLayer(LayerId);

          // If these all layers were not added to the map, abort
          if (!layerExists) {
            return;
          }
          layerIds.push(LayerId);
        }
        allLayersId[suffixes] = layerIds;
      }
      var config = {
        collapsed: false,
        layers: [
          {
            id: "cluster-count-test",
            hidden: true,
            parent: 'clusters-test',
            group: "trạm quan trắc",
            directory: "trạm quan trắc",

          },
          {
            id: "clusters-test",
            name: "clusters",
            hidden: false,
            children: true,
            group: "trạm quan trắc",
            directory: "trạm quan trắc",

          },
          {
            id: "unclustered-point-test",
            name: "point",
            group: "trạm quan trắc",
            directory: "trạm quan trắc",
          },
        ]
      }
      map.current.addControl(new layerControlGrouped(config), "top-left");
      navigationInitialized = true;
    })

    // set event layer
    // inspect a cluster on click
    map.current.on('click', ['clusters-test',
    ], (e) => {
      const clickedLayer = e.features[0].layer.id
      const parts = clickedLayer.split('-');
      let prefix = parts[0]
      let suffix = parts[1]
      if (prefix !== "clusters") {
        return;
      }
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: [clickedLayer]
      });
      const clusterId = features[0].properties.cluster_id;
      map.current.getSource(suffix).getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {

          if (err) return;

          map.current.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        }
      );
    });

    map.current.on('click', ['unclustered-point-test',
    ], (e) => {
      setShow(true)
      setDataModal(e.features[0].properties)
    });

    map.current.on('mouseenter',
      ['unclustered-point-test',
        'clusters-test',
      ], () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
    map.current.on('mouseleave',
      ['unclustered-point-test',
        'clusters-test',
      ], () => {
        map.current.getCanvas().style.cursor = '';
      });

    // end set envet layer
  })


  return (
    <div>
      <div className="container">
        <div ref={mapContainer} className="map-container" />
      </div>
      <Modal
        show={show}
        dataModal={dataModal}
        handleClose={() => {
          setShow(false)
          setDataModal(null)
        }}
        dataChart={userData}
      />

    </div >

  )
}

export default App;
