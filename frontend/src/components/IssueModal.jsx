import React from 'react';
import { useState } from 'react';
import api from '../api';

function IssueModal({ projects, onClose, onSuccess }) {
    const [projectId, setProjectId] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_key');
            await api.post('issues/',{
                project:projectId,
                title:title,
                status:'OPEN',
                priority: priority,
                desc: desc
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onClose();
            onSuccess();
        }
        catch(error){
            alert('Failed to create issue: ' + error.message);
            console.log("full error is " + error)
        }
    };
    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content dash-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ border: '2px solid #aeaea2ff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Create New Issue</h2>
                    <button 
                        onClick={onClose}
                        style={{ padding: '5px 10px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Close
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    {/* The new Dropdown so we know where to save it! */}
                    <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="">Select a Project...</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="LOW">Low Priority</option>
                        <option value="MEDIUM">Medium Priority</option>
                        <option value="HIGH">High Priority</option>
                    </select>


                    <input 
                        type="text" 
                        placeholder="Issue Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    
                    <textarea 
                        placeholder="Issue Description" 
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', minHeight: '80px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    
                    <button type="submit" style={{ width: '100%', padding: '12px', background: '#eab308', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        Submit Issue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default IssueModal;
