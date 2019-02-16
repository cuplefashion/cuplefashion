const setErrMsg = (errMsg) => {
  $(".form-error-message")
    .css('display', 'block')
    .text(errMsg)
}

const checkSignupInput = () => {
  if (signUpForm.firstName.value == "") {
    setErrMsg('Please enter your first name')
    return false;
  }
  else if (signUpForm.lastName.value == "") {
    setErrMsg("Please enter your last name")
    return false;
  }
  else if (signUpForm.emailAddress.value == "") {
    setErrMsg("Please enter your email address.");
    return false;
  }
  else if (signUpForm.password.value == "") {
    setErrMsg("Please enter the new password for your new account.");
    return false;
  }
  else if (signUpForm.password_re.value == "") {
    setErrMsg("Please enter the confirm password for your new account.");
    return false;
  }
  else if (signUpForm.password.value.length < 8) {
    setErrMsg("Please enter the new password of at least 8 characters.");
    return false;
  }
  else if (signUpForm.password.value !== signUpForm.password_re.value) {
    setErrMsg("The confirm passwords do not match. Please input again.");
    signUpForm.password.value = "";
    signUpForm.password_re.value = "";
    return false;
  }
  else {
    return true;
  }
}

const checkLoginInput = () => {
  console.log('ha')
  if (loginForm.inputEmail.value == "") {
    setErrMsg("Please enter your email address.");
    return false;
  }
  else if (loginForm.inputPassword.value == "") {
    setErrMsg("Please enter your password.");
    return false;
  }
  else {
    return true;
  }
}