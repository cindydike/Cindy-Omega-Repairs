export const locations = [
  {
    "name": "Abuja",
    "collectionName": "abuja",
  },
  {
    "name": "Enugu",
    "collectionName": "enugu",
  },
  {
    "name": "Ibadan",
    "collectionName": "ibadan",
  },
  {
    "name": "Lagos",
    "collectionName": "lagos",
  },
  {
    "name": "Owerri",
    "collectionName": "owerri",
  },
  {
    "name": "Port-Harcourt",
    "collectionName": "portHarcourt",
  },
  {
    "name": "Uyo",
    "collectionName": "uyo",
  },
];

export const services = [
  "Air And Cabin Filter Replacement",
  "Air Conditioning",
  "Auto Detailing",
  "Auto Glass Repair",
  "Auto Inspection",
  "Auto Interior Vacuuming",
  "Auto Maintenance",
  "Battery",
  "Body And Trim",
  "Brakes",
  "Car Waxing",
  "Carburetor Cleaning",
  "Computer Diagnostic",
  "Electrical",
  "Engine Overhaul",
  "Engine Diagnostic",
  "Engine Repair",
  "Engine Tuning",
  "Exhaust",
  "Fuel System",
  "General Repairs And Maintenance",
  "Home Services",
  "Oil Change",
  "Painting",
  "Preventive Maintenance",
  "Steering Repair",
  "Suspension Repair",
  "Tow Truck",
  "Transmission",
  "Tyres",
  "Wheel Alignment",
];

export const capitalizeFirstLetter = (str) => {
  let lowercaseStr = str.toLowerCase();
  return lowercaseStr[0]?.toUpperCase() + lowercaseStr?.slice(1);
};
