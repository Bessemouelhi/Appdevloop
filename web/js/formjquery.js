var $password = $("#password");
var $confirmPassword = $("#confirm_password");

//hide hints
$("form span").hide();

function isPasswordValid() {
    return $password.val().length > 8;
}

function arePasswordMatching() {
    return $password.val() === $confirmPassword.val();
}

function canSubmit() {
    return isPasswordValid() && arePasswordMatching();
}

function passwordEvent() {
    console.log($(this).val().length);

    if(isPasswordValid()) {
        $password.next().hide();
    }
    else {
        $password.next().show();
    }
}

//find out is password and password confirmation match
function confirmPaswordEvent() {
    if(arePasswordMatching()) {
        $confirmPassword.next().hide();
    }
    else {
        $confirmPassword.next().show();
    }
}

function enableSubmitEvent() {
    $("#submit").prop("disabled", !canSubmit());
}

//Event on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPaswordEvent).keyup(enableSubmitEvent);

//Event on confirmation password input
$confirmPassword.focus(confirmPaswordEvent).keyup(confirmPaswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();