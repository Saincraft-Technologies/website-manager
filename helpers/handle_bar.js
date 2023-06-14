
const Handlebars = require("express-handlebars");
// const i18n = require("./languages/i18n.config");
// const { phrase, addLang, byCode, setLang, getLanguage } = require('./language.js');
// const translationFolder = __dirname + '/languages/';


var register = function (Handlebars) {
    var helpers = {
        // trs: function (str) {

        //     return (!str) ?
        //         '...' :
        //         i18n.__(str.trimStart(), i18n.getLocale());
        // },
        cdn: function (key) {
            if (process.env.NODE_ENV === 'development') {
                return process.env.D_PUBLIC;
            } else {
                if (key == 'public') {
                    console.log('there is key', key);
                    return process.env.PUBLIC + '/storekeeperapp/' + key;
                } else {
                    console.log('there is no key', key);
                    return process.env.PUBLIC + '/storekeeperapp/public';
                }
            }
        },
        image: function () {
            if (process.env.NODE_ENV === 'development') {
                return '/';
            } else {
                return process.env.PUBLIC;
            }
        },
        site: function () {
            if (process.env.NODE_ENV === 'development') {
                return process.env.D_SITE;
            } else {
                return process.env.SITE;
            }
        },
        sumOfColumn: function (name, format, object = new Array(), options) {
            console.log('here...... ', name.split('.').length);
            if (!object == 'null' || 'undefined') {
                if (name.split('.').length == 1) {

                    var result1 = [object.reduce((acc1, n) => {
                        for (const prop in n) {
                            if (acc1.hasOwnProperty(prop)) acc1[prop] += n[prop];
                            else acc1[prop] = n[prop];
                        }

                        return acc1;
                    }, {})]
                    if (format == 'Money' || 'money') {
                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'TZS',
                        });
                        console.log('no dot....::1', name, formatter.format(result1[0][name]));
                        return formatter.format(result1[0][name]);
                    } else {
                        return result1[0][name];
                    }
                } else {
                    var result = [object.reduce((acc, start) => {
                        for (const n in start) {
                            console.log('object inside', acc)
                            if (acc.hasOwnProperty(n)) {
                                for (const prop in start[n]) {
                                    if (acc.hasOwnProperty(start[n])) {
                                        acc[n][prop] += start[n][prop];
                                    } else {
                                        acc[n] = start[n];
                                    }
                                }
                            } else {

                                acc[n] = start[n];
                            }

                        }

                        return acc;
                    }, {})]
                    if (format == 'Money' || 'money') {
                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'TZS',
                        });
                        if (result[0][name.split('.')[0]]) {
                            console.log('dot present....::', name, formatter.format(result[0][name.split('.')[0]][[name.split('.')[1]]]));
                            return formatter.format(result[0][name.split('.')[0]][[name.split('.')[1]]]);
                        } else {

                            console.log('dot present....::', name, formatter.format(result[0][name.split('.')[0]]));
                            return formatter.format(result[0][name.split('.')[0]]);
                        }
                    } else {
                        if (result[0][name.split('.')[0]]) {
                            console.log('dot present....::', name, formatter.format(result[0][name.split('.')[0]][[name.split('.')[1]]]));
                            return result[0][name.split('.')[0]][[name.split('.')[1]]];
                        } else {

                            console.log('dot present....::', name, result[0][name.split('.')[0]]);
                            return result[0][name.split('.')[0]];
                        }
                    }
                }
            } else {
                return '--';
            }


        },
        getIndex: function (index, opt) {
            if (!index == 'null' || 'undefined')
                return index + 1;
            else
                return '--';
        },
        money: function (value, options) {
            if (!value == 'null' || 'undefined') {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'TZS',
                    maximumFractionDigits: 0,
                    signDisplay: 'never',
                });
                return formatter.format(value);
            }
            else {
                return '--'
            }
        },
        for: function (from, to, incr, block) {
            var accum = '';
            for (var i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        },
        isEmpty: function (obj, opt) {
            (obj.length <= 0) ? opt.fn(this) : opt.inverse(this);
        },
        ifRowsValueExist: function (rows, value, options) {
            var k = [];
            rows.forEach(row => {
                if (row.role == value) {
                    k.push(true);
                } else {
                    k.push(false);
                }
            });
            console.log(k);
            if (k.includes(true)) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        myEach: function (arg1, arg2, options) {
            options = JSON.parse(JSON.stringify(arg1))[arg2];
            console.log('...Long:: ', arg1, arg2);
            return arg1[arg2];
        },

        yearFrom: function (arg1, options) {
            let start = arg1;
            let end = new Date().getFullYear();
            for (let i = start; i < end; i++) {
                return i;

            }
        },

        isEven: function (arg1, options) {
            return ((arg1 % 2) == 0) ? options.fn(this) : options.inverse(this);
        },

        lastId: function (object) {
            return (typeof object == 'object') ? object[object.length - 1].id : typeof object;
        },
        firstId: function (object) {
            return (typeof object == 'object') ? object[0].id : typeof object;
        },
        notEven: function (arg1, options) {
            return ((arg1 % 2) == 1) ? options.fn(this) : options.inverse(this);
        },
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        ifIncludes: function (arg1, arg2, options) {
            return (arg1.includes(arg2)) ? options.fn(this) : options.inverse(this);
        },
        ifLess: function (arg1, arg2, options) {
            return (arg1 < arg2) ? options.fn(this) : options.inverse(this);
        },
        ifLessEquals: function (arg1, arg2, options) {
            return (arg1 <= arg2) ? options.fn(this) : options.inverse(this);
        },
        ifGreatEquals: function (arg1, arg2, options) {
            return (arg1 >= arg2) ? options.fn(this) : options.inverse(this);
        },
        ifGreat: function (arg1, arg2, options) {
            return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
        },

        kaimage: function (name, opt) {
            if (name) {
                let p = name.toString('utf8').split(' ').join('_');
                return p;
            }
        },
        // includes: function(arg1, arg1) {
        //     arg1.forEach(arg =>{
        //         if(arg.includes(arg2))
        //     });
        // },
        select: function (value, options) {
            return options.fn(this)
                .replace(new RegExp(' value=\"' + value + '\"'), '$& selected="selected"')
                .replace(new RegExp('>' + value + '</option>'), ' selected="selected"$&');
        },
        setDate: function (value) {
            if (!value == undefined || 'null') {
                console.log('date value in handlebars:', value);
                let today = new Date(value).toISOString().substr(0, 10);
                // today = today.replace('-', '/').replace('-', '/')
                console.log(today);
                return today;
            }
            return '';
        },
        setHomeDate: function (value) {
            if (!value == 'undefined' || 'null') {
                let today = new Date(value).toDateString();
                // today = today.replace('-', '/').replace('-', '/')
                console.log(today);
                return today;
            }
            return '';
        },
        setExtendedDate: function (value, time) {
            console.log(value);
            var timeArray = time.toString().split(":");
            let today = new Date(value);
            today.setHours(parseInt(timeArray[0]), parseInt(timeArray[1]));
            console.log(today.toUTCString());
            return today;
        },
        longAgo: function (value) {
            let vday = new Date(value);
            let today = new Date();
            let sec = 0;
            let min = 0;
            let hrs = 0;
            let days = 0;
            var millisecondsDifference = today - vday;

            hours = millisecondsDifference / (60 * 60 * 1000);
            if (hours >= 24) {
                var arrayHours = hours.toString().split('.');
                var hoursTotal = parseInt(arrayHours[0]);
                var minTotal = parseInt(("0." + arrayHours[1]) * 60);
                var arrayDays = (hoursTotal / 24).toString().split('.');
                var daysTotal = parseInt(arrayDays[0]);
                var extraHours = parseInt(("0." + arrayDays[1]) * 24);
                hoursTotal = + extraHours;
                min = minTotal;
                hrs = hoursTotal;
                days = daysTotal;
                if (days == 1) {
                    return `${days} day ago`;
                }

                return `${days} days ago`;
            } else {

                var arrayHours = hours.toString().split('.');
                var hoursTotal = parseInt(arrayHours[0]);
                var minTotal = parseInt(("0." + arrayHours[1]) * 60);
                var arrayDays = (hoursTotal / 24).toString().split('.');
                var daysTotal = parseInt(arrayDays[0]);
                // var extraHours = parseInt(("0."+arrayDays[1])*24);
                // hoursTotal =+ extraHours;
                min = minTotal;
                hrs = hoursTotal;
                days = daysTotal;
                if (hrs <= 0) {
                    return `${min} min ago`;
                }
                if (hrs == 1) {
                    return `${hrs} hrs ${min} min ago`;
                }

                return `${hrs} hrs ${min} min ago`;
            }
        },
        setAge: function (value) {
            console.log(value);
            let dob = new Date(value);
            let today = new Date();
            var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
            return age;
        },
        // setTime:function(value){
        //     console.log(value);
        //     var timeArray = value.toString().split(":");
        //     let today =  new Date();
        //     today.setHours(parseInt(timeArray[0]), parseInt(timeArray[1]));
        //     console.log("time: ",today);
        //     return today;
        // },
        // showDate: function( date =  Date){
        //     return new Date(value)
        // },
        add: function (x, y, answer) {
            return parseFloat(x) + parseFloat(y);;
        },
        devide: function (x, y, answer) {
            answer = x / y;
        },
        minus: function (x, y) {
            return parseInt(x) - parseInt(y);
        },
        times: function (x, y) {
            return parseFloat(x) * parseFloat(y);
        },
        grandTotal: function (x) {
            var vat = parseFloat(x) * 0.18;
            return vat + parseFloat(x);
        },
        great: function (x, y, answer) {
            var dim = false;
            if (x > y) {
                dim = true;
                answer = dim;
            } else {
                dim = false;
                answer = dim;
            }
        },
        equal: function (x, y, answer) {
            var dim = false;
            if (x == y) {
                dim = true;
                answer = dim;
            } else {
                dim = false;
                answer = dim;
            }
        },
        notDecimal: function (x, answer) {
            if (x.string.indexOf(".") == -1) {

                answer = false;
            } else {
                answer = true;
            }
        },
        pageCalculator: function (total, limit) {
            var dec = total / limit.toString();
            tPages = (limit / limit) + 1;
            return tPages;
            // if(dec.string.indexOf(".") == -1){
            //     var ans = Math.round(dec) + 1;
            // }else{
            //     tPages = total;
            //     return tPages;
            // }
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};
module.exports.register = register;
module.exports.helpers = register(Handlebars.ExpressHandlebars); 