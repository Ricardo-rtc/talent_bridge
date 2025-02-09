import { useEffect, useState } from "react";
import OpeningForm from "../components/OpeningForm";
import api from "../utils/api";
import { parseJwt } from "../utils/auth";

const OpeningCreationPage = () => {
	const [userData, setUserData] = useState({});

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

	useEffect(() => {
		buscarUsuario()
	}, [])
	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-3xl shadow-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<OpeningForm userData={userData} />
				</div>
			</div>
		</div>
	);
};
export default OpeningCreationPage;
