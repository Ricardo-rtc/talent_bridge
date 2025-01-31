import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import InputMask from "react-input-mask";

const SignUpForm = () => {
	const [category, setCategory] = useState("1");
	const [CNPJ, setCnpj] = useState("");
	const [cpf, setCpf] = useState("");
	const [dataNascimento, setDataNasc] = useState("");
	const [descricao, setDescricao] = useState("");
	const [avaliacao, setAvaliacao] = useState("");
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [logradouro, setLogradouro] = useState("");
	const [numEnder, setNumEnder] = useState("");
	const [complemento, setComplemento] = useState("");
	const [bairro, setBairro] = useState("");
	const [cidade, setCidade] = useState("");
	const [uf, setUf] = useState("");
	const [cep, setCep] = useState("");
	const [pais, setPais] = useState("");
	const [tipoEndereco, setTipoEndereco] = useState("");
	const [tipoContato, setTipoContato] = useState("");
	const [numContato, setNumContato] = useState("");

	const queryClient = useQueryClient();

	const { mutate: signUpMutation, isLoading } = useMutation({
		mutationFn: async (data) => {
			const res = category === '1' ? await axiosInstance.post("/candidato", data) : await axiosInstance.post("/empresa", data);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Conta criada com sucesso");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Algo deu errado");
		},
	});

	const handleSignUp = (e) => {
		e.preventDefault();
		category === '1' ? signUpMutation({ cpf, dataNascimento, nome, email, logradouro, numEnder, complemento, bairro, cidade, uf, cep, pais, tipoEndereco, tipoContato, numContato }) :
			signUpMutation({ CNPJ, descricao, avaliacao, nome, email, logradouro, numEnder, complemento, bairro, cidade, uf, cep, pais, tipoEndereco, tipoContato, numContato });
	};

	return (
		<form onSubmit={handleSignUp} className='flex flex-col gap-4'>
			<label>Escolha uma opção:</label>
			<select
				id="options"
				name="options"
				placeholder='Selecione o tipo de conta'
				value={category}
				defaultValue={category}
				onChange={(e) => setCategory(e.target.value)}
				className='input input-bordered w-full'
				required>
				<option value="1">Candidato</option>
				<option value="2">Empresa</option>
			</select>
			{category === "1" && (<>
				<InputMask
					mask="999.999.999-99"
					placeholder="CPF"
					value={cpf}
					onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
					className="input input-bordered w-full"
					required
				/>
				<InputMask
					mask="99/99/9999"
					placeholder="Data de Nascimento"
					value={dataNascimento}
					onChange={(e) => setDataNasc(e.target.value.replace(/\D/g, ''))}
					className="input input-bordered w-full mt-2"
					required
				/>
			</>)}
			{category === "2" && (<>
				<InputMask
					mask="99.999.999/9999-99"
					placeholder="CNPJ"
					value={CNPJ}
					onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ''))}
					className="input input-bordered w-full mb-2"
					required
				/>
				<input
					type="text"
					placeholder="Descrição"
					value={descricao}
					onChange={(e) => setDescricao(e.target.value)}
					className="input input-bordered w-full mt-2"
					required
				/>
				<input
					type="number"
					placeholder="Avaliação"
					value={avaliacao}
					onChange={(e) => setAvaliacao(e.target.value)}
					className="input input-bordered w-full mt-2"
					required
				/></>)}
			<input
				type="text"
				placeholder="Nome"
				value={nome}
				onChange={(e) => setNome(e.target.value)}
				className="input input-bordered w-full mt-2"
				required
			/>
			<input
				type="email"
				placeholder="E-mail"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="input input-bordered w-full mt-2"
				required
			/>
			<input
				type="text"
				placeholder="Logradouro"
				value={logradouro}
				onChange={(e) => setLogradouro(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="Número"
				value={numEnder}
				onChange={(e) => setNumEnder(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="Complemento"
				value={complemento}
				onChange={(e) => setComplemento(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="Bairro"
				value={bairro}
				onChange={(e) => setBairro(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="Cidade"
				value={cidade}
				onChange={(e) => setCidade(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="UF"
				value={uf}
				onChange={(e) => setUf(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<InputMask
				mask="99999-999"
				placeholder="CEP"
				value={cep}
				onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="País"
				value={pais}
				onChange={(e) => setPais(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="Tipo de Endereço"
				value={tipoEndereco}
				onChange={(e) => setTipoEndereco(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="Tipo de Contato"
				value={tipoContato}
				onChange={(e) => setTipoContato(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<input
				type="text"
				placeholder="Número de Contato"
				value={numContato}
				onChange={(e) => setNumContato(e.target.value)}
				className="input input-bordered w-full mt-2"
			/>
			<button type='submit' disabled={isLoading} className='btn btn-primary w-full text-white'>
				{isLoading ? <Loader className='size-5 animate-spin' /> : "Aceitar e Criar Conta"}
			</button>
		</form>
	);
};
export default SignUpForm;
