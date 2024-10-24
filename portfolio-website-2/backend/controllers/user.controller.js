const { fetchRepoDetails, fetchReadmeImage, fetchRepoNames } = require("../services/repo.service");
const fs = require('fs');
const path = require('path');


exports.fetchRepo = async (req, res) => {
    const repoNames = await fetchRepoNames() || [];
    const repoDetails = [];

    for (const repoName of repoNames) {
        const details = await fetchRepoDetails(repoName);
        if (details && details.gitURL) {
            const { imageUrl, title, description } = await fetchReadmeImage(repoName);
            const dummy_title = 'Dummy Title'
            const dummy_img = 'https://fastly.picsum.photos/id/423/300/200.jpg?blur=5&hmac=J0Qswu3j9HsHOvXZ5Pm9HZ3abPOhhZ74EBE8mb_T2Gk'
            const dummy_desc = 'Dummy description'

            repoDetails.push({
                ...details,
                title: title || dummy_title,
                imageUrl: imageUrl || dummy_img,
                description: description || dummy_desc
            });
        } else {
            repoDetails.push({ repoName, error: 'Unable to fetch details or URL does not exist.' });
        }
    }

    res.json(repoDetails);
}
