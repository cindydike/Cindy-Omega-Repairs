var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccount.json");
const dataToUpload = require("./cindyData2.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(app);

const uploadAllData = async () => {
  for (const [key, value] of Object.entries(dataToUpload)) {
    console.log(`\nStarted Uploading For ${key}\n`);
    for (const [index, el] of value.entries()) {
      await db
        .collection(key)
        .doc(el.id)
        .set({
          ...el,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(
          () =>
            console.log(
              `${index + 1}/${
                value.length
              } in ${key.toUpperCase()} Uploaded Successfully`
            ),
          (err) => console.log("an Error Occurred:", err)
        );
    }
    console.log(`\nFinished Uploading For ${key}\n`);
  }
};

uploadAllData();
