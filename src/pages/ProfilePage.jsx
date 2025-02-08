import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

import { parseJwt } from "../utils/auth";

import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { parse } from "date-fns";
import GetJobs from "../components/GetJobs";

import '../styles/modal.css';

export default function ProfilePage() {
	const [userData, setUserData] = useState({});

	const queryClient = useQueryClient();
	const [modal, setModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({});
	const idLoading = true;
	const navigate = useNavigate();

	function buscarUsuario() {
		api('Usuarios/' + parseJwt().email, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			}
		}).then(resposta => {
			if (resposta.status === 200) {
				setUserData(resposta.data.$values[0])
				console.log(resposta.data.$values[0])
			}
		}).catch(erro => {
			// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
			console.log(erro)
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
				console.log(resposta.data)
				navigate("/login");
			}
		}).catch(erro => {
			// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
			console.log(erro)
		})
	}

	async function updateProfile(updatedData) {

		function converterParaDataSQL(dataStr) {
			return `${dataStr.slice(4, 8)}-${dataStr.slice(2, 4)}-${dataStr.slice(0, 2)}`;
		}

		console.log(updatedData)

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

		console.log("Dados enviados para API:", Object.fromEntries(formData.entries()));


		if (parseJwt().role === 'empresa') {
			await api.put('Empresa/', formData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				}
			}).then(resposta => {
				if (resposta.status === 200) {
					console.log(resposta.data)
					buscarUsuario()
				}
			}).catch(erro => {
				// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
				console.log(erro)
			})
		} else {
			await api.put('Candidato/', formData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				}
			}).then(resposta => {
				if (resposta.status === 200) {
					console.log(resposta.data)
					buscarUsuario()
				}
			}).catch(erro => {
				// Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
				console.log(erro)
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
				<div className="modal_profile" onClick={() => setModal(false)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<span className="close" onClick={() => setModal(false)}>&times;</span>
						<p>Tem certeza que deseja excluir o usuário?</p>
						<div className="modal-buttons">
							<button onClick={() => {
								deleteUser()
								setModal(false);
							}}>Confirmar</button>
							<button onClick={() => setModal(false)}>Cancelar</button>
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

			<button onClick={() => setModal(true)}>Excluir usuário</button>

		</div>
	);
};
