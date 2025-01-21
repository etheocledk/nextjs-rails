const baseUrls = {
    development : "http://localhost:3030",
    production: "",
    statging: "",
    test: ""
}

const environment = process.env.NEXT_APP_ENVIRONMENT as keyof typeof baseUrls || 'development';
const baseUrl = baseUrls[environment];


export default baseUrl;
