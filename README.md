# Web Scraping


## Web Application using ReactJS 🚀🚀🚀

### Demo Link's

- 👉 [Web Application](https://heuristic-lamport-d15a29.netlify.app/)

- 👉 [Unit Test Reports](https://heuristic-lamport-d15a29.netlify.app/lcov-report/index.html)

- 👉 [API Test Reports](https://heuristic-lamport-d15a29.netlify.app/api-report.html)


## API

A Web scraping API which accepts a URL

🔥 API Endpoint  
```https
POST  https://api.suchitrotti.com/scrape/
```
Body

```json
{
    "url":"https://github.com/isuchit"
}
```

Response

```json
{
    "title": "isuchit (Suchit Rotti) · GitHub",
    "description": "DevOps | AWS ☁ | React | Full Stack Developer </>. isuchit has 17 repositories available. Follow their code on GitHub.",
    "images": [
        "https://github.githubassets.com/images/search-key-slash.svg",
        "",
        "",
        "",
        "https://avatars2.githubusercontent.com/u/26110025?s=88&u=4003ef1272faa04b985f4a4890e4f1b3bfb325aa&v=4",
        "https://avatars2.githubusercontent.com/u/26110025?s=88&u=4003ef1272faa04b985f4a4890e4f1b3bfb325aa&v=4",
        "https://avatars3.githubusercontent.com/u/26110025?s=460&u=4003ef1272faa04b985f4a4890e4f1b3bfb325aa&v=4"
    ],
    "ogtitle": "isuchit - Overview",
    "ogtype": "profile",
    "ogimages": "https://avatars3.githubusercontent.com/u/26110025?s=400&u=4003ef1272faa04b985f4a4890e4f1b3bfb325aa&v=4",
    "ogurl": "https://github.com/isuchit"
}
```


## Deployment 

- Deploy by running [setup.sh](/setup.sh)

- ![CI/CD](/screenshots/CI-CD.png)

### Scripted
- All AWS recources are created using cloudformation scripts is [here](/cloudformation/index.yaml).

- Lambda function is in NodeJS is [here](functions/scrape-metadata/index.js).

- Unit Testing for lambda function using Chai-Mocha is [here](functions/scrape-metadata/test/index.test.js).

- API is written in OpenAPI is [here](api/openapi.yml).

- Shell script for deployment is [here](tilities/deploy-infra.sh)


## Screenshots

- **Home**

  ![Home](/screenshots/Home.png)
  
- **Unit Test NYC Report**

  ![NYC](/screenshots/NYC.png)
  
- **API Test Newman Report**

  ![API](/screenshots/API.png)