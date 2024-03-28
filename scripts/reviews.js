function saveNeighbourhoodIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");

    document.getElementById("reviewButton").href = "review_form.html?docID="+ID
}

saveNeighbourhoodIDAndRedirect()
