const URL_MOCK_API = 'https://6530a73e6c756603295ee17b.mockapi.io/profil';

async function dataLogin({
    email,
    password,
}) {
    const res = await fetch(URL_MOCK_API, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const users = await res.json();

    const user = users.find((us) => {
        return us.email === email && us.password === password;
    });

    if (!user) {
        alert('login failed');
        return;
    }

    localStorage.setItem('email', user.email);
    alert('login success');
}

const formLogin = document.getElementById('form-login');
formLogin.addEventListener('submit', async function() {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    function validateFormData() {
      if (!validateEmail() || !validatePassword()) {
        event.preventDefault(); // Prevent form submission if there are errors.
        return false;
      } else {
        return true;
      }
    }

    function validateEmail() {
      const emailValue = email.trim();
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(emailValue)) {
        alert("Alamat Email tidak valid");
        return false;
      }
      return true;
    }

    function validatePassword() {
      const passwordValue = password.trim();
      var passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegExp.test(passwordValue)) {
        alert("Password minimal 8 karakter");
        return false;
      }
      return true;
    }

    await dataLogin({
        email,
        password,
    });
});
