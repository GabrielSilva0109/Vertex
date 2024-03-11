import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Data {
  name: string;
  value: number;
}

const data: Data[] = [
  { name: 'Acoes', value: 400 },
  { name: 'Crypto', value: 600 },
  { name: 'Moedas', value: 200 },
  { name: 'Fundos', value: 300 },
  { name: 'RendaFixa', value: 200 },
  { name: 'Poupanca', value: 100 },
];

const COLORS = ['#b0ff00', '#005954', '#338b85', '#0030bf', '#9ce0db', '#4f46e5'];

interface HoveredData {
  name: string;
  value: number;
  percentage: string;
}

const CircleGrafico: React.FC = () => {
  const [hoveredData, setHoveredData] = useState<HoveredData | null>(null);

  const handleMouseEnter = (data: Data, index: number) => {
    setHoveredData({
      name: data.name,
      value: data.value,
      percentage: `${((data.value / getTotal()) * 100).toFixed(2)}%`,
    });
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  const getTotal = (): number => {
    return data.reduce((total, entry) => total + entry.value, 0);
  };

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
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {hoveredData && (
        <div>
          <p>{hoveredData.name}</p>
          <p>Valor: {hoveredData.value}</p>
          <p>Porcentagem: {hoveredData.percentage}</p>
        </div>
      )}
    </div>
  );
};

export default CircleGrafico;
