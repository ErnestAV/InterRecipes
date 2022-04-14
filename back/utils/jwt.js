const parseJwt =  (token) => {
    try {
        if (!token) {
            throw new Error('parseJwt# Token is required.');
        }

        const base64Payload = token.split('.')[1];
        let payload = new Uint8Array();

        try {
            payload = Buffer.from(base64Payload, 'base64');
        } catch (err) {
            throw new Error(`parseJwt# Malformed token: ${err}`);
        }

        return {
            decodedToken: JSON.parse(payload),
        };
    } catch (err) {
        console.log(`Bonus logging: ${err}`);

        return {
            error: 'Unable to decode token.',
        };
    }
};
module.exports = parseJwt