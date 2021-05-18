function checkNome(event){
    const nome = event.currentTarget.value;
    const dim_nome = nome.length;
    if(dim_nome > 2){
        errore.classList.add('hidden');
        const span = document.querySelector('.nome_utente span');
        span.classList.remove('error');
        span.textContent="";
    }   
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.nome_utente span');
        span.classList.add('error');
        span.textContent="Nome assente o non valido (min 2)";
        event.preventDefault();
    }
    
    if(dim_nome >15){
        errore.classList.remove('hidden');
        const span = document.querySelector('.nome_utente span');
        span.classList.add('error');
        span.textContent="nome inserito troppo lungo (max 15)";
        event.preventDefault();
    }
    
}

function checkCognome(event){
    const cognome = event.currentTarget.value; 
    const dim_cognome = cognome.length;
    if(dim_cognome > 2){
        errore.classList.add('hidden');
        const span = document.querySelector('.cognome_utente span');
        span.classList.remove('error');
        span.textContent="";
    }
    
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.cognome_utente span');
        span.classList.add('error');
        span.textContent="Cognome assente o non valido (min 2)";
        event.preventDefault();
    }
    
    if(dim_cognome > 15){
        errore.classList.remove('hidden');
        const span = document.querySelector('.cognome_utente span');
        span.classList.add('error');
        span.textContent="cognome inserito troppo lungo (max 15)";
        event.preventDefault();
    }
  
}

function checkUsername(event){
    const username = event.currentTarget.value; 
    if(!/^[a-zA-z0-9_]{5,15}$/.test(username)){
        const span = document.querySelector('.username span');
        span.classList.add('error');
        span.textContent="Sono ammesse lettere,numeri e underscore (min 5 , max 15)";
        formStatus.username=false;
      
        event.preventDefault();
    }
    else{
        fetch("check_username.php?q="+encodeURIComponent(username)).then(fetchresponse).then(JsonCheckUsername); //verifica username già presente nel DB.
    }
}

function checkEmail(event){
    const e_mail = event.currentTarget.value; 
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e_mail)){
        const span = document.querySelector('.e_mail span');
        span.classList.add('error');
        span.textContent="E-mail non valida";
        event.preventDefault();
    }
    else{
        fetch("check_email.php?q="+encodeURIComponent(e_mail)).then(fetchresponse).then(JsonCheckEmail); //verifica e_mail già presente nel DB.
    }    
}

function checkPassword(event){
    
    const password = event.currentTarget.value; 
    const dim_pass = password.length;

    if(dim_pass > 5){
        errore.classList.add('hidden');
        const span = document.querySelector('.password span');
        span.textContent="";
    }
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.password span');
        span.classList.add('error');
        span.textContent="Password assente o non valida (min 5)";
        event.preventDefault();
    }
    
    if(dim_pass > 15){
        errore.classList.remove('hidden');
        const span = document.querySelector('.password span');
        span.classList.add('error');
        span.textContent="Password troppo lunga (max 15)";
        event.preventDefault();
    }
}

function checkCittà(event){
    
    const città = event.currentTarget.value; 
    const dim_città = città.length;

    if(dim_città > 2){
        errore.classList.add('hidden');
        const span = document.querySelector('.città span');
        span.classList.remove('error');
        span.textContent="";
    }
    
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.città span');
        span.classList.add('error');
        span.textContent="Città assente o non valido (min 2)";
        event.preventDefault();
    }
    
    if(dim_città > 12){
        errore.classList.remove('hidden');
        const span = document.querySelector('.città span');
        span.classList.add('error');
        span.textContent="città inserita troppo lungo (max 12)";
        event.preventDefault();
    }
}

function checkRecapito(event){
    const recapito_telefonico = event.currentTarget.value; 
    const dim_recapito_telefonico = recapito_telefonico.length;

    if(dim_recapito_telefonico > 7){
        errore.classList.add('hidden');
        const span = document.querySelector('.recapito_telefonico span');
        span.classList.remove('error');
        span.textContent="";
    }
    
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.recapito_telefonico span');
        span.classList.add('error');
        span.textContent="Recapito assente o non valido (min 7)";
        event.preventDefault();
    }
    
    if(dim_recapito_telefonico > 12){
        errore.classList.remove('hidden');
        const span = document.querySelector('.recapito_telefonico span');
        span.classList.add('error');
        span.textContent="recapito inserito non valido (max 12)";
        event.preventDefault();
    }
    
}


function JsonCheckUsername(json){
    //controllo il campo exists ritornato dal php in formato json
    if(username = !json.exists){ //Se exists è falsa
        //username disponibile
       const span = document.querySelector('.username span');
       span.classList.add('okay');
       span.textContent="Username disponibile";
    }
    else{
        //username già in uso
       const span = document.querySelector('.username span');
       span.classList.add('error');
       span.textContent="Username già utilizzato da un'altro utente";
    }
}

function JsonCheckEmail(json){
    //controllo il campo exists ritornato dal php in formato json
    if(e_mail = !json.exists){ //Se exists è falsa
        //e_mail disponibile
       const span = document.querySelector('.e_mail span');
       span.classList.add('okay');
       span.textContent="E-mail disponibile";
    }
    else{
        //e_mail già in uso
       const span = document.querySelector('.e_mail span');
       span.classList.add('error');
       span.textContent="E-mail già utilizzata da un'altro utente";
    }
}

function fetchresponse(response){
    if(!response.ok) return null;
    return response.json();
}



const errore = document.querySelector('.errore');
document.querySelector('.nome_utente input').addEventListener('blur',checkNome);
document.querySelector('.cognome_utente input').addEventListener('blur',checkCognome);
document.querySelector('.username input').addEventListener('blur',checkUsername);
document.querySelector('.password input').addEventListener('blur',checkPassword);
document.querySelector('.città input').addEventListener('blur',checkCittà);
document.querySelector('.e_mail input').addEventListener('blur',checkEmail);
document.querySelector('.recapito_telefonico input').addEventListener('blur',checkRecapito);

if(document.querySelector('.error')!==null){
    checkUsername(); checkPassword(); checkCognome(); checkCittà(); checkEmail(); checkNome(); checkRecapito();
    document.querySelector('.nome_utente input').dispatchEvent(new Event('blur'));
    document.querySelector('.username input').dispatchEvent(new Event ('blur'));
}