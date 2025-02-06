import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-3xl shadow-lg rounded-3xl'>
				<div className='bg-white py-8 px-4 sm:rounded-3xl sm:px-10'>
					<LoginForm />
					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white text-gray-500'>Novo no Talent Bridge?</span>
							</div>
						</div>
						<div className='mt-6'>
							<Link
								to='/signup'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#1F82BF] bg-white hover:bg-gray-50'
							>
								Inscreva-se já
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
