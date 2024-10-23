// exports.readDatabase = () => {
//     const data = fs.readFileSync('db.json', 'utf-8');
//     return JSON.parse(data);
// };
// exports.writeDatabase = (data) => {
//     fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
// };

const axios = require('axios')
const puppeteer = require('puppeteer')
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const atob = require('atob'); // Node.js utility to decode base64 content
require('dotenv').config()


exports.fetchRepoNames = async () => {

    const username = 'Anusree6154s';  // GitHub username
    const repo = 'Anusree6154s';       // Repository name

    try {
        // Fetch README content from GitHub API
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/readme`, {
            headers: {
                Authorization: `token ${process.env.gitToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });


        const readmeContent = response.data;
        const extractedRepoNames = extractRepoLinks(readmeContent);
        return extractedRepoNames
    } catch (error) {
        console.error('Error fetching README:', error);
        // alert('error getting repo names')
    }
};

const extractRepoLinks = (readmeContent) => {
    try {
        const base64Content = readmeContent.content;

        const decodedContent = Buffer.from(base64Content, 'base64').toString('utf-8');

        // Load the decoded HTML content into cheerio
        const $ = cheerio.load(decodedContent);

        // Select all anchor ('a') elements
        const links = $('a');

        const repoLinks = [];
        links.each((index, element) => {
            const href = $(element).attr('href');
            if (href && href.includes('github.com')) {
                const repoName = href.replace('https://github.com/', '');
                repoLinks.push(repoName);
            }
        });
        return repoLinks;
    } catch (error) {
        console.error('Error parsing README content:', error);
        return []; // Return an empty array in case of error
    }
};


exports.fetchRepoDetails = async (repoName) => {
    try {
        // const response = await axios.get(`https://api.github.com/repos/${repoName}`);
        // const response = await axios.get(`https://api.github.com/repos/${repoName}`, {
        //     headers: {
        //         Authorization: `token ${process.env.GITHUB_TOKEN}`,
        //         Accept: 'application/vnd.github.v3+json',
        //     },
        // });
        const response = await axios.get(`https://api.github.com/repos/${repoName}`, {
            headers: {
                Authorization: `token ${process.env.gitSecret}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        const { description, html_url, homepage, topics } = response.data;
        return { description, gitURL: html_url, webURL: homepage, topics };
    } catch (error) {
        console.error(`Error fetching details for repo ${repoName}:`, error.message);
        return null;
    }
}



exports.fetchReadmeImage = async (repoName) => {
    try {
        // Fetch the README file from the repo using GitHub API
        const response = await axios(`https://api.github.com/repos/${repoName}/contents/README.md`);
        const data = await response.data;

        // Check if the README file content is returned
        if (data.content && data.encoding === 'base64') {
            const decodedContent = atob(data.content); // Decode the base64-encoded content

            // Use a regex to extract the first image URL from the decoded README content
            const imageRegex = /!\[.*?\]\((https?:\/\/.*?\.(?:png|jpg|jpeg|gif|svg))\)/i;
            const match = decodedContent.match(imageRegex);

            // If an image URL is found, return it
            if (match && match[1]) {
                return match[1];
            }
        }
    } catch (error) {
        console.error(`Error fetching README image for repo ${repoName}:`, error);
    }
    return null; 
}
