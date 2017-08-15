'use strict'

function removeClass(selector, className) {
    return selector.classList.remove(className);
}

function addClass(selector, className) {
    return selector.classList.add(className);
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText),
            result = "",
            content = document.getElementById("content"),
            search = document.getElementById("search"),
            obj = data.response.docs;

        for (var i = 0; i < obj.length / 100; i++) {
            result += '<div class="item show">';
            if (obj[i].multimedia.length > 0) {
                result += '<a href="' + obj[i].web_url + '" target="_blank"><img src="http://www.nytimes.com/' + obj[i].multimedia[1].url + '" class="thumb"></a>'
            }
            result += '<h2 class="article-title"><a href="' + obj[i].web_url + '" target="_blank">' + obj[i].headline.main + '</a></h2>';
            result += '<p>' + obj[i].snippet + '</p>';
            result += '<span class="date">' + obj[i].pub_date.substr(0, 10) + '</span>';
            result += '</div>';
        }
        content.innerHTML = result;

        function searchValue() {
            var searchVal = search.value,
                searchStr = new RegExp(searchVal, "i"),
                item = document.getElementsByClassName("item");

            for (var i = 0; i < obj.length / 100; i++) {
                removeClass(item[i], 'show')
                if (obj[i].snippet.toLowerCase().match(searchStr) == searchVal.toLowerCase() || obj[i].headline.main.toLowerCase().match(searchStr) == searchVal.toLowerCase()) {
                    addClass(item[i], 'show')

                    // var old = JSON.stringify(data).replace(/null/g, '"#"'); //convert to JSON string
                    // var newArray = JSON.parse(old); //convert back to array
                    // var index = obj[i].snippet.indexOf(searchVal);

                    // if (index >= 0) {
                    //     obj[i].snippet.replace(obj[i].snippet, obj[i].snippet.substring(0, index) + "<span class='highlight'>" + obj[i].snippet.substring(index, index + searchVal.length) + "</span>" + obj[i].snippet.substring(index + searchVal.length));
                    //     console.log(obj[i].snippet)
                    // }

                }
            }
        }

        search.addEventListener("keyup", function() {
            setTimeout(function() { searchValue() }, 1000);
        });

    }
};
//xmlhttp.open("GET", "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=ac6afe457c104a0ba79a894587354ec1", true);
xmlhttp.open("GET", "https://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=ac6afe457c104a0ba79a894587354ec1", true);
xmlhttp.send();