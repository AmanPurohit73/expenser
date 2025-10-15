import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartDashboard = ({ budgetList }) => {
  return (
    <div className="border border-gray-100 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
        Spending Activity
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={budgetList}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" fill="#6366F1" radius={[6, 6, 0, 0]} />
          <Bar dataKey="amount" fill="#A5B4FC" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
