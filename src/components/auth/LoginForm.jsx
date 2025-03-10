import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [email, setUsername] = useState("");
	const [senha, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const { mutate: loginMutation } = useMutation({
		mutationFn: (userData) => axiosInstance.post("/login", userData, { withCredentials: true }),
		onSuccess: (response) => {
			localStorage.setItem("token", response.data.tokenGerado);
			navigate("/home");
		},
		onError: (err) => {
			toast.error(err.response.data || "Algo deu errado. Tente novamente.");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		loginMutation({ email, senha },
			{
				onSettled: () => setIsLoading(false),
			}
		);
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<div className="text-black font-bold text-[36px] leading-[1.2] uppercase">
				<p>BEM VINDO!</p>
				<p>ACESSE SUA CONTA</p>
			</div>

			<input
				type='text'
				placeholder='Nome de usuário'
				value={email}
				onChange={(e) => setUsername(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='password'
				placeholder='Senha'
				value={senha}
				onChange={(e) => setPassword(e.target.value)}
				className='input input-bordered w-full'
				required
			/>

			<button type='submit' className='btn btn-primary w-full text-white'>
				{isLoading ? <Loader className='size-5 animate-spin' /> : "Login"}
			</button>
		</form>
	);
};
export default LoginForm;
