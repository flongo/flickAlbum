describe('flickrAlbum', function() {

    

    it('correctly loads pictures', function () {
        assert.equal($('li').length, 20, 'The album has not been loaded correctly');
    });

    it('correctly selects previously selected photos', function () {
        assert.deepEqual(getSelected(), [5]);
    });

    it('correctly removes photos that are not shown from localstorage', function () {
        assert.deepEqual(getLocalStorage(), getImageSources([5]));
    });




    it('correctly selects pictures', function () {
        clickOnPicture(1);
        assert.deepEqual(getSelected(), [1, 5]);
        
        clickOnPicture(3);
        assert.deepEqual(getSelected(), [1, 3, 5]);
        
        clickOnPicture(19);
        assert.deepEqual(getSelected(), [1, 3, 5, 19]);
    });


    it('correctly deselects pictures', function () {
        clickOnPicture(3);
        assert.deepEqual(getSelected(), [1, 5, 19]);
        
        clickOnPicture(1);
        assert.deepEqual(getSelected(), [5, 19]);
        
        clickOnPicture(19);
        assert.deepEqual(getSelected(), [5]);

        clickOnPicture(5);
        assert.deepEqual(getSelected(), []);
    });


    it('correctly sets localStorage pictures', function () {

        assert.deepEqual(getLocalStorage(), []);

        clickOnPicture(5);
        assert.deepEqual(getLocalStorage(), getImageSources([5]));
        
        clickOnPicture(4);
        assert.deepEqual(getLocalStorage(), getImageSources([5, 4]));

        clickOnPicture(7);
        assert.deepEqual(getLocalStorage(), getImageSources([5, 4, 7]));

        clickOnPicture(4);
        assert.deepEqual(getLocalStorage(), getImageSources([5, 7]));
    });


    var getSelected = function () {
        var selected = [];
        var photos = $('li');
        for (var i = 0, len = photos.length; i < len; i++) {
            if (photos[i].className == 'selected') {
                selected.push(i);
            }
        }
        return selected;
    };

    var clickOnPicture = function (i) {
        $($('li')[i]).trigger('click');
    };

    var getImageSources = function (imagesIndexes) {
        var sources = [];
        imagesIndexes.forEach(function (index) {
            sources.push($('li img')[index].src);
        });
        return sources;
    };

    var getLocalStorage = function () {
        return JSON.parse(window.localStorage.getItem(window.flickrAlbum.Util.localStorageKey));
    };

});
