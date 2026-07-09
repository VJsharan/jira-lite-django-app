import { useState, useEffect, use } from "react";
import api from '../api';

function Dashboard() { 

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetchProjects();
    },[])
    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('access_key');
            const response = await api.get('projects/', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data);
        } catch(error) {
            alert("Failed to fetch projects: " + error);
        }
    }

    return(
        <div className="dash-container">
            <h1 className="dash-header">Jira-Lite Dashboard</h1>
            
            <div className="dash-grid">
                {projects.map((project) => (
                    <div key={project.id} className="dash-card">
                        <h3>{project.name}</h3>
                        <p>{project.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Dashboard;

