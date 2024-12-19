import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import '../assets/undraw_team-up_qeem.svg'; // Caminho correto da imagem

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
    
        axios.post('http://localhost:3000/login', {
            email,
            password
        })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            navigate('/tickets');
        })
        .catch(() => {
            setError('Credenciais inválidas');
        });
    };    

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="logo-container">
                    <div>
                        <h2>Bem-vindo à nossa Plataforma!</h2>
                        <p>Conecte-se e tenha acesso ao melhor da nossa solução.</p>
                    </div>
                    <img src={require('../assets/undraw_team-up_qeem.svg').default} alt="Equipe trabalhando" className="login-left-image" />
                </div>
            </div>
            <div className="login-right">
                <div className="login-card">
                    <h2 className="login-title">Login</h2>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                                placeholder="Digite seu e-mail"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                                placeholder="Digite sua senha"
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="login-button">Entrar</button>
                        <button
                            type="button"
                            className="register-button-loginpage"
                            onClick={() => navigate('/register')}
                        >
                            Registrar-se
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
