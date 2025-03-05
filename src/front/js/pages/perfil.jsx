import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Perfil = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem('token')) navigate('/')
			actions.getUserData()
	},[])

	const handleLogout = () => {
		actions.logout()
		navigate('/')
	}

	return (
		<div className="container">
			<h2>User Profile</h2>
			<p>correo: {store.user?.email}</p>

			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};