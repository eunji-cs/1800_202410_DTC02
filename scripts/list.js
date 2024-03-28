function displayListItemsDynamically(collection) {
    let itemTemplate = document.getElementById("listItemTemplate"); // Set itemTempalte as HTML template.

    // Get Firebase collection.
    db.collection(collection).get()
        .then(allItems=> {
            allItems.forEach(doc => {
                // Get database information.
                var name = doc.data().title;
                var docID = doc.id;
                
                let newItem = itemTemplate.content.cloneNode(true); // Clone html.

                newItem.querySelector('#neighbourhood-name-goes-here').innerHTML = name;
                newItem.querySelector('a').href = "area_description.html?docID="+docID;

                document.getElementById("cards-go-here").appendChild(newItem); // Add the template to the HTML.
            })
        })
}

displayListItemsDynamically("neighbourhood_info");


// Saves the neighbourhood ID into local storage. 
function saveNeighbourhoodIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('docID', ID);
    window.location.href = 'area_description.html';
}