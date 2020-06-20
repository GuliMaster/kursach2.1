module.exports = {
    info: {
        // API informations (required)
        title: 'ELECTRONIC QUEUE', // Title (required)
        version: '1.2.2', // Version (required)
        description: 'API for server part of project', // Description (optional)
        contact: {
            name: 'GuliMaster',
            email: 'dakurushin@gmail.com',
        }
    },
    basePath: '/', // Base path (optional)
    host: "95.217.210.154",
    responses: {
        "200": {
            description: 'Everything is OK!'
        },
        "400": {
            description: 'Bad Request'
        }
    },
};
