const functions = require('firebase-functions');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions

const qr = require('qr-image');
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

/* Express with CORS & automatic trailing '/' solution */
// const app = express();
// app.use(cors({origin: true}));
// app.use(express.urlencoded());
// app.use(express.json());      // if needed

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.

    var addDoc = db
        .collection("visits")
        .add({
            name: displayName,
            email: email

        }).then(ref => {
            console.log("Added document with ID: ", ref.id);
        });

});
//
// exports.sendMail = functions.https.onRequest((req, res) => {
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'thesuesanz00@gmail.com',
//             pass: ''
//         }
//     });
//     cors(req, res, () => {
//
//         // getting dest email by query string
//         // const dest = req.query.dest;
//
//         const mailOptions = {
//             from: 'Your Account Name <thesuesanz00@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
//             to: "yadavsourav24071998@gmail.com",
//             subject: 'I\'M A PICKLE!!!', // email subject
//             html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
//                 <br />
// <!--                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />-->
//             ` // email content in HTML
//         };
//
//         // returning result
//         return transporter.sendMail(mailOptions, (erro, info) => {
//             if (erro) {
//                 return res.send(erro.toString());
//             }
//             return res.send('Sended');
//         });
//     });
// });

exports.sendqr = functions.https.onRequest(async (req, res) => {
    db.collection('tokens')
        .add({
            email: req.query.email

        }).then(ref => {
        res.json({result: `Message with ID: ${ref.id} added.`})
        console.log("Added document with ID: ", ref.id);
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
})
exports.genqr = functions.https.onRequest((req, res) => {

    res.set("Access-Control-Allow-Origin", "*");

    if (req.method === "OPTIONS") {
        // Send response to OPTIONS requests
        res.set("Access-Control-Allow-Methods", "GET");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
    }
        else{
            db.collection("tokens").where('email', '==', req.body.email).get().then((snapshot)=>{
                for (let i = 0; i < snapshot.size; i++) {
                    const data = snapshot.docs[i].id;
                    res.send(data)
                }
            })
        }

})
// exports.send = functions.https.onRequest((req, res) => {
//     if (req.method === 'POST') {
//         sgMail.setApiKey("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");
//         console.log(req.body.email)
//             const msg = {
//                 to: req.body.email,
//                 from: 'yadavsourav24071998@gmail.com',
//                 subject: 'Appointment for Meeting',
//                 text: '',
//                 html: `Hello ${req.body.name} <br> Do you accept the appointment? If yes, <a href="#"> Yes</a> <br> If no, <a href="#">No</a>`,
//             };
//             sgMail.send(msg);
//         return res.status(200).send('success!');
//     }
// });


// app.post("/send", (request, response) => {
//
//     var addDoc = db
//         .collection("visits")
//         .add({
//             name: request.body.name,
//             email: request.body.email
//
//         })
//         .then(ref => {
//             sgMail.setApiKey("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");
//             const msg = {
//                 to: request.body.email,
//                 from: 'yadavsourav24071998@gmail.com',
//                 subject: 'Sending with Twilio SendGrid is Fun',
//                 text: 'and easy to do anywhere, even with Node.js',
//                 html: `Hello ${name} <a href="#">Link test</a><strong>and easy to do anywhere, even with Node.js</strong>`,
//             };
//             sgMail.send(msg);
//
//             console.log("Added document with ID: ", ref.id);
//         });
//     response.send("Request body");
// });
//
// // not as clean, but a better endpoint to consume
// const send = functions.https.onRequest((request, response) => {
//     if (!request.path) {
//         request.url = `/${request.url}`; // prepend '/' to keep query params if any
//     }
//     return app(request, response);
// });
//
//
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Add a new document with a generated id.
//     db.collection("visits").add({
//         name: req.query.name,
//         isApproved: false,
//
//
//     })
//         .then(function (docRef) {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch(function (error) {
//             console.error("Error adding document: ", error);
//         });


// });

// module.exports = {
//     send
// }