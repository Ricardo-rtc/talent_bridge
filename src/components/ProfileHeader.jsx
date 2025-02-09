import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UserCheck, UserPlus, X } from "lucide-react";
import { parseJwt } from "../utils/auth";

const ProfileHeader = ({ userData, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({});
	const [idade, setIdade] = useState(0);
	const [cnpjs, setCnpjs] = useState([]);

	// Função para calcular a idade corretamente
	const calcIdade = () => {
		if (!userData?.dataNascimento) return;

		const nascimento = new Date(userData.dataNascimento);
		const hoje = new Date();
		let anos = hoje.getFullYear() - nascimento.getFullYear();

		// Ajusta caso o aniversário ainda não tenha ocorrido no ano atual
		const mesAtual = hoje.getMonth();
		const diaAtual = hoje.getDate();
		const mesNascimento = nascimento.getMonth();
		const diaNascimento = nascimento.getDate();

		if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
			anos--;
		}

		setIdade(anos);
	};

	const handleSave = () => {
		onSave(editedData);
		setIsEditing(false);
	};

	useEffect(() => {
		calcIdade();
	}, [userData]); // Adiciona `userData` como dependência para atualizar quando os dados mudarem

	return (
		<div className='bg-white shadow rounded-lg mb-6 p-4'>
			<div className='text-center mb-4'>
				{isEditing ? (
					<input
						type='text'
						value={editedData.name ?? userData.nome}
						onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
						className='text-2xl font-bold mb-2 text-center w-full '
					/>
				) : (
					<h1 className='text-2xl font-bold mb-2 text-gray-400'>{userData.nome}</h1>
				)}

				{isEditing ? (
					<input
						type='text'
						value={editedData.email ?? userData.email}
						onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
						className='text-gray-600 text-center w-full'
					/>
				) : (
					<p className='text-gray-600'>{userData.email}</p>
				)}

				{isEditing ? (
					<input
						type='text'
						value={editedData.telefone ?? userData.numero}
						onChange={(e) => setEditedData({ ...editedData, telefone: e.target.value })}
						className='text-gray-600 text-center w-full'
					/>
				) : (
					<p className='text-gray-600'>{userData.numero}</p>
				)}

				{/* Exibe a idade se o usuário for candidato */}
				{parseJwt().role === 'candidato' ? (
					<div className='flex justify-center items-center mt-2'>
						<span className='text-gray-600'>Idade: {idade}</span>
						<p className='text-gray-600'>CPF {userData.cpf}</p>
					</div>
				) : (
					<div className='flex justify-center items-center mt-2'>
						<p className='text-gray-600'>CNPJ: {userData.cnpj}</p>

					</div>
				)}


			</div>

			{/* Botão de edição */}
			{
				isEditing ? (
					<button
						className='w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition duration-300'
						onClick={handleSave}
					>
						Salvar alterações
					</button>
				) : (
					<button
						onClick={() => setIsEditing(true)}
						className='w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition duration-300'
					>
						Editar perfil
					</button>
				)
			}
		</div >
	);
};

export default ProfileHeader;
