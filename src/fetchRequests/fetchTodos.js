// L'url de l'api est stocké dans un fichier séparé
import { apiUrl, userKey } from "../../config";

// Cette fonction renvoie la liste des todos. Elle est asynchrone car elle contient des méthodes asynchrones (notament l'appel à l'api)
export async function fetchTodos() {
	// Etant donné qu'on a du code qui peut potentiellement avoir des erreurs (car on appelle une api externe) il faut le mettre dans un bloc try.
	try {
		// Un header d'authentification "userKey" est nécessaire pour récupérer les todos.
		// Il faut donc le rajouter dans la méthode fetch
		const responseTodos = await fetch(apiUrl + "todos", {
			method: "GET",
			headers: {
				userKey: userKey,
			},
		});

		// La réponse de la requête a un status qui renseigne si elle s'est déroulé correctement.
		// Il faut vérifier que la requête a un statut OK et si ce n'est pas le cas, renvoyer une erreur
		// Les status entre 200 et 299 sont OK. Les autres signifient que la requête ne s'est pas bien déroulée
		// response.ok renvoie true si le status est compris entre 200 et 299
		if (responseTodos.ok) {
			// Si la response est OK il faut récupéré la donnée sous un format exploitable.
			// C'est ce que permet la méthode "json()". C'est une méthode asynchrone, il faut donc utiliser le mot clé await lorsqu'on l'utilise.
			const dataTodos = await responseTodos.json();
			return dataTodos;
		} else {
			console.error(
				"Une erreur est survenue lors de la récupération des todos"
			);
		}
	} catch (e) {
		console.log(e.message);
	}
}

// Cette fonction renvoie une unique todo correspondant à l'id passé en param
export async function fetchSingleTodo(id) {
	try {
		// Un header d'authentification "userKey" est nécessaire pour récupérer les todos.
		const responseTodo = await fetch(apiUrl + "todos/" + id, {
			method: "GET",
			headers: {
				userKey: userKey,
			},
		});
		if (responseTodo.ok) {
			const dataTodo = await responseTodo.json();

			const responseUser = await fetch(apiUrl + "users/" + dataTodo.userId);

			if (responseUser.ok) {
				const dataUser = await responseUser.json();
				return [dataTodo, dataUser];
			} else {
				console.error(
					"Une erreur est survenue lors de la récupération du user"
				);
			}
		} else {
			console.error("Une erreur est survenue lors de la récupération du todo");
		}
	} catch (e) {
		console.log(e.message);
	}
}

// Cette fonction créé une todo en effectuant une requête POST à l'API
export async function postTodo(form) {
	try {
		// On transforme l'élément html "form" récupéré en paramètre de la fonction en un objet JSON compréhensible par l'api
		// C'est cet objet qu'on passera dans le body de notre requête fetch.
		const formData = new FormData(form);
		const plainFormData = Object.fromEntries(formData.entries());
		const formDataJsonString = JSON.stringify(plainFormData);

		// Un header d'authentification "userKey" est nécessaire pour récupérer les todos.
		// Comme c'est une requête POST il faut également spécifier les données envoyées dans le champ "body"
		// Il faut aussi spécifier le type de données en ajoutant un champ "Content-Type" dans le header. Dans notre cas du JSON est envoyé.
		const reponse = await fetch(apiUrl + "todos/", {
			method: "POST",
			body: formDataJsonString,
			headers: {
				"Content-Type": "application/json",
				userKey: userKey,
			},
		});
		if (reponse.ok) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.log(e.message);
		return false;
	}
}

export async function deleteTodo(todoId) {
	// Etant donné qu'on a du code qui peut potentiellement avoir des erreurs (car on appelle une api externe) il faut le mettre dans un bloc try.
	try {
		// Un header d'authentification "userKey" est nécessaire pour récupérer les todos.
		// Il faut donc le rajouter dans la méthode fetch
		const responseDeleteTodo = await fetch(apiUrl + "todos/" + todoId, {
			method: "DELETE",
			headers: {
				userKey: userKey,
			},
		});

		// La réponse de la requête a un status qui renseigne si elle s'est déroulé correctement.
		// Il faut vérifier que la requête a un statut OK et si ce n'est pas le cas, renvoyer une erreur
		// Les status entre 200 et 299 sont OK. Les autres signifient que la requête ne s'est pas bien déroulée
		// response.ok renvoie true si le status est compris entre 200 et 299
		if (responseDeleteTodo.ok) {
			// Si la response est OK il faut récupéré la donnée sous un format exploitable.
			// C'est ce que permet la méthode "json()". C'est une méthode asynchrone, il faut donc utiliser le mot clé await lorsqu'on l'utilise.
			return true;
		} else {
			console.error(
				"Une erreur est survenue lors de la récupération des todos"
			);
			return false;
		}
	} catch (e) {
		console.log(e.message);
		return false;
	}
}
