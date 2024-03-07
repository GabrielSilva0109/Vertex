import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Ativo {
  titulo: string;
  valor: number;
}

interface Despesa {
  titulo: string;
  valorDespesa: number;
}

const Grafico: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/ativos')
      .then((response) => response.json())
      .then((data: Ativo[]) => setAtivos(data))
      .catch((error) => console.error('Erro ao buscar ativos:', error))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3333/despesas')
      .then((response) => response.json())
      .then((data: Despesa[]) => setDespesas(data))
      .catch((error) => console.error('Erro ao buscar despesas:', error))
  }, [])

  return (
    <ResponsiveContainer width="95%" height={350}>
      <BarChart data={ativos}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="titulo" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="valor" fill="#b0ff00" />
        <Bar dataKey="valor" fill="#ff0000" />
        <Bar dataKey="valor" fill="white" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Grafico;
