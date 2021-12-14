# agrochain
###Ce document présente le fonctionnement de la plateforme “agrochain”

####Arborescence du projet


![abo](https://user-images.githubusercontent.com/54313119/145922194-3c2539e3-2548-48d4-9dc5-9a1c7db4d56e.png)

####Contexte
Cette Dapp se présente dans le contexte de la traçabilité des produits.
L’agriculteur enregistre son produit avec toutes les informations puis valide la transaction
Ensuite sur un autre compte, un supermarché, dans notre cas Aziza, recherche un produit puis l’achète.
La dernière partie concerne le client qui entre dans le supermarché pour ses achats. Celui-ci vérifie les QR codes pour avoir tous les détails sur le produit depuis la production chez l’agriculteur jusqu’à l’achat par le supermarché.

NB: Ce travail est à titre illustratif et ne respecte pas toutes les règles pour une application web ( ex: Mécanisme de sécurité hors blockchain, logique structurelle des objets …)

####Pour commencer
Télécharger le code source puis installer les packages nodes nécessaires via “npm install”
lancer ganache (le réseau RPC est: 127.0.0.1:7545)
configurer le réseau ethereum sur métamask et ajouter ses comptes.
lancer le projet avec “npm run dev” puis celui-ci s’ouvre dans le navigateur par défaut

Pas besoin de remplacer l’adresse du contrat. C’est géré automatiquement.


L’interface proposée contient 3 boutons pour les 3 processus métiers.
Suivre les étapes dans l’ordre et attendre que les transactions soient confirmées avant de passer à un autre processus (ex: passage de achat market à client pour visualiser). Au fur et à mesure que le market achète des produits, les produits sont disponibles chez le client (incrémentation des QR codes au nombre de produits)


Entre-temps vous pouvez vérifier au lancement de l’application pour constater que le market est vide (aucun code QR disposé) et qu’il n’y a aucun produit disponible pour que le market en achete (Recherche par produit ne donne aucun résultat).


