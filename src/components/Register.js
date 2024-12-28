import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [error, setError] = useState(null);
    const [generatedCode, setGeneratedCode] = useState(null); // Armazena o código gerado
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            setError('As senhas não coincidem.');
            return;
        }

        const userPayload = {
            user: {
                email,
                password,
                name,
                role: selectedRole,
                ...(selectedRole === 'cliente' || selectedRole === 'suporte' ? { companyCode } : {}),
                ...(selectedRole === 'empresa' ? { companyName } : {}),
            },
        };

        axios
            .post('http://localhost:3000/users', userPayload)
            .then((response) => {
                if (selectedRole === 'empresa' && response.data.code) {
                    setGeneratedCode(response.data.code); // Exibe o código no modal
                } else {
                    navigate('/login');
                }
            })
            .catch(() => {
                setError('Erro ao cadastrar usuário. Tente novamente.');
            });
    };

    const closeModal = () => {
        setGeneratedCode(null);
        navigate('/login');
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <h2>Bem-vindo!</h2>
                <p>Cadastre-se para começar a usar nossa plataforma.</p>
            </div>
            <div className="register-right">
                {!selectedRole ? (
                    <div className="register-card">
                        <h2 className="register-title">Registrar como:</h2>
                        <div className="role-buttons">
                            <button onClick={() => setSelectedRole('empresa')} className="register-button">
                                Empresa
                            </button>
                            <button onClick={() => setSelectedRole('cliente')} className="register-button">
                                Cliente
                            </button>
                            <button onClick={() => setSelectedRole('suporte')} className="register-button">
                                Suporte
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="register-card">
                        <h2 className="register-title">
                            Cadastro como {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                        </h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-field"
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                        <input
                            type="password"
                            placeholder="Confirmar Senha"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            className="input-field"
                        />
                        {(selectedRole === 'cliente' || selectedRole === 'suporte') && (
                            <input
                                type="text"
                                placeholder="Código da Empresa"
                                value={companyCode}
                                onChange={(e) => setCompanyCode(e.target.value)}
                                required
                                className="input-field"
                            />
                        )}
                        {selectedRole === 'empresa' && (
                            <input
                                type="text"
                                placeholder="Nome da Empresa"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                className="input-field"
                            />
                        )}
                        {error && <p className="error-message">{error}</p>}
                        <div className="button-group">
                            <button type="submit" className="register-button">
                                Cadastrar
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedRole(null)}
                                className="back-button"
                            >
                                Voltar
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {generatedCode && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Cadastro Concluído</h3>
                        <p>Seu código de empresa é: <strong>{generatedCode}</strong></p>
                        <button onClick={closeModal} className="close-modal">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
