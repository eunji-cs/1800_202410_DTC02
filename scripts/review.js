var neighbourhoodDocID = localStorage.getItem("neighbourhoodDocID");

function getneighbourhoodName(id) {
  db.collection("neighbourhoods")
    .doc(id)
    .get()
    .then((thisNeighbourhood) => {
      var neighbourhoodName = thisNeighbourhood.data().name;
      document.getElementById("neighbourhoodName").innerHTML = neighbourhoodName;
    });
}

getHikeName(neighbourhoodDocID);

function writeReview() {
  console.log("inside write review");
  let neighbourhoodTitle = document.getElementById("title").value;
  let neighbourhoodDescription = document.getElementById("description").value;

  console.log(neighbourhoodTitle, neighbourhoodDescription);

  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    // get the document for the current user.
    db.collection("reviews").add({
      neighbourhoodDocID: neighbourhoodDocID,
      userID: userID,
      title: neighbourhoodTitle,
      description: neighbourhoodDescription,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  } else {
    console.log("No user is signed in");
    window.location.href = 'review.html';
  }
}
