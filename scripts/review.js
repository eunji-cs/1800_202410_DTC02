var neighbourhoodDocID = localStorage.getItem("neighbourhoodDocID");

function getNeighbourhoodName(id) {
  db.collection("neighbourhood_info")
    .doc(id)
    .get()
    .then((thisNeighbourhood) => {
      var neighbourhoodName = thisNeighbourhood.data().name;
      document.getElementById("neighbourhoodName").innerHTML = neighbourhoodName;
    });
}

getNeighbourhoodName(neighbourhoodDocID);

function writeReview() {
  console.log("inside write review");
  let neighbourhoodTitle = document.getElementById("subject").value;
  let neighbourhoodDescription = document.getElementById("message").value;
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;



  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    // currentUser.get().then(userDoc => {
    //   console.log(userDoc.data().name);
    // })

    // get the document for the current user.
    db.collection("reviews").add({
      // neighbourhoodDocID: neighbourhoodDocID,
      userID: userID,
      userName: userName,
      userEmail: userEmail,
      title: neighbourhoodTitle,
      description: neighbourhoodDescription,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  } else {
    console.log("No user is signed in");
    window.location.href = 'review.html';
  }
}
