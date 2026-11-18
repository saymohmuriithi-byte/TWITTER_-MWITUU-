firebase.auth().onAuthStateChanged((user) =>{
   if (user){
    var uid = user.uid;
    firebase.firestore().collection("users").doc(uid).get().then((userDoc) =>{
      let user = userDoc.data()
      console.log(user);

      document.getElementById("postBtn").onclick = function(){
        let post = document.getElementById("post").value

        if(!post) return;
        firebase.firestore().collection("tweets").doc().set({
            tweet: post,
            name: user.userName,
            email:user.emailAddress,
            userId: uid,
            createdOn: Date.now()
        }).then(()=>{
            window.location.reload()
        }).catch((error)=>{

            console.error(error);
        })
        
      }
      
    //   document.getElementById("welcome").innerText = `WELCOME HOME ${user.userName}`
   })

   firebase.firestore().collection("tweets").where("tweetId", "==",selectedTweetId).get().then((queryTweets)=>{
     queryTweets.forEach((tweetDoc)=>{
      let tweet = tweetDoc.data()
      console.log(tweet);
      // conole.log(tweets)

      let tweetId = tweetDoc.id

      let tweetHtml= generateTweetHtml(tweet,tweetId)
      document.getElementById("tweetContainer").insertAdjacentHTML("afterbegin",tweetHtml)
     })
   })
     function generateCommentHtml(comment,){
          return`
      <div class="post" onclick="navigateToCommentPage(\'${id}\')">
      <div class="post-profile">
      <img src"" alt"profile-img"
      <h6>${comment.name}</h6>
      </div>

       <p>${comment.tweet}</p>
       <div class="post-icons">
       <i class="fa-solid fa-message"></i>
       <i class="fa-solid fa-retweet"></i>
       <i class="fa-solid fa-thumbs-up"></i>
       </div>
      <div>
     `
     }

   function generateTweetHtml(tweet,id){
     return`
      <div class="post" onclick="navigateToCommentPage(\'${id}\')">
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
   window.navigateToCommentPage = (id)=>{
     window.location.href = `comment.html?${id}`
   }
    }

  else{
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
})
   }
   
