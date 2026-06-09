// function geoFindMe() {
//   const status = document.querySelector("#status");
//   const mapLink = document.querySelector("#map-link");

//   mapLink.href = "";
//   mapLink.textContent = "";

// }

// document.querySelector("#find-me").addEventListener("click", geoFindMe);

function success(position) {
  const positionObj = position;
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const url = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  const latlong = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  console.log("Url:", url);
  console.log("Lat Long:", latlong);
  console.log("Position Object:", positionObj);
}

function error() {
  console.log("ERROR:", "Unable to retrieve your location");
}

if (!navigator.geolocation) {
  console.log("Geolocation is not supported by your browser");
} else {
  console.log("Locating…");
  navigator.geolocation.getCurrentPosition(success, error);
}

let result = {
  plus_code: {
    compound_code: "RXWF+VRQ Port Harcourt, Nigeria",
    global_code: "6FP8RXWF+VRQ",
  },
  results: [
    {
      address_components: [
        {
          long_name: "RXWF+VRQ",
          short_name: "RXWF+VRQ",
          types: ["plus_code"],
        },
        {
          long_name: "Mgbuoba",
          short_name: "Mgbuoba",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "500102",
          short_name: "500102",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "Maleke, RXWF+VRQ, Mgbuoba 500102, Port Harcourt, Rivers, Nigeria",
      geometry: {
        location: {
          lat: 4.847222599999999,
          lng: 6.974603999999999,
        },
        location_type: "GEOMETRIC_CENTER",
        viewport: {
          northeast: {
            lat: 4.848571580291502,
            lng: 6.975952980291502,
          },
          southwest: {
            lat: 4.845873619708497,
            lng: 6.973255019708497,
          },
        },
      },
      place_id: "ChIJFcvJdKLPaRARVTuwIGxsrgE",
      types: ["establishment", "point_of_interest"],
    },
    {
      address_components: [
        {
          long_name: "18b",
          short_name: "18b",
          types: ["street_number"],
        },
        {
          long_name: "Ada-George Road",
          short_name: "Ada-George Road",
          types: ["route"],
        },
        {
          long_name: "Mgbuoba",
          short_name: "Mgbuoba",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "500102",
          short_name: "500102",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "18b Ada-George Road, Mgbuoba 500102, Port Harcourt, Rivers, Nigeria",
      geometry: {
        location: {
          lat: 4.8469293,
          lng: 6.9745598,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 4.848278280291503,
            lng: 6.975908780291502,
          },
          southwest: {
            lat: 4.845580319708498,
            lng: 6.973210819708497,
          },
        },
      },
      place_id: "ChIJR9CxADDOaRARte8FvuNXrho",
      plus_code: {
        compound_code: "RXWF+QR Port Harcourt, Nigeria",
        global_code: "6FP8RXWF+QR",
      },
      types: ["street_address"],
    },
    {
      address_components: [
        {
          long_name: "7",
          short_name: "7",
          types: ["street_number"],
        },
        {
          long_name: "Ada-George Road",
          short_name: "Ada-George Road",
          types: ["route"],
        },
        {
          long_name: "Mgbuoba",
          short_name: "Mgbuoba",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "500102",
          short_name: "500102",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "7 Ada-George Road, Mgbuoba 500102, Port Harcourt, Rivers, Nigeria",
      geometry: {
        location: {
          lat: 4.8472949,
          lng: 6.974729399999999,
        },
        location_type: "RANGE_INTERPOLATED",
        viewport: {
          northeast: {
            lat: 4.848643880291502,
            lng: 6.976078380291502,
          },
          southwest: {
            lat: 4.845945919708498,
            lng: 6.973380419708497,
          },
        },
      },
      place_id:
        "EjI3IEFkYS1HZW9yZ2UgUm9hZCwgTWdidW9iYSwgUG9ydCBIYXJjb3VydCwgTmlnZXJpYSIaEhgKFAoSCXHLzf8vzmkQEeoOvbJ04ryTEAc",
      types: ["street_address"],
    },
    {
      address_components: [
        {
          long_name: "Ada-George Road",
          short_name: "Ada-George Road",
          types: ["route"],
        },
        {
          long_name: "Mgbuoba",
          short_name: "Mgbuoba",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "500102",
          short_name: "500102",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "Ada-George Road, Mgbuoba 500102, Port Harcourt, Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.848063,
            lng: 6.974738899999999,
          },
          southwest: {
            lat: 4.8464936,
            lng: 6.974241699999999,
          },
        },
        location: {
          lat: 4.8473007,
          lng: 6.9745618,
        },
        location_type: "GEOMETRIC_CENTER",
        viewport: {
          northeast: {
            lat: 4.848627280291502,
            lng: 6.975839280291502,
          },
          southwest: {
            lat: 4.845929319708498,
            lng: 6.973141319708497,
          },
        },
      },
      place_id: "ChIJ4zLr_y_OaRARGmgGqkR1itk",
      types: ["route"],
    },
    {
      address_components: [
        {
          long_name: "RXWF+VR",
          short_name: "RXWF+VR",
          types: ["plus_code"],
        },
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "RXWF+VR Port Harcourt, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.84725,
            lng: 6.974625,
          },
          southwest: {
            lat: 4.847125,
            lng: 6.9745,
          },
        },
        location: {
          lat: 4.847222599999999,
          lng: 6.974603999999999,
        },
        location_type: "GEOMETRIC_CENTER",
        viewport: {
          northeast: {
            lat: 4.848536480291502,
            lng: 6.975911480291502,
          },
          southwest: {
            lat: 4.845838519708497,
            lng: 6.973213519708498,
          },
        },
      },
      place_id: "GhIJdbo9Uo5jE0ARADRKl_7lG0A",
      plus_code: {
        compound_code: "RXWF+VR Port Harcourt, Nigeria",
        global_code: "6FP8RXWF+VR",
      },
      types: ["plus_code"],
    },
    {
      address_components: [
        {
          long_name: "Mgbuoba",
          short_name: "Mgbuoba",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "500102",
          short_name: "500102",
          types: ["postal_code"],
        },
      ],
      formatted_address: "Mgbuoba 500102, Port Harcourt, Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.873097599999999,
            lng: 6.981713399999999,
          },
          southwest: {
            lat: 4.841851,
            lng: 6.951026499999999,
          },
        },
        location: {
          lat: 4.8601836,
          lng: 6.9665476,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 4.873097599999999,
            lng: 6.981713399999999,
          },
          southwest: {
            lat: 4.841851,
            lng: 6.951026499999999,
          },
        },
      },
      place_id: "ChIJAfWsgSrOaRARQ5juw-7cXB0",
      types: ["neighborhood", "political"],
    },
    {
      address_components: [
        {
          long_name: "Rumukwuta (8b)",
          short_name: "Rumukwuta (8b)",
          types: ["administrative_area_level_3", "political"],
        },
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Rumukwuta (8b), Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.8832055,
            lng: 7.0133294,
          },
          southwest: {
            lat: 4.8198294,
            lng: 6.9488398,
          },
        },
        location: {
          lat: 4.849770299999999,
          lng: 6.9772897,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 4.8832055,
            lng: 7.0133294,
          },
          southwest: {
            lat: 4.8198294,
            lng: 6.9488398,
          },
        },
      },
      place_id: "ChIJI0Ph6CPOaRARuuTXY5LJVKM",
      types: ["administrative_area_level_3", "political"],
    },
    {
      address_components: [
        {
          long_name: "Mgbuoba",
          short_name: "Mgbuoba",
          types: ["political", "sublocality", "sublocality_level_1"],
        },
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "500102",
          short_name: "500102",
          types: ["postal_code"],
        },
      ],
      formatted_address: "Mgbuoba 500102, Port Harcourt, Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.874527899999999,
            lng: 6.9882488,
          },
          southwest: {
            lat: 4.814105,
            lng: 6.94911,
          },
        },
        location: {
          lat: 4.8421276,
          lng: 6.969233,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 4.874527899999999,
            lng: 6.9882488,
          },
          southwest: {
            lat: 4.814105,
            lng: 6.94911,
          },
        },
      },
      place_id: "ChIJE6V7EtXRaRARAD84iDou-GM",
      types: ["political", "sublocality", "sublocality_level_1"],
    },
    {
      address_components: [
        {
          long_name: "500272",
          short_name: "500272",
          types: ["postal_code"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "500272, Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.878023,
            lng: 7.0068394,
          },
          southwest: {
            lat: 4.8159976,
            lng: 6.963862499999999,
          },
        },
        location: {
          lat: 4.8594348,
          lng: 6.983664,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 4.878023,
            lng: 7.0068394,
          },
          southwest: {
            lat: 4.8159976,
            lng: 6.963862499999999,
          },
        },
      },
      place_id: "ChIJNSK1sN_RaRARmpGJuej9y8Q",
      types: ["postal_code"],
    },
    {
      address_components: [
        {
          long_name: "Port Harcourt",
          short_name: "Port Harcourt",
          types: ["locality", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Port Harcourt, Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.901269999999999,
            lng: 7.074658,
          },
          southwest: {
            lat: 4.7335509,
            lng: 6.9349351,
          },
        },
        location: {
          lat: 4.847222599999999,
          lng: 6.974603999999999,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 4.901269999999999,
            lng: 7.074658,
          },
          southwest: {
            lat: 4.7335509,
            lng: 6.9349351,
          },
        },
      },
      place_id: "ChIJ40gsn6POaRAR2zKIfd0rVlM",
      types: ["locality", "political"],
    },
    {
      address_components: [
        {
          long_name: "Obio/Akpor",
          short_name: "Obio/Akpor",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Obio/Akpor, Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 4.9404144,
            lng: 7.1516712,
          },
          southwest: {
            lat: 4.7927065,
            lng: 6.892513399999999,
          },
        },
        location: {
          lat: 4.8775753,
          lng: 7.0283383,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 4.9404144,
            lng: 7.1516712,
          },
          southwest: {
            lat: 4.7927065,
            lng: 6.892513399999999,
          },
        },
      },
      place_id: "ChIJBav7EA7SaRARw_jQx-PfOII",
      types: ["administrative_area_level_2", "political"],
    },
    {
      address_components: [
        {
          long_name: "Rivers",
          short_name: "RV",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Rivers, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.7300361,
            lng: 7.597785000000001,
          },
          southwest: {
            lat: 4.313126,
            lng: 6.3983939,
          },
        },
        location: {
          lat: 4.8396414,
          lng: 6.911237799999999,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 5.7300361,
            lng: 7.597785000000001,
          },
          southwest: {
            lat: 4.313126,
            lng: 6.3983939,
          },
        },
      },
      place_id: "ChIJ4y71DGjraRARXLlP8kNiVIg",
      types: ["administrative_area_level_1", "political"],
    },
    {
      address_components: [
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 13.8856449,
            lng: 14.677982,
          },
          southwest: {
            lat: 4.1821001,
            lng: 2.676932,
          },
        },
        location: {
          lat: 9.081999,
          lng: 8.675276999999999,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 13.8856449,
            lng: 14.677982,
          },
          southwest: {
            lat: 4.1821001,
            lng: 2.676932,
          },
        },
      },
      place_id: "ChIJDY2kfa8LThARyAvFaEH-qJk",
      types: ["country", "political"],
    },
  ],
  status: "OK",
};

