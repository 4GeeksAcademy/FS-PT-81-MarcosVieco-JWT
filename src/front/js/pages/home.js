import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { Formulario } from "../component/formulario.jsx";

export const Home = () => {

  const {store, actions} =useContext(Context)

	return (
		<div className="text-center mt-5">
			<h1>Register</h1>
			<Formulario type={'register'}/>
			<hr />
			<h1>Login</h1>
			<Formulario type={'login'}/>
		</div>
	);
}; 
