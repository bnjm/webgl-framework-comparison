var url = 'https://spreadsheets.google.com/feeds/list/1l0ofIVaT5FjVTpQauAb1FRs2tdyEAMh9IxCgnydm1H4/od6/public/values?alt=json';
var domEl = document.querySelector('.introduction');

function loadJSON(path, success, error){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200){
        if (success){
          success(JSON.parse(xhr.responseText));
        }
      } else {
        if (error) {
          error(xhr);
        }
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

loadJSON(url,
 function(data) { handleData(data);
  },
 function(xhr) { console.error('error pulling from google spreadsheet, please refresh'); }
);

function handleData(d){
  console.dir(d.feed);
  for (var i of d.feed.entry){
    var row      = document.createElement('tr');
    var category = document.createElement('td');
    var goo      = document.createElement('td');
    var three    = document.createElement('td');
    var play     = document.createElement('td');
    category.textContent = i.title.$t;
    goo.textContent      = i.gsx$goo.$t;
    three.textContent    = i['gsx$three.js'].$t;
    play.textContent     = i.gsx$playcanvas.$t;
    // category.className = 'title';
    var dom = domEl.querySelector('.titles');
    dom.appendChild(row);
    row.appendChild(category);
    row.appendChild(three);
    row.appendChild(goo);
    row.appendChild(play);

  }
  var rows = document.querySelectorAll('td');
  for (var i = 0; i < rows.length; i++){
  rows[i].innerHTML = urlify(rows[i].textContent);
}

}

function urlify(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
}

var rows = document.querySelectorAll('td');
for (var i = 0; i < rows.length; i++){
  rows[i].textContent = urlify(rows[i].textContent);
  // console.log(rows[i]);
}

function error(x){
  alert('error pulling from google spreadsheet, please refresh');
}
