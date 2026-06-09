// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require("puppeteer-extra");
const { KnownDevices } = require("puppeteer");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const {
  portHarcourt,
  lagos,
  enugu,
  uyo,
  owerri,
  ibadan,
  abuja,
} = require("./cityLinks");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });

// function randomIntFromInterval(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// let query = "car repair shops in lagos";

// ----- Selector For All repairshops Divs in "repair shops near me search" ----- //
// let divs = Array.from(document.querySelectorAll("div.RiQjue.ykYNg div[data-profile-url-path]"))

const getHeaders = async (handle, page) => {
  try {
    if (handle) {
      let header = await page.evaluate((el) => {
        let obj = {};
        let title = el.querySelector("div.rgnuSb.a9NfBd")?.textContent;
        let rating = el.querySelector("div.rGaJuf")?.textContent;
        let experience = el.querySelector("div.FjZRNe")?.textContent;
        let isOpen = el.querySelector("span.D08OUb")?.textContent;
        obj.title = title ? title : "N/A";
        obj.rating = rating ? rating : "N/A";
        obj.experience = experience ? experience : "N/A";
        obj.isOpen = isOpen ? isOpen : "N/A";
        return obj;
      }, handle);
      return header;
    } else {
      let obj = {
        title: "N/A",
        rating: "N/A",
        experience: "N/A",
        isOpen: "N/A",
      };
      return obj;
    }
  } catch (err) {
    let obj = {
      title: "N/A",
      rating: "N/A",
      experience: "N/A",
      isOpen: "N/A",
    };
    return obj;
  }
};

const handleImages = async (handle, page) => {
  try {
    if (handle) {
      const imagesArr = await page.$$eval("g-img > img", (options) => {
        return options.map((option) =>
          option.dataset.src ? option.dataset.src : option.src
        );
      });
      return imagesArr;
    }
    return "N/A";
  } catch (err) {
    return "N/A";
  }
};

const getDescription = async (handle, page) => {
  try {
    if (handle) {
      const description = await page.evaluate((el) => {
        el.click();
        let descriptionText = el.innerText;
        let description = descriptionText?.substring(
          1,
          descriptionText?.length - 1
        );
        return description;
      }, handle);
      return description;
    }
    return "N/A";
  } catch (err) {
    return "N/A";
  }
};

const getLocation = async (handle, page) => {
  try {
    if (handle) {
      const location = await page.evaluate(
        (el) => el.querySelector("div.fccl3c span")?.textContent,
        handle
      );
      return location;
    }
    return "N/A";
  } catch (err) {
    return "N/A";
  }
};

// let servicesList = [
//   "A/C Installation And Repair",
//   "Air And Cabin Filter Replacement",
//   "Air Conditioning",
//   "Auto Detailing",
//   "Auto Glass Repair",
//   "Battery",
//   "Body And Trim",
//   "Brakes",
//   "Car Checks",
//   "Car Waxing",
//   "Carburetor Cleaning",
//   "Computer Diagnostic",
//   "Electrical",
//   "Engine Overhaul",
//   "Engine Repair",
//   "Exhaust",
//   "Fuel System",
//   "General Repairs And Maintenance",
//   "Home Services",
//   "Oil Change",
//   "Painting",
//   "Preventative Maintenance",
//   "Steering And Suspension Repair",
//   "Suspension Repair",
//   "Tow Truck",
//   "Transmission",
//   "Tyres",
//   "Tyre Changing",
//   "Tyre Rotations",
//   "Tyre Replacement",
//   "Auto Engine Diagnostic",
//   "Auto Engine Tuning",
//   "Auto Inspection",
//   "Auto Interior Vacuuming",
//   "Auto Maintenance",
//   "Wheel Alignment",
// ];

// let servicesList = [
//   "Air And Cabin Filter Replacement",
//   "Air Conditioning",
//   "Auto Detailing",
//   "Auto Glass Repair",
//   "Battery",
//   "Body And Trim",
//   "Brakes",
//   "Car Checks",
//   "Car Waxing",
//   "Carburetor Cleaning",
//   "Computer Diagnostic",
//   "Electrical",
//   "Engine Overhaul",
//   "Engine Repair",
//   "Exhaust",
//   "Fuel System",
//   "General Repairs And Maintenance",
//   "Home Services",
//   "Oil Change",
//   "Painting",
//   "Preventative Maintenance",
//   "Steering And Suspension Repair",
//   "Suspension Repair",
//   "Tow Truck",
//   "Transmission",
//   "Tyres",
//   "Tyre Changing",
//   "Tyre Rotations",
//   "Tyre Replacement",
//   "Auto Engine Diagnostic",
//   "Auto Engine Tuning",
//   "Auto Inspection",
//   "Auto Interior Vacuuming",
//   "Auto Maintenance",
//   "Wheel Alignment",
// ];

