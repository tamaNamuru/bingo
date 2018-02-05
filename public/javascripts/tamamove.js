﻿var box = document.getElementsByTagName("p");
var i=0;
var randomInt;
var generated = new Array();
var generatedCount = generated.length;
var id = "";
var i = 0;
var count = 0;
var cols = 0;
var rows = 0;
let kaitenflag = false;
function Check(hantei){
	var box2= document.getElementById("soto");
	var box3 = document.getElementById("uti2");
	if(hantei == "bb"){
        id = setInterval(function () {
            randomInt = Math.floor( Math.random() * ( 75 - 1 ) + 1 );
            box[0].innerHTML  = randomInt;
            if(randomInt > 60){
                box2.style.backgroundColor=box3.style.backgroundColor="#FFFF66";
            }else if(randomInt > 45){
                box2.style.backgroundColor=box3.style.backgroundColor="#DD0000";
            }else if(randomInt > 30){
                box2.style.backgroundColor=box3.style.backgroundColor="#0000CC";
            }else if(randomInt > 15){
                box2.style.backgroundColor=box3.style.backgroundColor="#FFAAFF";
            }else{
                box2.style.backgroundColor=box3.style.backgroundColor="#f4a460";
            }
        }, 100);
	}else{
		randomInt = hantei;
		box[0].innerHTML = randomInt;
		if(randomInt > 60){
			box2.style.backgroundColor=box3.style.backgroundColor="#FFFF66";
		}else if(randomInt > 45){
			box2.style.backgroundColor=box3.style.backgroundColor="#DD0000";
		}else if(randomInt > 30){
			box2.style.backgroundColor=box3.style.backgroundColor="#0000CC";
		}else if(randomInt > 15){
			box2.style.backgroundColor=box3.style.backgroundColor="#FFAAFF";
		}else{
			box2.style.backgroundColor=box3.style.backgroundColor="#f4a460";
		}
		generated[i] = randomInt;  
		i++;
		generatedCount++;
		clearInterval(id);
		addTable("sample1_table",randomInt);
	}
}
function addTable(id,randomInt) {
	count++;
	var table = document.getElementById(id);
	var rows = table.rows.length;
	
	if(rows == 0){
		display(id,randomInt);
		rows++;
	}else {
		display(id,randomInt);
		count =  1;
	}
}

var history_b = new Array();
var flagcount = 0;
function display(id, randomInt) {
	var table = document.getElementById(id);
	flagcount++;
	var atai = "";
	if(history_b.length > 6) {
		history_b.shift();
	}
	history_b.push(randomInt);
	if(history_b.length == 1) {
		atai = "<td><div class=\"ball\"><div class=\"ball2\"><div class=\"ball3\">" + history_b[0] + "</div></div></div></td>";
	}else {
		for(var i = 0; i < history_b.length; i++){
			atai = atai + "<td><div class=\"ball\"><div class=\"ball2\"><div class=\"ball3\">" + history_b[i] + "</div></div></div></td>";
		}
	}
	atai = atai + "</table>";
	table.innerHTML = (atai);
	for(var j = 0; j < history_b.length; j++){
		var ball = document.getElementsByClassName("ball")[j];
		var ball2 = document.getElementsByClassName("ball2")[j];
		var ball3 = document.getElementsByClassName("ball3")[j];
		if(history_b[j] > 60){
			ball.style.backgroundColor="#FFFF66";
			ball2.style.backgroundColor="#FFFF66";
			ball3.style.border="solid 3px #FFFF66";
		}else if(history_b[j] > 45){
			ball.style.backgroundColor="#DD0000";
			ball2.style.backgroundColor="#DD0000";
			ball3.style.border="solid 3px #DD0000";
		}else if(history_b[j] > 30){
			ball.style.backgroundColor="#0000CC";
			ball2.style.backgroundColor="#0000CC";
			ball3.style.border="solid 3px #0000CC";
		}else if(history_b[j] > 15){
			ball.style.backgroundColor="#FFAAFF";
			ball2.style.backgroundColor="#FFAAFF";
			ball3.style.border="solid 3px #FFAAFF";
		}else{
			ball.style.backgroundColor="#f4a460";
			ball2.style.backgroundColor="#f4a460";
			ball3.style.border="solid 3px #f4a460";
		}
	}
}

//音源
var aAudio = $( "#media_player" );
var bAudio = $( "#media_player1" );

//socket
const sub = io('/sub');

$(function() {
	var countflag = 0;
	$('#buttonMove').click(function() {
	countflag++;
		if(countflag < 76) {
			if(countflag > 6) {
				$('.ball').animate({"left": "-=280px"},"slow");
			}
		}
	});
    
    // ポップアップ用のタグを消す
    $('#popup-background').hide();
    $('.popup-roomname').hide();
    $('.popup-roomid').hide();
    var idhide = true;
    sub.on('changeView', () => {
        if(idhide){
            $('#popup-background').fadeIn(100);
            $('.popup-roomname').fadeIn(100);
            $('.popup-roomid').fadeIn(100);
        }else{
            $('#popup-background').fadeOut();
            $('.popup-roomname').fadeOut();
            $('.popup-roomid').fadeOut();
        }
        idhide = !idhide;
    });
});

//ビンゴ者数の更新
sub.on('updateBingoCount', (count) => {
	document.getElementById("bingosya").innerHTML = count;
});
//運営者がStartボタンを押すとサーバ経由で受信する
sub.on('rouletteStart', () => {
    if(kaitenflag) return;
    kaitenflag = true;
    aAudio.get(0).play();
	aAudio.get(0).pause();
	aAudio.get(0).load();
	aAudio.get(0).play();
	Check("bb");
});

var countflag = 0;
//送られてきた数字を表示
sub.on('broadcastNumber', (number) => {
    kaitenflag = false;
    aAudio.get(0).pause();
	bAudio.get(0).play();
	bAudio.get(0).load();
	bAudio.get(0).play();
	Check(number);	//送られてきた数字を入力
	countflag++;
	if(countflag < 76) {
		if(countflag > 6) {
			$('.ball').animate({"left": "-=280px"},"slow");
		}
	}
});

sub.on('stopRoulette', () => {
    kaitenflag = false;
    aAudio.get(0).pause();
	bAudio.get(0).play();
	bAudio.get(0).load();
	bAudio.get(0).play();
    clearInterval(id);
    let tmp = 1;
    if(i == 0){
        box[0].innerHTML = 1;
    }else {
        box[0].innerHTML = generated[i-1];
        tmp = generated[i-1];
    }
    var box2= document.getElementById("soto");
    var box3 = document.getElementById("uti2");
    if(tmp > 60){
        box2.style.backgroundColor=box3.style.backgroundColor="#FFFF66";
    }else if(tmp > 45){
        box2.style.backgroundColor=box3.style.backgroundColor="#DD0000";
    }else if(tmp > 30){
        box2.style.backgroundColor=box3.style.backgroundColor="#0000CC";
    }else if(tmp > 15){
        box2.style.backgroundColor=box3.style.backgroundColor="#FFAAFF";
    }else{
        box2.style.backgroundColor=box3.style.backgroundColor="#f4a460";
    }
});

//じゃんけんに
sub.on('redirect', (url) => {
    window.location.href = url;
});