var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var result = "",
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

        function removeClass(selector, className) {
            return selector.classList.remove(className);
        }

        function addClass(selector, className) {
            return selector.classList.add(className);
        }

        function searchValue() {
            var searchStr = new RegExp(search.value.toLowerCase());
            var item = document.getElementsByClassName("item");

            for (var i = 0; i < obj.length / 100; i++) {
                removeClass(item[i], 'show')
                if (obj[i].snippet.toLowerCase().match(searchStr) == search.value || obj[i].headline.main.toLowerCase().match(searchStr) == search.value) {
                    addClass(item[i], 'show')
                }
            }
        }

        // function highlight(text) {
        //     inputText = document.getElementById("inputText")
        //     var innerHTML = inputText.innerHTML
        //     var index = innerHTML.indexOf(text);
        //     if (index >= 0) {
        //         innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
        //         inputText.innerHTML = innerHTML
        //     }

        // }
        //highlight("natalia")

        search.addEventListener("keyup", function() {
            searchValue();
        });

    }
};
//xmlhttp.open("GET", "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=ac6afe457c104a0ba79a894587354ec1", true);
xmlhttp.open("GET", "https://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=ac6afe457c104a0ba79a894587354ec1", true);
xmlhttp.send();