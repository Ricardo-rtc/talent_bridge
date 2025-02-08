import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
	const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm();
	const [currentStep, setCurrentStep] = useState(0);
	const queryClient = useQueryClient();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const category = watch("category", "0");

	const { mutate: signUpMutation } = useMutation({
		mutationFn: async (formData) => {
			const formattedData = new FormData();

			Object.entries(formData).forEach(([key, value]) => {
				if (key === "cpf" || key === "cnpj" || key === "cep" || key === "NumContato") {
					value = value.replace(/\D/g, "");
				}
				if (key === "confirmSenha" || key === "category") {
					return;
				}
				if (key === "cpf" || key === "cnpj" || key === "dataNascimento" || key === "descricao") {
					formattedData.append(key, value);
				}
				else if (value) {
					formattedData.append(`Usuario.${key}`, value);
				}
			});

			const res = category === '1' ?
				await axiosInstance.post("/candidato", formattedData) :
				await axiosInstance.post("/empresa", formattedData);

			return res.data;
		},
		onSuccess: () => {
			toast.success("Conta criada com sucesso");
			navigate("/login");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || "Algo deu errado");
		},
	});

	const onSubmit = (data) => {
		setIsLoading(true);
		signUpMutation(data, { onSettled: () => setIsLoading(false) });
	};

	const validateStep = async () => {
		let fieldsToValidate = [];

		if (currentStep === 0) {
			fieldsToValidate = ["nome", "email", "category", "senha", "confirmSenha"];
		} else if (currentStep === 1) {
			fieldsToValidate = ["cep", "logradouro", "NumEnder", "bairro", "pais", "cidade", "UF", "TipoEndereco"];
		} else if (currentStep === 2) {
			fieldsToValidate = ["NumContato", "TipoContato"]
		} else if (currentStep === 3) {
			fieldsToValidate = category === "1" ? ["cpf", "dataNascimento"] : ["cnpj", "descricao"];
		}

		const isValid = await trigger(fieldsToValidate);

		if (isValid) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const User = () => {
		return (
			<>
				<input {...register("nome", { required: "Nome é obrigatório" })} placeholder="Nome Completo" className="input input-bordered w-full mt-2" />
				{errors.nome && <span className="text-red-500">{errors.nome.message}</span>}

				<input {...register("email", { required: "Email é obrigatório" })} type="email" placeholder="E-mail" className="input input-bordered w-full mt-2" />
				{errors.email && <span className="text-red-500">{errors.email.message}</span>}

				<select {...register("category", { required: "Selecione um perfil", min: { value: "1", message: "Selecione um perfil" } })} defaultValue={"0"} className='input input-bordered w-full'>
					<option disabled value="0">Selecione o seu perfil</option>
					<option value="1">Candidato</option>
					<option value="2">Empresa</option>
				</select>
				{errors.category && <span className="text-red-500">{errors.category.message}</span>}

				<input
					type="password"
					placeholder="Senha"
					{...register("senha", {
						required: "Senha é obrigatória",
						minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
					})}
					className="input input-bordered w-full mt-2"
				/>
				{errors.senha && <p className="text-red-500">{errors.senha.message}</p>}

				<input
					type="password"
					placeholder="Confirmar Senha"
					{...register("confirmSenha", {
						required: "Confirme sua senha",
						validate: (value) => {
							return value === watch("senha") || "As senhas não coincidem";
						},
					})}
					className="input input-bordered w-full mt-2"
				/>
				{errors.confirmSenha && <p className="text-red-500">{errors.confirmSenha.message}</p>}

				<button type="submit" onClick={validateStep} className='btn btn-primary w-full text-white'>Prosseguir</button>
			</>
		)
	}

	const Address = () => {
		return (
			<>
				<InputMask
					mask="99999-999"
					{...register("cep", {
						required: "CEP é obrigatório",
						pattern: {
							value: /^[0-9]{5}-[0-9]{3}$/,
							message: "CEP inválido",
						},
					})}
					placeholder="00000-000"
					className="input input-bordered w-full mt-2"
				/>
				{errors.cep && <span className="text-red-500">{errors.cep.message}</span>}

				<input
					{...register("logradouro", { required: "Logradouro é obrigatório" })}
					placeholder="Preencha o logradouro"
					className="input input-bordered w-full mt-2"
				/>
				{errors.logradouro && <span className="text-red-500">{errors.logradouro.message}</span>}

				<input
					{...register("NumEnder", { required: "Número é obrigatório" })}
					placeholder="Preencha o número"
					className="input input-bordered w-full mt-2"
				/>
				{errors.NumEnder && <span className="text-red-500">{errors.NumEnder.message}</span>}

				<input
					{...register("bairro", { required: "Bairro é obrigatório" })}
					placeholder="Preencha o bairro"
					className="input input-bordered w-full mt-2"
				/>
				{errors.bairro && <span className="text-red-500">{errors.bairro.message}</span>}

				<input
					{...register("pais", { required: "País é obrigatório" })}
					placeholder="Preencha o país"
					className="input input-bordered w-full mt-2"
				/>
				{errors.pais && <span className="text-red-500">{errors.pais.message}</span>}

				<input
					{...register("TipoEndereco", { required: "O complemento é obrigatório" })}
					placeholder="Preencha o complemento"
					className="input input-bordered w-full mt-2"
				/>
				{errors.TipoEndereco && <span className="text-red-500">{errors.TipoEndereco.message}</span>}

				<input
					{...register("cidade", { required: "Cidade é obrigatória" })}
					placeholder="Preencha a cidade"
					className="input input-bordered w-full mt-2"
				/>
				{errors.cidade && <span className="text-red-500">{errors.cidade.message}</span>}

				<input
					{...register("UF", {
						required: "Estado é obrigatório",
						maxLength: { value: 2, message: "Estado deve ter 2 caracteres (ex: SP)" },
						pattern: {
							value: /^[A-Z]{2}$/,
							message: "Estado inválido (use apenas letras maiúsculas)",
						},
					})}
					placeholder="Digite o estado com 2 caracteres maiúsculos"
					className="input input-bordered w-full mt-2"
				/>
				{errors.UF && <span className="text-red-500">{errors.UF.message}</span>}

				<button
					type="button"
					onClick={validateStep}
					className="btn btn-primary w-full text-white mt-4"
				>
					Prosseguir
				</button>
			</>
		)
	}

	const Phone = () => {
		return (
			<>
				<InputMask
					mask="(99) 999999-999"
					{...register("NumContato", {
						required: "Número de telefone é obrigatório",
						pattern: {
							value: /^\(\d{2}\) \d{6}-\d{3}$/,
							message: "Número de telefone inválido",
						},
					})}
					placeholder="(11) 999999-099"
					className="input input-bordered w-full mt-2"
				/>
				{errors.NumContato && <span className="text-red-500">{errors.NumContato.message}</span>}

				<input
					{...register("TipoContato", { required: "Tipo de contato é obrigatório" })}
					placeholder="Preencha o tipo de contato"
					className="input input-bordered w-full mt-2"
				/>
				{errors.TipoContato && <span className="text-red-500">{errors.TipoContato.message}</span>}

				<button
					type="button"
					onClick={validateStep}
					className="btn btn-primary w-full text-white mt-4"
				>
					Prosseguir
				</button>
			</>
		)
	}

	const Document = () => {
		return (
			<>
				{category === "1" ? (
					<>
						<InputMask mask="999.999.999-99" {...register("cpf", { required: "CPF é obrigatório" })} placeholder="CPF" className="input input-bordered w-full mt-2" />
						{errors.cpf && <span className="text-red-500">{errors.cpf.message}</span>}

						<input type="date" {...register("dataNascimento", { required: "Data de nascimento é obrigatório" })} placeholder="Data de nascimento" className="input input-bordered w-full mt-2" />
						{errors.dataNascimento && <span className="text-red-500">{errors.dataNascimento.message}</span>}
					</>
				) : (
					<>
						<InputMask mask="99.999.999/9999-99" {...register("cnpj", { required: "CNPJ é obrigatório" })} placeholder="CNPJ" className="input input-bordered w-full mt-2" />
						{errors.cnpj && <span className="text-red-500">{errors.cnpj.message}</span>}
					</>
				)}
				<div className="flex justify-between mt-4">
					<button type="submit" disabled={isLoading} className='btn btn-primary w-full text-white'>
						{isLoading ? <Loader className='size-5 animate-spin' /> : "Criar Conta"}
					</button>
				</div>
			</>
		)
	}

	const steps = [
		{
			content: (
				<User />
			)
		},
		{
			content: (
				<Address />
			)
		},
		{
			content: (
				<Phone />
			)
		},
		{
			content: (
				<Document />
			)
		}
	];

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<div className="text-black font-bold text-[36px] leading-[1.2] uppercase">
				<p>Cadastro</p>
			</div>
			{steps[currentStep].content}
		</form>
	);
};

export default SignUpForm;
