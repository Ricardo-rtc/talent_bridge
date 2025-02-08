import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import OpeningsPage from "./pages/OpeningsPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";

function App() {
	// function isLogged() {
	// 	return localStorage.getItem("tokenGerado") !== null;
	// }
	return (
		<>
			<Toaster />
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route element={<Layout />}>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/home' element={<HomePage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/notifications' element={<NotificationsPage />} />
					<Route path='/network' element={<NetworkPage />} />
					<Route path='/openings/:openingId' element={<OpeningsPage />} />
					<Route path='/profile/:username' element={<ProfilePage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
