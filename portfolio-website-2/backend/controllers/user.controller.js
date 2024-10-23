const { fetchRepoDetails, fetchReadmeImage, fetchRepoNames } = require("../services/repo.service");
const fs = require('fs');
const path = require('path');




exports.fetchRepo = async (req, res) => {
    const repoNames = await fetchRepoNames() || [];
    const repoDetails = [];

    for (const repoName of repoNames) {
        const details = await fetchRepoDetails(repoName);
        if (details && details.gitURL) {
            const imageUrl = await fetchReadmeImage(repoName); 
            repoDetails.push({ ...details, imageUrl: imageUrl || 'No image found in README.' });
        } else {
            repoDetails.push({ repoName, error: 'Unable to fetch details or URL does not exist.' });
        }
    }

    res.json(repoDetails);
}
