     //FUNZIONE PER INSERIRE DINAMICAMENTE LA PRESENTAZIONE NEL MIO SITO TRAMITE PHP

     function onJSON3(json){
        let i =0;
       for(elemento of json){
            const container = document.createElement('div');
            container.classList.add('info');
            container.setAttribute('id',[i]);
            const immagine = document.createElement('img');
            immagine.setAttribute('class','pre_img');
            immagine.src=elemento.immagine;
            immagine.classList.add('pre_img');
            const titolo = document.createElement('h1');
            titolo.setAttribute('class','pre_titolo');
            titolo.textContent = elemento.titolo;
            titolo.classList.add('pre_titolo');
            const descrizione = document.createElement('p');
            descrizione.setAttribute('class','pre_paragrafo');
            descrizione.textContent= elemento.paragrafo;
            descrizione.classList.add('.pre_paragrafo');
            const link = document.createElement('a');
            link.setAttribute('class','pre_a');
            link.textContent= elemento.link;
            link.href= elemento.href;
            link.classList.add('pre_a');
            const section = document.querySelector('#presentazione');
            section.appendChild(container);
            container.appendChild(immagine);
            container.appendChild(titolo);
            container.appendChild(descrizione);
            container.appendChild(link);
            i++; 
        }
    }
    
    fetch("http://localhost/presentazione.php").then(onResponse).then(onJSON3);
 
 
 //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
 //FUNZIONE PER INSERIRE DINAMICAMENTE LA SEZIONE DEI DRONI NEL MIO SITO TRAMITE PHP

    function onJSON2(json){
        console.log(json);
        let i =0;
        for(elemento of json){
            let container = document.createElement('div');
            container.classList.add('container');
            container.setAttribute('id',[i]);
            const immagine = document.createElement('img');
            immagine.src=elemento.immagine;
            immagine.classList.add('Sfondo');
            const title = document.createElement('h1');
            title.textContent = elemento.titolo;
            title.classList.add('Titolo')
            const bottone = document.createElement('button');
            bottone.classList.add('pulsante');
            bottone.textContent = '+ Dettagli';
            const preferiti = document.createElement('img');
            preferiti.src=elemento.preferiti;
            preferiti.classList.add('preferiti2');
            const descrizione = document.createElement('p');
            descrizione.textContent= elemento.descrizione;
            descrizione.classList.add('hidden');
            const section = document.querySelector('#griglia');
            section.appendChild(container);
            container.appendChild(preferiti);
            container.appendChild(immagine);
            container.appendChild(title);
            container.appendChild(bottone);
            container.appendChild(descrizione);
            i++;
        }
    }
    
    
    fetch("http://localhost/drone_details.php").then(onResponse).then(onJSON2);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE PER INSERIRE DINAMICAMENTE LA SEZIONE VALUTAZIONI 


function onJSON4(json){
    let i=0;
    for(elemento of json){
        let val_cont = document.createElement('div');
        val_cont.classList.add('val_div');
        val_cont.setAttribute('id',[i]);
        const immagine = document.createElement('img');
        immagine.src=elemento.immagine;
        immagine.classList.add('Sfondo');
        const title = document.createElement('h1');
        title.textContent = elemento.titolo;
        title.classList.add('h1_titolo')
        const like = document.createElement('img');
        like.classList.add('like_img');
        like.src='like.png';
        const dislike = document.createElement('img');
        dislike.classList.add('dislike_img');
        dislike.src='dislike.png';
        const span_like = document.createElement('span');
        span_like.classList.add('span_like');
        const span_dislike = document.createElement('span');
        span_dislike.classList.add('span_dislike');
        
        const section = document.querySelector('#valutazioni');
        section.appendChild(val_cont);
        val_cont.appendChild(immagine);
        val_cont.appendChild(title);
        val_cont.appendChild(like);
        val_cont.appendChild(dislike);
        val_cont.appendChild(span_like);
        val_cont.appendChild(span_dislike);
        i++;
    }
}


fetch("http://localhost/drone_details.php").then(onResponse).then(onJSON4);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE BARRA DEI PREFERITI , CARICA PREFERITI DAL DB


