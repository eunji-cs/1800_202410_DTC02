// function loadSkeleton() {
//   console.log($('#navbarPlaceholder').load('./text/nav.html'));

// }
// loadSkeleton();

function insertNameFromFirestore() {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid);
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then(userDoc => {

        let userName = userDoc.data().name;
        console.log(userName);

        document.getElementById("name-goes-here").innerText = userName;
      })
    } else {
      console.log("No user is logged in.");
    }
  })
}

insertNameFromFirestore();

function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(user => {

    if (user) {

      console.log(user.uid);
      console.log(user.displayName);
      userName = user.displayName;

      $("#name-goes-here").text(userName);

    } else {
      // No user is signed in.
      console.log("No user is logged in");
    }
  });
}
getNameFromAuth(); //run the function
