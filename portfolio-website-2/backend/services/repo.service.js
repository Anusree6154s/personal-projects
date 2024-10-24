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
const cheerio = require('cheerio'); //npm package for js on html
const marked = require('marked') //npm package for markdown to html
const atob = require('atob'); // npm package to decode base64 content
require('dotenv').config()

const git_token = process.env.gitToken2


exports.fetchRepoNames = async () => {

    const username = 'Anusree6154s';  // GitHub username
    const repo = 'Anusree6154s';       // Repository name
    console.log('token:', git_token)
    try {
        // Fetch README content from GitHub API
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/readme`, {
            headers: {
                Authorization: `token ${git_token}`,
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
        const decodedContent = atob(base64Content); //base64 to markdown
        const htmlContent = marked.parse(decodedContent); //markdown to html
        const $ = cheerio.load(htmlContent); //javascript on html

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
        const response = await axios.get(`https://api.github.com/repos/${repoName}`, {
            headers: {
                Authorization: `token ${git_token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        const { html_url, homepage, topics } = response.data;
        return { gitURL: html_url, webURL: homepage, topics };
    } catch (error) {
        console.error(`Error fetching details for repo ${repoName}:`, error.message);
        return null;
    }
}



exports.fetchReadmeImage = async (repoName) => {
    try {
        // Fetch the README file from the repo using GitHub API
        const response = await axios.get(`https://api.github.com/repos/${repoName}/contents/README.md`, {
            headers: {
                Authorization: `token ${git_token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        const data = await response.data;

        // Check if the README file content is returned
        if (data.content && data.encoding === 'base64') {
            const base64Content = data.content;
            const decodedContent = atob(base64Content); //base64 to markdown
            const htmlContent = marked.parse(decodedContent); //markdown to html
            const $ = cheerio.load(htmlContent); //javascript on html
            const imageUrl = $('#image').attr('src');
            const title = $('#title').text();
            const description = $('#description').text();
            return {
                imageUrl: imageUrl && imageUrl,
                title: title && title,
                description: description && description
            }
        }
    } catch (error) {
        console.error(`Error fetching README image for repo ${repoName}:`, error);
    }
    return null;
}
