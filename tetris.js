const FIELD_COL = 10;
const FIELD_ROW = 20;

const BLOCK_SIZE = 30;

const GAME_SPEED = 1000;

const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

const TETORO_SIZE = 4;

let can = document.getElementById("can");
let con = can.getContext("2d");

can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = "4px solid #555";

const TETORO_COLORS = [
    "#000",//0空
    "#6CF",//1水色
    "#FA2",//2オレンジ
    "#66F",//3青
    "#C5C",//4紫
    "#FD2",//5黄色
    "#F44",//6赤
    "#5B5" //7緑
];

const TETORO_TYPES = [
    [], //0.空っぽ
    [                   //1.I
        [ 0, 0, 0, 0],
        [ 1, 1, 1, 1],
        [ 0, 0, 0, 0],
        [ 0, 0, 0, 0]
    ],
    [                   //2.L
        [ 0, 1, 0, 0],
        [ 0, 1, 0, 0],
        [ 0, 1, 1, 0],
        [ 0, 0, 0, 0]
    ],
    [                   //3.J
        [ 0, 0, 1, 0],
        [ 0, 0, 1, 0],
        [ 0, 1, 1, 0],
        [ 0, 0, 0, 0]
    ],
    [                   //4.T
        [ 0, 1, 0, 0],
        [ 0, 1, 1, 0],
        [ 0, 1, 0, 0],
        [ 0, 0, 0, 0]
    ],
    [                   //5.O
        [ 0, 0, 0, 0],
        [ 0, 1, 1, 0],
        [ 0, 1, 1, 0],
        [ 0, 0, 0, 0]
    ],
    [                   //6.Z
        [ 0, 0, 0, 0],
        [ 1, 1, 0, 0],
        [ 0, 1, 1, 0],
        [ 0, 0, 0, 0]
    ],
    [                   //7.S
        [ 0, 0, 0, 0],
        [ 0, 1, 1, 0],
        [ 1, 1, 0, 0],
        [ 0, 0, 0, 0]
    ]
];

const START_X = FIELD_COL / 2 - TETORO_SIZE / 2;
const START_Y = 0;

let tetoro;

let tetoro_x = START_X;
let tetoro_y = START_Y;

let tetoro_t;

let field = [];

let over = false;



tetoro_t = Math.floor( Math.random()*(TETORO_TYPES.length-1) ) + 1;
tetoro = TETORO_TYPES[ tetoro_t ];

init();
drawAll();

setInterval( dropTetoro, GAME_SPEED );

function init(){
    for( let y = 0; y < FIELD_ROW ; y ++){
        field[y] = []; 
        for(let x = 0; x < FIELD_COL ; x ++){
            field[y][x] = 0;
        }
    }
}

function drawBlock(x,y,c){
    let px = x * BLOCK_SIZE;
    let py = y * BLOCK_SIZE;
    con.fillStyle= TETORO_COLORS[c];
    con.fillRect(px,py, BLOCK_SIZE, BLOCK_SIZE);
    con.strokeStyle="black";
    con.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
}

function drawAll(){
    con.clearRect (0,0,SCREEN_W,SCREEN_H);
    for(let y = 0; y <FIELD_ROW  ; y ++){
        for(let x = 0; x < FIELD_COL ; x ++){
            if( field[y][x] ){
                drawBlock(x,y, field[y][x]);
            }      
        }
        
    }
    for(let y = 0; y < TETORO_SIZE ; y ++){
        for(let x = 0; x < TETORO_SIZE ; x ++){
                if( tetoro[y][x] ){
                drawBlock(tetoro_x + x,tetoro_y + y, tetoro_t);   
            }      
        }
    }  
    if( over){
        let s = "GAME OVER";
        con.font = "40px 'ＭＳ ゴシック'";
        let w = con.measureText(s).width;
        let x = SCREEN_W/2 - w/2;
        let y = SCREEN_H/2 - 20;
        con.lineWidth = 4;
        con.strokeText(s,x,y);
        con.fillStyle = "white";
        con.fillText(s,x,y);
    } 
}

function checkMove( mx, my ,ntetoro){
    if( ntetoro == undefined) ntetoro = tetoro;
    for(let y = 0; y < TETORO_SIZE ; y ++){
        for(let x = 0; x < TETORO_SIZE ; x ++){
            if( ntetoro[y][x] ) {
                let nx = tetoro_x + mx + x;
                let ny = tetoro_y + my + y;
                if(ny < 0 || nx < 0 || ny >= FIELD_ROW || nx >= FIELD_COL || field[ny][nx] ){
                    return false;
                }
            }   
        }
    }
    return true;
}

function rotate(){
    let ntetoro = [];
    for(let y = 0; y < TETORO_SIZE ; y ++){
        ntetoro[y] = [];
        for(let x = 0; x < TETORO_SIZE ; x ++){
            ntetoro[y][x] = tetoro[TETORO_SIZE-x-1][y];
        }
    }
    return ntetoro;
}

function fixTetoro(){
    for(let y = 0; y < TETORO_SIZE ; y ++){
        for(let x = 0; x < TETORO_SIZE ; x ++){
            if( tetoro[y][x]){
                field[tetoro_y + y][tetoro_x + x] = tetoro_t;
            }
        }
    }
}

function checkLine(){
    let linec = 0;
    for(let y = 0; y < FIELD_ROW ; y ++){
        let flag = true;
        for(let x = 0; x < FIELD_COL ; x ++){
            if( !field[y][x] ){
               flag = false;
               break;
            }
        }
        if(flag){
            linec++;
            for(let ny = y; ny > 0 ;ny --){
                for(let nx = 0;nx < FIELD_COL ; nx ++){
                    field[ny][nx] = field[ny - 1][nx];
                }
            }
        }
    }
}

function dropTetoro(){
    if( over)return;
    if( checkMove( 0, 1) ) tetoro_y++;
    if( checkMove( 0, 1) ) tetoro_y++;
    else{
        fixTetoro();
        checkLine();
        tetoro_t = Math.floor( Math.random()*(TETORO_TYPES.length-1) ) + 1;
        tetoro = TETORO_TYPES[ tetoro_t ];
        tetoro_y = START_Y;
        tetoro_x = START_X;
        if( !checkMove( 0, 0)){
            over = true;
        }
    }
    drawAll();
}

document.onkeydown = function(e){
    if( over)return;
    switch( e.keyCode ){
        case 37: //左
            if( checkMove(- 1, 0) )tetoro_x--;
            break;
        case 38: //上
            if( checkMove( 0, -1) )tetoro_y--;
            break;
        case 39: //右
            if( checkMove( 1, 0) )tetoro_x++;
            break;
        case 40: //下
            if( checkMove( 0, 1) ) tetoro_y++;
            break;
        case 32: //スペース
            let ntetoro = rotate();
            if ( checkMove( 0, 0, ntetoro) )tetoro = ntetoro;
            break;
    }

    drawAll();
}
