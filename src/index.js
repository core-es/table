'use strict';

/* global document*/

let table = class table {

    constructor(config) {
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

    setTable() {
        this.setHead();

        this.config.data.forEach((currentValue) => {
            var currentColumns = Object.keys(currentValue);

            if(currentColumns !== this.columnList) {
                this.updateHead(currentColumns);
            }

            this.setBody(currentValue);
        });

        this.fillEmptyCells();
    }

    updateHead(currentColumns) {
        currentColumns.forEach((columnName) => {
            if(!this.columnList.includes(columnName)) {
                this.columnList.push(columnName);
                this.el.theadRow
                    .insertCell(this.el.theadRow.cells.length)
                    // .appendChild(that.setLabel(columnName));
                    .innerHTML = columnName;
            }
        });
    }

    setBody(currentValue) {
        var row = this.el.tbody.insertRow(this.el.tbody.rows.length);

        this.columnList.forEach((columnName, index) => {
            if(currentValue[columnName]) {
                row.insertCell(index).innerHTML = currentValue[columnName];
            } else {
                row.insertCell(index);
            }
        });
    }

    fillEmptyCells() {
        var rows = this.$(this.config.selector).rows;

        for(var i = 1; i < rows.length; i++) {
            for(var j = this.columnList.length - 1; j > -1; j--) {
                if(!rows[i].cells.item(j)) {
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
    $(selector) {
        return document.querySelector(selector);
    }

    on() {
    }

    /**
     * Method helps to create Table Head, Body and Head Cells.
     * Read the first object from the array and create basic Table Header Cells.
     * @returns {void}
     */
    setHead() {
        this.el.table = this.$(this.config.selector);
        this.el.thead = this.el.table.createTHead();
        this.el.theadRow = this.el.thead.insertRow(this.el.table.rows.length);
        this.el.tbody = this.el.table.createTBody();
        this.columnList = Object.keys(this.config.data[0]);

        this.columnList.forEach((columnName) => {
            this.el.theadRow
                .insertCell(this.el.theadRow.cells.length)
                // .appendChild(that.setLabel(columnName));
                .innerHTML = columnName;
        });
    }
};

exports.table = table;
