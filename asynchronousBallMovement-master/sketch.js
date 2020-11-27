var number = 0,state = 0,title,inp,b,test,reset,rank=0;
var car1,car2,car3,car4,entire,link = 0,img,img2,img3,img4,road;
var cars = [];
function preload(){
    img = loadImage("car1.png");
    img2 = loadImage("car2.png");
    img3 = loadImage("car3.png");
    img4 = loadImage("car4.png");
 
    road = loadImage("track.jpg");
}
function setup(){
    createCanvas(displayWidth - 40,displayHeight - 180);


    //state link
    database = firebase.database();
    database.ref("state").on("value",function(data){
        state = data.val();
    })
    //player count linking
    database.ref("count").on("value",function(data){
        number = data.val();
    })

    //rank linking
    database.ref("rank").on("value",function(data){
        rank = data.val();
    })

    //creating button
    title = createElement("h1");
    title.html("BURNS");
    title.position(600,120);

    reset = createButton("RESET");
    reset.position(100,120);

    inp = createInput();
    inp.position(600,500);

    b = createButton("START");
    b.position(630,550);

    //create Sprites
    car1 = createSprite(400,400,20,20);
    car1.addImage(img);
    car1.shapeColor = "red";

    car2 = createSprite(400,400,20,20);
    car2.addImage(img2);
    car2.shapeColor = "blue";

    car3 = createSprite(400,400,20,20);
    car3.addImage(img3);
    car3.shapeColor = "yellow";

    car4 = createSprite(400,400,20,20);
    car4.addImage(img4);
    car4.shapeColor = "green";

    cars = [car1,car2,car3,car4];

    b.mousePressed(login);

    reset.mousePressed(start);
}

function draw(){
    background("red");

    if(number === 4){
       database.ref("/").update({
           state:1
       })
    }
    if(entire === undefined && state === 1){
        database.ref("players").on("value",function(data){
            entire = data.val();
        })
    }
    if(state === 1){
        background(rgb(100,10,10));

        var x = 340;
        var index = 0;

        reset.hide();

        image(road,0,-displayHeight,displayWidth,5*displayHeight)

        for(var i in entire){

            cars[index].x = x;

            x = x+230;

            cars[index].y = entire[i].y

            if(index === link - 1){
                camera.position.y = cars[link - 1].y;
                fill("crimson");
                ellipse(cars[link - 1].x,cars[link - 1].y,70);
            }
            
            index ++;
        }
        if(keyDown(UP_ARROW)){
            cars[link - 1].y -= 10;
            database.ref("players/player"+link).update({
                y:cars[link-1].y
            })
            test.hide();
        }
        if(cars[link - 1].y <= -620){
            database.ref("/").update({
                state:2
            })
            rank ++;

            database.ref("/").update({
                rank:rank
            })
        }
        
        drawSprites();
    }
    if(state === 2){
        alert1 = alert("YAY! YOU WON THE TYRE BURNING COMPETITION! YOUR RANK IS "+rank);
        alert1.position(displayWidth/2,200);
    }
    console.log(link);
}



