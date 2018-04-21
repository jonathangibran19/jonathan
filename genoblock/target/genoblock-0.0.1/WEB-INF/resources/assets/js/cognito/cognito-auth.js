/*global WildRydes _config AmazonCognitoIdentity AWSCognito*/

var WildRydes = window.WildRydes || {};
(function scopeWrapper($) {
    var signinUrl = '/signin.html';
    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };
    var userPool;
    if (!(_config.cognito.userPoolId && _config.cognito.userPoolClientId && _config.cognito.region)) {
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    function signOut() {
        userPool.getCurrentUser().signOut();
        resetFactory();
        resetUser();
        window.location.href = 'index.html';
    };
    
    WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);                    
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }
    });

    /*
     * Cognito User Pool functions
     */

    function register(email, password, onSuccess, onFailure) {
        var dataEmail = {
            Name: 'email',
            Value: email
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        userPool.signUp(toUsername(email), password, [attributeEmail], null,
                function signUpCallback(err, result) {
                    if (!err) {
                        onSuccess(result);
                    } else {
                        onFailure(err);
                    }
                }
        );
    }

    function signin(email, password, onSuccess, onFailure) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: toUsername(email),
            Password: password
        });
        var cognitoUser = createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure
        });
    }

    function verify(email, code, onSuccess, onFailure) {
        createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: toUsername(email),
            Pool: userPool
        });
    }

    function toUsername(email) {
        return email.replace('@', '-at-');
    }
    
    function toLocalUsername(email) {
        return email.split("@")[0];
    }

    /*
     *  Event Handlers
     */

    $(function onDocReady() {
        $('#signinForm').submit(handleSignin);
        $('#registrationForm').submit(handleRegister);
        $('#verifyForm').submit(handleVerify);
        $('[id*=signOut]').click(signOut);
    });

    function handleSignin(event) {
        var email = $('#emailInputSignin').val();
        var password = $('#passwordInputSignin').val();
        event.preventDefault();
        signin(email, password,
                function signinSuccess() {
                    setUser(toLocalUsername(email));
                    window.location.href = 'dashboard.html';
                },
                function signinError(err) {
                    switch (err.message) {
                        case 'Incorrect username or password.':
                            alert("Usuario o contraseña incorrectos");
                            break;
                        case 'User does not exist.':
                            alert("El usuario no existe");
                            break;
                        default:

                            break;
                    }
                    console.error(err.message);
                    //alert("Error al iniciar sesión");
                }
        );
    }

    function handleRegister(event) {
        var email = $('#emailInputRegister').val();
        var password = $('#passwordInputRegister').val();
        var password2 = $('#password2InputRegister').val();
        var onSuccess = function registerSuccess(result) {
            var cognitoUser = result.user;
            console.log('Nombre de usuario:' + cognitoUser.getUsername());
            var confirmation = ('Registro exitoso. Por favor revisa tu correo para tu còdigo de verificación.');
            if (confirmation) {
                window.location.href = 'verify.html';
            }
        };
        var onFailure = function registerFailure(err) {
            console.log(err.message);
            switch (err.message) {
                case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
                    alert("Contraseñas muy cortas: Minimo 8 caracteres");
                    break;
                case 'Password did not conform with policy: Password not long enough':
                    alert("Contraseñas muy cortas: Minimo 8 caracteres");
                    break;
                case 'Password did not conform with policy: Password must have lowercase characters':
                    alert("La contraseña debe contener numeros, simbolos y caracteres en mayuscula y minuscula");
                    break;
                case 'Password did not conform with policy: Password must have numeric characters':
                    alert("La contraseña debe contener caracteres numericos");
                    break;
                default:

                    break;
            }
            console.error(err.message);
        };
        event.preventDefault();
        if (password === password2) {
            register(email, password, onSuccess, onFailure);
        } else {
            alert('Las contraseñas no coinciden');
        }
    }

    function handleVerify(event) {
        var email = $('#emailInputVerify').val();
        var code = $('#codeInputVerify').val();
        event.preventDefault();
        verify(email, code,
                function verifySuccess(result) {
                    console.log('call result: ' + result);
                    console.log('Verificacion exitosa');
                    alert('Verificación exitosa. Se redirigira al inicio de sesión.');
                    window.location.href = signinUrl;
                },
                function verifyError(err) {
                    console.error(err);
                    alert("Fallo la verificación de la cuenta");
                }
        );
    }
}(jQuery));
