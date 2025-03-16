# Pep'eat
##### Projet bloc web avancé - 2025
##### Groupe 2 : [DEXES Victor](https://github.com/VictorDexes) - [MENANTEAU Melvin](https://github.com/Melvin-Menanteau) - [MERCIER Charly](https://github.com/Charlyhno-eng) - [PETIT Victor](https://github.com/Faugnell)

![pep'eat logo](./src/pepeat-logo.png)

## Sommaire

- [1. Présentation de l'équipe et des rôles]
- [2. Reformulation du besoin]
- [3. Reformulation des points critiques et analyse des risques]
  - [3.1 Reformulation des points critiques]
  - [3.2 Analyse des risques (AMDEC)]
- [4. Présentation de l'architecture]
- [5. Choix des technologies] 
  - [5.1 Moins de re-rendus inutiles]
  - [5.2 Syntaxe plus simple et intuitive]
  - [5.3 Documentation plus accessible]
- [6. Maquette de l'application]
- [7. Diagramme de cas d'utilisation]
- [8. Diagramme de la base de données]
- [9. Présentation du plan d’intégration et de déploiement continu] 
- [10. Planification prévisionnelle]
  - [10.1 Découpage du projet en phases]
  - [10.2 Diagramme de Gantt ou tableau Kanban]
  - [10.3 Répartition des tâches et estimations de charge de travail] 
- [11. Questions à débattre]
  - [11.1 Points à clarifier avec les encadrants ou clients] 
  - [11.2 Alternatives technologiques possibles]
  - [11.3 Éventuels ajustements du périmètre du projet]

## 1. Présentation de l'équipe et des rôles

- **Dexes Victor :** UX/UI + Développeur fullstack
- **Menanteau Melvin :** Lead dev + Développeur fullstack
- **Mercier Charly :** Administrateur de base de données - Développeur fullstack
- **Petit Victor :** DevOps + Développeur fullstack

## 2. Reformulation du besoin

## 3. Reformulation des points critiques et analyse des risques

### 3.1. Reformulation des points critiques  

### 3.2. Analyse des risques (AMDEC)

||**Composant**|**Mode de défaillance**|**Effet de la défaillance**|**Fréquence (F)**|**Gravité (G)**|**Détectabilité (D)**|**Criticité (C = F * G * D)**|**Actions recommandées**|
|--|--------------|-------------|-------------------------------------------|-------------------|-----------------|-----------------------|-------------------------|----------------------------------------|
|1|Plateforme Middleware|Indisponibilité des services ou des composants|Inaccessibilité de la plateforme pour les utilisateurs|3|4|3|36|Mettre en place des mécanismes de monitoring des services|
|2|API|Erreur dans l'intégration de composants|Application tierce non fonctionnelle ou incompatible|2|3|3|18|Tester en continu les API et documenter les versions pour garantir la compatibilité|
|3|Base de données Relationnelle|Perte de données lors de l'écriture|Corruption de données critiques (commandes, informations clients)|2|4|2|16|Implémenter des sauvegardes régulières et une gestion des erreurs lors des écritures|
|4|Microservices|Défaillance d'un microservice|Service spécifique indisponible, impact sur plusieurs fonctionnalités|3|4|2|24|Mettre en place une architecture résiliente avec une gestion des pannes des microservices|
|5|Application Client|Problèmes d'interface utilisateur (UI/UX)|Mauvaise expérience utilisateur, baisse de satisfaction|2|3|3|18|Réaliser des tests utilisateurs et optimiser l'UI pour la rendre plus intuitive|
|6|Sécurité (Authentification) |Failles de sécurité dans l'authentification|Accès non autorisé aux données des utilisateurs ou restaurateurs|2|4|2|16|Renforcer les politiques de sécurité (authentification forte, chiffrement des données)|
|7|Livraison|Problèmes dans la gestion des livraisons|Retards, erreurs de livraison, mauvaise expérience client|3|3|3|27|Développer une fonctionnalité de suivi en temps réel et des alertes sur les livraisons|
|8|Notifications|Notifications non envoyées ou mal configurées|Informations importantes non reçues par les utilisateurs|3|3|3|27|Améliorer le système de notification et effectuer des tests de réception|
|9|Service Commercial|Erreur dans la gestion des commandes ou suivi des paiements |Perte de commandes, erreurs dans la facturation des clients|2|4|2|16|Auditer régulièrement le système de gestion des commandes et des paiements|
|10|Développeur tiers|Mauvaise documentation des API|Difficulté pour les développeurs tiers à intégrer des composants|3|3|3|27|Améliorer et maintenir une documentation API complète et bien structurée|

## 4. Présentation de l'architecture

## 5. Choix des technologies

Lors du choix des technologies front-end pour le projet, nous avons hésité entre React et Vue.js, et donc entre les frameworks Next.js et Nuxt.js. Au sein de notre équipe de quatre personnes, trois sont actuellement développeurs web en alternance : deux travaillent quotidiennement avec React, tandis que le troisième utilise Vue.js. Le dernier membre de l’équipe, quant à lui, ne possède pas d’expérience en développement web.

Après réflexion, nous avons choisi d’utiliser Vue.js avec Nuxt.js. Ce choix s’est imposé pour plusieurs raisons. Tout d’abord, cela nous permet de découvrir une nouvelle technologie en pleine évolution, offrant ainsi l’opportunité d’élargir nos compétences. Ensuite, Vue.js est moins flexible que React, ce qui impose un cadre plus structurant et garantit un code plus uniforme, facilitant la collaboration entre les membres de l’équipe. Enfin, Vue.js possède une syntaxe plus simple et intuitive, un atout majeur pour le membre de l’équipe qui débute en développement web, lui permettant ainsi de monter en compétences plus rapidement.

<p align="center">À gauche le code React et à droite le code Vue</p>

![comparatif code Vue vs React](./src/compare_code_react_vue.png) 

### 5.1. Vue vs React - Moins de re-rendus inutiles  
- En **React**, chaque mise à jour de `count` entraîne un re-rendu du composant entier. On voit d'ailleurs que `console.log("runs again")` s'exécute à chaque clic.  
- En **Vue**, la mise à jour de `count` ne provoque pas un re-rendu du composant entier, seulement la partie affectée. C'est pourquoi `console.log("runs only once")` ne s'exécute qu'une seule fois.  

### 5.2. Vue vs React - Syntaxe plus simple et intuitive  
- **Vue** utilise `ref(0)`, ce qui permet de modifier `count` directement avec `count++`.  
- **React** utilise `useState(0)`, et il faut passer par `setCount(count + 1)`, ce qui est plus verbeux.  

### 5.3. Vue vs React - Documentation plus accessible
Un autre avantage de Vue est sa documentation, bien plus claire et accessible que celle de React. Il est parfois difficile de trouver ce que l'on cherche dans la documentation de React, car les informations sont éparpillées. Avec Vue, tout est mieux structuré, ce qui facilite l'apprentissage et le développement. https://vuejs.org/

## 6. Maquette de l'application

## 7. Diagramme de cas d'utilisation

## 8. Diagramme de la base de données

En allant sur le lien suivant, vous pourrez voir les différentes cardinalités de notre schéma.
https://dbdiagram.io/d/bdd_pepeat-67d15c0f75d75cc844ca22bc

![diagramme de la BDD](./src/diagramme_bdd.png) 

## 9. Présentation du plan d’intégration et de déploiement continu

## 10. Planification prévisionnelle (à voir ensemble)
- Découpage du projet en phases
- Diagramme de Gantt ou tableau Kanban
- Répartition des tâches et estimations de charge de travail

## 11. Questions à débattre (à voir ensemble)
- Points à clarifier avec les encadrants ou clients
- Alternatives technologiques possibles
- Éventuels ajustements du périmètre du projet
