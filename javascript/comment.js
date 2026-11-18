firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
 
    let selectedTweetId = decodeURIComponent(window.location.search).substring(1)
    console.log(selectedTweetId);


    firebase.firestore().collection("users").doc(uid).get().then((userDoc) =>{
      let user = userDoc.data()
      console.log(user);

      document.getElementById("postBtn").onclick =function(){
       let comment =document.getElementById("post").value;
       firebase.firestore().collection("comments").doc().set({
        comment,
        name: user.userName,
        email:user.emailAddress,
        userId: uid,
        createdOn: Date.now()
       }).then(()=>{
        window.location.reload()
       })
      }



    //   document.getElementById("welcome").innerText = `WELCOME HOME ${user.userName}`
   })
       // fetch collected tweet from database using  selectedtweet ID
   firebase.firestore().collection("tweets").doc(selectedTweetId).get().then((tweetDoc) =>{
    let tweet = tweetDoc.data()

    let tweetHtml = generateTweetHtml(tweet)
    document.getElementById("tweetContainer").insertAdjacentHTML("afterbegin", tweetHtml)
   })

   firebase.firestore().collection("comments").get().then((queryComments)=>{
     queryComments.forEach((commentDoc)=>{
  
      let comment = commentDoc.data()
        console.log(comment);
        let commentHtml = generateCommentsHtml(comment)
        document.getElementById("commentContainer").insertAdjacentHTML("afterbegin", commentHtml)
     })

   })

   function generateTweetHtml(tweet){
     return`
      <div class="post">
      <div class="post-profile">
      <img src"" alt"profile-img"
      <h6>${tweet.name}</h6>
      </div>

       <p>${tweet.tweet}</p>
       <div class="post-icons">
       <i class="fa-solid fa-message"></i>
       <i class="fa-solid fa-retweet"></i>
       <i class="fa-solid fa-thumbs-up"></i>
       </div>
      <div>
     `
   }
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    // ...
  } else {
       window.location.href = "/signin.html"
  }
});
   document.getElementById("signout").onclick = function(){
    firebase
    .auth()
    .signOut()
    .then(() => {
  // Sign-out successful.


}).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorMessage)
    // ..
  // An error happened.
});
   }
    // User is signed out
    // ...

