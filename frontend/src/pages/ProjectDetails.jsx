import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';

function ProjectDetails(){
    const {id} = useParams();

    const [project, setProjects] = useState(null);
    useEffect(() => {
        const fetchSingleProject = async() => {
        const token=localStorage.getItem('access_key');
        const response = await api.get(`projects/${id}/`, {
        headers : {Authorization : `Bearer ${token}`}
        });
        setProjects(response.data);
    };
    fetchSingleProject();
    }, [id]);
    
    return(
        <div className="dash-container">
            {/* We only draw the project if the data has successfully arrived from Django */}
            {project ? (
                <div>
                    <h1 className="dash-header">{project.name}</h1>
                    <p>{project.desc}</p>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );

}
export default ProjectDetails;