(function($) {
    // funcs
    function initZoom()
    {
        // fix lazy load on hover
        $('.medium-zoom').on('mouseover', function(event) {
            // load the image if it hasn't been already
            // ...there is probably a better way of doing this
            var wrap = this.getElementsByClassName('cover-image');
            if (wrap.length == 1) {
                var image = wrap[0];
                if (image && image.hasAttribute('data-src')) {
                    image.setAttribute('src', image.getAttribute('data-src'));
                    image.removeAttribute('data-src');
                    image.className += ' b-loaded';
                }
            }
        });

        // enable clicking the items
        $('.medium').on('click', function(event) {
            event.preventDefault();

            var visibleClass = 'medium-toggled';

            // close any open items
            var openItem = $('.' + visibleClass);

            if (openItem &&
                typeof openItem === "object" &&
                openItem !== null &&
                openItem.nodeType === 1 &&
                typeof openItem.nodeName==="string" &&
                openItem != this)
            {
                openItem.className = openItem.className.replace(visibleClass, '').trim();
            }

            // toggle this item
            if (this.className.indexOf(visibleClass) === -1) {
                // load the image if it hasn't been already
                // ...there is probably a better way of doing this
                var wrap = this.getElementsByClassName('medium-zoom');
                if (wrap.length == 1) {
                    var wrap = wrap[0].getElementsByClassName('cover-image');
                    if (wrap.length == 1) {
                        var image = wrap[0];
                        if (image && image.hasAttribute('data-src')) {
                            image.setAttribute('src', image.getAttribute('data-src'));
                            image.removeAttribute('data-src');
                            image.className += ' b-loaded';
                        }
                    }
                }

                this.className += ' ' + visibleClass;
            } else {
                this.className = this.className.replace(visibleClass, '').trim();
            }
        });
    }

    function initSearch()
    {
        // prevent form action
        $('#navigation-form').on('submit', function(event) {
            event.preventDefault();
            return false;
        });

        // create "no results message" element
        var noResultsElem = document.createElement('p');
        noResultsElem.className = 'search-message';
        noResultsElem.innerHTML = 'Nothing matching "term" on this shelf!';
        noResultsElem.style.display = 'none';

        $('.shelves').insertBefore(noResultsElem, $('.shelves').firstChild);

        // enable search handlers
        window.onresize = searchShelf;
        $('#filter').on('keyup', searchShelf);
        $('#filter').on('change', searchShelf);

        searchShelf();
    }

    function searchShelf()
    {
        var countFound = 0;
        var searchTerm = $('#filter').value;
        var searchExp = new RegExp(searchTerm, 'i');
        var shelfItems = $('.medium');
        var matchingDisplayValue = (document.documentElement.clientWidth > 899) ? 'inline-block' : 'block';

        // hide the "no results message"
        $('.search-message').style.display = 'none';

        if (searchTerm.length < 3) {
            // clear search; show everything
            Array.prototype.forEach.call(shelfItems, function (item) {
                item.style.display = matchingDisplayValue;
                countFound++;
            });

        } else {
            // filter the shelf items
            Array.prototype.forEach.call(shelfItems, function (item) {
                var title = item.getAttribute('data-title');
                var author = item.getAttribute('data-author');

                if (!title || !searchExp.test(title)) {
                    if (!author || !searchExp.test(author)) {
                        item.style.display = 'none';
                        return;
                    }
                }

                item.style.display = matchingDisplayValue;
                countFound++;
            });
        }

        // show "no results"
        if (countFound === 0) {
            $('.search-message').innerHTML = 'Nothing matching "' + searchTerm + '" on this shelf!';
            $('.search-message').style.display = 'block';
        }
    }

    function initLazyLoad()
    {
        // we can't just put suitable markup in because
        // Delicious Library insists on writing out the whole <img> tag
        //
        // Expected:
        // <div class="cover-overlay"><img class="coverimage" src="..." width="83" height="128"></div>
        // Replace with:
        // <div class="cover-overlay"><img class="cover-image b-lazy" src="imgs/placeholder.png" data-src="..."></div>

        var srcRegex = /src="([^"]+)"/;
        var widthRegex = /width="([0-9]+)"/;
        var heightRegex = /height="([0-9]+)"/;

        $(".cover-overlay").forEach(function (el, index) {
            var src = srcRegex.exec(el.innerHTML)[1];
            var width = widthRegex.exec(el.innerHTML)[1];
            var height = heightRegex.exec(el.innerHTML)[1];

            var newElem = document.createElement('img');
            newElem.className = 'cover-image b-lazy';
            newElem.src = 'imgs/placeholder.png';
            newElem.width = width;
            newElem.height = height;
            newElem.setAttribute('data-src', src);

            el.innerHTML = '';
            el.append(newElem);
        });

        // init lazy loader plugin
        new Blazy({});
    }

    // init
    initZoom();
    initSearch();
    initLazyLoad();
})($);
