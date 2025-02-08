// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import Sidebar from "../components/Sidebar";
// import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
// import { Users } from "lucide-react";

const HomePage = () => {
	// const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const mockValues = [
		{
			"$id": "10",
			"idVaga": 2,
			"cnpj": "23456789000145",
			"dataInicio": "2024-08-15T09:00:00",
			"dataFim": "2024-11-15T17:00:00",
			"descricao": "Desenvolvimento de modelos de IA.",
			"titulo": "Cientista de Dados",
			"disponivel": true,
			"modeloTrabalho": "Híbrido",
			"senioridade": "SR",
			"aplicacos": {
				"$id": "11",
				"$values": []
			},
			"cnpjNavigation": {
				"$id": "12",
				"cnpj": "23456789000145",
				"idUsuario": 2,
				"descricao": "Startup focada em soluções de inteligência artificial.",
				"avaliacao": 4.2,
				"idUsuarioNavigation": {
					"$id": "13",
					"idUsuario": 2,
					"idEndereco": 2,
					"idContato": 2,
					"nome": "Mariana Oliveira",
					"email": "mariana.oliveira@email.com",
					"senha": "senha456",
					"candidatos": {
						"$id": "14",
						"$values": []
					},
					"empresas": {
						"$id": "15",
						"$values": [
							{
								"$ref": "12"
							}
						]
					},
					"idContatoNavigation": null,
					"idEnderecoNavigation": null
				},
				"vagas": {
					"$id": "16",
					"$values": [
						{
							"$ref": "10"
						}
					]
				}
			},
			"requisitos": {
				"$id": "17",
				"$values": []
			}
		}
	]
	// const { data: vagas } = useQuery({
	// 	queryKey: ["vagas"],
	// 	queryFn: async () => {
	// 		const res = await axiosInstance.get("/vagas");
	// 		return res.data;
	// 	},
	// });


	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			{/* <div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div> */}

			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
				{/* <PostCreation user={authUser} /> */}

				{mockValues && mockValues?.map((vagas) => (
					console.log(vagas),
					<Post key={vagas.idVaga} post={vagas} />
				))}

				{/* {vagas?.length === 0 && (
					<div className='bg-white rounded-lg shadow p-8 text-center'>
						<div className='mb-6'>
							<Users size={64} className='mx-auto text-blue-500' />
						</div>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>Ainda Não Há Vagas</h2>
						<p className='text-gray-600 mb-6'>Conecte-se com outras pessoas para começar a ver publicações no seu feed!</p>
					</div>
				)} */}
			</div>
		</div>
	);
};
export default HomePage;
