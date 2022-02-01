const axios = require('axios');


const facebookVerify = async ( idToken = '' ) =>{
    try {
        const resp = await axios.get('https://graph.facebook.com/debug_token', { 
            params: {
                input_token : idToken,
                access_token: process.env.FACEBOOK_CLIENT_ID + '|' + process.env.FACEBOOK_SECRET_ID
            }
        });
        const { app_id, is_valid, application } = resp.data.data;
        return { app_id, is_valid, application };
    }
    catch(err){
        return console.error(err);
    }
}


module.exports = {
    facebookVerify
}