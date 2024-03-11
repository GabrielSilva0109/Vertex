import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Acoes', value: 400 },
  { name: 'Crypto', value: 600 },
  { name: 'Moedas', value: 200 },
  { name: 'Fundos', value: 300 },
  { name: 'RendaFixa', value: 200 },
  { name: 'Poupanca', value: 100 },
];

const COLORS = ['#b0ff00', '#005954', '#338b85', '#0030bf', '#9ce0db', '#4f46e5'];

const CircleGrafico = () => {
  const [hoveredData, setHoveredData] = useState(null);

  const handleMouseEnter = (data, index) => {
    setHoveredData({ name: data.name, value: data.value, percentage: ((data.value / getTotal()) * 100).toFixed(2) + '%' });
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  const getTotal = () => {
    return data.reduce((total, entry) => total + entry.value, 0);
  };

  return (
    <div>
      <PieChart width={300} height={300} margin={{ top: -55, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          innerRadius={60}
          outerRadius={80}
          fill="'#b0ff00'"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              onMouseEnter={() => handleMouseEnter(entry, index)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </Pie>
      </PieChart>
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
