import { apiUrl } from "../../config";

export async function fetchUsers() {
	try {
		const responseUsers = await fetch(apiUrl + "users");

		if (responseUsers.ok) {
			const dataUsers = await responseUsers.json();
			return dataUsers;
		} else {
			console.error(
				"Une erreur est survenue lors de la récupération des users"
			);
		}
	} catch (e) {
		console.log(e.message);
	}
}
