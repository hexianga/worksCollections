'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maintenance = function () {
    function Maintenance() {
        _classCallCheck(this, Maintenance);

        // 车子可以使用的时间
        this.useTime = 6;

        // 保存保养或者报废车子车牌的数组
        this.WriteOff = [];
        this.DistanceRelated = [];
        this.TimeRelated = [];

        // 保存保养或者报废车子车牌的数组
        this.WriteOffBrand = [];
        this.DistanceRelatedBrand = [];
        this.TimeRelatedBrand = [];

        // 已经报废的车子
        this.WritedOff = [];

        // 大小月
        this.bigMonth = [1, 3, 5, 7, 8, 10, 12];
        this.smallMonth = [4, 6, 9, 11];
    }

    // contains函数：判断一个元素是否存在一个数组中


    _createClass(Maintenance, [{
        key: 'contains',
        value: function contains(value, array) {
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
            return false;
        }

        // 数组去重和排序

    }, {
        key: 'arrSort',
        value: function arrSort(brand, carNumber) {
            var arr = brand,
                arr1 = carNumber;
            var length = arr.length;
            // 数组去重
            for (var i = 0; i < length; i++) {
                for (var j = i + 1; j < length; j++) {
                    if (arr[i] == arr[j]) {
                        // 车子商标数组去重
                        arr.splice(j, 1);
                        // 车牌数组也要改
                        arr1[i] = arr1[i] + ", " + arr1[j];
                        arr1.splice(j, 1);
                        length--;
                        j--;
                    }
                }
            }
            // 数组排序
            length = arr.length;
            for (var _i = 0; _i < length - 1; _i++) {
                for (var _j = _i + 1; _j < length; _j++) {
                    if (arr[_i] > arr[_j]) {
                        // 车子商标数组排序
                        var temp = arr[_i];
                        arr[_i] = arr[_j];
                        arr[_j] = temp;
                        // 车牌数组也要跟着排
                        temp = arr1[_i];
                        arr1[_i] = arr1[_j];
                        arr1[_j] = temp;
                    }
                }
            }
            return arr;
        }

        // 对获得的信息进行计算从而得到需要提醒保养的车子

    }, {
        key: 'getReminder',
        value: function getReminder(nows, string) {
            var car = string.split('|');
            var gettime = car[1].split('/');
            var now = nows.split('/');
            // car[4]此处末尾有一个换行符，长度为2，所以不和"T"相等
            // 根据是否大修过修改车子的使用时间
            if (car[4].charAt(0) == "T") {
                this.useTime = 3;
            } else {
                // 此处代码经过设置断点逐步调试添加
                this.useTime = 6;
            }

            // 车子用了几年
            var year = parseInt(now[0]) - parseInt(gettime[0]);

            // 初步判断车子是否报废
            if (this.useTime == 6 && year > 6 || this.useTime == 3 && year > 3) {
                this.WritedOff.push(car[0]);
            }
            if ((this.useTime == 6 && year == 6 || this.useTime == 3 && year == 3) && parseInt(now[1]) > parseInt(gettime[1])) {
                this.WritedOff.push(car[0]);
            }

            // 第一步：判断车子是否发出报废提醒和进一步判断是否已经报废
            if (!this.contains(car[0], this.WritedOff)) {
                if (year == 2 || year == 5) {
                    var count = 0;
                    for (var i = gettime[0]; i <= now[0]; i++) {
                        if (i % 100 != 0 && i % 4 == 0 || i % 100 == 0 && i % 400 == 0) {
                            count++;
                        }
                    }
                    if (count == 1) {
                        // 此时闰年数有且只有一个 买车年份和当前年份都不是闰年
                        if (gettime[1] === "01" || gettime[1] === "02" && gettime[2] === "01") {

                            if (gettime[1] === "01" && gettime[2] === "01") {
                                // 当前月份是11的时候会提醒报废
                                if (now[1] === "11" || now[1] === "12" && now[2].slice(0,2) !== "31") {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                } else if (now[1] === "12" && now[2].slice(0,2) === "31") {
                                    this.WritedOff.push(car[0]);
                                }
                            } else {
                                // 其它情况下当前月份是12的时候会提醒报废
                                if (now[1] === "12") {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                            }
                        }
                    } else if (count == 2) {
                        // 买车年份是闰年或者当前年份是闰年
                        if (gettime[1] === "01" && gettime[2] === "01") {
                            if (now[1] === "11" || now[1] === "12" && now[2].slice(0,2) !== "31" && now[1] === "12" && now[2].slice(0,2) !== "30") {
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                            if (now[1] === "12" && now[2].slice(0,2) === "31" || now[1] === "12" && now[2].slice(0,2) === "30") {
                                this.WritedOff.push(car[0]);
                            }
                        }
                        if (gettime[1] === "01" && gettime[2] === "02") {
                            if (now[1] === "11" || now[1] === "12" && now[2].slice(0,2) !== "31") {
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                            if (now[1] === "12" && now[2].slice(0,2) === "31") {
                                this.WritedOff.push(car[0]);
                            }
                        }
                        if (gettime[1] === "01" && gettime[2] !== "02" && gettime[2] !== "01" || gettime[1] === "02" && gettime[2] === "01" || gettime[1] === "02" && gettime[2] === "02") {
                            if (now[1] === "12") {
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                        }
                    } else if (count == 0) {
                        // 只有大修过的车才会出现此种情况
                        if (gettime[1] === "01" && now[1] === "12") {
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        }
                    }
                } else if (year == 3 || year == 6) {
                    // 判断闰年的个数，可能是一个或者是两个
                    var _count = 0;
                    for (var _i2 = gettime[0]; _i2 <= now[0]; _i2++) {
                        if (_i2 % 100 != 0 && _i2 % 4 == 0 || _i2 % 100 == 0 && _i2 % 400 == 0) {
                            _count++;
                        }
                    }

                    // 当前月份小于买车月份一个月
                    if (parseInt(gettime[1]) - parseInt(now[1]) == 1) {
                        // 只有一个闰年时，当前年份必为平年
                        if (_count == 1) {
                            if (gettime[2] >= 2 && gettime[2] <= 31) {
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }

                            if (gettime[2] == 1) {
                                // 报废提醒或者是已报废
                                if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) != 31) {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) == 31) {
                                    this.WritedOff.push(car[0]);
                                }
                                if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) != 30) {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) == 30) {
                                    this.WritedOff.push(car[0]);
                                }
                                if (parseInt(now[1]) == 2 && now[2].slice(0,2) != 28) {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                if (parseInt(now[1]) == 2 && now[2].slice(0,2) == 28) {
                                    this.WritedOff.push(car[0]);
                                }
                            }
                        } else if (_count == 2) {
                            if (gettime[2] >= 2 && gettime[2] <= 31) {
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }

                            if ((parseInt(now[0]) - 1) % 4 == 0) {
                                // 包含两个闰二月 当前年份肯定是平年，二月只有28天
                                if (gettime[2] == 1) {
                                    // 车子报废提醒
                                    if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) != 31 && now[2].slice(0,2) != 30) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) != 30 && now[2].slice(0,2) != 29) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if (parseInt(now[1]) == 2 && now[2].slice(0,2) != 28 && now[2].slice(0,2) != 27) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    // 车子已报废
                                    if (this.contains(parseInt(now[1]), this.bigMonth) && (now[2].slice(0,2) == 31 || now[2].slice(0,2) == 30)) {
                                        this.WritedOff.push(car[0]);
                                    }
                                    if (this.contains(parseInt(now[1]), this.smallMonth) && (now[2].slice(0,2) == 30 || now[2].slice(0,2) == 29)) {
                                        this.WritedOff.push(car[0]);
                                    }
                                    if (parseInt(now[1]) == 2 && now[2].slice(0,2) == 28 && now[2].slice(0,2) == 27) {
                                        this.WritedOff.push(car[0]);
                                    }
                                }

                                if (gettime[2] == 2) {
                                    // 车子报废提醒
                                    if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) != 31) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) != 30) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if (parseInt(now[1]) == 2 && now[2].slice(0,2) != 28) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    // 车子已报废
                                    if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) == 31) {
                                        this.WritedOff.push(car[0]);
                                    }
                                    if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) == 30) {
                                        this.WritedOff.push(car[0]);
                                    }
                                    if (parseInt(now[1]) == 2 && now[2].slice(0,2) == 28) {
                                        this.WritedOff.push(car[0]);
                                    }
                                }
                            } else if (parseInt(now[0]) % 4 == 0) {
                                // 当前年份是闰年
                                if (now[1] == 1 || now[1] == 2 && now[2].slice(0,2) != 29) {
                                    // 只有一个2/29

                                    if (gettime[2] == 1) {
                                        // 车子报废提醒
                                        if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) != 31) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) != 30) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        if (parseInt(now[1]) == 2 && now[2].slice(0,2) != 29) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        // 车子已报废
                                        if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) == 31) {
                                            this.WritedOff.push(car[0]);
                                        }
                                        if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) == 30) {
                                            this.WritedOff.push(car[0]);
                                        }
                                        if (parseInt(now[1]) == 2 && now[2].slice(0,2) == 29) {
                                            this.WritedOff.push(car[0]);
                                        }
                                    }
                                } else {
                                    // 两个2/29

                                    if (gettime[2] == 1) {
                                        // 车子报废提醒
                                        if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) != 31 && now[2].slice(0,2) != 30) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) != 30 && now[2].slice(0,2) != 29) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        if (parseInt(now[1]) == 2 && now[2].slice(0,2) != 29 && now[2].slice(0,2) != 28) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        // 车子已报废
                                        if (this.contains(parseInt(now[1]), this.bigMonth) && (now[2].slice(0,2) == 31 || now[2].slice(0,2) == 30)) {
                                            this.WritedOff.push(car[0]);
                                        }
                                        if (this.contains(parseInt(now[1]), this.smallMonth) && (now[2].slice(0,2) == 30 || now[2].slice(0,2) == 29)) {
                                            this.WritedOff.push(car[0]);
                                        }
                                        if (parseInt(now[1]) == 2 && (now[2].slice(0,2) == 29 || now[2].slice(0,2) == 28)) {
                                            this.WritedOff.push(car[0]);
                                        }
                                    }
                                }
                            } else if ((parseInt(now[0]) + 2) % 4 == 0) {
                                // 开始月份是闰年  当前年份一定是平年
                                if (gettime[1] == 2) {
                                    // 两个2/29
                                    if (gettime[2] == 1) {
                                        // 车子报废提醒
                                        if (now[2].slice(0,2) != 31 && now[2].slice(0,2) != 30) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        // 车子已报废
                                        if (now[2].slice(0,2) == 31 || now[2].slice(0,2) == 30) {
                                            this.WritedOff.push(car[0]);
                                        }
                                    } else if (gettime[2] == 2) {
                                        // 车子报废提醒
                                        if (now[2].slice(0,2) != 31) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        // 车子已报废
                                        if (now[2].slice(0,2) == 31) {
                                            this.WritedOff.push(car[0]);
                                        }
                                    }
                                } else {
                                    // 只有一个2/29
                                    if (gettime[2] == 1) {
                                        // 车子报废提醒
                                        if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) != 31) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) != 30) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        if (parseInt(now[1]) == 2 && now[2].slice(0,2) != 28) {
                                            this.WriteOff.push(car[0]);
                                            this.WriteOffBrand.push(car[2]);
                                        }
                                        // 车子已报废
                                        if (this.contains(parseInt(now[1]), this.bigMonth) && now[2].slice(0,2) == 31) {
                                            this.WritedOff.push(car[0]);
                                        }
                                        if (this.contains(parseInt(now[1]), this.smallMonth) && now[2].slice(0,2) == 30) {
                                            this.WritedOff.push(car[0]);
                                        }
                                        if (parseInt(now[1]) == 2 && now[2].slice(0,2) == 28) {
                                            this.WritedOff.push(car[0]);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // 当前月份和买车月份相同
                    if (now[1] == gettime[1]) {
                        if (_count == 1) {
                            // 一个2/29
                            if (parseInt(now[2].slice(0,2)) < parseInt(gettime[2]) - 1) {
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            } else {
                                this.WritedOff.push(car[0]);
                            }
                        } else if (_count == 2) {
                            if ((parseInt(now[0]) - 1) % 4 == 0) {
                                // 包含两个2/29
                                if (parseInt(now[2].slice(0,2)) < parseInt(gettime[2]) - 2) {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                } else {
                                    this.WritedOff.push(car[0]);
                                }
                            } else if (parseInt(now[0]) % 4 == 0) {
                                // 当前年份是闰年
                                if (now[1] == 1 || now[1] == 2 && now[2].slice(0,2) != 29) {
                                    // 只有一个2/29
                                    if (parseInt(now[2].slice(0,2)) < parseInt(gettime[2]) - 1) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    } else {
                                        this.WritedOff.push(car[0]);
                                    }
                                } else {
                                    // 两个2/29
                                    if (parseInt(now[2].slice(0,2)) < parseInt(gettime[2]) - 2) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    } else {
                                        this.WritedOff.push(car[0]);
                                    }
                                }
                            } else if ((parseInt(now[0]) + 2) % 4 == 0) {
                                // 买车年份是闰年
                                if (gettime[1] == 1 || gettime[1] == 2 && gettime[2] != 29) {
                                    // 两个2/29
                                    if (parseInt(now[2].slice(0,2)) < parseInt(gettime[2]) - 2) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    } else {
                                        this.WritedOff.push(car[0]);
                                    }
                                } else {
                                    // 一个2/29
                                    if (parseInt(now[2].slice(0,2)) < parseInt(gettime[2]) - 1) {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    } else {
                                        this.WritedOff.push(car[0]);
                                    }
                                }
                            }
                        }
                    }

                    // 当前月份+2=买车月份
                    if (parseInt(now[1]) + 2 == gettime[1]) {
                        if (_count == 1 && gettime[2] === '01') {
                            // 一个2/29
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        } else if (_count == 2) {
                            if ((parseInt(now[0]) - 1) % 4 == 0) {
                                // 包含两个2/29
                                if (gettime[2] === '01' || gettime[2] === '02') {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                            } else if (parseInt(now[0]) % 4 == 0) {
                                // 当前年份是闰年
                                if (now[1] == 1 || now[1] == 2 && now[2].slice(0,2) != 29) {
                                    // 只有一个2/29
                                    if (gettime[2] === '01') {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                } else {
                                    // 两个2/29
                                    if (gettime[2] === '01' || gettime[2] === '02') {
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                }
                            } else if ((parseInt(now[0]) + 2) % 4 == 0) {
                                // 买车年份是闰年，此时买车月份一定在3月及以后，
                                // 所以一定有且只有一个2/29
                                if (gettime[2] === '01') {
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                            }
                        }
                    }
                }
            }

            // 第二步：规则一下是否提醒对车子进行保养
            // 前提是车子没有报废提醒和没有报废
            if (!this.contains(car[0], this.WriteOff) && !this.contains(car[0], this.WritedOff)) {
                var distance = parseInt(car[3]) % 10000;
                if (distance <= 10000 && distance >= 9500 || distance == 0) {
                    this.DistanceRelated.push(car[0]);
                    this.DistanceRelatedBrand.push(car[2]);
                }
            }

            // 第三步：规则二下是否提醒对车子进行保养
            // 前提是车子没有报废提醒，在规则一下没有提醒保养，且没有报废
            if (!this.contains(car[0], this.WriteOff) && !this.contains(car[0], this.DistanceRelated) && !this.contains(car[0], this.WritedOff)) {
                if (this.useTime == 6) {

                    // 未大修代码
                    // 3年以下车子
                    if (parseInt(now[0]) - parseInt(gettime[0]) < 3 || parseInt(now[0]) - parseInt(gettime[0]) == 3 && parseInt(now[1]) <= parseInt(gettime[1])) {
                        // 现在月份在买车前一个月  不包括在一月份买的车
                        if (parseInt(now[1]) == parseInt(gettime[1]) - 1) {
                            this.TimeRelated.push(car[0]);
                            this.TimeRelatedBrand.push(car[2]);
                        }

                        // 现在月份和买车同一个月
                        if (parseInt(now[1]) == parseInt(gettime[1]) && parseInt(now[2].slice(0,2)) < parseInt(gettime[2])) {
                            this.TimeRelated.push(car[0]);
                            this.TimeRelatedBrand.push(car[2]);
                        }

                        // 买车是在一月份
                        if (gettime[1] === "01" && now[1] === "12") {
                            this.TimeRelated.push(car[0]);
                            this.TimeRelatedBrand.push(car[2]);
                        }
                    }

                    // 3年以上的车子
                    if (parseInt(now[0]) - parseInt(gettime[0]) > 3 || parseInt(now[0]) - parseInt(gettime[0]) == 3 && parseInt(now[1]) > parseInt(gettime[1])) {
                        var maintainMonth1 = parseInt(gettime[1]),
                            maintainMonth2 = parseInt(gettime[1]) + 6 > 12 ? parseInt(gettime[1]) - 6 : parseInt(gettime[1]) + 6;
                        // 现在月份在保养前一个月 不包括在1月份和7月份买的车
                        if (parseInt(now[1]) == maintainMonth1 - 1 || parseInt(now[1]) == maintainMonth2 - 1) {
                            this.TimeRelated.push(car[0]);
                            this.TimeRelatedBrand.push(car[2]);
                        }

                        // 在保养车的当月是否提醒
                        if (parseInt(now[1]) == maintainMonth1 && parseInt(now[2].slice(0,2)) < parseInt(gettime[2]) || parseInt(now[1]) == maintainMonth2 && parseInt(now[2].slice(0,2)) < parseInt(gettime[2])) {
                            this.TimeRelated.push(car[0]);
                            this.TimeRelatedBrand.push(car[2]);
                        }

                        // 在1月份需要保养的车在前一年12月提醒
                        if (gettime[1] === "01" && now[1] === "12" || gettime[1] === "07" && now[1] === "12") {
                            this.TimeRelated.push(car[0]);
                            this.TimeRelatedBrand.push(car[2]);
                        }
                    }
                } else {
                    // 大修代码
                    var _maintainMonth = parseInt(gettime[1]),
                        _maintainMonth2 = parseInt(gettime[1]) + 3 > 12 ? parseInt(gettime[1]) - 9 : parseInt(gettime[1]) + 3,
                        maintainMonth3 = parseInt(gettime[1]) + 6 > 12 ? parseInt(gettime[1]) - 6 : parseInt(gettime[1]) + 6,
                        maintainMonth4 = parseInt(gettime[1]) + 9 > 12 ? parseInt(gettime[1]) - 3 : parseInt(gettime[1]) + 9;
                    var Months = [_maintainMonth, _maintainMonth2, maintainMonth3, maintainMonth4];
                    var remindMonths = [_maintainMonth - 1, _maintainMonth2 - 1, maintainMonth3 - 1, maintainMonth4 - 1];
                    // 有一个保养月份在1月，所以12月的时候就做出提醒
                    if (this.contains(1, Months) && now[1] === "12") {
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }

                    // 在保养车的前一个月作出提醒
                    if (this.contains(parseInt(now[1]), remindMonths)) {
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }

                    // 在保养车的当月做出提醒
                    if (this.contains(parseInt(now[1]), Months) && parseInt(now[2].slice(0,2)) < parseInt(gettime[2])) {
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }
                }
            }
        }
    }]);

    return Maintenance;
}();

