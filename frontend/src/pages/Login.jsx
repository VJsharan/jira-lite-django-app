import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';

function Login() { 
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    
        const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const response = await api.post('token/', {
            username: username,
            password: password
        });

        console.log('the users username is: ', username);
        console.log('the users password is: ', password);
        
        localStorage.setItem('access_key', response.data.access);
        localStorage.setItem('refresh_key', response.data.refresh);
        alert("Login successful, open devtools");
        
        // Redirect to the dashboard!
        navigate('/dashboard');
        
    }
    catch(error){
        alert('Login failed the error is',error);
    }
}
    return (
        <div className="login-container">
            <div className="login-card">
                <h2>JIRA-LITE</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <input className="login-input" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input className="login-input" type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
                    <button className="login-btn" type="submit">Login</button>
                </form>
            </div>
        </div>   
    )
}

export default Login;

