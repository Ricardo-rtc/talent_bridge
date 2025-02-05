import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import InputMask from "react-input-mask";

const SignUpForm = () => {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [category, setCategory] = useState("0");
	const [senha, setSenha] = useState("");
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
	const [CNPJ, setCnpj] = useState("");
	const [cpf, setCpf] = useState("");
	const [dataNascimento, setDataNasc] = useState("");
	const [descricao, setDescricao] = useState("");
	const [currentStep, setCurrentStep] = useState(0);

	const queryClient = useQueryClient();

	const { mutate: signUpMutation, isLoading } = useMutation({
		mutationFn: async () => {

			function converterParaDataSQL(dataStr) {
				return `${dataStr.slice(4, 8)}-${dataStr.slice(2, 4)}-${dataStr.slice(0, 2)}`;
			}

			var formData = new FormData();

			if (category === '1') {
				formData.append('Cpf', cpf)
				formData.append('DataNascimento', converterParaDataSQL(dataNascimento))
			} else {
				formData.append('CNPJ', CNPJ)
				formData.append('Descricao', descricao)
			}
			formData.append('Usuario.Nome', nome)
			formData.append('Usuario.Email', email)
			formData.append('Usuario.Senha', senha)
			formData.append('Usuario.Logradouro', logradouro)
			formData.append('Usuario.NumEnder', numEnder)
			formData.append('Usuario.Complemento', complemento)
			formData.append('Usuario.Bairro', bairro)
			formData.append('Usuario.Cidade', cidade)
			formData.append('Usuario.Cep', cep)
			formData.append('Usuario.UF', uf)
			formData.append('Usuario.Pais', pais)
			formData.append('Usuario.TipoEndereco', tipoEndereco)
			formData.append('Usuario.TipoContato', tipoContato)
			formData.append('Usuario.NumContato', numContato)

			console.log(formData)
			const res = category === '1' ? await axiosInstance.post("/candidato", formData) : await axiosInstance.post("/empresa", formData);
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
			signUpMutation({ CNPJ, descricao, nome, email, logradouro, numEnder, complemento, bairro, cidade, uf, cep, pais, tipoEndereco, tipoContato, numContato });
	};

	const Prosseguir = () => {
		function changeStep() {
			setCurrentStep((state) => state + 1)
		}
		return (
			<button onClick={changeStep} className='btn btn-primary w-full text-white'>
				Prosseguir
			</button>
		)
	}
	const User = () => {
		return (
			<>
				<input
					type="text"
					placeholder="Nome Completo"
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
				<select
					id="options"
					name="options"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className='input input-bordered w-full'
					required>
					<option disabled value="0">Selecione o seu perfil</option>
					<option value="1">Candidato</option>
					<option value="2">Empresa</option>
				</select>
				<input
					placeholder="Senha"
					value={senha}
					name="senha"
					type="password"
					onChange={(e) => setSenha(e.target.value)}
					className="input input-bordered w-full mt-2"
					required
				/>
				<input
					placeholder="Confirmar Senha"
					value={senha}
					name="senha"
					type="password"
					onChange={(e) => setSenha(e.target.value)}
					className="input input-bordered w-full mt-2"
					required
				/>
				<Prosseguir />
			</>)
	}

	const Address = () => {
		return (
			<>
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
				<Prosseguir />
			</>)
	}

	const Contato = () => {
		return (
			<>
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
				<Prosseguir />
			</>
		)
	}

	const TipoUsuario = () => {
		if (category === "1") {
			return (
				<>
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
				</>
			);
		} else {
			return (
				<>
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
				</>
			);
		}
	};


	const steps = {
		0: <User />,
		1: <Address />,
		2: <Contato />,
		3: <TipoUsuario />
	}

	return (
		<form onSubmit={handleSignUp} className='flex flex-col gap-4'>
			<div className="text-black font-bold text-[36px] leading-[1.2] uppercase">
				<p>Cadastro</p>
			</div>
			{steps[currentStep]}
			<button type='submit' disabled={isLoading} className={`btn btn-primary w-full text-white ${currentStep === 3 ? '' : 'hidden'}`} >
				{isLoading ? <Loader className='size-5 animate-spin' /> : "Aceitar e Criar Conta"}
			</button>
		</form>
	);
};
export default SignUpForm;
