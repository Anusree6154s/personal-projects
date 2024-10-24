import axios from "axios";

export const fetchProjects = async (setProjects) => {
    try {
        const response = await axios.get(`http://localhost:8080/fetch-repos`);
        setProjects(response.data);
    } catch (error) {
        console.error(error)
    }
}
