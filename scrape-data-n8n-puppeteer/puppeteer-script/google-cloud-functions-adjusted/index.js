// This Puppeteer script is intended to deploy on Google Cloud Functions. 
// It enables you to retrieve text from all elements on the website. 
// After deploying, simply trigger the function including "name" parameter, which is URL of the website you want to scrape. 
// Example: https://us-central1-workfloows.cloudfunctions.net/getPageContent?name=[URL_OF_WEBSITE_TO_SCRAPE]

// VIDEO TUTORIAL
// Complete video guide available on my YouTube: https://youtu.be/YonNJqAAxdg

// INFO
// If you like my work, please subscirbe to my YouTube channel: https://www.youtube.com/@workfloows
// And/or to my newsletter: https://workfloows.com/

// Thank you for your support! 



// Importing the necessary libraries
const functions = require('@google-cloud/functions-framework');
const puppeteer = require('puppeteer');

// Function to get the content of a web page
async function getPageContent(name) {

    // Launching a Puppeteer browser instance
    const browser = await puppeteer.launch({
        args : [
            '--no-sandbox'
          ]
    });

    // Opening a new page in the browser
    const page = (await browser.pages())[0];

    // Navigating to the specified URL
    await page.goto(name);

    // Extracting the inner text of all elements on the page
    const extractedText = await page.$eval('*', (el) => el.innerText);

    // Closing the browser instance
    await browser.close();

    // Returning the extracted text
    return extractedText;

};

// Exporting the function as a Google Cloud Function
exports.getPageContent = async function(req, res) {

    // Retrieving the 'name' parameter from the request body or query string
    let name = req.body.name || req.query.name;

    // Setting the response status code to 200 and sending the page content
    res.status(200).send(await getPageContent(name));
  }