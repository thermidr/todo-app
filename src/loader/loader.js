// Cette fonction cache le contenu de la page et affiche un spinner si loading est à true
// Si loading est à false cela réaffiche la page et supprime le spinner
export function setLoading(htmlElement, loading) {
	// Loading est à true le chargement est en cours
	if (loading) {
		// Cache le contenu de la page en ajoutant la classe "not-display"
		htmlElement.classList.add("not-display");

		// Crée une div et lui met la classe "loader" pour afficher le spinner. Ajoute le spinner au body
		const loader = document.createElement("div");
		loader.classList.add("loader");
		document.body.append(loader);
	}
	// Loading est à false le chargement est terminé
	else {
		// Supprime la div du spinner
		const loader = document.querySelector(".loader");
		loader.remove();

		// Réaffiche le contenu de la page en supprimant la classe "not-display"
		htmlElement.classList.remove("not-display");
	}
}
