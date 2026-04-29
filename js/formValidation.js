initFormValidation();
validateBookType();

function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');

  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      // campi
      const authorName = form.querySelector('#authorName');
      const authorSurname = form.querySelector('#authorSurName');
      const bookTitle = form.querySelector('#bookTitle');
     
     

      // reset messaggi
      resetValidation(authorName);
      resetValidation(authorSurname);
      resetValidation(bookTitle);
     

      let isValid = true;

      // Nome autore
      if (authorName.value.trim().length < 2) {
        setInvalid(authorName, 'Il nome deve avere minimo 2 caratteri');
        isValid = false;
      }

      // Cognome autore
      if (authorSurname.value.trim().length < 2) {
        setInvalid(authorSurname, 'Il cognome deve avere minimo 2 caratteri');
        isValid = false;
      }

      // Titolo libro
      if (bookTitle.value.trim().length < 3) {
        setInvalid(bookTitle, ' Inserire un titolo valido');
        isValid = false;
      }

    
      if (isValid) {
        form.classList.add('was-validated');
        console.log('Form valido!');

      } else {
        form.classList.add('was-validated');
      }
    });
  });
}
// Validazione Scelta genere libro
function validateBookType() {
  const bookType = document.querySelector('#bookType');
  const feedback = document.querySelector('#bookTypeFeedback');

  function check() {
    if (bookType.value === "") {
      bookType.classList.add('is-invalid');
      bookType.classList.remove('is-valid');
      feedback.textContent = 'Devi selezionare un genere';
    } else {
      bookType.classList.remove('is-invalid');
      bookType.classList.add('is-valid');
      feedback.textContent = '';
    }
  }

  bookType.addEventListener('change', check);
}



//Segna il campo come errore e mostra il messaggio sotto
function setInvalid(input, message) {
  input.classList.add('is-invalid');

  const feedback = input.parentNode.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = message;
  }
}
// validazione live 
function addLiveValidation(input, minLength) {
  input.addEventListener('input', function () {
    if (this.value.trim().length >= minLength) {
      this.classList.remove('is-invalid');

      const feedback = this.parentNode.querySelector('.invalid-feedback');
      if (feedback) {
        feedback.textContent = '';
      }
    }
  });
}

addLiveValidation(document.querySelector('#bookTitle'), 3);
addLiveValidation(document.querySelector('#authorName'), 2);
addLiveValidation(document.querySelector('#authorSurName'), 2);



//Pulisce lo stato precedente prima di rifare i controlli
function resetValidation(input) {
  input.classList.remove('is-invalid');

}