function CaricaPref(json){
    
    if (!json){
        console.log('Nessun drone archiviato nei preferiti.');
         return null;
        } 

    for(elemento of json){

        const barrapreferiti = document.querySelector('.preferiti');
        barrapreferiti.classList.remove('hidden');
        

         let container = document.createElement('div');
         container.classList.add('blocco');
         container.setAttribute('id',elemento.id_box);
         const stellaless = document.createElement('img');
         stellaless.src='stellameno.png';
         stellaless.classList.add('stella');
         const icona = document.createElement('img');
         icona.src=elemento.img;
         icona.classList.add('icona');
         const title = document.createElement('p');
         title.textContent=elemento.title;
         title.classList.add('testo');
      
         const boxs = document.querySelectorAll('.container');
         const box = boxs[elemento.id_box];
         
         const stellaplus = box.querySelector('.preferiti2');

         barrapreferiti.appendChild(container);
         container.appendChild(stellaless);
         container.appendChild(icona);
         container.appendChild(title);
         stellaplus.classList.add('hidden');
         conta++;
         stellaless.addEventListener('click',rimuoviPreferenze);
    }
}

function C_pref(){
fetch("http://localhost/carica_pref.php").then(onResponse).then(CaricaPref);
}
setTimeout(C_pref,100);


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE LIKES E DISLIKES , CARICA LIKES E DISLIKES DAL DB

function CaricaLike(json){
    
    if (!json){
        console.log('Nessun like salvato nel db.');
         return null;
        } 

    for(elemento of json){
      
         const boxs = document.querySelectorAll('.val_div');
         const box = boxs[elemento.id_box];
         const like = box.querySelector('.like_img');
         const dislike = box.querySelector('.dislike_img');
         const span_like = box.querySelector('.span_like');
         const span_dislike = box.querySelector('.span_dislike');

         span_like.textContent = elemento.num_likes;

         like.classList.remove('like_img');
         like.classList.add('like_img_selected');
         dislike.classList.add('hidden');
         span_dislike.classList.add('hidden');
         span_like.classList.remove('hidden');


         like.removeEventListener('click',Add_like_to_DB);
         like.addEventListener('click',Remove_like_to_DB);
    }
}

function C_Like(){
fetch("http://localhost/carica_like.php").then(onResponse).then(CaricaLike);
}
setTimeout(C_Like,100);





function CaricaDisLike(json){
    
    if (!json){
        console.log('Nessun dislike salvato nel db.');
         return null;
        } 
    for(elemento of json){
      
         const boxs = document.querySelectorAll('.val_div');
         const box = boxs[elemento.id_box];
         const like = box.querySelector('.like_img');
         const dislike = box.querySelector('.dislike_img');
         const span_like = box.querySelector('.span_like');
         const span_dislike = box.querySelector('.span_dislike');

         span_dislike.textContent = elemento.num_dislikes;

         dislike.classList.remove('dislike_img');
         dislike.classList.add('dislike_img_selected');
         like.classList.add('hidden');
         span_like.classList.add('hidden');
         span_dislike.classList.remove('hidden');


         dislike.removeEventListener('click',Add_dislike_to_DB);
         dislike.addEventListener('click',Remove_dislike_to_DB);
    }
}

function C_DisLike(){
fetch("http://localhost/carica_dislike.php").then(onResponse).then(CaricaDisLike);
}
setTimeout(C_DisLike,100);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE INSERISCI/RIMUOVI LIKE NEL DB 

function AggiornaLikes(json,box){ //aggiorna il numero di like dove l'utente ha cliccato
console.log(json.ok);
    if (!json.ok) return null;
    box.querySelector('.span_like').textContent = json.nlikes;
    console.log("UPDAte" + json.nlikes);
}

