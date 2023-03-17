
function register(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      firebase.database().ref('users/' + email).set({
        email: email
      });
      
    })
    .catch((error) => {
      
    });
}
