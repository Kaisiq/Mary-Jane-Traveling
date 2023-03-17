
function register(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      firebase.database().ref('users/' + userId).set({
        username: username,
        email: email
      });
      
    })
    .catch((error) => {
      
    });
}