var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");
var input = document.getElementById('input');
var uploadFile = document.getElementById("uploadFile");
var show = false;
var InputInfo = [];
var cars = [];
var now = "";
// 控制输入信息的显示和隐藏
btn.onclick = function () {
    if (show) {
        input.style.display = 'none';
        btn.innerHTML = "显示输入信息";
    } else {
        if (document.getElementById("uploadFile").files[0] == null) {
            alert("请上传文件！");
            return;
        }
        input.style.display = 'block';
        btn.innerHTML = "隐藏输入信息";
    }
    show = !show;
};
// 文件上传时的触发事件
uploadFile.onchange = function () {
    var localFile = document.getElementById("uploadFile").files[0];
    var reader = new FileReader();
    var content = void 0;
    reader.readAsText(localFile, "UTF-8");
    reader.onload = function (event) {
        content = event.target.result;
        document.getElementById("fileContent").value = content;
        InputInfo = content.split('\n');
    };
    reader.onerror = function (event) {
        alert('error');
    };
};
// 点击处理数据按钮的触发事件
btn2.onclick = function () {
    if (InputInfo.length != 0) {
        console.log(InputInfo);
        now = InputInfo[0].split(" ")[1];
        cars = InputInfo.slice(1);

        // 处理输入的信息
        var maintenance = new Maintenance();
        for (var i = 0; i < cars.length; i++) {
            maintenance.getReminder(now, cars[i]);
            maintenance.TimeRelatedBrand = maintenance.arrSort(maintenance.TimeRelatedBrand, maintenance.TimeRelated);
            maintenance.DistanceRelatedBrand = maintenance.arrSort(maintenance.DistanceRelatedBrand, maintenance.DistanceRelated);
            maintenance.WriteOffBrand = maintenance.arrSort(maintenance.WriteOffBrand, maintenance.WriteOff);
        }

        // 此处是处理输出的信息的代码
        var string1 = "";
        var string2 = "";
        var string3 = "";
        var length = maintenance.TimeRelatedBrand.length;
        for (var _i3 = 0; _i3 < length; _i3++) {
            string1 += maintenance.TimeRelatedBrand[_i3] + ": " + maintenance.TimeRelated[_i3].split(", ").length + " (" + maintenance.TimeRelated[_i3] + ")\n";
        }
        length = maintenance.DistanceRelatedBrand.length;
        for (var _i4 = 0; _i4 < length; _i4++) {
            string2 += maintenance.DistanceRelatedBrand[_i4] + ": " + maintenance.DistanceRelated[_i4].split(", ").length + " (" + maintenance.DistanceRelated[_i4] + ")\n";
        }
        length = maintenance.WriteOffBrand.length;
        for (var _i5 = 0; _i5 < length; _i5++) {
            string3 += maintenance.WriteOffBrand[_i5] + ": " + maintenance.WriteOff[_i5].split(", ").length + " (" + maintenance.WriteOff[_i5] + ")\n";
        }

        // 将信息进行输出
        var text = "Reminder" + "\n" + "==================" + "\n\n" + "* Time-related maintenance coming soon..." + "\n" + string1 + "\n" + "* Distance-related maintenance coming soon..." + "\n" + string2 + "\n" + "* Write-off coming soon..." + "\n" + string3;
        document.getElementById("output").value = text;
    } else {
        alert("请上传要处理的数据！");
    }
};