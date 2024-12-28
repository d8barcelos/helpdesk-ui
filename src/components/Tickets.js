import React, { useState, useEffect } from 'react';
import { fetchTickets, createTicket } from '../services/ticketService'; // Importe os serviços
import { useNavigate } from 'react-router-dom';
import '../styles/Tickets.css';
import { Link } from 'react-router-dom';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para o modal
    const [newTicket, setNewTicket] = useState({ title: '', description: '', category: '', due_date: '' }); // Estado para o novo ticket com novos campos
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para loading do botão
    const navigate = useNavigate();

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Token não encontrado. Faça login novamente.');
            setLoading(false);
            return;
        }

        try {
            const data = await fetchTickets(token);
            setTickets(data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao carregar tickets');
            setLoading(false);
        }
    };

    const handleCreateTicket = async () => {
        setIsSubmitting(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Token não encontrado. Faça login novamente.');
            setIsSubmitting(false);
            return;
        }

        try {
            await createTicket(token, newTicket);
            setIsModalOpen(false);
            setNewTicket({ title: '', description: '', category: '', due_date: '' });
            fetchData();
        } catch (err) {
            alert('Erro ao criar o ticket.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'em_aberto':
                return 'Em Aberto';
            case 'em_progresso':
                return 'Em Progresso';
            case 'concluido':
                return 'Concluído';
            default:
                return 'Desconhecido';
        }
    };


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="tickets-container">
            <div className="header">
                <h1>Tickets</h1>
                <button className="new-ticket-btn" onClick={() => setIsModalOpen(true)}>Novo Ticket</button>
            </div>
            <div className="tickets-list">
                {tickets.map(ticket => (
                    <div key={ticket.id} className="ticket-card">
                        <h3>{truncateText(ticket.title, 20)}</h3>
                        <p>{truncateText(ticket.description, 100)}</p>

                        <div className="ticket-footer">
                            <div className="ticket-badges">
                                {ticket.status && (
                                    <span className={`badge status ${ticket.status === 'em_aberto' ? 'open' : ticket.status === 'em_progresso' ? 'in-progress' : ticket.status === 'concluido' ? 'completed' : ''}`}>
                                        {getStatusBadge(ticket.status)}
                                    </span>
                                )}
                                {ticket.priority && (
                                    <span className={`badge priority ${ticket.priority === 'alta' ? 'high-priority' : ticket.priority === 'media' ? 'medium-priority' : ticket.priority === 'baixa' ? 'low-priority' : ''}`}>
                                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                    </span>
                                )}
                            </div>
                            <Link to={`/tickets/${ticket.id}`} className="ticket-link">Ver detalhes</Link>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Criar Novo Ticket</h2>
                        <form>
                            <div className="input-group">
                                <label>
                                    Título:
                                    <input
                                        type="text"
                                        value={newTicket.title}
                                        onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                                        required
                                        className="input-field"
                                    />
                                </label>
                            </div>
                            <div className="input-group">
                                <label>
                                    Descrição:
                                    <textarea
                                        value={newTicket.description}
                                        onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                        required
                                        className="input-field"
                                        rows="4"
                                    />
                                </label>
                            </div>
                            <div className="input-group">
                                <label>
                                    Prioridade:
                                    <select
                                        value={newTicket.priority}
                                        onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="alta">Alta</option>
                                        <option value="media">Média</option>
                                        <option value="baixa">Baixa</option>
                                    </select>
                                </label>
                            </div>
                        </form>
                        <div className="modal-actions">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                disabled={isSubmitting}
                                className="cancel-btn"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateTicket}
                                disabled={isSubmitting}
                                className="submit-btn"
                            >
                                {isSubmitting ? 'Criando...' : 'Criar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tickets;