let nearBy = {
  html_attributions: [],
  next_page_token:
    "AUacShhTRS6Y4omvvngPCRhDnTm4x640IvoIXFlH2eb6KqpVYNghymPgcQ6It0tV9HIbmlKWZYfYABSfWiY7n2tB_Wy6WphKUpQbOpdisL53Xgjeg1OMkM_BIKbxagruh4uPYJufnqICSp9AjxJGYmVEhMc9UTTYkoEYLwckQi9Pd7kk3gaRoqebL1MaQnjq76xgnAUmuo6eD2zEHC9kqj37N-zWfIUeOyUd873YhQY4-32iAW_bx8f-G6ATi_GZA201VeeGBnf0K4sMcQcqFlfE6nzGjt7tvc05J3sHtRvR2RZNjDbkiZ5EcKMltiYyy0mdbVnR-h8_rJIkysOqQ9-jhYmlazaKPGBXsoK5OQMp7g6r1Ht-LTK4NoFkzHeXkyNvFcu-ckKiHepUU1gIVVSmTxirwz0tojufgeGleO5tfZYG-EUAOteQxYPSrv9jWTc",
  results: [
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8472426,
          lng: 6.9745464,
        },
        viewport: {
          northeast: {
            lat: 4.848591780291502,
            lng: 6.975896080291501,
          },
          southwest: {
            lat: 4.845893819708497,
            lng: 6.973198119708496,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Obilink tech WA",
      opening_hours: {
        open_now: true,
      },
      place_id: "ChIJIwm4njXPaRAR5GsyPi-jNn8",
      reference: "ChIJIwm4njXPaRAR5GsyPi-jNn8",
      scope: "GOOGLE",
      types: ["car_repair", "store", "point_of_interest", "establishment"],
      vicinity: "RXWF+VRV, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8472426,
          lng: 6.9745464,
        },
        viewport: {
          northeast: {
            lat: 4.848591780291502,
            lng: 6.975896080291501,
          },
          southwest: {
            lat: 4.845893819708497,
            lng: 6.973198119708496,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "J.C. Odin'S Investment C. Ltd",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJoSA7Lc_PaRARamNSnHXfaKA",
      plus_code: {
        compound_code: "RXWF+VR Port Harcourt, Nigeria",
        global_code: "6FP8RXWF+VR",
      },
      reference: "ChIJoSA7Lc_PaRARamNSnHXfaKA",
      scope: "GOOGLE",
      types: ["car_repair", "store", "point_of_interest", "establishment"],
      vicinity: "36, Amaigbo Rd.,Mile 3 Junction, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8472426,
          lng: 6.9745464,
        },
        viewport: {
          northeast: {
            lat: 4.848591780291502,
            lng: 6.975896080291501,
          },
          southwest: {
            lat: 4.845893819708497,
            lng: 6.973198119708496,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Mac Erni Engineering Company Limited",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJGQKKRKrPaRAR3mAEvrJYk4k",
      plus_code: {
        compound_code: "RXWF+VR Port Harcourt, Nigeria",
        global_code: "6FP8RXWF+VR",
      },
      reference: "ChIJGQKKRKrPaRAR3mAEvrJYk4k",
      scope: "GOOGLE",
      types: ["car_repair", "store", "point_of_interest", "establishment"],
      vicinity: "Km1,Portharcourt, Warri-Patani Road",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8472426,
          lng: 6.9745464,
        },
        viewport: {
          northeast: {
            lat: 4.848591780291502,
            lng: 6.975896080291501,
          },
          southwest: {
            lat: 4.845893819708497,
            lng: 6.973198119708496,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Tochukwu Engineering Company",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJc7LD70rPaRARisGjrL252mI",
      plus_code: {
        compound_code: "RXWF+VR Port Harcourt, Nigeria",
        global_code: "6FP8RXWF+VR",
      },
      reference: "ChIJc7LD70rPaRARisGjrL252mI",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "Km 3,Aba/Port Harcourt Express Road Aba Road",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8472426,
          lng: 6.9745464,
        },
        viewport: {
          northeast: {
            lat: 4.848591780291502,
            lng: 6.975896080291501,
          },
          southwest: {
            lat: 4.845893819708497,
            lng: 6.973198119708496,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Briscoemotors",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJLcAuTfXPaRARW7cFSHKCeI4",
      plus_code: {
        compound_code: "RXWF+VR Port Harcourt, Nigeria",
        global_code: "6FP8RXWF+VR",
      },
      reference: "ChIJLcAuTfXPaRARW7cFSHKCeI4",
      scope: "GOOGLE",
      types: ["car_repair", "store", "point_of_interest", "establishment"],
      vicinity: "121 Custom Road Npa Complex, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8466999,
          lng: 6.972747199999999,
        },
        viewport: {
          northeast: {
            lat: 4.848031880291502,
            lng: 6.974157480291501,
          },
          southwest: {
            lat: 4.845333919708498,
            lng: 6.971459519708496,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Teeross International Driving School",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJFRUxJdnPaRAR9QJ5VuvrA3E",
      plus_code: {
        compound_code: "RXWF+M3 Port Harcourt, Nigeria",
        global_code: "6FP8RXWF+M3",
      },
      reference: "ChIJFRUxJdnPaRAR9QJ5VuvrA3E",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "64 Shell Location Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8489814,
          lng: 6.9737857,
        },
        viewport: {
          northeast: {
            lat: 4.850343230291503,
            lng: 6.975204180291502,
          },
          southwest: {
            lat: 4.847645269708498,
            lng: 6.972506219708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Excellent Spares",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 576,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/106888093548443570384">Excellent Spares Ltd</a>',
          ],
          photo_reference:
            "AUacShg93hH1eBV-NVzT0ZJOpq33vq39nbBhnDAsHc6pkwHK4mGQnKc7Wqq-eTcFrozLSP3s9bsWjKSygFv8y80zNvWqBIDQGc9HEarBj3XRaLXaNces13zeoKbBAgJb_5y_QD3l3JiybWc9QyplqkS_jvJQ24GOOWiPW5F-p4atjAGANQlt",
          width: 720,
        },
      ],
      place_id: "ChIJjeCQ2lTPaRARFrLj_XrqO3A",
      plus_code: {
        compound_code: "RXXF+HG Port Harcourt, Nigeria",
        global_code: "6FP8RXXF+HG",
      },
      rating: 4.8,
      reference: "ChIJjeCQ2lTPaRARFrLj_XrqO3A",
      scope: "GOOGLE",
      types: ["car_repair", "store", "point_of_interest", "establishment"],
      user_ratings_total: 4,
      vicinity: "5 Ada George Road, By New RD, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8445515,
          lng: 6.9727437,
        },
        viewport: {
          northeast: {
            lat: 4.846025630291502,
            lng: 6.974138280291503,
          },
          southwest: {
            lat: 4.843327669708497,
            lng: 6.971440319708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Kingsley motor parts investment",
      place_id: "ChIJD-enOWnPaRARX6cd2xY5fTc",
      plus_code: {
        compound_code: "RXVF+R3 Port Harcourt, Nigeria",
        global_code: "6FP8RXVF+R3",
      },
      reference: "ChIJD-enOWnPaRARX6cd2xY5fTc",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "Mile 3, ikoku, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8470544,
          lng: 6.971378900000001,
        },
        viewport: {
          northeast: {
            lat: 4.848411880291501,
            lng: 6.972730830291503,
          },
          southwest: {
            lat: 4.845713919708497,
            lng: 6.970032869708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Chochasautos",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 2560,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/100511632720765560262">Chochasautos</a>',
          ],
          photo_reference:
            "AUacShjmhgw21De3F74zxV6vyS4XSkSCabF92Hwd7XVFWj5Z6de6WhzmtevfJcFs2AH3An4UMG4rTAqigUmw5yD51Sg_efB26BkJQ_YhkqafKHoBy9S3OpjoutJ7hJfNrSzrtT87AliH4JfmUGGkqetrVu3ToLeC-YqwGtiWNEFM-JSBaPt5",
          width: 1920,
        },
      ],
      place_id: "ChIJP6ohGTDPaRARTQY2lwvPqkE",
      plus_code: {
        compound_code: "RXWC+RH Port Harcourt, Nigeria",
        global_code: "6FP8RXWC+RH",
      },
      reference: "ChIJP6ohGTDPaRARTQY2lwvPqkE",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "Okania Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.847228,
          lng: 6.970995100000001,
        },
        viewport: {
          northeast: {
            lat: 4.848547180291503,
            lng: 6.972333830291503,
          },
          southwest: {
            lat: 4.845849219708498,
            lng: 6.969635869708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Ugobest auto electrical",
      opening_hours: {
        open_now: true,
      },
      place_id: "ChIJi70L9S7PaRARbIyjFYuk6vM",
      plus_code: {
        compound_code: "RXWC+V9 Port Harcourt, Nigeria",
        global_code: "6FP8RXWC+V9",
      },
      reference: "ChIJi70L9S7PaRARbIyjFYuk6vM",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "15 Okania Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.850727199999999,
          lng: 6.9742359,
        },
        viewport: {
          northeast: {
            lat: 4.852059330291502,
            lng: 6.975623130291502,
          },
          southwest: {
            lat: 4.849361369708498,
            lng: 6.972925169708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Blessed Ugoamaka Auto Ventures",
      place_id: "ChIJRRmpt8DPaRARFAgkDxDxYl8",
      plus_code: {
        compound_code: "VX2F+7M Port Harcourt, Nigeria",
        global_code: "6FP8VX2F+7M",
      },
      reference: "ChIJRRmpt8DPaRARFAgkDxDxYl8",
      scope: "GOOGLE",
      types: ["car_repair", "store", "point_of_interest", "establishment"],
      vicinity: "16 Ada-George Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.845085999999999,
          lng: 6.978240700000001,
        },
        viewport: {
          northeast: {
            lat: 4.846479430291502,
            lng: 6.979607980291503,
          },
          southwest: {
            lat: 4.843781469708498,
            lng: 6.976910019708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Agalubricants Limited",
      place_id: "ChIJmbuJDjvOaRARsOge-8idgbU",
      plus_code: {
        compound_code: "RXWH+27 Port Harcourt, Nigeria",
        global_code: "6FP8RXWH+27",
      },
      reference: "ChIJmbuJDjvOaRARsOge-8idgbU",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "34 67 Chinda Street, off Ada-George Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8402614,
          lng: 6.9741295,
        },
        viewport: {
          northeast: {
            lat: 4.841620780291502,
            lng: 6.975476780291501,
          },
          southwest: {
            lat: 4.838922819708498,
            lng: 6.972778819708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "McFelly's Auto Institutes",
      opening_hours: {
        open_now: true,
      },
      place_id: "ChIJH9_1LhbPaRARsu4xNlSM2_o",
      plus_code: {
        compound_code: "RXRF+4M Port Harcourt, Nigeria",
        global_code: "6FP8RXRF+4M",
      },
      reference: "ChIJH9_1LhbPaRARsu4xNlSM2_o",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "Apa-Ogodo Street, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.839578299999999,
          lng: 6.974244199999999,
        },
        viewport: {
          northeast: {
            lat: 4.840929780291503,
            lng: 6.975606430291504,
          },
          southwest: {
            lat: 4.838231819708498,
            lng: 6.972908469708499,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Si Motorworks",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJIe0JVTvPaRAR3Oq1MRoeJFE",
      plus_code: {
        compound_code: "RXQF+RM Port Harcourt, Nigeria",
        global_code: "6FP8RXQF+RM",
      },
      reference: "ChIJIe0JVTvPaRAR3Oq1MRoeJFE",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "53 Liberty Drive",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.839173899999999,
          lng: 6.973778099999999,
        },
        viewport: {
          northeast: {
            lat: 4.840505080291501,
            lng: 6.975063930291501,
          },
          southwest: {
            lat: 4.837807119708497,
            lng: 6.972365969708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Ugobest Auto",
      photos: [
        {
          height: 1920,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104869195772790997307">soala bruce</a>',
          ],
          photo_reference:
            "AUacShiXNa7SthcDrWZgXv7cZOhfrBeWPci9n0Z_rxxnWAPxJiDYWobDnAwfq7b4SqcWSexCVyxqFc-RdGKdxfE9AAqxs0o7MV1a_WIzUYJgWEUYpe1ggrJ99Ic012LcVjVP-iLZitKMJmAqU4EcB-qdVtkFZb5DIX0wlHEFK-Izu2vTKTrg",
          width: 1080,
        },
      ],
      place_id: "ChIJBzmCaV7PaRARopd-HPoasa8",
      rating: 4,
      reference: "ChIJBzmCaV7PaRARopd-HPoasa8",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 1,
      vicinity: "RXQF+MG6, Victory Drive, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.840312599999999,
          lng: 6.9698983,
        },
        viewport: {
          northeast: {
            lat: 4.841654230291502,
            lng: 6.971248330291503,
          },
          southwest: {
            lat: 4.838956269708497,
            lng: 6.968550369708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Chistan Engineering",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJyXuFjaHPaRARhsqZyed113k",
      plus_code: {
        compound_code: "RXR9+4X Port Harcourt, Nigeria",
        global_code: "6FP8RXR9+4X",
      },
      rating: 5,
      reference: "ChIJyXuFjaHPaRARhsqZyed113k",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 1,
      vicinity: "Mini Orlu Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.837884699999999,
          lng: 6.976714299999998,
        },
        viewport: {
          northeast: {
            lat: 4.839276230291501,
            lng: 6.978045430291502,
          },
          southwest: {
            lat: 4.836578269708497,
            lng: 6.975347469708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Promoppy Tyre service center",
      photos: [
        {
          height: 3000,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/118150020799113341435">Arungwa Kingsley</a>',
          ],
          photo_reference:
            "AUacShiULYMjFIezdd-2qs3F_zV4xiXPOU1T814HChLpYH9ZLWfB2jM_xzgPBDuuakVNQfg3HxWs3IOD9qs4jwawY0PjYbTT2RjXcRI7MxRCVf-_q7r6FXnBRmJ2DQU53uGU5auMtxwxO-yqkkqDKD2RVhBkGfd258SeUSicpD_5rxJsuY2X",
          width: 4000,
        },
      ],
      place_id: "ChIJBcMSKGzPaRARKkzBvk920bU",
      plus_code: {
        compound_code: "RXQG+5M Port Harcourt, Nigeria",
        global_code: "6FP8RXQG+5M",
      },
      rating: 5,
      reference: "ChIJBcMSKGzPaRARKkzBvk920bU",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 1,
      vicinity: "No 1 Believer's Avenue, Ada-George Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8377309,
          lng: 6.9765675,
        },
        viewport: {
          northeast: {
            lat: 4.839157130291502,
            lng: 6.977877630291501,
          },
          southwest: {
            lat: 4.836459169708498,
            lng: 6.975179669708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "MICHELIN / DUNLOP / MAXXIS / BRIDGESTONE TYRE SERVICE CENTER / BULLET PROOF TYRES FITTING",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 780,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109467135949945111280">MICHELIN / DUNLOP / MAXXIS</a>',
          ],
          photo_reference:
            "AUacShhM0Oos_hQ9r2gtxcOrv3wtSdoa75agKuX_JybIbKUE86dLJ0gHC0N4iCGGlj42hdPYcGB6gIuauG7WcviF5E-JQSHSuwCF_d8yhkepx2e2oqta4I-uv9D5RF-rKGO2w21ntrgxbiH6bKMQbDbcXIamkM1PgqdQ9U6LXujBCiS-WiJ2",
          width: 1040,
        },
      ],
      place_id: "ChIJ25oI8yjOaRARzalWIAXtA0E",
      plus_code: {
        compound_code: "RXQG+3J Port Harcourt, Nigeria",
        global_code: "6FP8RXQG+3J",
      },
      rating: 4.8,
      reference: "ChIJ25oI8yjOaRARzalWIAXtA0E",
      scope: "GOOGLE",
      types: ["car_repair", "store", "point_of_interest", "establishment"],
      user_ratings_total: 5,
      vicinity: "1 Believers Avenue, Ada-George Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8559206,
          lng: 6.971607,
        },
        viewport: {
          northeast: {
            lat: 4.857269580291502,
            lng: 6.972955980291502,
          },
          southwest: {
            lat: 4.854571619708498,
            lng: 6.970258019708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Paul Ac Automobile Electrical Engineer",
      place_id: "ChIJB7laRGzPaRARYMST3CYBymg",
      plus_code: {
        compound_code: "VX4C+9J Port Harcourt, Nigeria",
        global_code: "6FP8VX4C+9J",
      },
      reference: "ChIJB7laRGzPaRARYMST3CYBymg",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "opposite Osmosis Hotel, NTA Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.855561,
          lng: 6.969587399999999,
        },
        viewport: {
          northeast: {
            lat: 4.856941880291503,
            lng: 6.970900280291502,
          },
          southwest: {
            lat: 4.854243919708498,
            lng: 6.968202319708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Dukwe And 21 Pillar For Global Development Equity",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJs68wgVPPaRAR3j0DJoHC0UU",
      plus_code: {
        compound_code: "VX49+6R Port Harcourt, Nigeria",
        global_code: "6FP8VX49+6R",
      },
      reference: "ChIJs68wgVPPaRAR3j0DJoHC0UU",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "New Nation Close Off Chike Street Rivers Aboa",
    },
  ],
  status: "OK",
};

let nearByTwo = {
  html_attributions: [],
  next_page_token:
    "AUacShh8hinLpEwzf-iG1iMIj0nti5og27PA939u-0Z5g_PtS0F6kThCk9wmoJjwjb0aDfugiO8iOvIFDCZFX92RsCpne4XgvmAqdY-lfIjPBSQbbYAsRBFulHCABz53DzVX9yMllbzLtXJs03kXie6dGysxbQheIjb32SuHnkDp0EFie4xUN5Lz-DqCEh_RRdS6xc4i2DZCT45wQtCNKfPiLtVraodKNktbMB4C7gv6oyuW-AuvIqY_BZoVmbxk3BfrYvd1aHgk2hJy2_PEFtksu788BqZYJpnggd58bfZdBeQvk-Wrz8W12JruKnqTTZ9Cuy_ypO-bz-f2-FQb8bJGcvCN_8VcqEQ_ofzwJOCdXSdtljws-w-iUlRoOy0lZCH-z57pJN0MCx3ABGuww4gX6ozDkOEy2MOqq2zRhl7ZwPf1f8-ImUX_okLOf8TLiAEJGAoPc6OPemZRLZZgVlMVosqJGGYvq5HsfXjKcXsU1MgVhHXVo0jkW8q7N_AZOj2U2_K7YXvlJgty2i5bzvVNOZ41PUWCC99BwTmY5SBUr-bFS91G1_3yKpoeauvmspJu8OxD6d0ZlJZJe9nQdMvjXGQzLvzPh5ZtKSaKxJnvfu1VhsD9Zwww8OMp7avIzpSOFbw5-rIuo88pHGXqLNkX",
  results: [
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8556232,
          lng: 6.969613999999999,
        },
        viewport: {
          northeast: {
            lat: 4.856996980291502,
            lng: 6.970934930291501,
          },
          southwest: {
            lat: 4.854299019708497,
            lng: 6.968236969708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "P And P Evergreat Services Nigeria Limited",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJc5Gjz1vPaRAReLIwMQ0hfJ8",
      plus_code: {
        compound_code: "VX49+6R Port Harcourt, Nigeria",
        global_code: "6FP8VX49+6R",
      },
      reference: "ChIJc5Gjz1vPaRAReLIwMQ0hfJ8",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "store", "establishment"],
      vicinity: "101 Chike Street",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.836755999999999,
          lng: 6.975998,
        },
        viewport: {
          northeast: {
            lat: 4.838156430291503,
            lng: 6.977462080291502,
          },
          southwest: {
            lat: 4.835458469708498,
            lng: 6.974764119708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Okwux Investment",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJtYhqOKrPaRARTCmDeuRf3zg",
      plus_code: {
        compound_code: "RXPG+P9 Port Harcourt, Nigeria",
        global_code: "6FP8RXPG+P9",
      },
      reference: "ChIJtYhqOKrPaRARTCmDeuRf3zg",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "5 Ada-George Road",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8353237,
          lng: 6.976986200000001,
        },
        viewport: {
          northeast: {
            lat: 4.836638030291502,
            lng: 6.978397430291503,
          },
          southwest: {
            lat: 4.833940069708498,
            lng: 6.975699469708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "WeAreHereToFixIt",
      place_id: "ChIJN9zAp0XOaRARlfYmmvHfQ5I",
      plus_code: {
        compound_code: "RXPG+4Q Port Harcourt, Nigeria",
        global_code: "6FP8RXPG+4Q",
      },
      rating: 5,
      reference: "ChIJN9zAp0XOaRARlfYmmvHfQ5I",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "health", "establishment"],
      user_ratings_total: 1,
      vicinity: "Suite A1, Plot 175 Ada-George Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8534827,
          lng: 6.985640000000001,
        },
        viewport: {
          northeast: {
            lat: 4.854697480291502,
            lng: 6.986981630291502,
          },
          southwest: {
            lat: 4.851999519708498,
            lng: 6.984283669708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Stan Diesel System Enterprise",
      opening_hours: {
        open_now: true,
      },
      place_id: "ChIJJyFYOY_PaRARf0Mmum2zsuA",
      plus_code: {
        compound_code: "VX3P+97 Port Harcourt, Nigeria",
        global_code: "6FP8VX3P+97",
      },
      reference: "ChIJJyFYOY_PaRARf0Mmum2zsuA",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "14 Ogologo Street, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.840371699999999,
          lng: 6.985777199999999,
        },
        viewport: {
          northeast: {
            lat: 4.841746430291502,
            lng: 6.987144330291502,
          },
          southwest: {
            lat: 4.839048469708497,
            lng: 6.984446369708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Fabiyi automobile workshop",
      place_id: "ChIJrexcvF3PaRARUsZqka67n2k",
      plus_code: {
        compound_code: "RXRP+48 Port Harcourt, Nigeria",
        global_code: "6FP8RXRP+48",
      },
      rating: 5,
      reference: "ChIJrexcvF3PaRARUsZqka67n2k",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 1,
      vicinity: "28 Rumuokwuta Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8426107,
          lng: 6.9884147,
        },
        viewport: {
          northeast: {
            lat: 4.843961730291502,
            lng: 6.989708530291502,
          },
          southwest: {
            lat: 4.841263769708497,
            lng: 6.987010569708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Auto Clinicar Services.",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/102681303085623278182">Auto Clinicar Services.</a>',
          ],
          photo_reference:
            "AUacShi5r4M57eYgX85g-Qxouh94bNy3KH5RHkVWUki8hiSeddBLHTFYf4evK-uw6DCnrcQ8pm_7MVRt702Ls0NrQAiow_xGwDA5qJj-xD-dRstvp8GBjQ5ZUah-4e6HehWgtz2V3-7O_nvL1kdqELFNqISjXQnQKq-97UEEYjMQ-b0tM2nI",
          width: 4032,
        },
      ],
      place_id: "ChIJ0-XFCN3PaRAR6i8T0ojimak",
      plus_code: {
        compound_code: "RXVQ+29 Port Harcourt, Nigeria",
        global_code: "6FP8RXVQ+29",
      },
      rating: 4.9,
      reference: "ChIJ0-XFCN3PaRAR6i8T0ojimak",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 40,
      vicinity: "Ikwerre Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.839616999999999,
          lng: 6.987144999999999,
        },
        viewport: {
          northeast: {
            lat: 4.840995830291502,
            lng: 6.988504130291501,
          },
          southwest: {
            lat: 4.838297869708497,
            lng: 6.985806169708496,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Pedro And Sons Company Nigeria Limted",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJMQZn1f7PaRARHt7iKFKph70",
      plus_code: {
        compound_code: "RXQP+RV Port Harcourt, Nigeria",
        global_code: "6FP8RXQP+RV",
      },
      reference: "ChIJMQZn1f7PaRARHt7iKFKph70",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "12 Rumuokwuta Road",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8406097,
          lng: 6.988306,
        },
        viewport: {
          northeast: {
            lat: 4.841957380291502,
            lng: 6.989625080291503,
          },
          southwest: {
            lat: 4.839259419708497,
            lng: 6.986927119708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Blessed Goodluck Intergrated And Company",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJ9TH6o0fPaRARf8kvXha0Fe4",
      plus_code: {
        compound_code: "RXRQ+68 Port Harcourt, Nigeria",
        global_code: "6FP8RXRQ+68",
      },
      reference: "ChIJ9TH6o0fPaRARf8kvXha0Fe4",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "436 Ikwerre Road",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.839875000000001,
          lng: 6.988020000000001,
        },
        viewport: {
          northeast: {
            lat: 4.841232230291502,
            lng: 6.989469780291503,
          },
          southwest: {
            lat: 4.838534269708497,
            lng: 6.986771819708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Mics Classic",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJDeNbCcnPaRARVBZ9RosepUk",
      plus_code: {
        compound_code: "RXQQ+X6 Port Harcourt, Nigeria",
        global_code: "6FP8RXQQ+X6",
      },
      reference: "ChIJDeNbCcnPaRARVBZ9RosepUk",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "5 Rumuokwuta Road / Rumuola Road, NTA Road",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8585911,
          lng: 6.984328199999999,
        },
        viewport: {
          northeast: {
            lat: 4.859951730291502,
            lng: 6.985713230291502,
          },
          southwest: {
            lat: 4.857253769708498,
            lng: 6.983015269708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Dan mike auto spare parts",
      place_id: "ChIJka25ugXRaRARTqeEO6J7HOo",
      plus_code: {
        compound_code: "VX5M+CP Port Harcourt, Nigeria",
        global_code: "6FP8VX5M+CP",
      },
      reference: "ChIJka25ugXRaRARTqeEO6J7HOo",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "store", "establishment"],
      vicinity: "91a Nkpolu Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8594348,
          lng: 6.983664,
        },
        viewport: {
          northeast: {
            lat: 4.860847780291503,
            lng: 6.985224480291502,
          },
          southwest: {
            lat: 4.858149819708498,
            lng: 6.982526519708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Piki Hub",
      place_id: "ChIJWVMU2NDRaRAR_o1C4d8Astc",
      plus_code: {
        compound_code: "VX5M+QF Port Harcourt, Nigeria",
        global_code: "6FP8VX5M+QF",
      },
      reference: "ChIJWVMU2NDRaRAR_o1C4d8Astc",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "store", "establishment"],
      vicinity: "26Owudo Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8478695,
          lng: 6.9900913,
        },
        viewport: {
          northeast: {
            lat: 4.849234630291503,
            lng: 6.991467680291502,
          },
          southwest: {
            lat: 4.846536669708498,
            lng: 6.988769719708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "ONUOHAS CAR LINK",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJnx6acFzPaRAR2ENdDTNe-Mg",
      plus_code: {
        compound_code: "RXXR+42 Port Harcourt, Nigeria",
        global_code: "6FP8RXXR+42",
      },
      reference: "ChIJnx6acFzPaRAR2ENdDTNe-Mg",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "14b Obiwali Rivers, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.833825099999999,
          lng: 6.9833982,
        },
        viewport: {
          northeast: {
            lat: 4.835179330291502,
            lng: 6.984759680291503,
          },
          southwest: {
            lat: 4.832481369708497,
            lng: 6.982061719708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Engr. Wasu workshop",
      photos: [
        {
          height: 3120,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/117012048204596209859">Onuweri Benjamin</a>',
          ],
          photo_reference:
            "AUacShiSmqnkpBC6f5auHqr-bS6MIdQ8sQ5rqeG99zHAREc1HtwMsdQzT7QKn3aLkuMPp1geGlIF_lSd5oxLYeM0XVJDuQQwKwXfSPJNSt_KjYe6E_36pTcM9V11QximU0Q36PpoO3RU4s-vq-L_KrpZSl4hvMmOzYkFsZ6TbB1YHzRYH96g",
          width: 4160,
        },
      ],
      place_id: "ChIJMYZxCATPaRAR7ww0kadA4gI",
      plus_code: {
        compound_code: "RXMM+G9 Port Harcourt, Nigeria",
        global_code: "6FP8RXMM+G9",
      },
      rating: 5,
      reference: "ChIJMYZxCATPaRAR7ww0kadA4gI",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 1,
      vicinity: "12 Wobasi Street, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8309074,
          lng: 6.9766602,
        },
        viewport: {
          northeast: {
            lat: 4.832151430291503,
            lng: 6.978057330291503,
          },
          southwest: {
            lat: 4.829453469708499,
            lng: 6.975359369708499,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Udeinya Auto Global",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJf1Lj6vTPaRARwDhaZXIkilQ",
      plus_code: {
        compound_code: "RXJG+9M Port Harcourt, Nigeria",
        global_code: "6FP8RXJG+9M",
      },
      reference: "ChIJf1Lj6vTPaRARwDhaZXIkilQ",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "store", "establishment"],
      vicinity: "57 Agip, by Ada-George Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8354096,
          lng: 6.986206399999999,
        },
        viewport: {
          northeast: {
            lat: 4.836690630291503,
            lng: 6.987629930291503,
          },
          southwest: {
            lat: 4.833992669708499,
            lng: 6.984931969708498,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "High points auto spare shop",
      place_id: "ChIJiSnXuPfPaRARx59e4Ypfuns",
      plus_code: {
        compound_code: "RXPP+5F Port Harcourt, Nigeria",
        global_code: "6FP8RXPP+5F",
      },
      reference: "ChIJiSnXuPfPaRARx59e4Ypfuns",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "store", "establishment"],
      vicinity: "396 Ikwerre Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.835718099999999,
          lng: 6.9865911,
        },
        viewport: {
          northeast: {
            lat: 4.837026580291502,
            lng: 6.987985680291503,
          },
          southwest: {
            lat: 4.834328619708497,
            lng: 6.985287719708499,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Benji auto",
      place_id: "ChIJMUJPuY3PaRAR8BV7WfOtm8Y",
      plus_code: {
        compound_code: "RXPP+7J Port Harcourt, Nigeria",
        global_code: "6FP8RXPP+7J",
      },
      reference: "ChIJMUJPuY3PaRAR8BV7WfOtm8Y",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "store", "establishment"],
      vicinity: "461 Ikwerre Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8302279,
          lng: 6.9754248,
        },
        viewport: {
          northeast: {
            lat: 4.831600080291503,
            lng: 6.976806880291502,
          },
          southwest: {
            lat: 4.828902119708498,
            lng: 6.974108919708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Ajizeno Integrated Services",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJE6QyIkHRaRARzOw8OAIBEQc",
      plus_code: {
        compound_code: "RXJG+35 Port Harcourt, Nigeria",
        global_code: "6FP8RXJG+35",
      },
      reference: "ChIJE6QyIkHRaRARzOw8OAIBEQc",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      vicinity: "2 Ejekwu Wike Street, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8302841,
          lng: 6.976639199999999,
        },
        viewport: {
          northeast: {
            lat: 4.831559280291502,
            lng: 6.977997680291502,
          },
          southwest: {
            lat: 4.828861319708497,
            lng: 6.975299719708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Ndu Power Nig. Ltd.",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJZfOhuUXOaRARRxTuSPOCv3Q",
      plus_code: {
        compound_code: "RXJG+4M Port Harcourt, Nigeria",
        global_code: "6FP8RXJG+4M",
      },
      rating: 4.5,
      reference: "ChIJZfOhuUXOaRARRxTuSPOCv3Q",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 2,
      vicinity: "6 Ada-George Road, Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8505999,
          lng: 6.9912491,
        },
        viewport: {
          northeast: {
            lat: 4.851937980291503,
            lng: 6.992652680291502,
          },
          southwest: {
            lat: 4.849240019708498,
            lng: 6.989954719708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "G-Standard",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 539,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/102785668888358206188">G standard Top technical</a>',
          ],
          photo_reference:
            "AUacShitWngn8bMRSefhmJJmm0FDeItb8UEUk6yOaCARQleA8qajj0jmUBCyJd-7jxXrZdeRz1An3mrFnPo01VZxMbbbVOzYbUNjOHL7CY3bHuxI1vzyAK982u0QhayQ0D87rRnSKfOXr2yoBKSJ8uT-k_XEy5YwRsGvLrJHLo9v2OqnK9N6",
          width: 720,
        },
      ],
      place_id: "ChIJpTeC3BvOaRARkzNcV5IibSE",
      plus_code: {
        compound_code: "VX2R+6F Port Harcourt, Nigeria",
        global_code: "6FP8VX2R+6F",
      },
      rating: 5,
      reference: "ChIJpTeC3BvOaRARkzNcV5IibSE",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "establishment"],
      user_ratings_total: 1,
      vicinity: "Port Harcourt",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 4.8293422,
          lng: 6.9739109,
        },
        viewport: {
          northeast: {
            lat: 4.830689330291502,
            lng: 6.975208830291502,
          },
          southwest: {
            lat: 4.827991369708498,
            lng: 6.972510869708497,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
      name: "Jef Motors Internal",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJicTtd0_OaRAR8nYsr0gvlfM",
      plus_code: {
        compound_code: "RXHF+PH Port Harcourt, Nigeria",
        global_code: "6FP8RXHF+PH",
      },
      reference: "ChIJicTtd0_OaRAR8nYsr0gvlfM",
      scope: "GOOGLE",
      types: ["car_repair", "point_of_interest", "store", "establishment"],
      vicinity: "57 Iwofe Road, Porthacourt, Kwara",
    },
  ],
  status: "OK",
};

let orluGeoCoded = {
  plus_code: {
    compound_code: "Q2VX+6JQ Nkwerre, Nigeria",
    global_code: "6FQ9Q2VX+6JQ",
  },
  results: [
    {
      address_components: [
        {
          long_name: "Q2VX+6J",
          short_name: "Q2VX+6J",
          types: ["plus_code"],
        },
        {
          long_name: "Nkwerre",
          short_name: "Nkwerre",
          types: ["locality", "political"],
        },
        {
          long_name: "Nkwerre",
          short_name: "Nkwerre",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Q2VX+6J Nkwerre, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.793125,
            lng: 7.049125,
          },
          southwest: {
            lat: 5.793,
            lng: 7.048999999999999,
          },
        },
        location: {
          lat: 5.793098,
          lng: 7.0491185,
        },
        location_type: "GEOMETRIC_CENTER",
        viewport: {
          northeast: {
            lat: 5.794411480291502,
            lng: 7.050411480291503,
          },
          southwest: {
            lat: 5.791713519708498,
            lng: 7.047713519708498,
          },
        },
      },
      place_id: "GhIJjxfS4SEsF0ARqYO8HkwyHEA",
      plus_code: {
        compound_code: "Q2VX+6J Nkwerre, Nigeria",
        global_code: "6FQ9Q2VX+6J",
      },
      types: ["plus_code"],
    },
    {
      address_components: [
        {
          long_name: "Amoli Road",
          short_name: "Amoli Road",
          types: ["route"],
        },
        {
          long_name: "Orlu",
          short_name: "Orlu",
          types: ["locality", "political"],
        },
        {
          long_name: "Orlu",
          short_name: "Orlu",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "473101",
          short_name: "473101",
          types: ["postal_code"],
        },
      ],
      formatted_address: "Amoli Road, 473101, Orlu, Imo, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.7933021,
            lng: 7.049461,
          },
          southwest: {
            lat: 5.7931289,
            lng: 7.048294299999999,
          },
        },
        location: {
          lat: 5.7931884,
          lng: 7.04888,
        },
        location_type: "GEOMETRIC_CENTER",
        viewport: {
          northeast: {
            lat: 5.794564480291503,
            lng: 7.050226630291502,
          },
          southwest: {
            lat: 5.791866519708498,
            lng: 7.047528669708497,
          },
        },
      },
      place_id: "ChIJhXMMmgqpQxARJEsLViHqW6s",
      types: ["route"],
    },
    {
      address_components: [
        {
          long_name: "Q2RX+P4",
          short_name: "Q2RX+P4",
          types: ["plus_code"],
        },
        {
          long_name: "Nkwerre",
          short_name: "Nkwerre",
          types: ["locality", "political"],
        },
        {
          long_name: "Orlu",
          short_name: "Orlu",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
        {
          long_name: "473101",
          short_name: "473101",
          types: ["postal_code"],
        },
      ],
      formatted_address: "Q2RX+P4, 473101, Nkwerre, Imo, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.7919635,
            lng: 7.047988999999999,
          },
          southwest: {
            lat: 5.791671699999999,
            lng: 7.0477967,
          },
        },
        location: {
          lat: 5.7918171,
          lng: 7.047890799999999,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 5.793166580291502,
            lng: 7.049241830291503,
          },
          southwest: {
            lat: 5.790468619708498,
            lng: 7.046543869708498,
          },
        },
      },
      place_id: "ChIJ-wKUzQqpQxARQWxC0uh0tZA",
      types: ["premise"],
    },
    {
      address_components: [
        {
          long_name: "473101",
          short_name: "473101",
          types: ["postal_code"],
        },
        {
          long_name: "Orlu",
          short_name: "Orlu",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "473101, Imo, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.801791,
            lng: 7.080979999999999,
          },
          southwest: {
            lat: 5.754879,
            lng: 7.0315611,
          },
        },
        location: {
          lat: 5.7862657,
          lng: 7.0552218,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 5.801791,
            lng: 7.080979999999999,
          },
          southwest: {
            lat: 5.754879,
            lng: 7.0315611,
          },
        },
      },
      place_id: "ChIJPwzyYYSpQxARKwuFQLUYb9Q",
      types: ["postal_code"],
    },
    {
      address_components: [
        {
          long_name: "Orlu/Mgbee/Orlu Govt. Station",
          short_name: "Orlu/Mgbee/Orlu Govt. Station",
          types: ["administrative_area_level_3", "political"],
        },
        {
          long_name: "Orlu",
          short_name: "Orlu",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Orlu/Mgbee/Orlu Govt. Station, Imo, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.822593899999999,
            lng: 7.0768906,
          },
          southwest: {
            lat: 5.775379399999999,
            lng: 7.0323154,
          },
        },
        location: {
          lat: 5.80721,
          lng: 7.0552218,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 5.822593899999999,
            lng: 7.0768906,
          },
          southwest: {
            lat: 5.775379399999999,
            lng: 7.0323154,
          },
        },
      },
      place_id: "ChIJOwbvhaapQxARjmWxJeLLS3Y",
      types: ["administrative_area_level_3", "political"],
    },
    {
      address_components: [
        {
          long_name: "Nkwerre",
          short_name: "Nkwerre",
          types: ["locality", "political"],
        },
        {
          long_name: "Nkwerre",
          short_name: "Nkwerre",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Nkwerre, Imo, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.899369000000001,
            lng: 7.1211521,
          },
          southwest: {
            lat: 5.733561,
            lng: 6.8766019,
          },
        },
        location: {
          lat: 5.7647948,
          lng: 7.0982581,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 5.899369000000001,
            lng: 7.1211521,
          },
          southwest: {
            lat: 5.733561,
            lng: 6.8766019,
          },
        },
      },
      place_id: "ChIJRyxxxbgAQxARarbzhuiPyt0",
      types: ["locality", "political"],
    },
    {
      address_components: [
        {
          long_name: "Orlu",
          short_name: "Orlu",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Orlu, Imo, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.895818299999999,
            lng: 7.1091128,
          },
          southwest: {
            lat: 5.7407848,
            lng: 6.9777673,
          },
        },
        location: {
          lat: 5.791834499999999,
          lng: 7.0283383,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 5.895818299999999,
            lng: 7.1091128,
          },
          southwest: {
            lat: 5.7407848,
            lng: 6.9777673,
          },
        },
      },
      place_id: "ChIJ8ajW8_uoQxARfGSvDkiW-aA",
      types: ["administrative_area_level_2", "political"],
    },
    {
      address_components: [
        {
          long_name: "Imo",
          short_name: "IM",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Imo, Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 5.938930999999999,
            lng: 7.4322861,
          },
          southwest: {
            lat: 5.194552,
            lng: 6.63908,
          },
        },
        location: {
          lat: 5.5720122,
          lng: 7.0588219,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 5.938930999999999,
            lng: 7.4322861,
          },
          southwest: {
            lat: 5.194552,
            lng: 6.63908,
          },
        },
      },
      place_id: "ChIJ_ylxZRmOQhAR2VN1FpalMZQ",
      types: ["administrative_area_level_1", "political"],
    },
    {
      address_components: [
        {
          long_name: "Nigeria",
          short_name: "NG",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Nigeria",
      geometry: {
        bounds: {
          northeast: {
            lat: 13.8856449,
            lng: 14.677982,
          },
          southwest: {
            lat: 4.1821001,
            lng: 2.676932,
          },
        },
        location: {
          lat: 9.081999,
          lng: 8.675276999999999,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 13.8856449,
            lng: 14.677982,
          },
          southwest: {
            lat: 4.1821001,
            lng: 2.676932,
          },
        },
      },
      place_id: "ChIJDY2kfa8LThARyAvFaEH-qJk",
      types: ["country", "political"],
    },
  ],
  status: "OK",
};

("use strict");

function initMap() {
  const myLatLng = {
    lat: 6.466987133026123,
    lng: 3.2745020389556885,
  };
  const map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: 14,
    center: myLatLng,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "My location",
  });
}
