import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            setError('As senhas não coincidem.');
            return;
        }

        axios.post('http://localhost:3000/users', {
            user: { email, password }
        })
        .then(() => {
            navigate('/login');
        })
        .catch(() => {
            setError('Erro ao cadastrar usuário. Tente novamente.');
        });
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2 className="register-title">Cadastro</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirmar Senha"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-button">Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;
