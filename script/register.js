const URL_MOCK_API = 'https://6530a73e6c756603295ee17b.mockapi.io/profil';

async function dataRegister({
    role,
    namaLengkap,
    username,
    email,
    password
}) {
    try {
        const res = await fetch(URL_MOCK_API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: role,
                nama_lengkap: namaLengkap,
                username: username,
                email: email,
                password: password,
            }),
        });
        const result = await res.json();

        console.log(result);

        alert('register success');
    } catch (error) {
        alert('register failed');
    }
}

// ...

const formRegister = document.getElementById('form-register');
formRegister.addEventListener('submit', async function(event) {
    event.preventDefault();

    const role = document.getElementById('role-check');
    const namaLengkapInput = document.getElementById('nama-lengkap');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    function validateRole() {
        var valid = false;
        var x = role;

        for (var i = 0; i < x.length; i++) {
            if (x[i].checked) {
                valid = true;
                break;
            }
        }

        if (!valid) {
            displayError("Pilih Role");
            return false;
        }
        return true;
    }

    function validateFormData() {
        if (
            !validateRole() ||
            !validateNamaLengkap() ||
            !validateUsername() ||
            !validateEmail() ||
            !validatePassword()
        ) {
            event.preventDefault(); // Prevent form submission if there are errors.
            return false;
        } else {
            return true;
        }
    }

    function validateNamaLengkap() {
        const namaLengkapValue = namaLengkapInput.value.trim();
        if (namaLengkapValue === "") {
            displayError("Nama Lengkap tidak boleh kosong");
            return false;
        }
        return true;
    }

    function validateUsername() {
        const usernameValue = usernameInput.value.trim();
        if (usernameValue === "") {
            displayError("Username tidak boleh kosong");
            return false;
        }
        return true;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(emailValue)) {
            displayError("Alamat Email tidak valid");
            return false;
        }
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        var passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegExp.test(passwordValue)) {
            displayError("Password minimal 8 karakter");
            return false;
        }
        return true;
    }

    await dataRegister({
        role: role.value,
        namaLengkap: namaLengkapInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    });
});
