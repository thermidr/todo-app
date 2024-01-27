// Cette fonction prend une liste de users et rajoute toutes les options possibles dans le champ "select" du form correspondant aux utilisateurs
// www.w3schools.com/tags/tag_select.asp
export function genrateUserSelectHtmlElement(htmlElement, users) {
	// La fonction map prend un tableau d'objet et retourne le même tableau mais en transformant les objets
	// Dans le cas ci dessous il prend le tableau contenant les users et transforme chaque user en une balise html option avec le nom du user
	// On récupère donc une liste d'options qu'on va pouvoir ajouter à la balise select (voir lien vers la doc de la balise select ci-dessus)
	const usersOptions = users.map((user) => {
		return getOptionHtmlElement(user);
	});
	htmlElement.append(...usersOptions);
}

// Renvoie le code html pour une option
function getOptionHtmlElement(user) {
	const userOption = document.createElement("option");
	userOption.value = user.id;
	userOption.textContent = user.name;
	return userOption;
}
