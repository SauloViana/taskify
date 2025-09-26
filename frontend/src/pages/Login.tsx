import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const doLogin = async () => {
                const res = await api.post("auth/login/", { email, password });
                const data = res.data
                login(data['access'], email);
            };
            toast.promise(
                doLogin,
                {
                    pending: {
                        render() {
                            return "Efetuando o login..."
                        }
                    },
                    success: {
                        render() {
                            return "Login efetuado com sucesso! Você será redirecionado."
                        },
                        onClose() {
                            navigate("/dashboard");
                        },
                        autoClose: 2000
                    },
                    error: {
                        render() {
                            return "Não foi possível efetuar o login, verifique o Email e Senha."
                        }
                    }
                },
            );
        } catch (error) {
            toast.error("Não foi possível efetuar o login, verifique o Email e Senha.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <button className="w-full bg-blue-700 text-white py-2 rounded">Entrar</button>
            </form>
            <ToastContainer />
        </div>
    )
}
