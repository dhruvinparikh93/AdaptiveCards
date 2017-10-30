"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./utils");
var Constants = require("./constants");
var inputcontrol_1 = require("./inputcontrol");
var DayCell = (function () {
    function DayCell(date) {
        this._isSubdued = false;
        this._isSelected = false;
        this.date = date;
    }
    DayCell.prototype.selected = function () {
        if (this.onSelected) {
            this.onSelected(this);
        }
    };
    DayCell.prototype.render = function () {
        var _this = this;
        this._element = document.createElement("div");
        this._element.className = "ms-ctrl ms-ctrl-calendarDay";
        this._element.innerText = this.date.getDate().toString();
        this._element.tabIndex = 0;
        this._element.onclick = function (e) { _this.selected(); };
        this._element.onkeydown = function (e) {
            if (e.keyCode == Constants.KEY_ENTER) {
                _this.selected();
                return false;
            }
        };
        return this._element;
    };
    DayCell.prototype.focus = function () {
        this._element.focus();
    };
    Object.defineProperty(DayCell.prototype, "isSubdued", {
        get: function () {
            return this._isSubdued;
        },
        set: function (value) {
            this._isSubdued = value;
            if (this._isSubdued) {
                this._element.classList.add("subdued");
            }
            else {
                this._element.classList.remove("subdued");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCell.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            this._isSelected = value;
            if (this._isSelected) {
                this._element.classList.add("selected");
            }
            else {
                this._element.classList.remove("selected");
            }
        },
        enumerable: true,
        configurable: true
    });
    return DayCell;
}());
exports.DayCell = DayCell;
var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super.call(this) || this;
        _this._selectedDay = null;
        _this._miniCalendarElement = document.createElement("table");
        _this._miniCalendarElement.className = "ms-ctrl ms-ctrl-slide";
        _this._miniCalendarElement.cellPadding = "0px";
        _this._miniCalendarElement.cellSpacing = "0px";
        var miniCalendarHeader = document.createElement("div");
        miniCalendarHeader.className = "ms-ctrl ms-ctrl-calendarHeader";
        miniCalendarHeader.style.display = "flex";
        _this._monthYearLabelElement = document.createElement("div");
        _this._monthYearLabelElement.style.flex = "1 1 100%";
        miniCalendarHeader.appendChild(_this._monthYearLabelElement);
        var navButtons = document.createElement("div");
        navButtons.style.flex = "0 0 auto";
        var button = document.createElement("i");
        button.className = "ms-icon ms-ctrl-calendarNavButton ms-icon-chevronLeft";
        button.tabIndex = 0;
        button.onclick = function (e) {
            _this.date = Utils.addMonths(_this.date, -1);
        };
        button.onkeydown = function (e) {
            if (e.keyCode == Constants.KEY_ENTER) {
                _this.date = Utils.addMonths(_this.date, -1);
                return false;
            }
        };
        navButtons.appendChild(button);
        button = document.createElement("i");
        button.className = "ms-icon ms-ctrl-calendarNavButton ms-icon-chevronRight";
        button.tabIndex = 0;
        button.onclick = function (e) {
            _this.date = Utils.addMonths(_this.date, 1);
        };
        button.onkeydown = function (e) {
            if (e.keyCode == Constants.KEY_ENTER) {
                _this.date = Utils.addMonths(_this.date, 1);
                return false;
            }
        };
        navButtons.appendChild(button);
        miniCalendarHeader.appendChild(navButtons);
        _this._rootContainerElement = document.createElement("div");
        _this._rootContainerElement.className = "ms-ctrl ms-ctrl-calendar";
        _this._rootContainerElement.appendChild(miniCalendarHeader);
        _this._rootContainerElement.appendChild(_this._miniCalendarElement);
        _this.date = new Date();
        return _this;
    }
    Calendar.prototype.generateDayCells = function (baseDate) {
        var _this = this;
        this._days = [];
        var inputMonth = baseDate.getMonth();
        var inputYear = baseDate.getFullYear();
        var start = new Date(inputYear, inputMonth, 1);
        var end = new Date(inputYear, inputMonth, Utils.daysInMonth(inputYear, inputMonth));
        var startDateDayOfWeek = start.getDay();
        if ((startDateDayOfWeek - Utils.CalendarSettings.firstDayOfWeek) > 0) {
            start = Utils.addDays(start, Utils.CalendarSettings.firstDayOfWeek - startDateDayOfWeek);
        }
        var endDateDayOfWeek = end.getDay();
        var lastDayOfWeek = Utils.CalendarSettings.firstDayOfWeek + 6;
        if ((lastDayOfWeek - endDateDayOfWeek) > 0) {
            end = Utils.addDays(end, lastDayOfWeek - endDateDayOfWeek);
        }
        var endDate = end.getDate();
        var endMonth = end.getMonth();
        var endYear = end.getFullYear();
        do {
            var dayCell = new DayCell(start);
            dayCell.onSelected = function (clickedCell) {
                _this.selectedDayCell = clickedCell;
                if (_this.onDateChanged) {
                    _this.onDateChanged(_this);
                }
            };
            this._days.push(dayCell);
            var done = start.getDate() == endDate && start.getMonth() == endMonth && start.getFullYear() == endYear;
            start = Utils.addDays(start, 1);
        } while (!done);
    };
    Object.defineProperty(Calendar.prototype, "selectedDayCell", {
        get: function () {
            return this._selectedDay;
        },
        set: function (value) {
            if (this._selectedDay) {
                this._selectedDay.isSelected = false;
            }
            this._selectedDay = value;
            if (this._selectedDay) {
                this._selectedDay.isSelected = true;
                this._date = this._selectedDay.date;
            }
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.initializeSelection = function () {
        if (this._date) {
            for (var i = 0; i < this._days.length; i++) {
                if (Utils.areDatesEqual(this._days[i].date, this.date)) {
                    this.selectedDayCell = this._days[i];
                    break;
                }
            }
        }
    };
    Calendar.prototype.rebuildMiniCalendar = function (newDate, oldDate) {
        this.generateDayCells(newDate);
        var month = newDate.getMonth();
        this._miniCalendarElement.innerHTML = "";
        this._miniCalendarElement.classList.remove("ms-ctrl-slide", "ms-ctrl-slideLeftToRight", "ms-ctrl-slideRightToLeft");
        var row = document.createElement("tr");
        var dayIndex = Utils.CalendarSettings.firstDayOfWeek;
        for (var i = 0; i < Utils.CalendarSettings.daysInWeek; i++) {
            var cell = document.createElement("td");
            cell.className = "ms-ctrl ms-ctrl-calendarDayHeader";
            cell.innerText = Utils.CalendarSettings.getInitialDayName(dayIndex);
            row.appendChild(cell);
            dayIndex++;
            if (dayIndex >= Utils.CalendarSettings.daysInWeek) {
                dayIndex = 0;
            }
        }
        this._miniCalendarElement.appendChild(row);
        for (var i = 0; i < this._days.length; i++) {
            if (i % 7 == 0) {
                row = document.createElement("tr");
                this._miniCalendarElement.appendChild(row);
            }
            var tableCell = document.createElement("td");
            tableCell.appendChild(this._days[i].render());
            if (this._days[i].date.getMonth() != month) {
                this._days[i].isSubdued = true;
            }
            row.appendChild(tableCell);
        }
        if (oldDate) {
            var timeDelta = newDate.getTime() - oldDate.getTime();
            if (timeDelta > 0) {
                this._miniCalendarElement.classList.add("ms-ctrl-slide", "ms-ctrl-slideRightToLeft");
            }
            else if (timeDelta < 0) {
                this._miniCalendarElement.classList.add("ms-ctrl-slide", "ms-ctrl-slideLeftToRight");
            }
        }
    };
    Calendar.prototype.attach = function (rootElement) {
        _super.prototype.attach.call(this, rootElement);
        rootElement.innerHTML = "";
        rootElement.appendChild(this._rootContainerElement);
    };
    Calendar.prototype.focus = function () {
        if (this._selectedDay) {
            this._selectedDay.focus();
        }
    };
    Object.defineProperty(Calendar.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            var rebuildNeeded = true;
            var timeDelta = 0;
            var newDate = value ? value : new Date();
            if (this._date) {
                rebuildNeeded = !this._days || newDate.getFullYear() != this._date.getFullYear() || newDate.getMonth() != this._date.getMonth();
            }
            if (rebuildNeeded) {
                this.rebuildMiniCalendar(newDate, this._date);
            }
            this._date = newDate;
            this.initializeSelection();
            this._monthYearLabelElement.innerText = Utils.CalendarSettings.getLongMonthName(this._date.getMonth()) + " " + this._date.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    return Calendar;
}(inputcontrol_1.InputControl));
exports.Calendar = Calendar;
//# sourceMappingURL=calendar.js.map