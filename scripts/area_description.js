function displayNeighbourhoodInfo() {
  let params = new URL(window.location.href); //get the url of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log("id:", ID);

  db.collection("neighbourhood_info")
    .doc(ID)
    .get()
    .then(doc => {
      var thisNeighbourhood = doc.data();
      var neighbourhoodCode = thisNeighbourhood.code;
      var neighbourhoodName = doc.data().title;

      // console.log(thisNeighbourhood);
      // console.log(thisNeighbourhood.description);
      // console.log("description", document.getElementById("description"))

      document.getElementById("description").innerHTML = thisNeighbourhood.description;
      document.getElementById("title").innerHTML = thisNeighbourhood.title;
      document.getElementById("tag1").innerHTML = thisNeighbourhood.tag1;
      document.getElementById("tag2").innerHTML = thisNeighbourhood.tag2;
      document.getElementById("tag3").innerHTML = thisNeighbourhood.tag3;
      document.getElementById("biker_score").innerHTML = thisNeighbourhood.biker_score;
      document.getElementById("transit_score").innerHTML = thisNeighbourhood.biker_score;
      document.getElementById("walker_score").innerHTML = thisNeighbourhood.biker_score;
      document.getElementById("safety_score").innerHTML = thisNeighbourhood.biker_score;
      document.getElementById("park_score").innerHTML = thisNeighbourhood.biker_score;


      document.getElementById("reviewButton").href = "reviews.html?docID="+ID; // This grabs the URL ID from this page and allows access to the specific neighbourhood's review page.
    });
}
displayNeighbourhoodInfo()
