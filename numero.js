var random1 = Math.floor( Math.random() * 10 );
while(1){
var random2 = Math.floor( Math.random() * 10 );
if( random2 != random1)break;
}
while(1){
var random3 = Math.floor( Math.random() * 10 );
if( random3 != random2 && random3 != random1)break;
}

var x = random1;
var y = random2;
var z = random3;

console.log(x,y,z);

var i = 1;

function input(){
var g = document.getElementById("input").value;
if(1 <= g <= 999 && g[0] != g[1] && g[0] != g[2] && g[1] != g[2] && g % 1 == 0 && g[0] != "."&& g[1] != "."&& g[2] != ".")
{
var a ;
var e = 0;
var b = 0;
a = document.getElementById("input").value;
console.log(a);
document.getElementById("table").value;
table.rows[ i ].cells[ 0 ].innerText = a;

if( a[0] == x)e++;
if( a[1] == y)e++;
if( a[2] == z)e++;
table.rows[ i ].cells[ 1 ].innerText = e;

if( a[0] == y || a[0] == z)b++;
if( a[1] == x || a[1] == z)b++;
if( a[2] == x || a[2] == y)b++;
table.rows[ i ].cells[ 2 ].innerText = b;

if(e == 3)table.rows[ i + 1 ].cells[ 0 ].innerText = "正解";
i++;
document.getElementById("input").value = "";
document.getElementById("input").focus();
}
}