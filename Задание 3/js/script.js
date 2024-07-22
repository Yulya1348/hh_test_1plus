// Скрыть или показать пароль

$('body').on('click', '.password-control', function(){
  if ($('#password').attr('type') == 'password'){
    $(this).addClass('view');
    $('#password').attr('type', 'text');
  } else {
    $(this).removeClass('view');
    $('#').attr('type', 'password');
  }
  return false;
});

$('body').on('click', '.password-control-re', function(){
  if ($('#confirmPassword').attr('type') == 'password'){
    $(this).addClass('view');
    $('#confirmPassword').attr('type', 'text');
  } else {
    $(this).removeClass('view');
    $('#confirmPassword').attr('type', 'password');
  }
  return false;
});


// Валидация полей формы

const form = document.getElementById('formReg');
const submitBtn = document.getElementById('submitBtn');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const dob = document.getElementById('dob');

const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const dobError = document.getElementById('dobError');

const namePattern = /^[a-zA-Zа-яА-ЯёЁ]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

function validateName(field, errorField) {
  if (!namePattern.test(field.value)) {
      errorField.textContent = 'Поле должно содержать только буквы';
      return false;
  } else {
      errorField.textContent = '';
      return true;
  }
}

function validateEmail() {
  if (!emailPattern.test(email.value)) {
      emailError.textContent = 'Некорректный email';
      return false;
  } else {
      emailError.textContent = '';
      return true;
  }
}

function validatePassword() {
  if (!passwordPattern.test(password.value)) {
      passwordError.textContent = 'Пароль должен содержать минимум 8 символов, одну цифру, одну заглавную и одну строчную буквы, один специальный символ';
      return false;
  } else {
      passwordError.textContent = '';
      return true;
  }
}

function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = 'Пароли не совпадают';
      return false;
  } else {
      confirmPasswordError.textContent = '';
      return true;
  }
}

function validateDOB() {
    const birthDate = new Date(dob.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    if (age < 18) {
        dobError.textContent = 'Возраст должен быть не младше 18 лет';
        return false;
    } else {
        dobError.textContent = '';
        return true;
    }
}

function checkFormValidity() {
    const isValid =
      validateName(firstName, firstNameError) &&
      validateName(lastName, lastNameError) &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateDOB();

    submitBtn.disabled = !isValid;
}

firstName.addEventListener('blur', () => {
  validateName(firstName, firstNameError);
  checkFormValidity();
});

lastName.addEventListener('blur', () => {
  validateName(lastName, lastNameError);
  checkFormValidity();
});

email.addEventListener('blur', () => {
  validateEmail();
  checkFormValidity();
});

password.addEventListener('blur', () => {
  validatePassword();
  checkFormValidity();
});

confirmPassword.addEventListener('blur', () => {
  validateConfirmPassword();
  checkFormValidity();
});

dob.addEventListener('blur', () => {
  validateDOB();
  checkFormValidity();
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (checkFormValidity()) {
      alert('Форма успешно отправлена');
      // form.submit(); // Разблокировать отправку формы
  } else {
      alert('Пожалуйста, исправьте ошибки в форме');
  }
});
