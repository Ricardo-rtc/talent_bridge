import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
	return (
		<div className='bg-[#4acad9] h-screen overflow-y-auto'>
			<Navbar />
			<main className='max-w-7xl mx-auto px-4 py-6'>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
