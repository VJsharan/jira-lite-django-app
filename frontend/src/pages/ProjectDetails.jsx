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
                    <div className="dash-grid">
                        {/* First check if issues exist, then map over them */}
                        {project.issues && project.issues.map((issue) => (
                            <div key={issue.id} className="dash-card">
                                <h3>{issue.title}</h3>
                                <p>{issue.status} - {issue.priority}</p>
                     </div>
    ))}
</div>

                </div>
            ) : (
                <h1>Loading...</h1>
            )}
            <div className="dash-card" style={{ marginTop: '40px' }}>
                <h3>Create New Issue</h3>
                <form>
                    <input 
                        type="text" 
                        placeholder="Issue Title" 
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                    <textarea 
                        placeholder="Issue Description" 
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', minHeight: '80px' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', background: '#eab308', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Submit Issue
                    </button>
                </form>
            </div>
        </div>
    );

}
export default ProjectDetails;