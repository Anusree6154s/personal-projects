import axios from "axios";

export const fetchProjects = async (setProjects) => {
    try {
        const response = await axios.get(`http://localhost:8080/fetch-repos`);
        // const response = await axios.get(`http://localhost:8080/fetch-repos?repos=${repoNames}`);
        setProjects(response.data);
    } catch (error) {
        console.error(error)
        // alert('error fetching projects')
    }
}

// export const fetchProjects = async (setProjects, repoNames) => {
//     try {
//         // const response = await axios.get(`http://localhost:8080/fetch-repos?repos=Anusree6154s`);
//         const response = await axios.get(`http://localhost:8080/fetch-repos?repos=${repoNames}`);
//         setProjects(response.data);
//     } catch (error) {
//         console.error(error)
//         // alert('error fetching projects')
//     }
// }

// export const fetchReadme = async (setRepoNames) => {

//     const username = 'Anusree6154s';  // GitHub username
//     const repo = 'Anusree6154s';       // Repository name

//     try {
//         // Fetch README content from GitHub API
//         const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/readme`, {
//             headers: {
//                 ,
//                 Accept: 'application/vnd.github.v3+json',
//             },
//         });


//         const readmeContent = response.data;
//         const extractedRepoNames = extractRepoLinks(readmeContent);
//         setRepoNames(extractedRepoNames);
//     } catch (error) {
//         console.error('Error fetching README:', error);
//         // alert('error getting repo names')
//     }
// };


const extractRepoLinks = (readmeContent) => {
    // Create a DOM parser to parse the README content
    const parser = new DOMParser();

    const base64Content = readmeContent.content;
    const decodedContent = atob(base64Content);

    const doc = parser.parseFromString(decodedContent, 'text/html');
    const links = doc.querySelectorAll('a');

    const repoLinks = [];
    links.forEach(link => {
        const href = link.href;
        if (href.includes('github.com')) {
            const repoName = href.replace('https://github.com/', '');
            repoLinks.push(repoName);
        }
    });

    return repoLinks;
};

