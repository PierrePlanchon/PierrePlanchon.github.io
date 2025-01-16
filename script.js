document.addEventListener("DOMContentLoaded", function() {
    let chantsData = [];

    const labels = {
        intensite: ["Calme", "Énergique"],
        complexite: ["Facile", "Moyenne"],
        longueur: ["Courte", "Moyenne"]
    };

    // Charger les chants depuis le fichier JSON
    fetch('chants.json')
        .then(response => response.json())
        .then(chants => {
        chantsData = chants;
        afficherDernierChant();
        })
        .catch(error => console.error('Erreur de chargement des chants:', error));

    // Affiche le dernier chant ajouté
    function afficherDernierChant() {
        if (chantsData.length > 0) {
        afficherDetails(chantsData.length - 1);
        }
    }

    // Affiche les détails d'un chant
    function afficherDetails(index) {
        const chant = chantsData[index];
        document.getElementById('chant-title').textContent = chant.titre;
        document.getElementById('chant-paroles').innerHTML = chant.paroles.replace(/\n/g, '<br>');
        document.getElementById('chant-tranche-age').textContent = chant.age;
        document.getElementById('chant-intensite').textContent = labels.intensite[chant.intensite - 1];
        document.getElementById('chant-complexite').textContent = labels.complexite[chant.complexite - 1];
        document.getElementById('chant-longueur').textContent = labels.longueur[chant.longueur - 1];
    }

    // Filtrage dynamique
    document.querySelectorAll('.filter').forEach(filter => {
        filter.addEventListener('change', filtrerChants);
    });

    function filtrerChants() {
        const age = document.getElementById('filter-age').value;
        const intensite = document.getElementById('filter-intensite').value;
        const complexite = document.getElementById('filter-complexite').value;

        const chantsFiltres = chantsData.filter(chant => {
        return (!age || chant.age === age) &&
                (!intensite || chant.intensite == intensite) &&
                (!complexite || chant.complexite == complexite);
        });

        afficherChants(chantsFiltres);
    }

    function afficherChants(chants) {
        if (chants.length > 0) {
        afficherDetails(0); // Afficher le premier chant de la liste filtrée
        } else {
        document.getElementById('chant-details').innerHTML = "<p>Aucun chant trouvé.</p>";
        }
    }
    });