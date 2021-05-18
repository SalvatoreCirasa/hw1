//FUNZIONE PER CARICARE LE MIE SPEDIZIONI DAL DB
let i=0;

function caricaSpedizioni(json){

    if (!json){
        const spedizione = document.querySelector('#spedizioni_effettuate');
        const no_spedizioni = document.createElement('h2');
        no_spedizioni.classList.add('nessuna_spedizione');
        no_spedizioni.textContent = 'Nessuna Spedizione Effettuata';
        spedizione.appendChild(no_spedizioni);
         return null;
        } 

        const spedizione = document.querySelector('#spedizioni_effettuate');
        spedizione.style.height = '1000px';

    for(elemento of json){
        const div = document.createElement('div');
        div.classList.add('container_spedizione');

        const div_codice = document.createElement('div');
        div_codice.classList.add('container_codice');

        const codice = document.createElement('p');
        codice.textContent = elemento.codice_spedizione;
        codice.classList.add('text');

        const div_nome_cognome = document.createElement('div');
        div_nome_cognome.classList.add('container_nome_cognome');

        const nome_cognome = document.createElement('p');
        nome_cognome.textContent = "Destinatario : " + elemento.nome_dest + "  " + elemento.cognome_dest;
        nome_cognome.classList.add('text_elem');

        const div_città_data = document.createElement('div');
        div_città_data.classList.add('container_città_data');

        const città_data = document.createElement('p');
        città_data.textContent = "Città di destinazione : " + elemento.città_dest + ", Spedito il : " + elemento.data_spedizione;
        città_data.classList.add('text_elem');

        const div_button = document.createElement('div');
        div_button.classList.add('container_button');
        
        const button = document.createElement('button');
        button.textContent = "Annulla Spedizione";
        button.classList.add('button');


        div_button.appendChild(button);
        div_città_data.appendChild(città_data);
        div_codice.appendChild(codice);
        div_nome_cognome.appendChild(nome_cognome);
        div.appendChild(div_nome_cognome);
        div.appendChild(div_codice);
        div.appendChild(div_città_data);
        div.appendChild(div_button);
        spedizione.appendChild(div);
        i++;

        check_spedizioni();
    }
}

function onResponse(response){
    if(!response.ok){
        console.log('Risposta non valida');
        return null;
    }else return response.json();
}

fetch("http://localhost/caricaSpedizioni.php").then(onResponse).then(caricaSpedizioni);


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

//FUNZIONE ELIMINA SPEDIZIONI DAL DB

function Rimuovi_Spedizione(event){
    const pulsante = event.currentTarget;
    const container_button = pulsante.parentNode;
    const box = container_button.parentNode;
    const codice = box.querySelector('.text').textContent;

    const formdata = new FormData();
    formdata.append('codice_spedizione',codice);
    fetch('rimuovi_spedizione.php', {method:'post',body:formdata});
    box.remove();
    i--;
    check_spedizioni();
    }

function sel_spedizione(){
const Tutte_le_spedizioni = document.querySelectorAll(".button");
for(spedizione of Tutte_le_spedizioni){
    spedizione.addEventListener('click',Rimuovi_Spedizione);
}
}

setTimeout(sel_spedizione, 100);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

function check_spedizioni(){
    
    if(i==0){
        const spedizione = document.querySelector('#spedizioni_effettuate');
        const no_spedizioni = document.createElement('h2');
        no_spedizioni.classList.add('nessuna_spedizione');
        no_spedizioni.textContent = 'Nessuna Spedizione Effettuata';
        spedizione.appendChild(no_spedizioni);
        spedizione.style.height = '400px';
    }
    if(i==2){
        const spedizione = document.querySelector('#spedizioni_effettuate');
        spedizione.style.height = '1200px';
    }
    if(i>3){
        const spedizione = document.querySelector('#spedizioni_effettuate');
        spedizione.style.height = '1500px';
    }
}