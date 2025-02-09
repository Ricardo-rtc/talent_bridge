import { Link, useNavigate } from "react-router-dom";
import { usuarioAutenticado } from "../../utils/auth";
import "../../styles/main.css";

const Navbar = () => {
	const navigate = useNavigate();
	function logout() {
		localStorage.removeItem("token");
		navigate("/login");
	}


	return (
		<nav className='bg-primary shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-3'>
					<div className='flex items-center space-x-4'>
					</div>
					{usuarioAutenticado() ? (
						<>
							<div className="header_content container">
								<div id="title">
									<h1>TalentBridge</h1>
								</div>

								<ul>
									<li><Link to="/home">Início</Link></li>
									<li><Link to="/profile">Perfil</Link></li>
									<button
										className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
										onClick={() => logout()}
									><li><Link to="/login">Sair</Link></li></button>
								</ul>
							</div>
						</>
					) : (
						<>
							<div className="header_content container">
								<div id="title">
									<h1>TalentBridge</h1>
								</div>

								<ul>
									<li><Link to='/login'>Entrar</Link></li>
									<li><Link to='/signup'>Inscreva-se ja</Link></li>
								</ul>
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
