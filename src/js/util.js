(function () {


    var selectedPhotos = [];
    var LOCAL_STORAGE_KEY = "flickAlbumApp";

    /**
     * Create Flickr jsonp global method
     * @param {Function} cb - called wehn the data is returned
     */
    var addFlickrCallback = function (cb) {
        window.__flickrALbumCb = function (data) {
            cb(processFlickResponse(data));
            delete window.__flickrALbumCb;
        }
    };

    /**
     * Process flickr response to output a more concise structure
     * @param {Object} res - called when the data is returned
     * @return {Object}
     */
    var processFlickResponse = function (res) {

        var photos = res.items;
        var output = [];
        var previouslySelected = retrievePreviouslySelected();

        for (var i = 0, len = photos.length; i < len; i++) {
            var url = photos[i].media.m;
            var selected = false;
            if (previouslySelected.indexOf(url) != -1) {
                selectedPhotos.push(url);
                selected = true;
            }

            output.push({
                src : url,
                selected : selected
            });
        }
        saveSelected();
        return output;
    };

    /**
     * Retrieve the array stored in localStorage containing the list
     * of images sources selected in a rpevious session
     * @return {Array}
     */
    var retrievePreviouslySelected = function () {

        if (window.localStorage) {
            try {
                var items = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
                return items || [];
            } catch (ex) {
                return [];
            }
        }
    };

    /**
     * Save selected images sources into local storage
     */
    var saveSelected = function () {
        if (window.localStorage) {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedPhotos));
        }
    };

    /**
     * Update the saved list of selected images
     * @param {Object} photo - photo that is selected or unselected
     */
    var updateSelection = function (photo) {
        if (photo.selected) {
            selectedPhotos.push(photo.src);
        } else {
            selectedPhotos.splice(selectedPhotos.indexOf(photo.src), 1);
        }
        saveSelected();
    };



    window.flickrAlbum = window.flickrAlbum || {};    
    window.flickrAlbum.Util = {
        addFlickrCallback : addFlickrCallback,
        updateSelection : updateSelection,
        localStorageKey : LOCAL_STORAGE_KEY
    };

})();