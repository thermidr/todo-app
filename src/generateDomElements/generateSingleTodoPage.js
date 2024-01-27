export function generateSingleTodoCard(parentHtmlElement, todo, user) {
	const divUser = document.createElement("div");
	divUser.classList.add("todo-details");
	const pUserName = generateUserNameHeader(user);
	const pTitle = generateTodoTitle(todo);
	const pBody = generateTodoBody(todo);
	divUser.append(pUserName, pTitle, pBody);
	parentHtmlElement.append(divUser);
}

function generateUserNameHeader(user) {
	const pUserName = document.createElement("h3");
	pUserName.classList.add("user-infos");
	pUserName.textContent = user.name;
	return pUserName;
}

function generateTodoTitle(todo) {
	const pTitle = document.createElement("p");
	pTitle.classList.add("todo");
	pTitle.innerHTML = `<p class="title">Titre: </p> <p> ${todo.title} </p>`;
	return pTitle;
}
function generateTodoBody(todo) {
	const pBody = document.createElement("p");
	pBody.classList.add("todo");
	pBody.innerHTML = `<p class="title">Contenu: </p> <p> ${todo.body} </p>`;
	return pBody;
}
