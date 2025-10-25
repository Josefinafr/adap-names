"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = exports.ESCAPE_CHARACTER = exports.DEFAULT_DELIMITER = void 0;
exports.DEFAULT_DELIMITER = '.';
exports.ESCAPE_CHARACTER = '\\';
/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 *
 * Homogenous name examples
 *
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
var Name = /** @class */ (function () {
    /** Expects that all Name components are properly masked */
    function Name(other, delimiter) {
        this.delimiter = exports.DEFAULT_DELIMITER;
        this.components = [];
        if (!Array.isArray(other)) {
            throw new TypeError("Der Konstruktor erwartet ein Array von Strings");
        }
        if (!other.every(function (x) { return typeof x === "string"; })) {
            throw new TypeError("Alle Komponenten müssen Strings sein");
        }
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
        this.components = __spreadArray([], other, true);
    }
    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    Name.prototype.asString = function (delimiter) {
        if (delimiter === void 0) { delimiter = this.delimiter; }
        var d = delimiter !== null && delimiter !== void 0 ? delimiter : this.delimiter;
        return this.components.join(d);
    };
    /**
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
    Name.prototype.asDataString = function () {
        return this.components.join(exports.DEFAULT_DELIMITER);
    };
    Name.prototype.getComponent = function (i) {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index außerhalb des gültigen Bereichs");
        }
        return this.components[i];
    };
    /** Expects that new Name component c is properly masked */
    Name.prototype.setComponent = function (i, c) {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index außerhalb des gültigen Bereichs");
        }
        this.components[i] = c;
    };
    /** Returns number of components in Name instance */
    Name.prototype.getNoComponents = function () {
        return this.components.length;
    };
    /** Expects that new Name component c is properly masked */
    Name.prototype.insert = function (i, c) {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("Insert-Index außerhalb des gültigen Bereichs");
        }
        this.components.splice(i, 0, c);
    };
    /** Expects that new Name component c is properly masked */
    Name.prototype.append = function (c) {
        this.components.push(c);
    };
    Name.prototype.remove = function (i) {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("index out of range");
        }
        this.components.splice(i, 1);
    };
    return Name;
}());
exports.Name = Name;
