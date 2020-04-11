var i = 1;
var j = 1;
var answer ="***";

function input(){
var g = document.getElementById("input").value;
if(1 <= g <= 999 && g[0] != g[1] && g[0] != g[2] && g[1] != g[2] && g % 1 == 0 && g[0] != "."&& g[1] != "."&& g[2] != ".")
{
    var a;
    var c;

    var e = 0;
    var b = 0;


    //左の表input
    if(i == j){
        document.getElementById("table1").value;
        if(i == 1){
            Numeron1 = document.getElementById("input").value;
            a = Numeron1;
            table1.rows[ i ].cells[ 0 ].innerText = answer;
            console.log("左" + Numeron1);
        }
        else{
            a = document.getElementById("input").value;
            table1.rows[ i ].cells[ 0 ].innerText = a;
        }

        //EATチェック
        if( a[0] == Numeron1[0])e++;
        if( a[1] == Numeron1[1])e++;
        if( a[2] == Numeron1[2])e++;
        table1.rows[ i ].cells[ 1 ].innerText = e;

        //BITEチェック
        if( a[0] == Numeron1[1] || a[0] == Numeron1[2])b++;
        if( a[1] == Numeron1[0] || a[1] == Numeron1[2])b++;
        if( a[2] == Numeron1[0] || a[2] == Numeron1[1])b++;
        table1.rows[ i ].cells[ 2 ].innerText = b;

        //勝利条件チェック
        if(e == 3 && i != 1){
            table1.rows[ i + 1 ].cells[ 0 ].innerText = "勝利";
            table2.rows[ j + 1 ].cells[ 0 ].innerText = "敗北";
        }
        i++;
    }

    //右の表input
    else{
        document.getElementById("table2").value;
        if(j == 1){
            Numeron2 = document.getElementById("input").value;
            c = Numeron2;
            table2.rows[ j ].cells[ 0 ].innerText = answer;
            console.log("右" + Numeron2);
        }
        else{
            c = document.getElementById("input").value;
            table2.rows[ j ].cells[ 0 ].innerText = c;
        }

        //EATチェック
        if( c[0] == Numeron2[0])e++;
        if( c[1] == Numeron2[1])e++;
        if( c[2] == Numeron2[2])e++;
        table2.rows[ j ].cells[ 1 ].innerText = e;

        //BITEチェック
        if( c[0] == Numeron2[1] || c[0] == Numeron2[2])b++;
        if( c[1] == Numeron2[0] || c[1] == Numeron2[2])b++;
        if( c[2] == Numeron2[0] || c[2] == Numeron2[1])b++;
        table2.rows[ j ].cells[ 2 ].innerText = b;

        //勝利条件チェック
        if(e == 3 && j != 1){
            table2.rows[ j + 1 ].cells[ 0 ].innerText = "勝利";
            table1.rows[ i ].cells[ 0 ].innerText = "敗北";
        }
        j++;
    }
    document.getElementById("input").value = "";
    document.getElementById("input").focus();
    }
}
