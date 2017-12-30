class Maintenance{
    constructor(){
        // 车子可以使用的时间
        this.useTime=6;

        // 保存保养或者报废车子车牌的数组
        this.WriteOff=[];
        this.DistanceRelated=[];
        this.TimeRelated=[];

        // 保存保养或者报废车子车牌的数组
        this.WriteOffBrand=[];
        this.DistanceRelatedBrand=[];
        this.TimeRelatedBrand=[];

        // 已经报废的车子
        this.WritedOff=[];

        // 大小月
        this.bigMonth=[1,3,5,7,8,10,12];
        this.smallMonth=[4,6,9,11];

    }

    // contains函数：判断一个元素是否存在一个数组中
    contains(value,array){
        let length=array.length;
        for(let i=0;i<length;i++){
            if(array[i]===value){
                return true;
            }
        }
        return false;
    }

    // 数组去重和排序
    arrSort(brand,carNumber){
        let arr=brand,
            arr1=carNumber;
        let length=arr.length;
        // 数组去重
        for(let i=0;i<length;i++){
            for(let j=i+1;j<length;j++){
                if(arr[i]==arr[j]){
                    // 车子商标数组去重
                    arr.splice(j,1);
                    // 车牌数组也要改
                    arr1[i]=arr1[i]+", "+arr1[j];
                    arr1.splice(j,1);
                    length--;
                    j--;
                }
            }
        }
        // 数组排序
        length=arr.length;
        for(let i=0; i<length-1;i++){
            for(let j=i+1;j<length;j++){
                if(arr[i]>arr[j]){
                    // 车子商标数组排序
                    let temp = arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                    // 车牌数组也要跟着排
                    temp = arr1[i];
                    arr1[i]=arr1[j];
                    arr1[j]=temp;
                }
            }
        }
        return arr;
    }

    // 对获得的信息进行计算从而得到需要提醒保养的车子
    getReminder(nows,string){
        let car = string.split('|');
        let gettime=car[1].split('/');
        let now = nows.split('/');
        // console.log('')
        // car[4]此处末尾有一个换行符，长度为2，所以不和"T"相等
        // 根据是否大修过修改车子的使用时间
        if(car[4].charAt(0)=="T"){
            this.useTime=3;
        }else{
            // 此处代码经过设置断点逐步调试添加
            this.useTime=6;
        }

        // 车子用了几年
        let year = parseInt(now[0])-parseInt(gettime[0]);

        // 初步判断车子是否报废
        if((this.useTime==6 && year>6) || (this.useTime==3 && year>3)){
            this.WritedOff.push(car[0]);
        }
        if(((this.useTime==6 && year==6) || (this.useTime==3 && year==3)) && (parseInt(now[1])>parseInt(gettime[1]))){
            this.WritedOff.push(car[0]);
        }

        // 第一步：判断车子是否发出报废提醒和进一步判断是否已经报废
        if(!this.contains(car[0],this.WritedOff)){
            if(year==2||year==5){
                let count = 0;
                for(let i=gettime[0];i<=now[0];i++){
                    if((i%100!=0 && i%4==0) || (i%100==0 && i%400==0)){
                        count++;
                    }
                }
                if(count==1){
                    // 此时闰年数有且只有一个 买车年份和当前年份都不是闰年
                    if(gettime[1]==="01" || (gettime[1]==="02" && (gettime[2]==="01"))){
                    
                        if(gettime[1]==="01" && gettime[2]==="01"){
                            // 当前月份是11的时候会提醒报废
                            if(now[1]==="11" || (now[1]==="12" && now[2].slice(0,2)!=="31")){
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }else if(now[1]==="12" && now[2].slice(0,2)==="31"){
                                this.WritedOff.push(car[0]);
                            }
                        }else{
                            // 其它情况下当前月份是12的时候会提醒报废
                            if(now[1]==="12"){
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                        }
                    }
                }else if(count==2){
                    // 买车年份是闰年或者当前年份是闰年
                    if(gettime[1]==="01" && gettime[2]==="01"){
                        if(now[1]==="11" || ((now[1]==="12" && now[2].slice(0,2)!=="31") && (now[1]==="12" && now[2].slice(0,2)!=="30"))){
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        }
                        if((now[1]==="12" && now[2].slice(0,2)==="31") || (now[1]==="12" && now[2].slice(0,2)==="30")){
                            this.WritedOff.push(car[0]);
                        }
                    }
                    if(gettime[1]==="01" && gettime[2]==="02"){
                        if(now[1]==="11" || (now[1]==="12" && now[2].slice(0,2)!=="31")){
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        }
                        if(now[1]==="12" && now[2].slice(0,2)==="31"){
                            this.WritedOff.push(car[0]);
                        }
                    }
                    if((gettime[1]==="01"&& gettime[2]!=="02" && gettime[2]!=="01")|| (gettime[1]==="02" && (gettime[2]==="01")) || (gettime[1]==="02" && (gettime[2]==="02"))){
                        if(now[1]==="12"){
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        }
                    }
                }else if(count==0){
                    // 只有大修过的车才会出现此种情况
                    if(gettime[1]==="01" && now[1]==="12"){
                        this.WriteOff.push(car[0]);
                        this.WriteOffBrand.push(car[2]);
                    }
                }
            }else if(year==3||year==6){
                // 判断闰年的个数，可能是一个或者是两个
                let count = 0;
                for(let i=gettime[0];i<=now[0];i++){
                    if((i%100!=0 && i%4==0) || (i%100==0 && i%400==0)){
                        count++;
                    }
                }

                // 当前月份小于买车月份一个月
                if((parseInt(gettime[1]) - parseInt(now[1]))==1){
                    // 只有一个闰年时，当前年份必为平年
                    if(count==1){
                        if(gettime[2]>=2 && gettime[2]<=31){
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        }

                        if(gettime[2]==1){
                            // 报废提醒或者是已报废
                            if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)!=31){
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                            if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)==31){
                                this.WritedOff.push(car[0]);
                            }
                            if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)!=30){
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                            if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)==30){
                                this.WritedOff.push(car[0]);
                            }
                            if(parseInt(now[1])==2 && now[2].slice(0,2)!=28){
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                            if(parseInt(now[1])==2 && now[2].slice(0,2)==28){
                                this.WritedOff.push(car[0]);
                            }
                        }
                    }else if(count==2){
                        if(gettime[2]>=2 && gettime[2]<=31){
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        }

                        if((parseInt(now[0])-1)%4==0){
                            // 包含两个闰二月 当前年份肯定是平年，二月只有28天
                            if(gettime[2]==1){
                                // 车子报废提醒
                                if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)!=31 && now[2].slice(0,2)!=30){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)!=30 && now[2].slice(0,2)!=29){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                if(parseInt(now[1])==2 && now[2].slice(0,2)!=28 && now[2].slice(0,2)!=27){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                // 车子已报废
                                if(this.contains(parseInt(now[1]),this.bigMonth) && (now[2].slice(0,2)==31 || now[2].slice(0,2)==30)){
                                    this.WritedOff.push(car[0]);
                                }
                                if(this.contains(parseInt(now[1]),this.smallMonth) && (now[2].slice(0,2)==30 || now[2].slice(0,2)==29)){
                                    this.WritedOff.push(car[0]);
                                }
                                if(parseInt(now[1])==2 && now[2].slice(0,2)==28 && now[2].slice(0,2)==27){
                                    this.WritedOff.push(car[0]);
                                }
                            }

                            if(gettime[2]==2){
                                // 车子报废提醒
                                if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)!=31){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)!=30){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                if(parseInt(now[1])==2 && now[2].slice(0,2)!=28){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                                // 车子已报废
                                if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)==31){
                                    this.WritedOff.push(car[0]);
                                }
                                if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)==30){
                                    this.WritedOff.push(car[0]);
                                }
                                if(parseInt(now[1])==2 && now[2].slice(0,2)==28){
                                    this.WritedOff.push(car[0]);
                                }
                            }

                        }else if(parseInt(now[0])%4==0){
                            // 当前年份是闰年
                            if(now[1]==1 || (now[1]==2 && now[2].slice(0,2)!=29)){
                                // 只有一个2/29

                                if(gettime[2]==1){
                                    // 车子报废提醒
                                    if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)!=31){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)!=30){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if(parseInt(now[1])==2 && now[2].slice(0,2)!=29){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    // 车子已报废
                                    if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)==31){
                                        this.WritedOff.push(car[0]);
                                    }
                                    if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)==30){
                                        this.WritedOff.push(car[0]);
                                    }
                                    if(parseInt(now[1])==2 && now[2].slice(0,2)==29){
                                        this.WritedOff.push(car[0]);
                                    }
                                }
                            }else{
                                // 两个2/29

                                if(gettime[2]==1){
                                    // 车子报废提醒
                                    if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)!=31 && now[2].slice(0,2)!=30){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)!=30 && now[2].slice(0,2)!=29){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if(parseInt(now[1])==2 && now[2].slice(0,2)!=29 && now[2].slice(0,2)!=28){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    // 车子已报废
                                    if(this.contains(parseInt(now[1]),this.bigMonth) && (now[2].slice(0,2)==31 || now[2].slice(0,2)==30)){
                                        this.WritedOff.push(car[0]);
                                    }
                                    if(this.contains(parseInt(now[1]),this.smallMonth) && (now[2].slice(0,2)==30 || now[2].slice(0,2)==29)){
                                        this.WritedOff.push(car[0]);
                                    }
                                    if(parseInt(now[1])==2 && (now[2].slice(0,2)==29 || now[2].slice(0,2)==28)){
                                        this.WritedOff.push(car[0]);
                                    }
                                }
                            }
                        }else if((parseInt(now[0])+2)%4==0){
                            // 开始月份是闰年  当前年份一定是平年
                            if(gettime[1]==2){
                                // 两个2/29
                                if(gettime[2]==1){
                                    // 车子报废提醒
                                    if(now[2].slice(0,2)!=31 && now[2].slice(0,2)!=30){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    // 车子已报废
                                    if(now[2].slice(0,2)==31 || now[2].slice(0,2)==30){
                                        this.WritedOff.push(car[0]);
                                    }
                                }else if(gettime[2]==2){
                                    // 车子报废提醒
                                    if(now[2].slice(0,2)!=31){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    // 车子已报废
                                    if(now[2].slice(0,2)==31){
                                        this.WritedOff.push(car[0]);
                                    }
                                }
                            }else{
                                // 只有一个2/29
                                if(gettime[2]==1){
                                    // 车子报废提醒
                                    if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)!=31){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)!=30){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    if(parseInt(now[1])==2 && now[2].slice(0,2)!=28){
                                        this.WriteOff.push(car[0]);
                                        this.WriteOffBrand.push(car[2]);
                                    }
                                    // 车子已报废
                                    if(this.contains(parseInt(now[1]),this.bigMonth) && now[2].slice(0,2)==31){
                                        this.WritedOff.push(car[0]);
                                    }
                                    if(this.contains(parseInt(now[1]),this.smallMonth) && now[2].slice(0,2)==30){
                                        this.WritedOff.push(car[0]);
                                    }
                                    if(parseInt(now[1])==2 && now[2].slice(0,2)==28){
                                        this.WritedOff.push(car[0]);
                                    }
                                }
                            }
                        }
                    }
                }

                // 当前月份和买车月份相同
                if(now[1]==gettime[1]){
                    if(count==1){
                        // 一个2/29
                        if(parseInt(now[2].slice(0,2))<parseInt(gettime[2])-1){
                            this.WriteOff.push(car[0]);
                            this.WriteOffBrand.push(car[2]);
                        }else{
                            this.WritedOff.push(car[0]);
                        }
                    }else if(count==2){
                        if((parseInt(now[0])-1)%4==0){
                            // 包含两个2/29
                            if(parseInt(now[2].slice(0,2))<parseInt(gettime[2])-2){
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }else{
                                this.WritedOff.push(car[0]);
                            }
                        }else if(parseInt(now[0])%4==0){
                            // 当前年份是闰年
                            if(now[1]==1 || (now[1]==2 && now[2].slice(0,2)!=29)){
                                // 只有一个2/29
                                if(parseInt(now[2].slice(0,2))<parseInt(gettime[2])-1){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }else{
                                    this.WritedOff.push(car[0]);
                                }
                            }else{
                                // 两个2/29
                                if(parseInt(now[2].slice(0,2))<parseInt(gettime[2])-2){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }else{
                                    this.WritedOff.push(car[0]);
                                }
                            }
                        }else if((parseInt(now[0])+2)%4==0){
                            // 买车年份是闰年
                            if(gettime[1]==1 || (gettime[1]==2 && gettime[2]!=29)){
                                // 两个2/29
                                if(parseInt(now[2].slice(0,2))<parseInt(gettime[2])-2){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }else{
                                    this.WritedOff.push(car[0]);
                                }
                            }else{
                                // 一个2/29
                                if(parseInt(now[2].slice(0,2))<parseInt(gettime[2])-1){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }else{
                                    this.WritedOff.push(car[0]);
                                }
                            }
                        }
                    }
                }

                // 当前月份+2=买车月份
                if(parseInt(now[1])+2==gettime[1]){
                    if(count==1 && gettime[2]==='01'){
                        // 一个2/29
                        this.WriteOff.push(car[0]);
                        this.WriteOffBrand.push(car[2]);
                    }else if(count==2){
                        if((parseInt(now[0])-1)%4==0){
                            // 包含两个2/29
                            if(gettime[2]==='01' || gettime[2]==='02'){
                                this.WriteOff.push(car[0]);
                                this.WriteOffBrand.push(car[2]);
                            }
                        }else if(parseInt(now[0])%4==0){
                            // 当前年份是闰年
                            if(now[1]==1 || (now[1]==2 && now[2].slice(0,2)!=29)){
                                // 只有一个2/29
                                if(gettime[2]==='01'){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                            }else{
                                // 两个2/29
                                if(gettime[2]==='01' || gettime[2]==='02'){
                                    this.WriteOff.push(car[0]);
                                    this.WriteOffBrand.push(car[2]);
                                }
                            }
                        }else if((parseInt(now[0])+2)%4==0){
                            // 买车年份是闰年，此时买车月份一定在3月及以后，
                            // 所以一定有且只有一个2/29
                            if(gettime[2]==='01'){
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
        if((!this.contains(car[0],this.WriteOff)) && (!this.contains(car[0],this.WritedOff))){
            let distance = parseInt(car[3]) % 10000;
            if((distance<=10000 && distance>=9500) || distance==0){
                this.DistanceRelated.push(car[0]);
                this.DistanceRelatedBrand.push(car[2]);
            }
        }

        // 第三步：规则二下是否提醒对车子进行保养
        // 前提是车子没有报废提醒，在规则一下没有提醒保养，且没有报废
        if((!this.contains(car[0],this.WriteOff)) && (!this.contains(car[0],this.DistanceRelated)) && (!this.contains(car[0],this.WritedOff))){
            if(this.useTime==6){
                
                // 未大修代码
                // 3年以下车子
                if(parseInt(now[0])-parseInt(gettime[0])<3 || 
                    (parseInt(now[0])-parseInt(gettime[0])==3 && parseInt(now[1])<=parseInt(gettime[1]))){
                    // 现在月份在买车前一个月  不包括在一月份买的车
                    if(parseInt(now[1])==parseInt(gettime[1])-1){
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }

                    // 现在月份和买车同一个月
                    if(parseInt(now[1])==parseInt(gettime[1]) && parseInt(now[2].slice(0,2))<parseInt(gettime[2])){
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }

                    // 买车是在一月份
                    if(gettime[1]==="01" && now[1]==="12"){
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }
                }

                // 3年以上的车子
                if(parseInt(now[0])-parseInt(gettime[0])>3 || 
                    (parseInt(now[0])-parseInt(gettime[0])==3 && parseInt(now[1])>parseInt(gettime[1]))){
                    let maintainMonth1=parseInt(gettime[1]),
                        maintainMonth2=parseInt(gettime[1])+6 > 12 ? parseInt(gettime[1])-6 : parseInt(gettime[1])+6;
                    // 现在月份在保养前一个月 不包括在1月份和7月份买的车
                    if(parseInt(now[1])==maintainMonth1-1 || parseInt(now[1])==maintainMonth2-1){
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }

                    // 在保养车的当月是否提醒
                    if((parseInt(now[1])==maintainMonth1 && parseInt(now[2].slice(0,2))<parseInt(gettime[2])) || 
                        (parseInt(now[1])==maintainMonth2 && parseInt(now[2].slice(0,2))<parseInt(gettime[2]))){
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }

                    // 在1月份需要保养的车在前一年12月提醒
                    if((gettime[1]==="01" && now[1]==="12") || (gettime[1]==="07" && now[1]==="12")){
                        this.TimeRelated.push(car[0]);
                        this.TimeRelatedBrand.push(car[2]);
                    }
                }

            }else{
                // 大修代码
                let maintainMonth1=parseInt(gettime[1]),
                    maintainMonth2=parseInt(gettime[1])+3 > 12 ? parseInt(gettime[1])-9 : parseInt(gettime[1])+3,
                    maintainMonth3=parseInt(gettime[1])+6 > 12 ? parseInt(gettime[1])-6 : parseInt(gettime[1])+6,
                    maintainMonth4=parseInt(gettime[1])+9 > 12 ? parseInt(gettime[1])-3 : parseInt(gettime[1])+9;
                let Months=[maintainMonth1,maintainMonth2,maintainMonth3,maintainMonth4];
                let remindMonths=[maintainMonth1-1,maintainMonth2-1,maintainMonth3-1,maintainMonth4-1];
                // 有一个保养月份在1月，所以12月的时候就做出提醒
                if(this.contains(1,Months) && now[1]==="12"){
                    this.TimeRelated.push(car[0]);
                    this.TimeRelatedBrand.push(car[2]);
                }

                // 在保养车的前一个月作出提醒
                if(this.contains(parseInt(now[1]),remindMonths)){
                    this.TimeRelated.push(car[0]);
                    this.TimeRelatedBrand.push(car[2]);
                }

                // 在保养车的当月做出提醒
                if(this.contains(parseInt(now[1]),Months) && parseInt(now[2].slice(0,2))<parseInt(gettime[2])){
                    this.TimeRelated.push(car[0]);
                    this.TimeRelatedBrand.push(car[2]);
                }
            }
        }
    }

}

let btn=document.getElementById("btn");
let btn2=document.getElementById("btn2");
let input=document.getElementById('input');
let uploadFile=document.getElementById("uploadFile");
let show=false;
let InputInfo=[];
let cars=[];
let now="";
// 控制输入信息的显示和隐藏
btn.onclick=function(){
    if(show){
        input.style.display='none';
        btn.innerHTML="显示输入信息";
    }else{
        if(document.getElementById("uploadFile").files[0]==null){
            alert("请上传文件！");
            return;
        }
        input.style.display='block';
        btn.innerHTML="隐藏输入信息";
    }
    show=!show;
}
// 文件上传时的触发事件
uploadFile.onchange=function () {
    let localFile = document.getElementById("uploadFile").files[0];
    let reader = new FileReader();
    let content;
    reader.readAsText(localFile,"UTF-8");
    reader.onload = function(event) {
        content = event.target.result;
        document.getElementById("fileContent").value = content;
        InputInfo = content.split('\n');
    }
    reader.onerror = function(event) {
        alert('error')
    }
}
// 点击处理数据按钮的触发事件
btn2.onclick=function(){
    if(InputInfo.length!=0){
        // console.log(InputInfo);
        now=InputInfo[0].split(" ")[1];
        cars=InputInfo.slice(1);

        // 处理输入的信息
        let maintenance = new Maintenance();
        for(let i=0;i<cars.length;i++){
            maintenance.getReminder(now,cars[i]);
            maintenance.TimeRelatedBrand=maintenance.arrSort(maintenance.TimeRelatedBrand,maintenance.TimeRelated)
            maintenance.DistanceRelatedBrand=maintenance.arrSort(maintenance.DistanceRelatedBrand,maintenance.DistanceRelated)
            maintenance.WriteOffBrand=maintenance.arrSort(maintenance.WriteOffBrand,maintenance.WriteOff)
        }

        // 此处是处理输出的信息的代码
        let string1="";
        let string2="";
        let string3="";
        let length= maintenance.TimeRelatedBrand.length;
        for(let i=0;i<length;i++){
            string1+=maintenance.TimeRelatedBrand[i]+": "+maintenance.TimeRelated[i].split(", ").length+" ("+maintenance.TimeRelated[i]+")\n";
        }
        length= maintenance.DistanceRelatedBrand.length;
        for(let i=0;i<length;i++){
            string2+=maintenance.DistanceRelatedBrand[i]+": "+maintenance.DistanceRelated[i].split(", ").length+" ("+maintenance.DistanceRelated[i]+")\n";
        }
        length= maintenance.WriteOffBrand.length;
        for(let i=0;i<length;i++){
            string3+=maintenance.WriteOffBrand[i]+": "+maintenance.WriteOff[i].split(", ").length+" ("+maintenance.WriteOff[i]+")\n";
        }

        // 将信息进行输出
        let text = "Reminder"+"\n"+"=================="+"\n\n"+
        "* Time-related maintenance coming soon..." + "\n" + string1 + "\n" +
        "* Distance-related maintenance coming soon..." + "\n" + string2 + "\n" +
        "* Write-off coming soon..." + "\n" + string3;
        document.getElementById("output").value = text;
    }else{
        alert("请上传要处理的数据！");
    }
}