function login(){
    var store = inp.value();

    b.hide();
    title.hide();
    inp.hide();

    test = createElement("h1");
    test.position(600,500);
    test.html(" WELCOME "+store);

    number++;

    database.ref("/").update({
        count:number
    })
    database.ref("players/player"+number).set({
        index:number,
        y:3000
    })
    link = number;
}
function start(){
    database.ref("/").update({
        count:0,
        state:0
    })
    database.ref("players").remove();
}