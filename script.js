document.addEventListener("DOMContentLoaded", function () {
    const labels = {
      intensite: ["Calme", "Énergique", "Très énergique"],
      complexite: ["Facile", "Moyenne", "Difficile"],
    };
  
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
      filtrerChants(); // Refiltrer les chants dès que l'utilisateur tape
    });
  
    // Affiche les détails de plusieurs chants
    function afficherListeChants(chants) {
      const chantsContainer = document.querySelector('.chants-container');
      chantsContainer.innerHTML = ""; // Réinitialise le contenu précédent
  
      if (chants.length === 0) {
        afficherMessageAucunResultat(); // Affiche le message si aucun chant n'est trouvé
      } else {
        chants.forEach(chant => {
          const chantDiv = document.createElement('div');
          chantDiv.classList.add('chant-item');
  
          chantDiv.innerHTML = `
            <h2>${chant.titre}</h2>
            <p><strong>Paroles :</strong> ${chant.paroles.replace(/\n/g, '<br>')}</p>
            <p><strong>Tranche d'âge :</strong> ${chant.age}</p>
            <p><strong>Intensité :</strong> ${labels.intensite[chant.intensite - 1]}</p>
            <p><strong>Complexité :</strong> ${labels.complexite[chant.complexite - 1]}</p>
          `;
  
          chantsContainer.appendChild(chantDiv);
  
          // Ajouter un événement de clic sur chaque élément pour afficher les détails dans le pop-up
          chantDiv.addEventListener('click', function () {
            afficherPopupChant(chant);
          });
        });
  
        cacherMessageAucunResultat();
        chantsContainer.style.display = "grid"; // S'assure que la grille est affichée
      }
    }
  
    // Filtrage dynamique
    function filtrerChants() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase(); // Récupère le terme de recherche et le met en minuscule
        const age = document.getElementById('filter-age').value;
        const intensite = document.getElementById('filter-intensite').value;
        const complexite = document.getElementById('filter-complexite').value;
    
        // Filtrer les chants en fonction du terme de recherche et des autres filtres
        const chantsFiltres = chantsData.filter(chant => {
        const titre = chant.titre.toLowerCase(); // Transforme le titre en minuscule
        const paroles = chant.paroles.toLowerCase(); // Transforme les paroles en minuscule
    
        // Vérifie le champ de recherche
        const matchesSearchTerm = !searchTerm || titre.includes(searchTerm) || paroles.includes(searchTerm);
    
        // Vérifie les autres filtres (âge, intensité, complexité)
        const matchesAge = !age || chant.age === age;
        const matchesIntensite = !intensite || chant.intensite == intensite;
        const matchesComplexite = !complexite || chant.complexite == complexite;
    
        // Le chant est valide si tous les critères sont remplis
        return matchesSearchTerm && matchesAge && matchesIntensite && matchesComplexite;
        });
    
        afficherListeChants(chantsFiltres); // Affiche les chants filtrés
    }
    
    // Ajout des événements pour les filtres
    document.querySelectorAll('.filter').forEach(filter => {
        filter.addEventListener('change', filtrerChants);
    });
    
    // Appel initial de filtrerChants pour appliquer les filtres de départ lors du chargement de la page
    document.addEventListener('DOMContentLoaded', () => {
        filtrerChants();
    });
    
  
  
  
  
    // Gère l'affichage du message "Aucun chant trouvé"
    function afficherMessageAucunResultat() {
      const chantsContainer = document.querySelector('.chants-container');
      chantsContainer.style.display = "none"; // Cache le conteneur des chants
  
      const mainContent = document.getElementById('main-content');
      let message = document.getElementById('aucun-resultat');
  
      if (!message) {
        message = document.createElement('p');
        message.id = 'aucun-resultat';
        message.textContent = "Aucun chant trouvé pour les critères sélectionnés.";
        mainContent.appendChild(message);
      }
  
      message.style.display = "block";
    }
  
    // Cache le message "Aucun chant trouvé"
    function cacherMessageAucunResultat() {
      const message = document.getElementById('aucun-resultat');
      if (message) {
        message.style.display = "none";
      }
    }
  
    // Afficher le pop-up avec les détails du chant
    function afficherPopupChant(chant) {
      const modal = document.getElementById('chant-modal');
      const title = document.getElementById('chant-title');
      const paroles = document.getElementById('chant-paroles');
      const age = document.getElementById('chant-age');
      const intensite = document.getElementById('chant-intensite');
      const complexite = document.getElementById('chant-complexite');
    
      // Références pour l'audio
      const audioPlayer = modal.querySelector('audio');
      const audioSource = audioPlayer.querySelector('source');
    
      // Mettre à jour les informations
      title.textContent = chant.titre;
      paroles.innerHTML = chant.paroles.replace(/\n/g, '<br>');
      age.textContent = chant.age;
      intensite.textContent = labels.intensite[chant.intensite - 1];
      complexite.textContent = labels.complexite[chant.complexite - 1];
    
      // Charger le fichier audio correct
      if (chant.audio) {
        audioSource.src = chant.audio; // Associe la bonne source audio
        audioPlayer.style.display = "block"; // Affiche le lecteur audio
        audioPlayer.load(); // Recharge le lecteur audio
      } else {
        audioPlayer.style.display = "none"; // Cache le lecteur si pas d'audio
      }
    
      modal.style.display = "flex"; // Affiche la modale
    }
    
  
    // Fermer le pop-up lorsqu'on clique sur le fond
    document.getElementById('chant-modal').addEventListener('click', function (event) {
      if (event.target === this) {
        fermerPopup();
      }
    });
  
    // Fermer le pop-up lorsqu'on clique sur le bouton de fermeture
    document.getElementById('close-modal').addEventListener('click', function () {
      fermerPopup();
    });
  
    // Fonction pour fermer le pop-up
    function fermerPopup() {
      const modal = document.getElementById('chant-modal');
      modal.style.display = "none"; // Cache le pop-up
    }
  
    // Initialisation : afficher tous les chants
    afficherListeChants(chantsData);
  });
  