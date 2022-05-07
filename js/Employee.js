function Employee(account,name,email,password,datepicker,salary,position,dateInMonth){
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.salary = salary;
    this.position = position;
    this.dateInMonth = dateInMonth;
    
    this.calcSalary = function(param){
        
        switch(param){
            case "Sếp": return this.salary *3
            case "Trưởng phòng": return this.salary *2
            case "Nhân viên": return this.salary *1
        }
    }
    this.arrangeType = function(){
        if (this.dateInMonth >= 192){
            return "Nhân viên xuất sắc"
        }else if(this.dateInMonth >=176){
            return "Nhân viên giỏi"
        }else if(this.dateInMonth>=160){
            return "Nhân viên khá"
        }else{
            return "Nhân viên trung bình"
        }
    }

}