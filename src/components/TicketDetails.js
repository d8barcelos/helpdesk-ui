// src/components/TicketDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketDetail = () => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Pega o id do ticket da URL

    const fetchTicketDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/tickets/${id}`);
            setTicket(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao carregar os detalhes do ticket');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicketDetail();
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Detalhes do Ticket</h2>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            {/* Adicione mais detalhes do ticket aqui */}
        </div>
    );
};

export default TicketDetail;
