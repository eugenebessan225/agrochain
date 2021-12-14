App = {
    contracts: {},
    famer: [],
    products: [],

    value:"",


  
    load: async () => {
        await App.connectMetamask()
        await App.loadAccount()
        await App.render()
        await App.loadContract()
        await App.renderAchat()
        

    },
  
    connectMetamask: async () => {

        //connexion by button
        const ethereumButton = document.querySelector('#enableEthereumButton');
        const showAccount = document.querySelector('#showAccount');

        if (window.ethereum) {
            App.web3Provider = window.ethereum; 

            ethereumButton.addEventListener('click', async () => {
                
                await ethereum.request({ method: 'eth_requestAccounts' });

            });

        }

        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
              // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

    },

    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]

        console.log(App.account);
        console.log("####### account end ########");

    },


    loadContract: async () => {
        // Create a JavaScript version of the smart contract

        const agrochain = await $.getJSON('Agrochain.json')

        App.contracts.Agrochain = TruffleContract(agrochain)

        App.contracts.Agrochain.setProvider(App.web3Provider)


        // Hydrate the smart contract with values from the blockchain
        App.agrochain = await App.contracts.Agrochain.deployed()
        

    },

    render: async () => {
   
    
        // Render Account
        $('#showAccount').html(App.account)
        $('#value').html(App.value)
    

    },

    renderProducts: async () => {
        // Load the total task count from the blockchain
        console.log('loading')
        const nom_produit = document.querySelector('#nom_produit').value;
        console.log("######### product id #########");
        console.log(nom_produit);
        console.log("##############################");
        
        const productcount = await App.agrochain.productNumber()

        // Render out each task with a new task template
        for (var i = 1; i <= productcount; i++) {
            // Fetch the task data from the blockchain
            const product = await App.agrochain.products(i)
            App.products.push(product)
            console.log("got product"); 

            if (product[4] === nom_produit) {
                console.log("matching");
                App.famer = [productcount, product[0].toNumber(), product[1], product[2], product[3], product[4], product[5], product[6].toNumber(), product[7].toNumber()]
            
            }

        }

        console.log(App.products);

    

        $('#nom_agri').html(App.famer[2])
        $('#habitation_agri').html(App.famer[3])
        $('#telephone_agri').html(App.famer[4])
        $('#nom_produit').html(App.famer[5])
        $('#prix_agri').html(App.famer[6])
        $('#date_prod').html(App.famer[7])
        $('#date_exp').html(App.famer[8])

        
    },

    acheter: async () => {

        const date_achat = 2021
        const acheteur = "AZIZA"
        const lieu = "Ariana"
        const nom_produit = App.famer[5]
        const id_famer = App.famer[1]
        await App.agrochain.createAchat(date_achat, acheteur, lieu, nom_produit, id_famer, {from: App.account})
        
    },

    renderAchat: async () => {
        
        const productcount = await App.agrochain.productNumber()
        const achatcount = await App.agrochain.achatNumber()
        count = productcount - 1
        const qrTemplate = $('#qrcode-2')
        var trace

        for (var i = 1; i <= productcount; i++) {
            // Fetch the task data from the blockchain
            const product = await App.agrochain.products(i)
            App.products.push(product)
            console.log("got product"); 

        }


        for (var i = 0; i <= count; i++) {
            // Fetch the task data from the blockchain
            const achat = await App.agrochain.achats(i+1)
            console.log("got achat");

            arr_achat = [i, achat[0].toNumber(), achat[1], achat[2], achat[3], achat[4].toNumber()]

            App.achat = arr_achat.toString()

            console.log(App.achat.toString());

            //Opération de traçabilité
            console.log("##### 0000000000000000 ##########");
            console.log(App.products[i]);
            console.log("##### 0000000000000000 ##########");

            if (achat[4].toNumber() === App.products[i][0].toNumber()) {
                console.log("we got matching on trace");
                //trace = [achat, App.products[i]]
                trace = {
                    "nom ": App.products[i][4],
                    "prix ": App.products[i][5],
                    "date prod ": App.products[i][6].toNumber(),
                    "date exp ": App.products[i][7].toNumber(),
                    "producteur ": App.products[i][1],
                    "habitation ": App.products[i][3],
                    "telephone ": App.products[i][2],
                    "acheteur ": achat[1],
                    //"date achat ": achat[0].toNumber(),
                    "Lieu ": achat[2],

                }

                App.value = JSON.stringify(trace)

                sessionStorage.setItem("value", trace)

                console.log(JSON.stringify(trace));
            }

            //create each template

            var elem = document.createElement('div')
            elem.id = i
            elem.className = "col-2"

            document.getElementById("qrcode-2").appendChild(elem)

            var qrcode = new QRCode(document.getElementById(i),{
                text: JSON.stringify(trace),
                width: 128,
                height: 128,
                colorDark : "#5868bf",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });

        }
        console.log("achat number");
        console.log(achatcount.toNumber());
        
    },

    createProduct: async () => {
        const id_agri = parseInt(document.querySelector('#num_agri').value);
        const nom_agri = document.querySelector('#nom_agri').value;
        const habitation_agri = document.querySelector('#habitation_agri').value;
        const telephone_agri = document.querySelector('#telephone_agri').value;
        const nom_produit = document.querySelector('#nom_produit').value;
        const prix_agri = document.querySelector('#prix_agri').value;
        const date_prod = parseInt(document.querySelector('#date_prod').value);
        const date_exp = parseInt(document.querySelector('#date_exp').value);

        var data = [id_agri, nom_agri, habitation_agri, telephone_agri, nom_produit, prix_agri, date_prod, date_exp]

        console.log(data);

        App.agrochain.createProduct(id_agri, nom_agri, habitation_agri, telephone_agri, nom_produit, prix_agri, date_prod, date_exp, {from: App.account})


    },

    
}

window.onload = function() {
    App.load();
    Particles.init({
        selector: '.background',
        connectParticles: true,
        maxParticles: 100,
    });
    
};


$(document).ready(function(){
        $('#form1').show();
        $('#form2').hide();

        $("#formok").click(function(){
            $("#form1").hide();
            $('#form2').show();
        });
         $("#Valider").click(function(){

            swal({
                title: "Vous êtes sûr?",
                text: "Une fois valider, vous ne pouvez pas retourner en arrière",
                icon: "info",
                buttons: true,
                dangerMode: false,
                })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Enregistrement validé! Veuillez valider l'operation depuis votre portefeuille", {
                        icon: "success",
                    });
                    App.createProduct();
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);    
                } 
                else {
                    swal("Enregistrement non validé", {
                       icon: "error", 
                    });
                }
            });
    
         })
 })


