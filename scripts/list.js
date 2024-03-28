function displayListItemsDynamically(collection) {
    let itemTemplate = document.getElementById("listItemTemplate");

    db.collection(collection).get()
        .then(allItems=> {
            console.log('Loaded!')

            allItems.forEach(doc => {
                // get database info
                var name = doc.data().title;

                console.log(doc.data().title)

                let newItem = itemTemplate.content.cloneNode(true); // Clone html.

                newItem.querySelector('#neighbourhood-name-goes-here').innerHTML = name;


                document.getElementById("cards-go-here").appendChild(newItem);
            })


        })




}

displayListItemsDynamically("neighbourhood_info");