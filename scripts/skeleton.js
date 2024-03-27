function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#footerPlaceholder').load('./text/footer.html'));
            console.log($('#headerPlaceholder').load('./text/nav.html'));
        } else {
            // No user is signed in.
            console.log($('#footerPlaceholder').load('./text/footer.html'));
            console.log($('#headerPlaceholder').load('./text/nav.html'));
        }
    });
}

loadSkeleton(); //invoke the function

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
    }).catch((error) => {
        // An error happened.
    });
}