import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Ativo {
  data: string | number | Date
  titulo: string
  valor: number
}

interface Despesa {
  data: string | number | Date
  titulo: string
  valor: number
}

interface GraficoProps {
  walletId: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const ativos = payload.find((entry: any) => entry.dataKey === 'ativos');
    const despesas = payload.find((entry: any) => entry.dataKey === 'despesas');
    return (
      <div className="custom-tooltip">
        {ativos && <p>{`Ativos: R$${ativos.value}`}</p>}
        {despesas && <p>{`Despesas: R$${despesas.value}`}</p>}
      </div>
    );
  }
  return null
}


const Grafico: React.FC<GraficoProps> = ({ walletId }) => {
  const [data, setData] = useState<any[]>([])

  const fetchData = async () => {
    try {
      const responseAtivos = await fetch(`http://localhost:3333/ativosWallet/${walletId}`)
      const responseDespesas = await fetch(`http://localhost:3333/despesasWallet/${walletId}`)
      
      const ativos: Ativo[] = await responseAtivos.json()
      const despesas: Despesa[] = await responseDespesas.json()

      const dataByMonth = groupDataByMonth(ativos, despesas)
      setData([...dataByMonth])
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [walletId])

  const groupDataByMonth = (ativos: Ativo[], despesas: Despesa[]) => {
    const groupedData: any = {}
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Adiciona os últimos 3 meses
    for (let i = currentMonth - 2; i <= currentMonth; i++) {
      const month = (i < 0 ? 12 + i : i) + 1
      const year = i < 0 ? currentYear - 1 : currentYear
      groupedData[`${year}-${month}`] = { ativos: 0, despesas: 0 }
    }

    // Adiciona os próximos 6 meses
    for (let i = 1; i <= 6; i++) {
      const month = currentMonth + i
      const year = currentYear + Math.floor((currentMonth + i) / 12)
      groupedData[`${year}-${(month % 12) || 12}`] = { ativos: 0, despesas: 0 }
    }

    // Preenche os dados existentes
    ativos.forEach((ativo: Ativo) => {
      const date = new Date(ativo.data)
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`
      if (groupedData[monthYear]) {
        groupedData[monthYear].ativos += ativo.valor
      }
    });

    despesas.forEach((despesa: Despesa) => {
      const date = new Date(despesa.data)
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`
      if (groupedData[monthYear]) {
        groupedData[monthYear].despesas += despesa.valor
      }
    })

    // Formatando os dados para o formato esperado pelo Recharts
    return Object.keys(groupedData).sort().map((key) => {
      return { month: key, ...groupedData[key] }
    })
  }

  // Função para formatar o nome do mês
  const formatMonthName = (monthString: string) => {
    const [year, month] = monthString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleString('default', { month: 'long' })
  }

  return (
    <ResponsiveContainer width="95%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={formatMonthName} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} wrapperStyle={{ backgroundColor: '#333', borderRadius: '10px', padding: '10px' }} />
        <Legend />
        <Bar dataKey="ativos" name="Ativos" fill="#b0ff00" />
        <Bar dataKey="despesas" name="Despesas" fill="#ff0000" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Grafico
