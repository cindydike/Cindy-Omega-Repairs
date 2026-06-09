/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
// const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { setGlobalOptions } = require("firebase-functions/v2");
const { onSchedule } = require("firebase-functions/v2/scheduler");
// const { Timestamp } = require("firebase/firestore");
const app = admin.initializeApp();
const db = admin.firestore(app);

setGlobalOptions({ maxInstances: 10, memory: "2GiB" });

// exports.tpp = onRequest(async (req, res) => {
//   const G_EMAIL = "dikewendelyn2002";
//   const G_PASSWORD = "odaafuiqimidzdpb";
//   const TEST_EMAIL = ["yutangperry@gmail.com", "clayjenson496@gmail.com"];

//   // initialize nodemailer
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: `${G_EMAIL}@gmail.com`,
//       pass: G_PASSWORD,
//     },
//   });

//   const options = [
//     "--allow-running-insecure-content",
//     "--autoplay-policy=user-gesture-required",
//     "--disable-component-update",
//     "--disable-domain-reliability",
//     "--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process",
//     "--disable-print-preview",
//     "--no-sandbox",
//     "--disable-setuid-sandbox",
//     "--disable-setuid-sandbox",
//     "--disable-site-isolation-trials",
//     "--disable-speech-api",
//     "--disable-web-security",
//     "--disk-cache-size=33554432",
//     "--enable-features=SharedArrayBuffer",
//     "--hide-scrollbars",
//     "--ignore-gpu-blocklist",
//     "--in-process-gpu",
//     "--mute-audio",
//     "--no-default-browser-check",
//     "--no-pings",
//     "--no-sandbox",
//     "--no-zygote",
//     "--use-gl=swiftshader",
//     "--window-size=1920,1080",
//   ];

//   async function tpp() {
//     const snapShots = await db.collection("tpp").get();
//     if (!snapShots.empty) {
//       let links = [];
//       snapShots.forEach((i) => links.push({ id: i.id, ...i.data() }));
//       const goodLinks = links.filter((i) => i.status !== false);
//       if (goodLinks.length > 0) {
//         const browser = await puppeteer.launch({
//           args: options,
//           headless: "new",
//         });
//         for (const [index, el] of goodLinks.entries()) {
//           logger.log(el);
//           const context = await browser.createIncognitoBrowserContext();
//           const page = await context.newPage();
//           if (el.link.includes("selfserve")) {
//             await Promise.all([
//               await page.goto(el.link, { waitUntil: "domcontentloaded" }),
//               // await page.waitForNavigation({ timeout: 5000 }),
//             ]);
//           } else {
//             await Promise.all([
//               await page.goto(el.link, { waitUntil: "domcontentloaded" }),
//               await page.waitForNavigation(),
//             ]);
//           }
//           const success = await page.$eval("body", (el) => {
//             let content = el.textContent;
//             let success;
//             if (
//               content.includes(
//                 "We're sorry, but this survey has a geographic requirement."
//               )
//             ) {
//               success = {
//                 reason:
//                   "We're sorry, but this survey has a geographic requirement.",
//                 pass: false,
//               };
//               return success;
//             } else if (
//               content.includes(
//                 "Unfortunately, you do not qualify for our survey. Thank you for your time and interest."
//               )
//             ) {
//               success = {
//                 reason:
//                   "Unfortunately, you do not qualify for our survey. Thank you for your time and interest.",
//                 pass: false,
//               };
//               return success;
//             } else if (
//               content.includes(
//                 "We appreciate your interest, but unfortunately this survey is now closed."
//               )
//             ) {
//               success = {
//                 reason: "Closed",
//                 pass: false,
//               };
//               return success;
//             } else if (el.querySelector("div.survey-error")) {
//               const reason = el.querySelector(".survey-error-text").textContent;
//               success = {
//                 error: reason ? reason : "An error occurred",
//                 reason: "Closed",
//                 pass: false,
//               };
//               return success;
//             } else if (el.querySelector("div.exit-message")) {
//               const reason = el.querySelector(".exit-message-text").textContent;
//               success = {
//                 error: reason
//                   ? reason
//                   : "Unfortunately, you do not qualify for our survey. Thank you for your time.",
//                 reason: "Closed",
//                 pass: false,
//               };
//               return success;
//             } else if (el.querySelector("#btn_continue")) {
//               success = { pass: true };
//               return success;
//             } else {
//               success = { pass: true };
//               return success;
//             }
//           });
//           await page.close();
//           logger.log(success);
//           if (success.pass) {
//             logger.log("Sending PASS Notification Email");
//             await db.collection("tpp").doc(el.id).update({ status: true });
//             const mailOptions = {
//               from: `"TPP Notification" <${G_EMAIL}@gmail.com>`, // sender address
//               to: TEST_EMAIL, // list of receivers
//               subject: "Success, It's Going",
//               text: `Let's go!!!!:
//             Type: ${el.type}
//             Link: ${el.link}`,
//             };
//             transporter.sendMail(mailOptions, function (error, info) {
//               if (error) {
//                 logger.log(error);
//               }
//               logger.log("Message sent: " + info);
//             });
//           } else if (success.reason.toLowerCase() == "closed") {
//             await db.collection("tpp").doc(el.id).update({ status: false });
//           } else {
//             if (el.status !== true) {
//               await db.collection("tpp").doc(el.id).update({ status: true });
//             }
//             logger.log(
//               `Failed, Did not send notification mail for ${el.type}(${
//                 index + 1
//               }) because ${success.reason}`
//             );
//           }
//         }
//         await browser.close();
//       } else {
//         return res.json({ status: 200, message: "All Links Are Closed" });
//       }
//     } else {
//       return res.json({ status: 200, message: "No Data Available" });
//     }
//     return res.json({ status: 200, message: "ok" });
//   }

