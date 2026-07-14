import { useState, useEffect, use } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";
import IssueModal from "../components/IssueModal";
import ProjectModal from "../components/ProjectModal";

function Dashboard() { 

    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
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
    }
    const updateIssueStatus = async (issue_id, status) => {
        try {
            const token = localStorage.getItem('access_key');
            // Notice we use PATCH, and we point it at the specific issue ID!
            await api.patch(`issues/${issue_id}/`, {
                status: status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh the issues to show the new status!
            fetchIssues();
            
        } catch (error) {
            alert("Failed to update status");
            console.error(error);
        }
    }; 

    const deleteIssue = async (issue_id) => {
        // Add a safety check so users don't accidentally click it!
        const confirmDelete = window.confirm("Are you sure you want to delete this issue?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('access_key');
            
            // Notice we use api.delete instead of api.patch!
            await api.delete(`issues/${issue_id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Instantly refresh the dashboard so the card vanishes!
            fetchIssues();
            
        } catch (error) {
            alert("Failed to delete issue");
            console.error(error);
        }
    };
    return(
        <div className="dash-container" style={{ padding: 0 }}>
    
            {/* The Frosted Glass Header */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 40px',
                marginBottom: '20px',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <h1 className="dash-header" style={{ margin: 0 }}>Jira-Lite Dashboard</h1>
                
                {/* Wrap the buttons in a div so they sit next to each other */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => setIsProjectModalOpen(true)}
                        style={{ padding: '8px 16px', background: '#dbeafe', color: '#3b82f6', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        New Project
                    </button>

                    <button 
                        onClick={handleLogout}
                        style={{ padding: '8px 16px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Logout
                    </button>
                </div>
            </div> 
  
           
            <div className="dash-grid">
                {issues.map((issue) => (
                    <div key={issue.id} className="dash-card" style={{ borderLeft: '2px solid #eab308' }}>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{issue.title}</h3>
                                                        <select 
                                value={issue.status}
                                onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                                style={{ fontSize: '12px', padding: '4px 8px', background: '#f1f5f9', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                            >
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>

                        </div>
                        
                        <p style={{ marginBottom: '15px' }}>{issue.desc}</p>
                        
                        {/* Notice how we can use project_name here because of our Django Serializer! */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                            <span><strong>Project:</strong> {issue.project_name}</span>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px',
                                background: issue.priority === 'HIGH' ? '#fee2e2' : issue.priority === 'LOW' ? '#dcfce7' : issue.priority === 'MEDIUM' ? '#fef9c3' : '#f1f5f9',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: issue.priority === 'HIGH' ? '#ef4444' : issue.priority === 'LOW' ? '#22c55e' : issue.priority === 'MEDIUM' ? '#ca8a04' : '#64748b'
                            }}>
                                {/* The Status Dot */}
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: issue.priority === 'HIGH' ? '#ef4444' : issue.priority === 'LOW' ? '#22c55e' : issue.priority === 'MEDIUM' ? '#ca8a04' : '#64748b'
                                }} />
                                {issue.priority}
                            </div>
                        </div>
                        
                        {/* THE NEW DELETE BUTTON */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button 
                                onClick={() => deleteIssue(issue.id)}
                                style={{ padding: '4px 8px', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                            >
                                Delete
                            </button>
                        </div>
                        
                    </div>
                ))} 
            </div>

            {isModalOpen && <IssueModal projects={projects} onClose={() => setIsModalOpen(false)} onSuccess={fetchIssues} />}
            {isProjectModalOpen && <ProjectModal onClose={() => setIsProjectModalOpen(false)} onSuccess={fetchProjects} />}
            <button 
            className="fab-button"
            onClick={() => setIsModalOpen(!isModalOpen)}>
                +
            </button>
        </div>
    )
}
export default Dashboard;

