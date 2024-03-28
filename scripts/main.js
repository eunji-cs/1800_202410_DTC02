
//login function

function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(user => {

    if (user) {

      console.log(user.uid);
      console.log(user.displayName);
      userName = user.displayName;

      // $("#name-goes-here").text(userName);

    } else {
      // No user is signed in.
      console.log("No user is logged in");
    }
  });
}
getNameFromAuth();



//neighbourhoods function

function writeNeighbourhoods() {
  //define a variable for the collection you want to create in Firestore to populate data
  var neighbourhoodsRef = db.collection("neighbourhood_info");

  neighbourhoodsRef.add({
    code: "DTC0201",
    title: "Kitsilano",
    description: "Kitsilano, known locally as Kits, is synonymous with famous Kits Beach—named one of the top 10 best city beaches in the world by international travel magazines, and perfect for outdoor fitness.Kitsilano is one of the city's organic-food hubs, and has extensive restaurants and retail along West 4th Avenue and West Broadway. Kitsilano runs along the south shore of English Bay, between popular Granville Island and Point Grey.",
    lat: 49.2684,
    lng: -123.1683,
    tag1: "#bikers",
    tag2: "#walkers",
    tag3: "#beachlovers",
    biker_score: "90",
    transit_score: "74",
    walk_score: "92",
    safety_score: "85",
    park_score: "80",
  });

  neighbourhoodsRef.add({
    code: "DTC0202",
    title: "Downtown",
    description: "Downtown is Vancouver's primary business district, houses many arts, entertainment, and sports venues, and is close to several vibrant residential communities. A peninsula, Downtown is bounded by Burrard Inlet on the north, False Creek and the popular district of Yaletown to the south. The West End neighbourhood and world-famous Stanley Park are to the west, and the popular historic districts of Gastown, Chinatown, and Strathcona are to the east.",
    lat: 49.3399431028579,
    lng: -122.85908496766939,
    tag1: "#shopaholics",
    tag2: "#walkers",
    tag3: "#restaurantlovers",
    biker_score: 79,
    transit_score: 74,
    walk_score: 80,
    safety_score: 75,
    park_score: 60,

  });

  neighbourhoodsRef.add({
    code: "DTC0203",
    title: "Killarney",
    description: "This area is primarily single-family residential, with some multi-family homes, and even highrises in the recently-developed Fraserlands along the Fraser River. Also in this area, Champlain Heights offer retail services and amenities in walking distance. For those seeking a reprieve from city activity, Everett Crowley Park's 40 hectares offer walking trails and an off-leash area for dogs. Killarney is in the southeastern corner of the city, bordering Burnaby and the Fraser River.",
    lat: 49.2202,
    lng: -123.0413,
    tag1: "#dogwalking",
    tag2: "#walkers",
    tag3: "#parklovers",
    biker_score: 57,
    transit_score: 59,
    walk_score: 60,
    safety_score: 75,
    park_score: 80,

  });
}
