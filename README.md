# Web Scraping

A Web scraping API which accepts a URL

API Endpoint 👉 POST  https://api.suchitrotti.com/scrape/

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