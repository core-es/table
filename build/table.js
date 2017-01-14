'use strict';

/* global document*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var table = function () {
    function table(config) {
        _classCallCheck(this, table);

        this.config = config;
        this.el = {
            table: '',
            thead: '',
            theadRow: '',
            tbody: ''
        };
        this.columnList = [];

        this.setTable();
    }

    _createClass(table, [{
        key: 'setTable',
        value: function setTable() {
            var _this = this;

            this.setHead();

            this.config.data.forEach(function (currentValue) {
                var currentColumns = Object.keys(currentValue);

                if (currentColumns !== _this.columnList) {
                    _this.updateHead(currentColumns);
                }

                _this.setBody(currentValue);
            });

            this.fillEmptyCells();
        }
    }, {
        key: 'updateHead',
        value: function updateHead(currentColumns) {
            var _this2 = this;

            currentColumns.forEach(function (columnName) {
                if (!_this2.columnList.includes(columnName)) {
                    _this2.columnList.push(columnName);
                    _this2.el.theadRow.insertCell(_this2.el.theadRow.cells.length)
                    // .appendChild(that.setLabel(columnName));
                    .innerHTML = columnName;
                }
            });
        }
    }, {
        key: 'setBody',
        value: function setBody(currentValue) {
            var row = this.el.tbody.insertRow(this.el.tbody.rows.length);

            this.columnList.forEach(function (columnName, index) {
                if (currentValue[columnName]) {
                    row.insertCell(index).innerHTML = currentValue[columnName];
                } else {
                    row.insertCell(index);
                }
            });
        }
    }, {
        key: 'fillEmptyCells',
        value: function fillEmptyCells() {
            var rows = this.$(this.config.selector).rows;

            for (var i = 1; i < rows.length; i++) {
                for (var j = this.columnList.length - 1; j > -1; j--) {
                    if (!rows[i].cells.item(j)) {
                        rows[i].insertCell(j);
                    }
                }
            }
        }

        /**
         * Method helps to find the Element from DOM.
         * @param {string} selector contains Similar to CSS Selector.
         * @returns {Object} Object which queried result of DOM.
         */

    }, {
        key: '$',
        value: function $(selector) {
            return document.querySelector(selector);
        }
    }, {
        key: 'on',
        value: function on() {}

        /**
         * Method helps to create Table Head, Body and Head Cells.
         * Read the first object from the array and create basic Table Header Cells.
         * @returns {void}
         */

    }, {
        key: 'setHead',
        value: function setHead() {
            var _this3 = this;

            this.el.table = this.$(this.config.selector);
            this.el.thead = this.el.table.createTHead();
            this.el.theadRow = this.el.thead.insertRow(this.el.table.rows.length);
            this.el.tbody = this.el.table.createTBody();
            this.columnList = Object.keys(this.config.data[0]);

            this.columnList.forEach(function (columnName) {
                _this3.el.theadRow.insertCell(_this3.el.theadRow.cells.length)
                // .appendChild(that.setLabel(columnName));
                .innerHTML = columnName;
            });
        }
    }]);

    return table;
}();

exports.table = table;
