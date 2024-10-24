import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ProjectsContext } from './contexts/ProjectContext';
import {fetchProjects} from './utils/Projects.utils'

function App() {
  const [projects, setProjects] = useState([])

  // useEffect(() => {
  //   fetchProjects(setProjects);
  // }, [])

  console.log(projects)

  // const owner = 'Anusree6154s';
  // const repo = 'qtify-frontend';

  // Function to fetch repository details
  // async function getRepoDetails() {
  //   try {
  //     const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();

  //     console.log('data', data)

  //     // Extracting the needed information
  //     const description = data.description || 'No description provided.';
  //     const website = data.homepage || 'No website available.';
  //     const topics = data.topics || [];

  //     console.log('Description:', description);
  //     console.log('Website:', website);
  //     console.log('Topics:', topics.join(', '));
  //   } catch (error) {
  //     console.error('Error fetching repository details:', error);
  //   }
  // }

  // // Call the function to fetch the details
  // getRepoDetails();

  // console.log('hi')

  //   const [projects, setProjects] = useState([])
  //   useEffect(() => {
  //     fetchProjects(setProjects);
  //     console.log('yes')
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  

  return (
    <ProjectsContext.Provider value={{projects, setProjects}}>
      <div className="App">
        <Header />
        <main>
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
              </Routes>
            </div>
          </Router>
        </main>
        <Footer />
      </div>
    </ProjectsContext.Provider>
  );
}

export default App;
