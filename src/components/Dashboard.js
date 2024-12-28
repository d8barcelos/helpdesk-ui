import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Modal, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import '../styles/Dashboard.css';

const dataLineChart = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
];

const dataPieChart = [
    { name: 'Tickets Resolvidos', value: 400 },
    { name: 'Tickets Pendentes', value: 300 },
    { name: 'Tickets Atrasados', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const dataBarChart = [
    { name: 'Suporte', atendimentos: 50 },
    { name: 'Financeiro', atendimentos: 30 },
    { name: 'Técnico', atendimentos: 20 },
];

const Dashboard = () => {
    const [selectedFilter, setSelectedFilter] = useState('Mensal');
    const [modalShow, setModalShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        console.log(`Filtro selecionado: ${event.target.value}`);
    };

    const handleDateFilter = () => {
        setModalShow(false);
        console.log(`Período selecionado: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Bem-vindo ao Dashboard</h1>

            <div className="dashboard-filters">
                <label htmlFor="filter" className="filter-label">Filtrar por:</label>
                <select
                    id="filter"
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    <option value="Mensal">Mensal</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Diário">Diário</option>
                    <option value="Anual">Anual</option>
                </select>

                <Button variant="primary" className="period-filter-btn" onClick={() => setModalShow(true)}>
                    Filtrar por Período
                </Button>
            </div>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione o Período</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="date-picker-container">
                        <label>Início:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                        <label>Fim:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleDateFilter}>Aplicar</Button>
                </Modal.Footer>
            </Modal>

            <div className="dashboard-statistics">
                <div className="dashboard-statistic">
                    <h3>Total de Tickets</h3>
                    <p className="stat-value">800</p>
                </div>
                <div className="dashboard-statistic">
                    <h3>Usuários Ativos</h3>
                    <p className="stat-value">320</p>
                </div>
                <div className="dashboard-statistic">
                    <h3>Novos Tickets</h3>
                    <p className="stat-value">50</p>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3>Desempenho Mensal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dataLineChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Distribuição de Tickets</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={dataPieChart}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={80}
                                fill="#8884d8"
                            >
                                {dataPieChart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Atendimentos por Setor</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataBarChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="atendimentos" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Resumo de Atendimentos</h3>
                    <div className="summary-container">
                        <p>Tickets Resolvidos: 400</p>
                        <p>Tickets Pendentes: 300</p>
                        <p>Tickets Atrasados: 100</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
