function validateSignUpStepOne(form) {
    const pass = form["signupPasswordInput"].value;
    const cPass = form["signupConfirmPasswordInput"].value;
    if (pass.length < 8) {
        document.getElementById("signup-step-one-error-line").innerHTML = "Password is too short.";
        showElem("signup-step-one-error-line", "flex");
        return false;
    }
    if (/(?=[A-Za-z0-9\W]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,}).*$/g.test(pass) == false) {
        if (/[A-Za-z]/.test(pass) == false) {
            document.getElementById("signup-step-one-error-line").innerHTML = "Password does not contain a letter.";
        }
        else if (/\d/.test(pass) == false) {
            document.getElementById("signup-step-one-error-line").innerHTML = "Password does not contain a number.";
        }
        else if (/[a-z]/.test(pass) == false) {
            document.getElementById("signup-step-one-error-line").innerHTML = "Password does not contain a lowercase letter.";
        }
        else if (/[A-Z]/.test(pass) == false) {
            document.getElementById("signup-step-one-error-line").innerHTML = "Password does not contain a capital letter.";
        }
        else if (/\W/.test(pass) == false) {
            document.getElementById("signup-step-one-error-line").innerHTML = "Password does not contain a symbol.";
        }
        else {
            document.getElementById("signup-step-one-error-line").innerHTML = "Password is shitty";
        }
        showElem("signup-step-one-error-line", "flex");
        return false;
    }
    if (pass != cPass) {
        document.getElementById("signup-step-one-error-line").innerHTML = "Passwords do not match.";
        showElem("signup-step-one-error-line", "flex");
        return false;
    }
    return true;
}

function signUpBack() {
    hideElem("sign-up-step-two-container");
    hideElem("sign-up-step-one-error-line");
    showElem("sign-up-step-one-container", "flex");
    return false;
}

function submitSignUpForms() {
    const params = {
        firstName: document.getElementById("signupFirstNameInput").value,
        lastName: document.getElementById("signupLastNameInput").value,
        email: document.getElementById("signupEmailInput").value,
        password: document.getElementById("signupPasswordInput").value,
        confirmPassword: document.getElementById("signupConfirmPasswordInput").value,
        addressOne: document.getElementById("signupAddressOne").value,
        addressTwo: document.getElementById("signupAddressTwo").value,
        addressThree: document.getElementById("signupAddressThree").value,
        addressFour: document.getElementById("signupAddressFour").value,
        addressFive: document.getElementById("signupAddressFive").value,
    }

    fetch('/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(params),
    })
        .then(resp => {
            if (resp.status == 200) return false;
            resp.json()
                .then(data => {
                    document.getElementById("signup-step-two-error-line").innerHTML = data.errors[0].msg;
                    showElem("signup-step-two-error-line", "flex");
                    return false;
                });
            return false
        });

    return false;
}
