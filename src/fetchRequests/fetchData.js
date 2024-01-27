import { fetchUsers } from "./fetchUsers";
import { fetchTodos } from "./fetchTodos";

// Cette fonction récupère les todos associé à un utilisateur.
function getTodosByUser(todos, user) {
	// La méthode filter permet de filtrer uniquement sur les todos dont le champ "userId" correspond au champ "id" du user.
	return todos.filter((todo) => todo.userId === user.id);
}

function mergeTodoAndUsers(todos, users) {
	// La fonction map prend un tableau d'objet et retourne le même tableau mais en transformant les objets
	// Dans le cas ci dessous il prend le tableau contenant les users et transforme chaque user en un nouvel objet contenant son nom et ses todos.
	// Les todos du user sont récupérés en appelant la fonction getTodosByUser définie ci-dessus.
	return users.map((user) => {
		return {
			name: user.name,
			todos: getTodosByUser(todos, user),
		};
	});
}

export async function fetchData() {
	// Récupère les todos
	const dataTodos = await fetchTodos();
	// Récupère les users
	const dataUsers = await fetchUsers();
	if (dataTodos && dataUsers) {
		const data = mergeTodoAndUsers(dataTodos, dataUsers);
		return data;
	}

	// Associe à chaque user sa liste de todo
	// Il est important d'attendre d'avoir récupéré chaque données (users et todos) avant de pouvoir effectuer des traitements.
}
