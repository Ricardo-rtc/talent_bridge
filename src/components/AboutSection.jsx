import { useState } from "react";

const AboutSection = ({ userData, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState({});

	const handleSave = () => {
		setIsEditing(false);
		onSave(about);
	};
	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Sobre</h2>

			<>
				{isEditing ? (
					<>
						<textarea
							value={about.descricao ?? userData.descricao }
							onChange={(e) => setAbout({...about, descricao: e.target.value})}
							className='w-full p-2 border rounded'
							rows='4'
						/>
						<button
							onClick={handleSave}
							className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark 
								transition duration-300'
						>
							Salvar
						</button>
					</>
				) : (
					<>
						<p>{userData.descricao}</p>
						<button
							onClick={() => setIsEditing(true)}
							className='mt-2 text-primary hover:text-primary-dark transition duration-300'
						>
							Editar
						</button>
					</>
				)}
			</>

		</div>
	);
};
export default AboutSection;