function Remove_like_to_DB(event){
    const like=event.currentTarget;
    const box = like.parentNode;
    const like_span = box.querySelector('.span_like');
    const dislike = box.querySelector('.dislike_img');
    const id=box.getAttribute('id');
    const formdata = new FormData();
    formdata.append('Drone_ID',id);
    fetch('remove_like.php', {method:'post',body:formdata}).then(onResponse).then(function (json){ return AggiornaLikes(json, box); });

    like.classList.add('like_img');
    like.classList.remove('like_img_selected');
    like_span.classList.add('hidden');
    dislike.classList.remove('hidden');


    like.removeEventListener('click',Remove_like_to_DB);
    like.addEventListener('click',Add_like_to_DB);
}


function Add_like_to_DB(event){
    const like=event.currentTarget;
    const box = like.parentNode;
    const dislike_img = box.querySelector('.dislike_img');
    const dislike_span = box.querySelector('.span_dislike');
    const like_span = box.querySelector('.span_like');
    const id=box.getAttribute('id');
    const formdata = new FormData();
    formdata.append('Drone_ID',id);
    fetch('add_like.php', {method:'post',body:formdata}).then(onResponse).then(function (json){ return AggiornaLikes(json, box); });
    
   
    like.classList.remove('like_img');
    like.classList.add('like_img_selected');
    dislike_img.classList.add('hidden');
    dislike_span.classList.add('hidden');
    like_span.classList.remove('hidden');


    like.removeEventListener('click',Add_like_to_DB);
    like.addEventListener('click',Remove_like_to_DB);
}

function like(){
const Likes = document.querySelectorAll(".like_img");
for(like of Likes){
    like.addEventListener('click',Add_like_to_DB);
}
}
setTimeout(like, 100);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE INSERISCI/RIMUOVI DISLIKE NEL DB 

function AggiornaDislikes(json,box){ //aggiorna il numero di like dove l'utente ha cliccato
    console.log(json.ok);
        if (!json.ok) return null;
        box.querySelector('.span_dislike').textContent = json.ndislikes;
        console.log("UPDAte" + json.ndislikes);
    }

    function Remove_dislike_to_DB(event){
        const dislike=event.currentTarget;
        const box = dislike.parentNode;
        const dislike_span = box.querySelector('.span_dislike');
        const like = box.querySelector('.like_img');
        const id=box.getAttribute('id');
        const formdata = new FormData();
        formdata.append('Drone_ID',id);
        fetch('remove_dislike.php', {method:'post',body:formdata}).then(onResponse).then(function (json){ return AggiornaDislikes(json, box); });
       
        dislike.classList.add('dislike_img');
        dislike.classList.remove('dislike_img_selected');
        dislike_span.classList.add('hidden');
        like.classList.remove('hidden');

    
        dislike.removeEventListener('click',Remove_dislike_to_DB);
        dislike.addEventListener('click',Add_dislike_to_DB);
    }
    
    function Add_dislike_to_DB(event){
        const dislike=event.currentTarget;
        const box = dislike.parentNode;
        const like = box.querySelector('.like_img');
        const like_span = box.querySelector('.span_like');
        const dislike_span = box.querySelector('.span_dislike');
        const id=box.getAttribute('id');
        const formdata = new FormData();
        formdata.append('Drone_ID',id);
        fetch('add_dislike.php', {method:'post',body:formdata}).then(onResponse).then(function (json){ return AggiornaDislikes(json, box); });
          
        dislike.classList.remove('dislike_img');
        dislike.classList.add('dislike_img_selected');
        like.classList.add('hidden');
        like_span.classList.add('hidden');
        dislike_span.classList.remove('hidden');
    
        dislike.removeEventListener('click',Add_dislike_to_DB);
        dislike.addEventListener('click',Remove_dislike_to_DB);
    }
    
    function dislike(){
    const disikes = document.querySelectorAll(".dislike_img");
    for(dislike of disikes){
        dislike.addEventListener('click',Add_dislike_to_DB);
    }
    }
    setTimeout(dislike, 100);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE MOSTRA-NASCONDI DETTAGLI

function MostraDettagli(event){
    const pulsante = event.currentTarget;
    const box = pulsante.parentNode;
    const dettagli = box.querySelector('p');
    
    Visibile = !Visibile;
    if(Visibile){
        dettagli.classList.remove('hidden');
        dettagli.classList.add('descrizione')
        pulsante.textContent= '- Dettagli';
        box.classList.add('bordoPlus')
    }
    else{
        dettagli.classList.add('hidden');
        dettagli.classList.remove('descrizione');
        pulsante.textContent= '+ Dettagli';
        box.classList.remove('bordoPlus')
    }
    }

