// const {OAuth2Client} = require('google-auth-library');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleVerify = async ( idToken = '' ) => {

//     const ticket = await client.verifyIdToken({
//         idToken,
//         audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const {name, email, picture: img} = ticket.getPayload();
//     return {name, email};

// }

const axios = require('axios');

const googleVerify = async (idToken) => {

    try {
        const resp = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);

        const { aud, name, email } = resp.data;
        return { aud, name, email };

    } catch (err) {
        return console.error(err);
    }
}

// https://developers.google.com/identity/sign-in/web/backend-auth

// axios to --> https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123

module.exports = {
    googleVerify
}