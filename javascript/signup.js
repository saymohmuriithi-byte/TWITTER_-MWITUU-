
  document.getElementById("signup").onclick= function(){
    let name = document.getElementById("name").value;
    // let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
        var uid = user.uid;
      // ...
      // uid --user identification 
    firebase.firestore().collection("users").doc(uid).set({
      uerId: uid,
      userName: name,
      emailAddress: email,
    //   password: password,
      createdOn: user.metadata.creationTime
    }).then(()=>{

        window.location.href= "/index.html"
    })
.catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorMessage);
    
    // ..
});


})


.catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorMessage);
    // ..
  });
  }