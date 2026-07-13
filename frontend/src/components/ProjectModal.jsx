import React, { useState } from 'react';
import api from '../api';

function ProjectModal({ onClose }) {
    // 1. The Notebooks
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const token = localStorage.getItem('access_key');
        await api.post('projects/',{
            name:name,
            desc: desc
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        onClose();
        window.location.reload();
    }
    catch(error){
        alert('Failed to create issue: ' + error.message);
        console.log("full error is " + error)
    }
    }
    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content dash-card" onClick={(e) => e.stopPropagation()} style={{ border: '2px solid #3b82f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Create New Project</h2>
                    <button onClick={onClose} style={{ padding: '5px 10px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Close
                    </button>
                </div>
                
                {/* 3. Don't forget to attach onSubmit! */}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Project Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    
                    <textarea 
                        placeholder="Project Description" 
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', minHeight: '80px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    
                    <button type="submit" style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        Create Project
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProjectModal;
