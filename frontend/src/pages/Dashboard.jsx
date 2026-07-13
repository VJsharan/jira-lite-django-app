import { useState, useEffect, use } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";
import IssueModal from "../components/IssueModal";

function Dashboard() { 

    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchProjects();
        fetchIssues();
    },[])
    const fetchProjects = async () => {
       const token = localStorage.getItem('access_key');
       if (!token){
        navigate('/login');
        return;
       }
       try{
        const response = await api.get('projects/', 
            {headers: {Authorization: `Bearer ${token}`}}
        );
        setProjects(response.data);
       }
       catch(error){
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_key');
            navigate('/login');
            return; 
        }
        else { 
            alert('failed to fetch projects, error : '+ error.message);
            console.log("full api error is " + error)
        }
    }
    };
    const fetchIssues = async () => {
        const token = localStorage.getItem('access_key');
       if (!token) return;
       try {
           const response = await api.get('issues/', {
               headers: { Authorization: `Bearer ${token}` }
           });
           setIssues(response.data);
       } catch (error) {
           console.error("Failed to fetch issues", error);
       }
    };
    const handleLogout = () =>{
        localStorage.removeItem('access_key');
        localStorage.removeItem('refresh_key');
        navigate('/login');
    };
    return(
        <div className="dash-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className="dash-header" style={{ margin: 0 }}>Jira-Lite Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    style={{ padding: '8px 16px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Logout
                </button>
            </div>            
            <div className="dash-grid">
                {issues.map((issue) => (
                    <div key={issue.id} className="dash-card" style={{ borderLeft: '2px solid #eab308' }}>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{issue.title}</h3>
                            <span style={{ fontSize: '12px', padding: '4px 8px', background: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold' }}>
                                {issue.status}
                            </span>
                        </div>
                        
                        <p style={{ marginBottom: '15px' }}>{issue.desc}</p>
                        
                        {/* Notice how we can use project_name here because of our Django Serializer! */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                            <span><strong>Project:</strong> {issue.project_name}</span>
                                    <span style={{ color: issue.priority === 'HIGH' ? '#ef4444' : issue.priority === 'LOW' ? '#22c55e' : '#64748b' }}>
                                <strong>Priority:</strong> {issue.priority}
                            </span>
                        </div>
                        
                    </div>
                ))}
            </div>

            {isModalOpen && <IssueModal projects={projects} onClose = {() =>setIsModalOpen(false)}/>}
            <button 
            className="fab-button"
            onClick={() => setIsModalOpen(!isModalOpen)}>
                +
            </button>
        </div>
    )
}
export default Dashboard;

