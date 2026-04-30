initFormValidation();

function initFormValidation() {
  const form = document.querySelector('.needs-validation');

  const authorName = form.querySelector('#authorName');
  const authorSurname = form.querySelector('#authorSurName');
  const bookTitle = form.querySelector('#bookTitle');
  const bookType = form.querySelector('#bookType');
  const publicationYear = form.querySelector('#publicationYear');
  const isbnCode = form.querySelector('#isbnCode');

  // VALIDAZIONE SINGOLO CAMPO
  function validateField(input, condition, message) {
    resetValidation(input);

    if (!condition) {
      setInvalid(input, message);
      return false;
    }

    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true;
  }

  let firstSubmit = true;

  //  VALIDAZIONE CAMPI NOME, COGNOME, TITOLO LIBRO e GENERE
  function validateForm() {
    let isValid = true;

    // Nome
    if (!validateField(authorName, authorName.value.trim().length >= 2, 'Il nome deve avere minimo 2 caratteri')) {
      isValid = false;
    }

    // Cognome
    if (!validateField(authorSurname, authorSurname.value.trim().length >= 2, 'Il cognome deve avere minimo 2 caratteri')) {
      isValid = false;
    }

    // Titolo
    if (!validateField(bookTitle, bookTitle.value.trim().length >= 3, 'Inserire un titolo valido')) {
      isValid = false;
    }

    // Genere
    if (!validateField(bookType, bookType.value !== "", 'Selezionare un genere')) {
      isValid = false;
    }


    return isValid;
  }

    // VALIDAZIONE CAMPI ANNO E ISBN
  function validateSingleField(input) {
    // Anno
    if (input === publicationYear) {
      const year = parseInt(publicationYear.value, 10);
      const yearValid = !isNaN(year) && year >= 1700 && year <= 2026;
  
      validateField(
        publicationYear,
        yearValid,
        firstSubmit
          ? 'Inserisci un anno di pubblicazione valido'
          : 'L\'anno deve essere compreso tra il 1700 e 2026'
      );
    }
    
    //Isbn
    if (input === isbnCode) {
      const isbn = isbnCode.value.trim();
      const numericRegex = /^[0-9]+$/;
      const isbnValid = numericRegex.test(isbn) && isbn.length >= 10 && isbn.length <= 13;

      validateField(
        isbnCode,
        isbnValid,
        firstSubmit
          ? 'Inserisci un ISBN valido'
          : 'L\'ISBN deve avere tra 10 e 13 cifre numeriche'
      );
    }

  }
  


    // SUBMIT
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const isValid = validateForm();
      form.classList.add('was-validated');

      if (isValid) {
        console.log("Form valido!");
      }

      // dopo il primo submit, cambia comportamento
      firstSubmit = false;
    });
  

  // VALIDAZIONE LIVE (campi Nome, Cognome, Titolo Libro e Genere)
  [authorName, authorSurname, bookTitle, bookType]
    .forEach(input => {
      input.addEventListener('input', validateForm);
      input.addEventListener('change', validateForm); 
    });

  // VALIDAZIONE LIVE (campi Anno e Isbn)
  [publicationYear, isbnCode].forEach(input => {
    input.addEventListener('input', () => validateSingleField(input));
  });


}

//Segna un campo come NON valido e mostra il messaggio di errore.
function setInvalid(input, message) {
  input.classList.add('is-invalid');

  const feedback = input.parentNode.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = message;
  }
}
//Serve a ripulire lo stato precedente del campo.
function resetValidation(input) {
  input.classList.remove('is-invalid');
}
  


