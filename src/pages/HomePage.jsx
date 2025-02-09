// import PostCreation from "../components/PostCreation";
import Openings from "../components/Openings";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { parseJwt } from "../utils/auth";
import { Link } from "react-router-dom";

const HomePage = () => {

	const [vagas, setVagas] = useState([]);
	const reloadData = () => {	
		buscarVagas();
	}


	function buscarVagas() {
		api.get('vagas').then(resposta => {
			if (resposta.status === 200) {
				setVagas(resposta.data.$values)
			}
		}).catch(erro => {
			console.error(erro)
		})
	}

	useEffect(() => {
		buscarVagas();
	}, []);


	return (
		<div className="flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-black font-bold text-[36px] leading-[1.2] uppercase">MURAL DE VAGAS</h1>
					{parseJwt().role === "empresa" ? (<Link to={"/create"} className="bg-blue-700 text-white px-4 py-2 rounded">Cadastrar</Link>) : ""}
				</div>
				<div className="space-y-4">
					{vagas?.map((job, index) => (
						<Openings key={index} data={job} jwt={parseJwt()} onEdit={reloadData} />
					))}
				</div>
			</div>
		</div>
	);
};
export default HomePage;
