var d3;
var dataString = 'data-pid';

var retThis = function () {
  return this;
};

var setD3 = function (_d3) {
  d3 = _d3;
  d3.selection.prototype._append = d3.selection.prototype.append;
  d3.selection.enter.prototype._append = d3.selection.enter.prototype.append;
  d3.selection.prototype._html = d3.selection.prototype.html;
  d3.selection.prototype._attr = d3.selection.prototype.attr;
  d3.selection.prototype._each = d3.selection.prototype.each;

  d3.selection.prototype.append = retThis;
  d3.selection.prototype.html = retThis;
  d3.selection.prototype.attr = retThis;
  d3.selection.prototype.each = retThis;
  d3.selection.enter.prototype.append = retThis;
};

var appendCount = -1;
var start = function () {

  function d3_selection_creator (name) {
    return typeof name === 'function' ? name
        : (name = d3.ns.qualify(name)).local ? function () { return this.ownerDocument.createElementNS(name.space, name.local); }
        : function () { return this.ownerDocument.createElementNS(this.namespaceURI, name); };
  }

  var newAppend = function (name) {
    var ogName = name;
    name = d3_selection_creator(name);

    var isEmpty = -1;

    var topNode = null;
    var allNodes = null;

    return this.select(function () {
      appendCount++;

      if (isEmpty === -1) {
        topNode = d3.select(this);
        var selection = topNode.select(ogName + '[' + dataString + '="' + appendCount + '"]');

        if (selection.empty()) {
          isEmpty = 1;
        } else {
          isEmpty = 0;
          allNodes = topNode.select('*');
        }
      }

      if (isEmpty === 1) {
        var c = this.appendChild(name.apply(this, arguments));
        return d3.select(c).attr(dataString, appendCount).node();
      } else if (isEmpty === 0) {
        return allNodes[arguments[2]];
      }

      return selection;
    });
  };

  d3.selection.prototype.append = newAppend;
  d3.selection.enter.prototype.append = newAppend;
  d3.selection.prototype.html = d3.selection.prototype._html;
  d3.selection.prototype.attr = d3.selection.prototype._attr;
  d3.selection.prototype.each = d3.selection.prototype._each;

};

var stop = function () {
  d3.selection.enter.prototype.append = retThis;
  d3.selection.prototype.append = retThis;
  d3.selection.prototype.html = retThis;
  d3.selection.prototype.attr = retThis;
  d3.selection.prototype.each = retThis;
};

module.exports = {
  start: start,
  stop: stop,
  setD3: setD3
};
