firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let uid= user.uid
        firebase.firestore().collection("users").doc(uid).get().then((userDoc) =>{
    
    let currentUser = userDoc.data()
           document.getElementById("edtName").value = currentUser.userName
           document.getElementById("edtBio").value = currentUser.bio || ""
    
        })
      

        document.getElementById("edtBtn"). onclick = () =>{
            let edtName = document.getElementById("edtName").value
            let edtBio = document.getElementById("edtBio").value



            firebase.firestore().collection("users").doc(uid).update({
                name:edtName,
                bio:edtBio,
            })
            .then(()=>{
               window.location.reload()
            })
            .catch((error)=>{
                console.error(error .message || "failed to update users")
            })
        };

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((userDoc) => {
        let currentUser = userDoc.data();

        document.getElementById("edtName").value = currentUser.userName;
        document.getElementById("edtBio").value = currentUser.bio;
      });

    document.getElementById("edtBtn").onclick = () => {
      let edtName = document.getElementById("edtName").value;
      let edtBio = document.getElementById("edtBio").value;

      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          userName: edtName,
          bio: edtBio,
        })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          console.error(error.message || "failed to update user");
        });
    };

    firebase
      .firestore()
      .collection("tweets")
      .where("userId", "==", uid)
      .orderBy("createdOn", "desc")
      .get()
      .then((querryTweets) => {
        querryTweets.forEach((tweetDoc) => {
          let tweet = tweetDoc.data();
          let tweetId = tweetDoc.id;

          let tweetHtml = generateTweetHTML(tweet, tweetId);

          document
            .getElementById("tweetContainer")
            .insertAdjacentHTML("afterbegin", tweetHtml);
        });
      })
      .catch((error) => {
        console.error(error.message || "failed to fetch tweets");
      });

    function generateTweetHTML(tweet, Id) {
      return `
    <div class="post" onclick="navigateToCommentsPage(\'${Id}\')">
    <div class="post-profile">
    <h5>${tweet.name}</h5>
    </div>
    
    <p>${tweet.tweet}</p>

<div class="post-icons">
    <span><i class="fa-solid fa-heart"></i> Like</span>
    <span><i class="fa-solid fa-comment"></i> Comment</span>
    <span><i class="fa-solid fa-retweet"></i> Retweet</span>
</div>
    </div>
  `;
    }

    window.navigateToCommentsPage = (id) => {
      window.location.href = `/comments.html?${id}`;
    };
  } else {
    window.location.href = "signin.html";
  }
});

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    // ...
  } else {
    // User is signed out
    // ...
    window.location.href = "/signin.html"
  }
});