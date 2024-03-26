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

function writeNeighbourhoods() {
  //define a variable for the collection you want to create in Firestore to populate data
  var neighbourhoodsRef = db.collection("neighbourhood_info");

  neighbourhoodsRef.add({
    code: "DTC0201",
    title: "Kitsilano",
    description: "Close to the beach",
    tag: "bike-friendly",
    lat: 49.2684,
    lng: -123.1683,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
  });
  neighbourhoodsRef.add({
    code: "DTC0202",
    title: "BCIT",
    description: "Pretend Dan lives here",
    tag: "student-friendly",
    lat: 49.3399431028579,
    lng: -122.85908496766939,
    last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
  });
  neighbourhoodsRef.add({
    code: "DTC0203",
    title: "Killarney",
    description: "Close to off leash dog park",
    tag: "pet-friendly",
    lat: 49.2202,
    lng: -123.0413,
    last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
  });
}
