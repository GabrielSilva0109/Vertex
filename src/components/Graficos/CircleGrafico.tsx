import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface HoveredData {
  name: string;
  value: number;
  percentage: string;
}

interface CircleGraficoProps {
  porcentagemAcoes: number;
  porcentagemCrypto: number;
  porcentagemMoedas: number;
  porcentagemFiis: number;
  porcentagemRendaFixa: number;
  porcentagemPoupanca: number;
}

const COLORS = ['#b0ff00', '#005954', '#0030bf', '#ffcc00', '#9ce0db', '#4f46e5'];

const CircleGrafico: React.FC<CircleGraficoProps> = ({
  porcentagemAcoes,
  porcentagemCrypto,
  porcentagemMoedas,
  porcentagemFiis,
  porcentagemRendaFixa,
  porcentagemPoupanca
}) => {
  const [hoveredData, setHoveredData] = useState<HoveredData | null>(null);

  const data = [
    { name: 'Ações', value: porcentagemAcoes},
    { name: 'Crypto', value: porcentagemCrypto },
    { name: 'Moedas', value: porcentagemMoedas },
    { name: 'FIIs', value: porcentagemFiis },
    { name: 'Renda Fixa', value: porcentagemRendaFixa },
    { name: 'Poupança', value: porcentagemPoupanca }
  ]

  const handleMouseEnter = (data: any, index: number) => {
    setHoveredData({
      name: data.name,
      value: data.value,
      percentage: `${((data.value / getTotal()) * 100).toFixed(2)}%`
    })
  }

  const handleMouseLeave = () => {
    setHoveredData(null);
  }

  const getTotal = (): number => {
    return data.reduce((total, entry) => total + entry.value, 0);
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div style={{ backgroundColor: '#2C2C2C',borderRadius: "10px", padding: '5px', border: 'none' }}>
          <p>{`${data.name} ${data.value}%`}</p>
        </div>
      )
    }

    return null
  }

  return (
    <div style={{ width: '100%', height: '300px', marginTop: '-90px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#b0ff00"
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CircleGrafico