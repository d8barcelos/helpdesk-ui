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
    const [newTicket, setNewTicket] = useState({ title: '', description: '' }); // Estado para o novo ticket
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
            await createTicket(token, newTicket); // Serviço de criação de ticket
            setIsModalOpen(false);
            setNewTicket({ title: '', description: '' });
            fetchData(); // Atualiza a lista de tickets
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
                        <Link to={`/tickets/${ticket.id}`} className="ticket-link">Ver detalhes</Link>
                    </div>                
                ))}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Criar Novo Ticket</h2>
                        <form>
                            <label>
                                Título:
                                <input
                                    type="text"
                                    value={newTicket.title}
                                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                Descrição:
                                <textarea
                                    value={newTicket.description}
                                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                    required
                                />
                            </label>
                        </form>
                        <div className="modal-actions">
                            <button onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
                                Cancelar
                            </button>
                            <button onClick={handleCreateTicket} disabled={isSubmitting}>
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
