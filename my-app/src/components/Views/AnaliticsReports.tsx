import React from "react";
import { useSelector } from "react-redux";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const AnaliticsReports: React.FC = () => {
    const tasks = useSelector((state: any) => state.tasks.tasks);

    const taskData = [
        { status: "New Task", count: tasks.filter((task: any) => task.status === "New Task").length },
        { status: "In Progress", count: tasks.filter((task: any) => task.status === "In Progress").length },
        { status: "Ready Testing", count: tasks.filter((task: any) => task.status === "Ready Testing").length },
        { status: "Closed", count: tasks.filter((task: any) => task.status === "Closed").length },
    ];

    const teamEfficiencyData: { name: string, tasks: number }[] = [];
    const taskCountByMember: { [key: string]: number } = {};

    tasks.forEach((task: any) => {
        taskCountByMember[task.name] = (taskCountByMember[task.name] || 0) + 1;
    });

    for (const [name, tasks] of Object.entries(taskCountByMember)) {
        teamEfficiencyData.push({ name, tasks });
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Task Performance Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={taskData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <h2 style={{ marginTop: '40px' }}>Team Efficiency</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={teamEfficiencyData}
                        dataKey="tasks"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {teamEfficiencyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
