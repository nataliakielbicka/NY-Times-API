(function() {
    "use strict";

    function removeClass(selector, classNames) {
        return selector.classList.remove(...classNames);
    }

    function addClass(selector, classNames) {
        return selector.classList.add(...classNames);
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
                result += '<div class="item">';
                if (obj[i].multimedia.length > 0) {
                    result += '<a href="' + obj[i].web_url + '" target="_blank"><img src="http://www.nytimes.com/' + obj[i].multimedia[1].url + '" class="thumb"></a>';
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
                    addClass(item[i], ["hidden"]);
                    if (obj[i].snippet.toLowerCase().match(searchStr) == searchVal.toLowerCase() || obj[i].headline.main.toLowerCase().match(searchStr) == searchVal.toLowerCase()) {
                        removeClass(item[i], ["hidden"]);
                    }
                }
            }

            search.addEventListener("keyup", function() {
                setTimeout(function() { searchValue(); }, 2000);
            });

        }
    };
    xmlhttp.open("GET", "https://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=ac6afe457c104a0ba79a894587354ec1", true);
    xmlhttp.send();
}());