const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			auth: localStorage.getItem('token') ||false,

		},
		actions: {
			// Use getActions to call a function within a fuction
			getUserData: async () => {
				try {
					const resp = await fetch('https://scaling-system-g4x445vxv54gc9pv5-3001.app.github.dev/api/protected', 
					{
						method: 'GET',
						headers:{
							'Content-type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
					})

					if(!resp.ok) throw new Error('error registering')

					const data = await resp.json()
					console.log(data)

					setStore({user: data.user})

				} catch (error) {
					console.log(error)
				}
			},


			register: async formData => {
				try {
					const resp = await fetch('https://scaling-system-g4x445vxv54gc9pv5-3001.app.github.dev/api/register', 
					{
						method: 'POST',
						headers:{'Content-type': 'application/json'},
						body: JSON.stringify(formData)
					})

					if(!resp.ok) throw new Error('error registering')

					const data = await resp.json()
					console.log(data)

					localStorage.setItem('token', data.token)
					setStore({auth: true, token: data.token})

				} catch (error) {
					console.log(error)
				}

			},


			login: async formData => {
				try {
					const resp = await fetch('https://scaling-system-g4x445vxv54gc9pv5-3001.app.github.dev/api/login',
					{
						method: 'POST',
						headers:{'Content-type': 'application/json'},
						body: JSON.stringify(formData)
					})

					if(!resp.ok) throw new Error('error in login')

					const data = await resp.json()
					console.log(data)

					localStorage.setItem('token', data.token);
					setStore({auth: true, token: data.token, user: data.user,});

				} catch (error) {
					console.log(error)
				}
			},
			
			
			logout:  () => {
				localStorage.removeItem('token')
				setStore({auth: true, false: null});
			},
			
			
			
			
			
			
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;