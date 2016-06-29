var Util = window.flickrAlbum.Util;

var Photo = React.createClass({

    toggleSelection : function () {
        this.props.desc.selected = !this.props.desc.selected;
        this.props.update(this.props.desc);
    },

    render: function() {
        var desc = this.props.desc;
        return (
            <li
                className={desc.selected ? "selected" : ""}
                onClick={this.toggleSelection}>
                <img
                    src={desc.src}
                />
            </li>
        );
    }
});

var Album = React.createClass({
     
    getInitialState: function() {     
        var self = this;
        Util.addFlickrCallback(function (photos) {
            // Update the state after flicker returns the list of photos
            self.setState({
                photos: photos
            });
        });
        // return an empty array at the beginning
        return {
            photos : []
        };
    },

    render: function() {

        var photos = this.state.photos;
        var photoContainers = [];
        for (var i = 0, len = photos.length; i < len; i++) {
            photoContainers.push(<Photo desc={photos[i]} update={this.update}/>);
        }
        return (
            <ul className="album-container">{photoContainers}</ul>
        );
    },

    update: function (photo) {
        Util.updateSelection(photo);
        this.setState(this.state);
    }
});

ReactDOM.render(
    <Album/>,
    document.getElementById('container')
);