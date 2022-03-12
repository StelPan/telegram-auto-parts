const { Markup } = require("telegraf")

/**
 *
 * @param _c
 * @param _m
 * @constructor
 */
function KeyboardPaginate (_c, _m) {
    this.current = _c;

    this.max = _m;

    this.keyboard = [];

    this.lgt = null;

    this.rgt = null;

    this.btw = null;
}

/**
 *
 * @param _c
 * @param _m
 * @returns {KeyboardPaginate}
 */
KeyboardPaginate.createPaginate = function (_c, _m) {
    return new KeyboardPaginate(_c, _m);
}

/**
 *
 * @returns {[]}
 */
KeyboardPaginate.prototype.getKeyboard = function () {
    return this.keyboard
}

KeyboardPaginate.prototype.setBetweenButton = function () {
    // TODO: Example: [[lgt][between][rgt]]
}

KeyboardPaginate.prototype.setLgtButton = function () {
    //
}

KeyboardPaginate.prototype.setRgtButton = function () {
    //
}

KeyboardPaginate.prototype.render = function () {

}




