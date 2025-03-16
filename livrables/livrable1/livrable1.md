# Pep'eat
##### Projet bloc web avancé - 2025
##### Groupe 2 : [DEXES Victor](https://github.com/VictorDexes) - [MENANTEAU Melvin](https://github.com/Melvin-Menanteau) - [MERCIER Charly](https://github.com/Charlyhno-eng) - [PETIT Victor](https://github.com/Faugnell)

![pep'eat logo](./src/pepeat-logo.png)

## Sommaire

- [1. Présentation de l'équipe et des rôles](#1-présentation-de-léquipe-et-des-rôles)  
- [2. Reformulation du besoin](#2-reformulation-du-besoin)  
- [3. Reformulation des points critiques et analyse des risques](#3-reformulation-des-points-critiques-et-analyse-des-risques)  
- [4. Présentation de l'architecture](#4-présentation-de-larchitecture)  
- [5. Choix des technologies](#5-choix-des-technologies)  
- [6. Comparatif code Vue vs React](#6-comparatif-code-vue-vs-react)  
  - [6.1 Moins de re-rendus inutiles](#61-moins-de-re-rendus-inutiles)  
  - [6.2 Syntaxe plus simple et intuitive](#62-syntaxe-plus-simple-et-intuitive)  
  - [6.3 Documentation plus accessible](#63-documentation-plus-accessible)  
- [7. Maquette de l'application](#7-maquette-de-lapplication)  
- [8. Schéma de la base de données](#8-schéma-de-la-base-de-données)  
- [9. Présentation du plan d’intégration et de déploiement continu](#9-présentation-du-plan-dintégration-et-de-déploiement-continu)  
- [10. Planification prévisionnelle](#10-planification-prévisionnelle)  
  - [10.1 Découpage du projet en phases](#101-découpage-du-projet-en-phases)  
  - [10.2 Diagramme de Gantt ou tableau Kanban](#102-diagramme-de-gantt-ou-tableau-kanban)  
  - [10.3 Répartition des tâches et estimations de charge de travail](#103-répartition-des-tâches-et-estimations-de-charge-de-travail)  
- [11. Questions à débattre](#11-questions-à-débatre)  
  - [11.1 Points à clarifier avec les encadrants ou clients](#111-points-à-clarifier-avec-les-encadrants-ou-clients)  
  - [11.2 Alternatives technologiques possibles](#112-alternatives-technologiques-possibles)  
  - [11.3 Éventuels ajustements du périmètre du projet](#113-éventuels-ajustements-du-périmètre-du-projet)

## Présentation de l'équipe et des rôles

## Reformulation du besoin

## Reformulation des points critiques et analyse des risques

## Présentation de l'architecture

## Choix des technologies

Lors du choix des technologies front-end pour le projet, nous avons hésité entre React et Vue.js, et donc entre les frameworks Next.js et Nuxt.js. Au sein de notre équipe de quatre personnes, trois sont actuellement développeurs web en alternance : deux travaillent quotidiennement avec React, tandis que le troisième utilise Vue.js. Le dernier membre de l’équipe, quant à lui, ne possède pas d’expérience en développement web.

Après réflexion, nous avons choisi d’utiliser Vue.js avec Nuxt.js. Ce choix s’est imposé pour plusieurs raisons. Tout d’abord, cela nous permet de découvrir une nouvelle technologie en pleine évolution, offrant ainsi l’opportunité d’élargir nos compétences. Ensuite, Vue.js est moins flexible que React, ce qui impose un cadre plus structurant et garantit un code plus uniforme, facilitant la collaboration entre les membres de l’équipe. Enfin, Vue.js possède une syntaxe plus simple et intuitive, un atout majeur pour le membre de l’équipe qui débute en développement web, lui permettant ainsi de monter en compétences plus rapidement.

![comparatif code Vue vs React](./src/compare_code_react_vue.png) 

### 1. Moins de re-rendus inutiles  
- En **React**, chaque mise à jour de `count` entraîne un re-rendu du composant entier. On voit d'ailleurs que `console.log("runs again")` s'exécute à chaque clic.  
- En **Vue**, la mise à jour de `count` ne provoque pas un re-rendu du composant entier, seulement la partie affectée. C'est pourquoi `console.log("runs only once")` ne s'exécute qu'une seule fois.  

### 2. Syntaxe plus simple et intuitive  
- **Vue** utilise `ref(0)`, ce qui permet de modifier `count` directement avec `count++`.  
- **React** utilise `useState(0)`, et il faut passer par `setCount(count + 1)`, ce qui est plus verbeux.  

### 3. Documentation plus accessible
Un autre avantage de Vue est sa documentation, bien plus claire et accessible que celle de React. Il est parfois difficile de trouver ce que l'on cherche dans la documentation de React, car les informations sont éparpillées. Avec Vue, tout est mieux structuré, ce qui facilite l'apprentissage et le développement. https://vuejs.org/

## Maquette de l'application

## Schéma de la base de données

## Présentation du plan d’intégration et de déploiement continu

## Planification prévisionnelle
- Découpage du projet en phases
- Diagramme de Gantt ou tableau Kanban
- Répartition des tâches et estimations de charge de travail

## Questions à débattre
- Points à clarifier avec les encadrants ou clients
- Alternatives technologiques possibles
- Éventuels ajustements du périmètre du projet