let similarServices = {
  "Air And Cabin Filter Replacement": [],
  "Air Conditioning": ["A/C"],
  "Auto Detailing": [],
  "Auto Glass Repair": ["Glass", "Windscreen"],
  "Auto Inspection": ["Vehicle Inspection", "Car Inspection", "Car Check"],
  "Auto Interior Vacuuming": ["Vacuuming"],
  "Auto Maintenance": ["Car Maintenance"],
  "Battery": [],
  "Body And Trim": ["Body", "Trim"],
  "Brakes": ["Brake"],
  "Car Waxing": ["Waxing"],
  "Carburetor Cleaning": ["Carburetor"],
  "Computer Diagnostic": ["Computer"],
  "Electrical": [],
  "Engine Overhaul": [],
  "Engine Diagnostic": ["Engine Inspection"],
  "Engine Repair": [],
  "Engine Tuning": [],
  "Exhaust": [],
  "Fuel System": ["Fuel"],
  "General Repairs And Maintenance": ["General Repairs", "General Maintenance"],
  "Home Services": ["Home"],
  "Oil Change": ["Oil"],
  "Painting": [],
  "Preventive Maintenance": ["Preventive"],
  "Steering Repair": ["Steering"],
  "Suspension Repair": ["Suspension"],
  "Tow Truck": [],
  "Transmission": [],
  "Tyres": ["Tyre", "Tire"],
  "Wheel Alignment": ["Wheels", "Wheel"],
};

const getServices = async (handle, page) => {
  try {
    if (handle) {
      let obj = {};
      let services = await page.evaluate(
        (el) =>
          el.textContent
            .replace("Services: ", "")
            .replaceAll(", ", ",")
            .replaceAll("&", "and")
            .split(","),
        handle
      );
      Object.keys(similarServices).forEach((service) => {
        obj[service] = false;
      });
      services.forEach((service) => {
        for (const [key, value] of Object.entries(similarServices)) {
          if (!obj[key]) {
            if (service.toLowerCase().indexOf(key.toLowerCase()) != -1) {
              obj[key] = true;
            } else {
              for (let i = 0; i < value.length && !obj[key]; i++) {
                if (
                  service.toLowerCase().indexOf(value[i].toLowerCase()) != -1
                ) {
                  obj[key] = true;
                }
              }
            }
          }
        }
      });

      return obj;
    }
    return "N/A";
  } catch (err) {
    return "N/A";
  }
};

const getWebsite = async (handle, page) => {
  try {
    if (handle) {
      let website = await page.evaluate((el) => el.textContent, handle);
      return website;
    }
    return "N/A";
  } catch (err) {
    return "N/A";
  }
};

const getPhone = async (handle, page) => {
  try {
    if (handle) {
      let phone = page.evaluate(
        (el) => el.textContent.replaceAll(" ", ""),
        handle
      );
      return phone;
    }
    return "N/A";
  } catch (err) {
    return "N/A";
  }
};

const getTimes = async (handle, page) => {
  try {
    if (handle) {
      let times = await page.evaluate((el) => {
        let times = {};
        el.click();
        let div = document.querySelector("div.aNF4pc");
        let arr = Array.from(div?.querySelectorAll("table tr"));
        arr.forEach((a) => {
          let first = a.firstElementChild?.textContent;
          let last = a.lastElementChild?.textContent;
          let formattedFirst = first
            .toLowerCase()
            .replace("(independence day)", "")
            .replace("(mawlid)", "");
          let formattedLast = last
            .replace("Holiday hours", "")
            .replace("Hours might differ", "");
          times[formattedFirst.toLowerCase()] = formattedLast;
          if (formattedFirst.toLowerCase() == "monday") {
            let index = formattedLast?.indexOf("\u2013");
            times.open = formattedLast?.slice(0, index);
          }
        });
        return times;
      }, handle);
      return times;
    }
    return "N/A";
  } catch (err) {
    return "N/A";
  }
};

