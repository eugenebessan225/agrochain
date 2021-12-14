pragma solidity >=0.4.22 <0.9.0;

contract Agrochain {

    uint public productNumber = 0;
    uint public achatNumber = 0;

    struct Product {
        uint id_agri;
        string nom_agri;
        string habitation_agri;
        string telephone_agri;
        string nom_produit;
        string prix_agri;
        uint date_prod;
        uint date_exp;
    }

        

    struct Achat {
        uint date_achat;
        string acheteur;
        string lieu;
        string nom_produit;
        uint id_famer;
    }



    mapping(uint => Product) public products;

    mapping(uint => Achat) public achats;

    event ProductCreated(
        uint id_agri,
        string nom_agri,
        string habitation_agri,
        string telephone_agri,
        string nom_produit,
        string prix_agri,
        uint date_prod,
        uint date_exp
        
    );

        

    event AchatCreated(
        uint date_achat,
        string acheteur,
        string lieu,
        string nom_produit,
        uint id_famer
    );


    function createProduct(uint id_agri, string memory _nom_agri, string memory _telephone_agri, string memory _habitation_agri, string memory _nom_produit, string memory _prix_agri, uint date_prod, uint date_exp) public {
        productNumber ++;
        products[productNumber] = Product(id_agri, _nom_agri, _habitation_agri, _telephone_agri,_nom_produit, _prix_agri, date_prod, date_exp);
        emit ProductCreated(id_agri, _nom_agri, _habitation_agri, _telephone_agri,_nom_produit, _prix_agri, date_prod, date_exp);
    }



   function createAchat(uint date_achat, string memory _acheteur, string memory _lieu, string memory _nom_produit, uint id_famer) public {
        achatNumber ++;
        achats[achatNumber] = Achat(date_achat, _acheteur, _lieu, _nom_produit, id_famer);
        emit AchatCreated(date_achat, _acheteur, _lieu, _nom_produit, id_famer);
    }


}