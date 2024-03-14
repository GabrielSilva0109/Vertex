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
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3333/ativosWallet/1')
        .then(response => response.json())
        .then(ativos => {
          console.log('Dados de ativos:', ativos);
          return ativos;
        }),
      fetch('http://localhost:3333/despesasWallet/1')
        .then(response => response.json())
        .then(despesas => {
          console.log('Dados de despesas:', despesas);
          return despesas;
        })
    ])
    .then(([ativos, despesas]) => {
      const dataByMonthAtivos = groupDataByMonthAtivos(ativos);
      const dataByMonthDespesa = groupDataByMonthDespesa(despesas);
      setData([...dataByMonthAtivos, ...dataByMonthDespesa]);
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const groupDataByMonthAtivos = (data: Ativo[]) => {
    const groupedData: any = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Adiciona os últimos 3 meses
    for (let i = currentMonth - 2; i <= currentMonth; i++) {
      const month = (i < 0 ? 12 + i : i) + 1; 
      const year = i < 0 ? currentYear - 1 : currentYear;
      groupedData[`${year}-${month}`] = [];
    }
    
    // Adiciona os próximos 6 meses
    for (let i = 1; i <= 6; i++) {
      const month = currentMonth + i;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      groupedData[`${year}-${(month % 12) || 12}`] = [];
    }
    
    // Preenche os dados existentes
    data.forEach((item: any) => {
      const date = new Date(item.data); // Supondo que 'data' seja a propriedade que contém a data
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month + 1}`; // +1 pois os meses vão de 0 a 11

      if (!groupedData[key]) {
        groupedData[key] = [];
      }

      groupedData[key].push(item);
    });

    // Formatando os dados para o formato esperado pelo Recharts
    return Object.keys(groupedData).map((key) => {
      const monthData = groupedData[key];
      const totalValue = monthData.reduce((acc: number, curr: any) => acc + curr.valor, 0);
      return { month: key, totalValue };
    });
  };

  const groupDataByMonthDespesa = (data: Despesa[]) => {
    console.log("Dados de despesas recebidos:", data)
  
    const groupedData: any = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Adiciona os últimos 3 meses
    for (let i = currentMonth - 2; i <= currentMonth; i++) {
      const month = (i < 0 ? 12 + i : i) + 1; 
      const year = i < 0 ? currentYear - 1 : currentYear;
      groupedData[`${year}-${month}`] = [];
    }
    
    // Adiciona os próximos 6 meses
    for (let i = 1; i <= 6; i++) {
      const month = currentMonth + i;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      groupedData[`${year}-${(month % 12) || 12}`] = [];
    }
    
    // Preenche os dados existentes
    data.forEach((item: any) => {
      const date = new Date(item.data); // Supondo que 'data' seja a propriedade que contém a data
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month + 1}`; // +1 pois os meses vão de 0 a 11
  
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
  
      groupedData[key].push(item);
    });
  
    // Formatando os dados para o formato esperado pelo Recharts
    return Object.keys(groupedData).map((key) => {
      const monthData = groupedData[key];
      const totalValueDespesa = monthData.reduce((acc: number, curr: any) => acc + curr.valorDespesa, 0);
      
      return { month: key, totalValueDespesa };
      console.log("totalValueDespesa", totalValueDespesa)
    });
  };
  

  return (
    <ResponsiveContainer width="95%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalValue" name="Ativos" fill="#b0ff00" />
        <Bar dataKey="totalValueDespesa" name="Despesas" fill="#ff0000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Grafico;
