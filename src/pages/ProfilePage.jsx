import { useNavigate } from "react-router-dom";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";

import { parseJwt } from "../utils/auth";

import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import api from "../utils/api";
import { useEffect, useState } from "react";
import GetJobs from "../components/GetJobs";

import '../styles/modal.css';

export default function ProfilePage() {
	const [userData, setUserData] = useState({});
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	function buscarUsuario() {
		api('Usuarios/' + parseJwt().email, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			}
		}).then(resposta => {
			if (resposta.status === 200) {
				setUserData(resposta.data.$values[0])
			}
		}).catch(erro => {
			// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
			console.error(erro)
		})
	}

	async function deleteUser() {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("Token não encontrado. Usuário não autenticado.");
			return;
		}

		await api.delete('Usuarios?email=' + parseJwt().email, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		}).then(resposta => {
			if (resposta.status === 200) {
				navigate("/login");
				localStorage.removeItem("token");
			}
		}).catch(erro => {
			// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
			console.error(erro)
		})
	}

	async function updateProfile(updatedData) {

		// function converterParaDataSQL(dataStr) {
		// 	return `${dataStr.slice(4, 8)}-${dataStr.slice(2, 4)}-${dataStr.slice(0, 2)}`;
		// }

		// Mapeamento de chaves erradas → corretas
		const keyMap = {
			cpf: "Cpf",
			nascimento: "DataNascimento",
			name: "Usuario.Nome",
			email: "Usuario.Email",
			logradouro: "Usuario.Logradouro",
			numeroEndereco: "Usuario.NumEnder",
			complementoUsuario: "Usuario.Complemento",
			bairroUsuario: "Usuario.Bairro",
			cidadeUsuario: "Usuario.Cidade",
			cepUsuario: "Usuario.Cep",
			estado: "Usuario.UF",
			paisUsuario: "Usuario.Pais",
			tipoEnd: "Usuario.TipoEndereco",
			tipoContatoUsuario: "Usuario.TipoContato",
			telefone: "Usuario.NumContato",
			cnpj: "CNPJ",
			descricao: "Descricao"
		};
		var formData = new FormData();

		// Objeto com os valores originais
		let fullData = {
			"Usuario.Nome": userData.nome,
			"Usuario.Email": userData.email,
			"Usuario.Senha": 'senha',
			"Usuario.Logradouro": userData.logradouro,
			"Usuario.NumEnder": userData.numeroRes,
			"Usuario.Complemento": userData.complemento,
			"Usuario.Bairro": userData.bairro,
			"Usuario.Cidade": userData.cidade,
			"Usuario.Cep": userData.cep,
			"Usuario.UF": userData.estado,
			"Usuario.Pais": userData.pais,
			"Usuario.TipoEndereco": userData.tipoEndereco,
			"Usuario.TipoContato": userData.tipoContato,
			"Usuario.NumContato": userData.numero
		};

		// Se for um candidato, adicionar os campos específicos
		if (parseJwt().role === 'candidato') {
			fullData.Cpf = userData.cpf;
			fullData.DataNascimento = userData.dataNascimento;
		} else {
			fullData.CNPJ = userData.cnpj;
			fullData.Descricao = userData.descricao;
		}

		// Criar um novo objeto com os nomes corrigidos
		let updatedDataFixed = {};
		for (const key in updatedData) {
			const newKey = keyMap[key] || key; // Se não estiver no mapa, mantém o nome original
			updatedDataFixed[newKey] = updatedData[key];
		}

		// Atualizar fullData com os valores corrigidos
		Object.assign(fullData, updatedDataFixed);

		// Adicionar ao FormData
		for (const key in fullData) {
			formData.append(key, fullData[key]);
		}



		if (parseJwt().role === 'empresa') {
			await api.put('Empresa/', formData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				}
			}).then(resposta => {
				if (resposta.status === 200) {
					buscarUsuario()
				}
			}).catch(erro => {
				// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
				console.error(erro)
			})
		} else {
			await api.put('Candidato/', formData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				}
			}).then(resposta => {
				if (resposta.status === 200) {
					buscarUsuario()
				}
			}).catch(erro => {
				// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
				console.error(erro)
			})
		}

	}



	const handleSave = (updatedData) => {
		updateProfile(updatedData);
	};

	useEffect(() => {
		buscarUsuario();
	}, []);

	return (
		<div className='max-w-4xl mx-auto p-4'>
			{modal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
					onClick={() => setModal(false)}
				>
					<div
						className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
							onClick={() => setModal(false)}
						>
							&times;
						</button>
						<h2 className="text-lg font-semibold font-[Arial] text-center mb-4">
							Confirmação de Exclusão
						</h2>
						<p className="text-gray-700 text-center mb-6">
							Tem certeza que deseja excluir o usuário?
						</p>
						<div className="flex justify-around">
							<button
								onClick={() => {
									deleteUser();
									setModal(false);
								}}
								className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
							>
								Confirmar
							</button>
							<button
								onClick={() => setModal(false)}
								className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}

			<ProfileHeader userData={userData} onSave={handleSave} />
			{parseJwt().role === 'empresa' ? <AboutSection userData={userData} onSave={handleSave} /> : ''}
			{parseJwt().role === 'empresa' ? <GetJobs userData={userData} /> : ''}
			{parseJwt().role === 'candidato' ? <ExperienceSection userData={userData} onSave={handleSave} /> : ''}
			{parseJwt().role === 'candidato' ? <EducationSection userData={userData} onSave={handleSave} /> : ''}
			{parseJwt().role === 'candidato' ? <SkillsSection userData={userData} onSave={handleSave} /> : ''}

			<button className="font-[Bayon] text-white uppercase text-2xl" onClick={() => setModal(true)}>Excluir usuário</button>

		</div>
	);
};
