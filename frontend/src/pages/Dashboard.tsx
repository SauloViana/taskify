import { useEffect, useState } from "react";
import api from "../services/api";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("access");
            if (!token) return;
            const res = await api.get("tasks/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data);
        };
        fetchTasks();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
            <ul className="space-y-3">
                {tasks.map((tasks) => (
                    <li key={tasks.id} className="p-4 bg-gray-100 rounded shadow">
                        <h2 className="font-semibold">{tasks.title}</h2>
                        <p className="text-sm">{tasks.description}</p>
                        <span className="text-xs text-gray-600">Status: {tasks.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}