import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { layerControlGrouped } from 'mapbox-layer-control';

import markerIcon2xBlue from './assets/images/marker-icon-2x-blue.png';
import markerIcon2xGreen from './assets/images/marker-icon-2x-green.png';
import markerIcon2xYellow from './assets/images/marker-icon-2x-yellow.png';
import markerIcon2xRed from './assets/images/marker-icon-2x-red.png';
import markerIcon2xGrey from './assets/images/marker-icon-2x-grey.png';
import markerIcon2xOrange from './assets/images/marker-icon-2x-orange.png';
import markerIcon2xViolet from './assets/images/marker-icon-2x-violet.png';

import CustomModal from './components/Modal';
import { SideNav } from './components/SideNav';

import { GetDataToGeojson } from './utils/api.js';
import { CaculationDate, AddFilter } from './utils/help.js';

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

  const [showCustomModal, setShowCustomModal] = useState(false);
  const [dataCustomModal, setDataCustomModal] = useState(null);

  const [navigationConfig, setNavigationConfig] = useState(0);

  let showSideNav = false
  let mainPollutant = "tsp"

  const [fromDate, setFromDate] = useState('2020-12');
  const [toDate, setToDate] = useState(CaculationDate(fromDate));

  useEffect(() => {
    setToDate(CaculationDate(fromDate))
  }, [fromDate]);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      attributionControl: true,
      container: mapContainer.current,
      style: 'mapbox://styles/hieuha/clmgjdp9a01kn01r79eg4hknw',
      center: [106.032344398332, 20.4808648919667],
      zoom: 13,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")
    // load img
    map.current.loadImage(
      markerIcon2xGreen,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-green', image)
      });


    map.current.loadImage(
      markerIcon2xYellow,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-yellow', image)
      });


    map.current.loadImage(
      markerIcon2xRed,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-red', image)
      });

    map.current.loadImage(
      markerIcon2xBlue,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-blue', image)
      });

    map.current.loadImage(
      markerIcon2xGrey,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-grey', image)
      });

    map.current.loadImage(
      markerIcon2xOrange,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-orange', image)
      });

    map.current.loadImage(
      markerIcon2xViolet,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-violet', image)
      });


    map.current.loadImage(
      markerIcon2xBlue,
      (error, image) => {
        if (error) throw error;
        map.current.addImage('custom-marker-blue', image)

      })

  })

  useEffect(() => {

    GetDataToGeojson(fromDate, toDate)
      .then((data) => {
        setDataSource(data);
        if (map.current.getSource('test')) {
          map.current.getSource('test').setData(data)
          console.log(this);
        }
        return
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [toDate]); // Provide an empty dependency array


  useEffect(() => {

    if (dataSource === null) return;
    if (map.current.getSource('test')) return;

    map.current.on('load', function () {
      // load source map
      map.current.addSource('test', {
        type: 'geojson',
        data: dataSource,
        cluster: true,
        clusterMaxZoom: 11, // Max zoom to cluster points on
        clusterRadius: 40, // Radius of each cluster when clustering points (defaults to 50)
      })
      const custom_marker_red = map.current.hasImage("custom-marker-red");
      const custom_marker_blue = map.current.hasImage("custom-marker-blue");
      const custom_marker_grey = map.current.hasImage("custom-marker-grey");
      const custom_marker_orange = map.current.hasImage("custom-marker-orange");
      const custom_marker_viole = map.current.hasImage("custom-marker-violet");
      const custom_marker_green = map.current.hasImage("custom-marker-green");

      if (custom_marker_red
        && custom_marker_blue
        && custom_marker_grey
        && custom_marker_orange
        && custom_marker_viole
        && custom_marker_green
      ) {
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
            'icon-image':
              [
                'case',
                ['==', ['get', 'result', ['get', 'tsp']], 6],
                'custom-marker-violet',
                ['==', ['get', 'result', ['get', 'tsp']], 5],
                'custom-marker-red',
                ['==', ['get', 'result', ['get', 'tsp']], 4],
                'custom-marker-grey',
                ['==', ['get', 'result', ['get', 'tsp']], 3],
                'custom-marker-orange',
                ['==', ['get', 'result', ['get', 'tsp']], 2],
                'custom-marker-yellow',
                ['==', ['get', 'result', ['get', 'tsp']], 1],
                'custom-marker-green',
                'custom-marker-blue',
              ],
            'icon-size': 0.3,
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
      }
      setNavigationConfig(
        new layerControlGrouped({
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
        })
      )
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
      setShowCustomModal(true)
      setDataCustomModal(e.features[0].properties)
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
  }, [dataSource])

  useEffect(() => {

    if (!map.current) return; //kiểm tra xem nếu chưa có bản đồ thì return
    if (!navigationConfig) return;

    map.current.on('idle', () => {
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
      if (!map.current.hasControl(navigationConfig)) {
        map.current.addControl(navigationConfig, "top-left");
        let layerFilter = ["unclustered-point-test"]

        layerFilter.forEach(element => {
          let filter = AddFilter(element)
          filter.onclick = () => {
            showSideNav = !showSideNav;

            if (showSideNav) {
              openNav()
              return
            }
            closeNav()
            return
          }
        });
      }

    })

    document.querySelector(".closebtn").onclick = () => closeNav();

    function openNav() {
      let sideNavWidth = 250;
      document.documentElement.style.setProperty('--bs-sidenav-width', `${sideNavWidth - 50}px`);
      document.querySelector("#mySidenav").style.width = `${sideNavWidth}px`;
      document.querySelector(".container").style.marginLeft = "250px";
    }

    function closeNav() {
      document.querySelector("#mySidenav").style.width = "0";
      document.querySelector(".container").style.marginLeft = "0";
    }
  }, [navigationConfig])

  return (
    <div>
      <div className="container">
        <div ref={mapContainer} className="map-container" />
      </div>
      <CustomModal
        show={showCustomModal}
        dataModal={dataCustomModal}
        handleClose={() => {
          setShowCustomModal(false)
          setDataCustomModal(null)
        }}
        dataChart={userData}
      />
      <SideNav
        // dataSideNav={}
        date={fromDate}
        SetDate={(e) => {
          const year = e.getFullYear();
          const month = e.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
          const formattedDate = `${year}-${month}`;
          setFromDate(formattedDate)
        }}
      />

    </div >

  )
}

export default App;