//   tpp();
// });

exports.tpp = onSchedule("*/1 * * * *", async () => {
  const G_EMAIL = "dikewendelyn2002";
  const G_PASSWORD = "odaafuiqimidzdpb";
  const TEST_EMAIL = [
    "yutangperry@gmail.com",
    "clayjenson496@gmail.com",
    "aurorawestwood1@gmail.com",
  ];

  // initialize nodemailer
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${G_EMAIL}@gmail.com`,
      pass: G_PASSWORD,
    },
  });

  const delay = (ms) => {
    return new Promise((res) => {
      setTimeout(() => res(), ms);
    });
  };
  const time = admin.firestore.FieldValue.serverTimestamp();
  logger.log("Calling TPP function");
  async function tpp() {
    const snapShots = await db.collection("tpp").get();
    if (!snapShots.empty) {
      let links = [];
      snapShots.forEach((i) => links.push({ id: i.id, ...i.data() }));
      const goodLinks = links.filter((i) => i.status !== false);
      if (goodLinks.length > 0) {
        const options = [
          "--allow-running-insecure-content",
          "--autoplay-policy=user-gesture-required",
          "--disable-component-update",
          "--disable-domain-reliability",
          "--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process",
          "--disable-print-preview",
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-setuid-sandbox",
          "--disable-site-isolation-trials",
          "--disable-speech-api",
          "--disable-web-security",
          "--disk-cache-size=33554432",
          "--enable-features=SharedArrayBuffer",
          "--hide-scrollbars",
          "--ignore-gpu-blocklist",
          "--in-process-gpu",
          "--mute-audio",
          "--no-default-browser-check",
          "--no-pings",
          "--no-sandbox",
          "--no-zygote",
          "--use-gl=swiftshader",
          "--window-size=1920,1080",
        ];
        const browser = await puppeteer.launch({
          args: options,
          headless: "new",
        });
        for (const [index, el] of goodLinks.entries()) {
          logger.log(el);
          const context = await browser.createIncognitoBrowserContext();
          const page = await context.newPage();
          if (el.link.includes("selfserve")) {
            await Promise.all([
              await page.goto(el.link, { waitUntil: "domcontentloaded" }),
              // await page.waitForNavigation({ timeout: 5000 }),
            ]);
          } else {
            await Promise.all([
              await page.goto(el.link, { waitUntil: "domcontentloaded" }),
              await page.waitForNavigation(),
            ]);
          }
          const success = await page.$eval("body", (el) => {
            let content = el.textContent;
            let success;
            if (
              content.includes(
                "We're sorry, but this survey has a geographic requirement."
              )
            ) {
              success = {
                reason:
                  "We're sorry, but this survey has a geographic requirement.",
                pass: false,
              };
              return success;
            } else if (
              content.includes(
                "Unfortunately, you do not qualify for our survey. Thank you for your time and interest."
              )
            ) {
              success = {
                reason:
                  "Unfortunately, you do not qualify for our survey. Thank you for your time and interest.",
                pass: false,
              };
              return success;
            } else if (
              content.includes(
                "We appreciate your interest, but unfortunately this survey is now closed."
              )
            ) {
              success = {
                reason: "Closed",
                pass: false,
              };
              return success;
            } else if (el.querySelector("div.survey-error")) {
              const reason = el.querySelector(".survey-error-text").textContent;
              success = {
                error: reason ? reason : "An error occurred",
                reason: "Closed",
                pass: false,
              };
              return success;
            } else if (el.querySelector("div.exit-message")) {
              const reason = el.querySelector(".exit-message-text").textContent;
              success = {
                error: reason
                  ? reason
                  : "Unfortunately, you do not qualify for our survey. Thank you for your time.",
                reason: "Closed",
                pass: false,
              };
              return success;
            } else if (el.querySelector("#btn_continue")) {
              success = { pass: true };
              return success;
            } else {
              success = { pass: true };
              return success;
            }
          });
          await page.close();
          logger.log(success);
          if (success.pass) {
            logger.log("Sending PASS Notification Email");
            // await db.collection("tpp").doc(el.id).update({
            //   status: true,
            //   lastModified: admin.firestore.FieldValue.serverTimestamp(),
            // });
            await db.collection("tpp").doc(el.id).set(
              {
                status: true,
              },
              { merge: true }
            );
            const mailOptions = {
              from: `"TPP Notification" <${G_EMAIL}@gmail.com>`, // sender address
              to: TEST_EMAIL, // list of receivers
              subject: "Success, It's Going",
              text: `Let's go!!!!:
            Type: ${el.type}
            Link: ${el.link}`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                logger.log(error);
              }
              logger.log("Message sent: " + info);
            });
          } else if (success.reason.toLowerCase() == "closed") {
            // await db.collection("tpp").doc(el.id).update({
            //   status: false,
            //   lastModified: admin.firestore.FieldValue.serverTimestamp(),
            // });
            await db.collection("tpp").doc(el.id).set(
              {
                status: false,
              },
              { merge: true }
            );
          } else {
            if (el.status !== true) {
              // await db.collection("tpp").doc(el.id).update({
              //   status: true,
              //   lastModified: admin.firestore.FieldValue.serverTimestamp(),
              // });
              await db.collection("tpp").doc(el.id).set(
                {
                  status: true,
                },
                { merge: true }
              );
            }
            logger.log(
              `Failed, Did not send notification mail for ${el.type}(${
                index + 1
              }) because ${success.reason}`
            );
          }
          logger.log("Updating Data");
          const writeTime = await db.collection("tpp").doc(el.id).set(
            {
              lastModified: time,
            },
            { merge: true }
          );
          logger.log(writeTime);
        }
        await browser.close();
      } else {
        return logger.log({ status: 200, message: "All Links Are Closed" });
      }
    } else {
      return logger.log({ status: 200, message: "No Data Available" });
    }
    await delay(5000);
  }

  await tpp();
  return logger.log({ status: 200, message: "Done" });
});

// Continue Button => "input#btn_continue[name="continue"]"

// ###############

// Checkbox Label => "span.cell-text.cell-sub-column > label[for]"
// COntinue Button => "input#btn_continue[name="continue"]"

// #############

// Find All li tags => "ul li"
// Find li tag with "movie" => "list.filter(li => li.textContent.toLowerCase().includes("movie"))"
// CLick Continue => "input#btn_continue[name="continue"]"

// #####################

// Find All li tags => "ul li"
// Find li tag with "movie" => "list.filter(li => li.textContent.toLowerCase().includes("movie"))"
// Click Continue => "input#btn_continue[name="continue"]"

// #####################

// Find All li tags => "ul li"
// Click among only the first 4 li tags
// Click Continue => "input#btn_continue[name="continue"]"

// ####################

// Check for exit message => "div.exit-message"
