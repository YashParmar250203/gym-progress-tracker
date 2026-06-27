import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CHART_COLORS } from '../../utils/workoutStats';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { name, value, payload: item } = payload[0];

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__name">{name}</p>
      <p className="chart-tooltip__value">
        {value} workout{value !== 1 ? 's' : ''} · {item.percent}%
      </p>
    </div>
  );
}

function renderLabel({ payload, cx, cy, midAngle, innerRadius, outerRadius }) {
  const displayPercent = payload?.percent ?? 0;
  if (displayPercent < 6) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="#f5f5f5"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${displayPercent}%`}
    </text>
  );
}

export default function DistributionChart({ title, subtitle, data, emptyMessage }) {
  if (!data.length) {
    return (
      <div className="dashboard-chart-card">
        <div className="dashboard-chart-card__header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="dashboard-chart-empty">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-chart-card">
      <div className="dashboard-chart-card__header">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="dashboard-chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="42%"
              outerRadius="68%"
              paddingAngle={2}
              labelLine={false}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.key}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="chart-legend-label">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="chart-breakdown" aria-label={`${title} breakdown`}>
        {data.map((item, index) => (
          <li key={item.key}>
            <span
              className="chart-breakdown__dot"
              style={{ background: CHART_COLORS[index % CHART_COLORS.length] }}
            />
            <span className="chart-breakdown__name">{item.name}</span>
            <span className="chart-breakdown__percent">{item.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