function dettagli(){
const AllDetails = document.querySelectorAll(".pulsante");
for(Detail of AllDetails){
    Detail.addEventListener('click',MostraDettagli);
}
}

let Visibile = false;
setTimeout(dettagli, 100);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------


//FUNZIONE BARRA DEI PREFERITI AGGIUNGI/RIMUOVI

function preferenze(event){
    const barrapreferiti = document.querySelector('.preferiti');
    barrapreferiti.classList.remove('hidden');
    const stellaplus = event.currentTarget;
    const box = stellaplus.parentNode;
    
    const Sfondo = box.querySelector('.Sfondo');
    const Titolo = box.querySelector('.Titolo');

    let container = document.createElement('div');
    container.classList.add('blocco');
    container.setAttribute('id',box.id);
    const stellaless = document.createElement('img');
    stellaless.src='stellameno.png';
    stellaless.classList.add('stella');
    const icona = document.createElement('img');
    icona.src=Sfondo.src;
    icona.classList.add('icona');
    const title = document.createElement('p');
    title.textContent=Titolo.textContent;
    title.classList.add('testo');


    barrapreferiti.appendChild(container);
    container.appendChild(stellaless);
    container.appendChild(icona);
    container.appendChild(title);

    //INSERIMENTO NEL DB

    const img=box.querySelector('.Sfondo').src;
    const nome=box.querySelector('.Titolo').textContent;

    const id=container.getAttribute('id');
    const formdata = new FormData();
    formdata.append('Box_ID',id);
    formdata.append('img',img);
    formdata.append('title',nome);
    fetch('add_pref.php', {method:'post', body:formdata});
    
    stellaplus.classList.add('hidden');
    
    conta++;
    stellaless.addEventListener('click',rimuoviPreferenze);
    event.stopPropagation();
}


function rimuoviPreferenze(event){
    const stellaless = event.currentTarget;
    const box = stellaless.parentNode;
    const containers = document.querySelectorAll('.container');
    for(container of containers){
        if(box.id === container.id){
            const stellaplus = container.querySelector('img');
            stellaplus.classList.remove('hidden');
        }
    } 
    //RIMUOVO DAL DB
    const nome=box.querySelector('p').textContent;

    const formdata = new FormData();
    formdata.append('title',nome);
    fetch('remove_pref.php', {method:'post', body:formdata});

    box.remove();
    conta--;
    if(conta===0){
        document.querySelector('.preferiti').classList.add('hidden');
        console.log(conta);
    }
}

function preferiti(){
const allAggiungi = document.querySelectorAll(".preferiti2");
for(aggiungi of allAggiungi){
    aggiungi.addEventListener('click' , preferenze );
}
}

let conta=0;
setTimeout(preferiti, 100);


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------


//FUNZIONE BARRA DI RICERCA
function ricerca(event){

    const input = event.currentTarget;
    const filtro = input.value.toUpperCase();
    const griglia = document.querySelector("#griglia");
    const box = document.querySelectorAll(".container");
    console.log(griglia);
    console.log(box);
    for(let z=0 ; z < box.length ; z++){
        let item = box[z];
        let testo = item.querySelector("h1").textContent;
        console.log(item);
        
       if(testo.toUpperCase().indexOf(filtro) > -1){
             item.classList.remove("hidden");
        }
        else{
             item.classList.add("hidden");
        }
    }
}



const input = document.querySelector('#cerca');
input.addEventListener('keyup',ricerca);


//------------------------------------------------------------------------ MINI HOMEWORK 3 -----------------------------------------------------------------------------

