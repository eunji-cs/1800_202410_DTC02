function displayNeighbourhoodInfo() {
  let params = new URL(window.location.href); //get the url of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log(ID);

  db.collection("neighbourhoods")
    .doc(ID)
    .get()
    .then(doc => {
      thisNeighbourhood = doc.data();
      neighbourhoodCode = thisNeighbourhood.code;
      neighbourhoodName = doc.data().name;

      document.getElementById("neighbourhoodName").innerHTML = neighbourhoodName;
    });
}
displayNeighbourhoodInfo();

function saveNeighbourhoodDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('neighbourhoodDocID', ID);
  window.location.href = 'review.html';
}

function populateReviews() {
  console.log("test");
  let neighbourhoodCardTemplate = document.getElementById("reviewCardTemplate");
  let neighbourhoodCardGroup = document.getElementById("reviewCardGroup");

  let params = new URL(window.location.href); // get the url from the search bar
  let neighbourhoodID = params.searchParams.get("docID");

  db.collection("reviews")
    .where("neighbourhoodDocID", "==", neighbourhoodID)
    .get()
    .then((allReviews) => {
      reviews = allReviews.docs;
      console.log(reviews);
      reviews.forEach((doc) => {
        var title = doc.data().title;
        var description = doc.data().description;
        var time = doc.data().timestamp.toDate();

        console.log(time);

        let reviewCard = neighbourhoodCardTemplate.content.cloneNode(true);
        reviewCard.querySelector(".title").innerHTML = title;
        reviewCard.querySelector(".time").innerHTML = new Date(
          time
        ).toLocaleString();
        reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;
      });
    });
}

populateReviews();
