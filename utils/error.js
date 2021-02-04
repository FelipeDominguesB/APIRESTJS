module.exports = {
    send: (error, request, response, code = 400) =>{

        console.log(`error: ${error}`);
                response.status(400).json(
                    {
                        error
                    });
    }
};