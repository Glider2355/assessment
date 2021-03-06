'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

function removeAllChildren(element) {
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
const userName = userNameInput.value;
if (userName.length === 0) {
    return;
}

removeAllChildren(resultDivided);
const header = document.createElement('h3');
header.innerText = '診断結果';
resultDivided.appendChild(header);

const paragraph = document.createElement('p');
const result = assessment(userName);
paragraph.innerText = result;
resultDivided.appendChild(paragraph);

removeAllChildren(tweetDivided);
const anchor = document.createElement ('a');
const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent ('航空部診断') + '&ref_src=twsrc%5Etfw';
anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text',result);
anchor.innerText='Tweet #航空部診断';

tweetDivided.appendChild(anchor);
twttr.widgets.load();
};

const answers = [
'{userName}は機体係です。','{userName}は会計係です。','{userName}は車係です。','{userName}は機材係です。'
,'{userName}はリトリブ係です。','{userName}はラジオ係です。','{userName}はウィンチマンです。','{userName}は教官です。'
];

function assessment(userName){
let sumOfCharCode = 0;
for (let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
}

const index = sumOfCharCode % answers.length;
let result = answers[index];

result = result.replace(/\{userName\}/g,userName);
return result;
}


