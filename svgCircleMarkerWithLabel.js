L.CircleMarkerWithLabel = L.CircleMarker.extend({
    initialize: function (latlng, options) {
	L.CircleMarker.prototype.initialize.call(this, latlng, options);
	this._text = options.text;
	var te = this._textElement = document.createElementNS('http://www.w3.org/2000/svg', "text");
	te.textContent = this._text;
	te.setAttribute("text-anchor","middle");
    },
    onAdd: function() {
    	L.CircleMarker.prototype.onAdd.call(this);
    	this._redrawTextElement();
    	this._renderer._rootGroup.appendChild(this._textElement);
    },
    onRemove: function() {
    	L.CircleMarker.prototype.onRemove.call(this);
    	this._textElement.remove();
    },
    _updatePath: function() {
    	L.CircleMarker.prototype._updatePath.call(this);
    	this._redrawTextElement();
    },
    _redrawTextElement: function() {
    	this._textElement.textContent = this._text;
    	if (this._point) {
            this._textElement.setAttribute("class", "circle-with-marker-text");
            this._textElement.setAttribute("x", this._point.x);
            this._textElement.setAttribute("y", this._point.y);
            this._textElement.setAttribute('alignment-baseline','middle');
            this._textElement.setAttribute("fill", this.options.textColor || "black");
            this._textElement.setAttribute("font-size",this.options.fontSize || this.getRadius());
        }
    },
    setText: function(text) {
        this.options.text = this._text = text;
        return this.redraw();
    },
    getText: function() {
        return this._text;
    },
});


L.circleMarkerWithLabel = function(latlng, options) {
    return new L.CircleMarkerWithLabel(latlng, options);
};



