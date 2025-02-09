import OpeningForm from "../components/OpeningForm";

const OpeningCreationPage = () => {
	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-3xl shadow-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<OpeningForm />
				</div>
			</div>
		</div>
	);
};
export default OpeningCreationPage;