// function delay(time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }

// const handleUpdate = async (link, repairShop) => {
//   console.log("Started Uploading Single Data");
//   let state;
//   const town = link.split("+").pop().toLowerCase();
//   if (
//     town == "gwarinpa" ||
//     town == "ankuru" ||
//     town == "jahi" ||
//     town == "ndawuse" ||
//     town == "abuja"
//   ) {
//     state = "abuja";
//   } else {
//     return;
//   }
//   repairShop.town = town;
//   const URL = `http://localhost:3000`;
//   try {
//     await axios.post(`${URL}/${state}`, repairShop);
//   } catch (err) {
//     console.log(err.message);
//   }
//   await delay(1500);
//   console.log("Finished Uploading Single Data");
// };

const handleUpload = async (link, repairShops) => {
  console.log("Started Uploading All Data");

  repairShops.forEach((i) => (i.city = link));
  const URL = `http://localhost:3060`;
  try {
    await axios.post(`${URL}/${link}`, repairShops);
    console.log("Finished Uploading All Data");
  } catch (err) {
    console.log(err.message);
  }
};

// getResponse();
// That's it, the rest is puppeteer usage as normal 😊

puppeteer.launch({ headless: true }).then(async (browser) => {
  console.log("Browser Launched");

  const cities = {
    portHarcourt,
    lagos,
    enugu,
    owerri,
    ibadan,
    uyo,
    abuja,
  };

  let repairShops = [];

  for (const [key, arr] of Object.entries(cities)) {
    console.log(`Started Scrapping ${key}`);
    for (const [index, value] of arr.entries()) {
      console.log(`\n Started ${index + 1}/${arr.length} in ${key}`);
      let repairShop = {};
      repairShop.id = uuidv4();
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(0);
      page.setDefaultTimeout(0);

      await page.setViewport({ width: 800, height: 600 });
      const ipadMini = KnownDevices["iPad Mini"];
      await page.emulate(ipadMini);

      //   console.log(`Testing adblocker plugin..`);
      await page.goto(`https://www.google.com${value}`, {
        waitUntil: "networkidle0",
      });
      await page.waitForTimeout(1000);

      let timeEl = await page.$("span.A5yTVb");
      const times = await getTimes(timeEl, page);
      repairShop.times = times;

      let phoneEl = await page.$("div.eigqqc");
      const phone = await getPhone(phoneEl, page);
      repairShop.phone = phone;

      let websiteEl = await page.$("div.Gx8NHe");
      const website = await getWebsite(websiteEl, page);
      repairShop.website = website;

      let servicesEl = await page.$("div.AQrsxc");
      const services = await getServices(servicesEl, page);
      repairShop.services = services;

      let locationEl = await page.$("div.SROCu.SxXpEc");
      const location = await getLocation(locationEl, page);
      repairShop.location = location;

      let descriptionEl = await page.$("div.SROCu.FwaXnd div.D7no9e");
      const description = await getDescription(descriptionEl, page);
      repairShop.description = description;

      let headersEl = await page.$("div.gZYgab");
      const headers = await getHeaders(headersEl, page);
      repairShop.headers = headers;

      let imagesEl = await page.$("g-img > img");
      const images = await handleImages(imagesEl, page);
      repairShop.images = images;
      const isThere = repairShops.find(
        (i) =>
          i.headers.title.toLowerCase() ==
            repairShop.headers.title.toLowerCase() &&
          i.location.toLowerCase() == repairShop.location.toLowerCase()
      );
      const isValid = repairShop.headers.rating != "N/A";
      if (!isThere && isValid) {
        repairShops.push(repairShop);
      }

      // console.log(repairShop);
      await page.close();
    }
    console.log(`Finished Scrapping ${key}`);
    // console.log(repairShops);
    console.log("RepairShops Array Length:", repairShops.length);
    await handleUpload(key, repairShops);
    console.log(`\nDone Uploading For ${key}\n`);
    repairShops = [];
  }

  await browser.close();
  console.log("SCRAPPING AND UPLOADING COMPLETE");
});

// axios.post("http://localhost:3000/locations");