//FUNZIONE + API LIBRO IN REGALO    ----> API ottenute da openlibrary.org
function onJson(json){
    console.log('JSON ricevuto');
    console.log(json);
    const sezione= document.getElementById('free-gift');
    sezione.style.height='1800px';
    const library = document.querySelector('#library-view');
    library.innerHTML=''; 
    let num_results = json.num_found 
    if(num_results > 6){
        num_results=6;
    } 
    
    for(let i=0; i<num_results;i++){
        const doc = json.docs[i]
        const title = doc.title;  
        const isbn=doc.isbn[0]; 
        const cover_url = 'http://covers.openlibrary.org/b/isbn/'+isbn+'-M.jpg';
    
    if(doc.isbn){
    const book = document.createElement('div');
    book.classList.add('book');
    const img = document.createElement('img');
    img.src=cover_url;
    const caption = document.createElement('span');
    caption.textContent=title;
    const disponibilità = document.createElement('h3');
    let si_no = Math.random()*(100-0)+0;

    if(si_no >= 60){
    disponibilità.textContent='DISPONIBILE';
    disponibilità.classList.add('disponibile');
    }
    else{
        disponibilità.textContent='NON DISPONIBILE';
    disponibilità.classList.add('non_disponibile');
    }
    book.appendChild(img);
    book.appendChild(caption);
    book.appendChild(disponibilità);
    library.appendChild(book);   
    }

    else{   
        console.log('ISBN non trovato,salto');
        continue;
    }
}
}

function onResponse(response){
    if(!response.ok){
        console.log('Risposta non valida');
        return null;
    }else return response.json();
}


function search(event){
    event.preventDefault(); 
    const libro_input = document.querySelector('#libro');      
    const libro_value = encodeURIComponent(libro_input.value);
    if(!libro_value){
        alert("inserisci testo nella barra di ricerca");
    } 
    else{
    console.log('Eseguo ricerca:'+ libro_value);
    const rest_url='http://openlibrary.org/search.json?title='+libro_value; 
    console.log('URL:'+rest_url);
    fetch(rest_url)
    .then(onResponse)
    .then(onJson)
    }
}
 
const form1=document.querySelector('#form1');
form1.addEventListener('submit',search);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNZIONE + API METEO   ---> API ottenute da weatherstack

function onJson1(json){
    console.log(json)
    const visualizza_meteo = document.querySelector('#visualizza_meteo');
    visualizza_meteo.innerHTML='';
    const location = json.location;
    const current=json.current;

    const icona = current.weather_icons[0];
    const orario = location.localtime;
    const temperatura = current.temperature;
    const prob_precipitazione = current.precip;
    const umidità = current.humidity;

    const o = document.createElement('p');
    o.innerText='Data e Ora : '+orario;
    
    const t = document.createElement('p');
    t.innerText='Temperatura : '+temperatura+'°C';

    const u = document.createElement('p');
    u.innerText='umidità : '+umidità +'%';

    const pp= document.createElement('p');
    pp.innerText=('Probabilità Precipitazione : '+prob_precipitazione+'%');

    const i = document.createElement('img');
    i.src=icona;

    visualizza_meteo.appendChild(o);
    visualizza_meteo.appendChild(t);
    visualizza_meteo.appendChild(u);
    visualizza_meteo.appendChild(pp);
    visualizza_meteo.appendChild(i);

    if(prob_precipitazione>=0.5){
        const effettua = document.createElement('h1');
        effettua.innerText='Spedizione Sconsigliata';
        effettua.classList.remove('spedizione_consigliata');
        effettua.classList.add('spedizione_sconsigliata');
        visualizza_meteo.appendChild(effettua)
    }
    else if(prob_precipitazione<0.5){
        const effettua = document.createElement('h1');
        effettua.innerText='Spedizione Consigliata';
        effettua.classList.remove('spedizione_sconsigliata');
        effettua.classList.add('spedizione_consigliata');
        visualizza_meteo.appendChild(effettua)
    }
}

function onResponse(response){
    if(!response.ok){
        console.log('Risposta non valida');
        return null;
    }else return response.json();
}

function search_meteo(event){
    event.preventDefault();     
    const provincia = document.querySelector('#provincia').value;
    fetch('http://localhost/JSON_Meteo.php?pro=' + provincia)
    .then(onResponse)
    .then(onJson1);
}

const form2=document.querySelector('#form2');
form2.addEventListener('submit',search_meteo);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

