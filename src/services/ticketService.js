import axios from 'axios';

const API_URL = 'http://localhost:3000/tickets';

export const fetchTickets = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao carregar tickets');
    }
};

export const createTicket = async (token, ticket) => {
    try {
        const response = await axios.post(API_URL, ticket, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar ticket');
    }
};


