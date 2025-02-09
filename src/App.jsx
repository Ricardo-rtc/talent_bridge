import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import OpeningCreationPage from "./pages/OpeningCreationPage";

function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route element={<Layout />}>
					<Route path='/create' element={<OpeningCreationPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/home' element={<HomePage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/profile' element={<ProfilePage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
