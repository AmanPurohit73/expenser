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
    <div className="border-2 p-5 rounded-lg">
      <h2 className="font-bold text-xl flex justify-center mb-2 ">Activity</h2>

      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 5,
            left: 20,
            right: 5,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2"></Bar>
          <Bar dataKey="amount" stackId="a" fill="#c3c2ff"></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
