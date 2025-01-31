import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";

const HomePage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: vagas } = useQuery({
		queryKey: ["vagas"],
		queryFn: async () => {
			const res = await axiosInstance.get("/vagas");
			return res.data;
		},
	});

	console.log("vagas", vagas);

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
				<PostCreation user={authUser} />

				{vagas && vagas.$values?.map((vagas) => (
					console.log("vagas2", vagas),
					<Post key={vagas.idVaga} post={vagas} />
				))}

				{vagas?.length === 0 && (
					<div className='bg-white rounded-lg shadow p-8 text-center'>
						<div className='mb-6'>
							<Users size={64} className='mx-auto text-blue-500' />
						</div>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>Ainda Não Há Publicações</h2>
						<p className='text-gray-600 mb-6'>Conecte-se com outras pessoas para começar a ver publicações no seu feed!</p>
					</div>
				)}
			</div>
		</div>
	);
};
export default HomePage;
