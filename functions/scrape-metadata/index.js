"use strict";

const axios = require("axios");
const cheerio = require("cheerio");

let webScrape = async (event, context) => {
  return await new Promise(async (resolve, reject) => {
    try {
      console.log("event:", JSON.stringify(event));
      console.log("context:", JSON.stringify(context));

      let htmlUrl = JSON.parse(event.body).url;
      let response = await axios.get(htmlUrl);

      let metadata = {};
      let $ = cheerio.load(response.data);
      let ogTitle = $("head title").text();
      let ogDescription = $('meta[name="description"]').attr("content");
      let ogImages = $("img");
      let ogKeywords = $('meta[name="keywords"]').attr("content");

      let ogtitle = $('meta[property="og:title"]').attr("content");
      let ogtype = $('meta[property="og:type"]').attr("content");
      let ogimages = $('meta[property="og:image"]').attr("content");
      let ogurl = $('meta[property="og:url"]').attr("content");

      if (ogTitle) {
        metadata.title = ogTitle;
      }

      if (ogDescription) {
        metadata.description = ogDescription;
      }

      if (ogImages && ogImages.length) {
        metadata.images = [];
        for (let i = 0; i < ogImages.length; i++) {
          metadata.images.push($(ogImages[i]).attr("src"));
        }
      }

      if (ogtitle && ogtitle.length) {
        metadata.ogtitle = ogtitle;
      }

      if (ogtype && ogtype.length) {
        metadata.ogtype = ogtype;
      }

      if (ogimages && ogimages.length) {
        metadata.ogimages = ogimages;
      }

      if (ogurl && ogurl.length) {
        metadata.ogurl = ogurl;
      }

      return resolve(prepareResponse(200, metadata));
    } catch (error) {
      console.error("Error: ", error);
      return resolve(prepareResponse(500, "INTERNAL SERVER ERROR"));
    }
  });
};

function prepareResponse(statusCode, message) {
    return {
        "statusCode": statusCode,
        "headers": {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS'
        },
        "body": JSON.stringify(message),
        "isBase64Encoded": false,
    };
}

module.exports = {
  handler: webScrape,
};
