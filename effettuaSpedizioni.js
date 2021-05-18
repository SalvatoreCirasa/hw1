function checkNome(event){
    const nome = event.currentTarget.value;
    const dim_nome = nome.length;   
    if(dim_nome > 2){
        errore.classList.add('hidden');
        const span = document.querySelector('.nome_dest span');
        span.classList.remove('error');
        span.textContent="";
    }   
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.nome_dest span');
        span.classList.add('error');
        span.textContent="Nome assente o non valido (min 2)";
        event.preventDefault();
    }
    
    if(dim_nome >15){
        errore.classList.remove('hidden');
        const span = document.querySelector('.nome_dest span');
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
        const span = document.querySelector('.cognome_dest span');
        span.classList.remove('error');
        span.textContent="";
    }
    
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.cognome_dest span');
        span.classList.add('error');
        span.textContent="Cognome assente o non valido (min 2)";
        event.preventDefault();
    }
    
    if(dim_cognome > 15){
        errore.classList.remove('hidden');
        const span = document.querySelector('.cognome_dest span');
        span.classList.add('error');
        span.textContent="cognome inserito troppo lungo (max 15)";
        event.preventDefault();
    }
  
}

function checkCittà(event){
    
    const città = event.currentTarget.value; 
    const dim_città = città.length;

    if(dim_città > 2){
        errore.classList.add('hidden');
        const span = document.querySelector('.città_dest span');
        span.classList.remove('error');
        span.textContent="";
    }
    
    else{
        errore.classList.remove('hidden');
        const span = document.querySelector('.città_dest span');
        span.classList.add('error');
        span.textContent="Città assente o non valido (min 2)";
        event.preventDefault();
    }
    
    if(dim_città > 18){
        errore.classList.remove('hidden');
        const span = document.querySelector('.città_dest span');
        span.classList.add('error');
        span.textContent="città inserita troppo lungo (max 18)";
        event.preventDefault();
    }
}

const errore = document.querySelector('.errore');
const nome_dest = document.querySelector('.nome_dest');
document.querySelector('.nome_dest input').addEventListener('blur',checkNome);
document.querySelector('.cognome_dest input').addEventListener('blur',checkCognome);
document.querySelector('.città_dest input').addEventListener('blur',checkCittà);

if(document.querySelector('.error')!==null){
     checkCognome(); checkCittà();  checkNome();
    document.querySelector('.nome_dest input').dispatchEvent(new Event('blur'));
    document.querySelector('.cognome_dest input').dispatchEvent(new Event ('blur'));
}