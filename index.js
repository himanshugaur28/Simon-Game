// -----------------------------------------------------------------------------------------------------------------------------------------

let start = false;
let level = 1;
let game_pattern = [];
let user_pattern = [];
const colors = ["red" , "green" , "blue" , "yellow"];

document.addEventListener("keypress" , () => {
    if (!start) {
        // let name = prompt('Enter your name');
        $('h1').text('Level ' + level);
        // alert('All the best ' + name + ' !');
        start = true;
        next_sequence();
    }
})

$('.btn').on("click", function(event) {    
    sound(0);
    var user_color = event.target.id;
    user_pattern.push(user_color);
    check(user_pattern.length - 1);
})

function next_sequence() {
    user_pattern = [];
    let ran_index = Math.floor(Math.random() * 4);
    game_pattern.push(colors[ran_index]);
    flash(colors[ran_index]);
    // check();
}

function check(current_index) {
    if (user_pattern[current_index] === game_pattern[current_index]) {
        if (user_pattern.length === game_pattern.length) {
            sound(1);
            level++;
            $('h1').text('Level: ' + level);
            next_sequence();
        }
    } 
    else {
        sound(2);
        $("body").addClass("game-over no-interaction");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 800);
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).on("keydown", restartGame);
    }
}

function restartGame() {
    $(document).off("keydown", restartGame);
    $("body").removeClass("no-interaction");
    startOver();
}

function startOver() {
    level = 1;
    game_pattern = [];
    user_pattern = [];
    start = false;
}
  
function sound(i){
    switch (i) {
        case 0:
            var audio = new Audio("sounds/blaster-2-81267.mp3");
            audio.play();
            audio.playbackRate = 2.5;
            break;
        case 1:
            var audio = new Audio("sounds/correct.mp3");
            audio.play();
            audio.playbackRate = 1;
            break;
        case 2:
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            audio.playbackRate = 3.5;
            break;
    }
}

function flash(color) {
    $('#' + color).fadeIn(100).fadeOut(100).fadeIn(100);
}

