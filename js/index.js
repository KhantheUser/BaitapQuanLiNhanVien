var employeeList = []

function reset() {
    document.getElementById("tknv").value=""
    document.getElementById("name").value=""
    document.getElementById("email").value=""
    document.getElementById("password").value=""
    document.getElementById("datepicker").value=""
    document.getElementById("luongCB").value=""
    document.getElementById("chucvu").value=""
     document.getElementById("gioLam").value=""
     if(document.getElementById("tknv").disabled){
         document.getElementById("tknv").disabled =false
     }

     var spanThongBao = document.getElementsByClassName("sp-thongbao")
     for(var i = 0; i < spanThongBao.length; i++){
         spanThongBao[i].style.display = "none"
     }
}
function createEmployee(){
 
   if(!validate()){

       document.getElementById("btnThemNV").removeAttribute("data-dismiss")
       return;
   };   
   var account = document.getElementById("tknv").value
   var name = document.getElementById("name").value
   var email = document.getElementById("email").value
   var password = document.getElementById("password").value
   var datepicker = document.getElementById("datepicker").value
   var salary = document.getElementById("luongCB").value
   var position = document.getElementById("chucvu").value
   var dateInMonth = document.getElementById("gioLam").value
   document.getElementById("btnThemNV").setAttribute("data-dismiss", "modal")

   var newEmployee = new Employee(account, name, email, password, datepicker, salary
       ,position,dateInMonth
       )

       employeeList.push(newEmployee)
       if(document.getElementById("tknv").disabled){
           document.getElementById("tknv").disabled = false
       }
       

       renderEmployee()
       saveData()
}

function renderEmployee(data=employeeList){
    var dataHtml="";
    for(var i=0; i<data.length; i++){
        dataHtml+= `
        <tr>
        <td>${data[i].account}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].datepicker}</td>
        <td>${data[i].position}</td>
        <td>${data[i].calcSalary(data[i].position)}</td>
        <td>${data[i].arrangeType()}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteEmployee('${data[i].account}')">Del</button>
        <i class="fa-solid fa-pen" data-toggle="modal" data-target="#myModal" onclick="getEmployee('${data[i].account}')" style="color:black;cursor:pointer;padding-left:10px"></i>
        </td>
        
        
        
        </tr>
        `
    }
    document.getElementById("tableDanhSach").innerHTML =dataHtml
}
function saveData(){
    localStorage.setItem("list",JSON.stringify(employeeList))
}
function getData(){
  var  employeeListJSON = localStorage.getItem("list")
    if(employeeListJSON){
        employeeList = mapData(JSON.parse(employeeListJSON))
        renderEmployee()
    }
}
getData()
function deleteEmployee(account){
    var index = findID(account);
    if(index===-1){
        alert("Nhân viên không tồn tại");
        return;
    }
    
    employeeList.splice(index,1)
    
    renderEmployee()
    saveData()
}
function mapData(dataFromLocal){
    var data=[];
    for(var i=0;i<dataFromLocal.length;i++){
        var currentEmployee = dataFromLocal[i]
        var mapEmployee = new Employee(currentEmployee.account,
            currentEmployee.name,
            currentEmployee.email,
            currentEmployee.password,
            currentEmployee.datepicker,
            currentEmployee.salary,
            currentEmployee.position,
            currentEmployee.dateInMonth
            )
            data.push(mapEmployee)
    }
    return data;
}
function findID(account){
    for(var i=0;i<employeeList.length;i++){
        if(employeeList[i].account ===account){
            return i;
        }
    }
    return -1;
}
function getEmployee(account){
   var index = findID(account);
   if(index === -1){
       return;
   }
   var foundEmployee = employeeList[index]
   document.getElementById("tknv").value = foundEmployee.account
     document.getElementById("name").value = foundEmployee.name
     document.getElementById("email").value = foundEmployee.email
     document.getElementById("password").value = foundEmployee.password
     document.getElementById("datepicker").value = foundEmployee.datepicker
     document.getElementById("luongCB").value = foundEmployee.salary
     document.getElementById("chucvu").value = foundEmployee.position
     document.getElementById("gioLam").value = foundEmployee.dateInMonth
     document.getElementById("tknv").disabled = true
    
}
function updateEmployee(){
   
    var account = document.getElementById("tknv").value
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var datepicker = document.getElementById("datepicker").value
    var salary = document.getElementById("luongCB").value
    var position = document.getElementById("chucvu").value
    var dateInMonth = document.getElementById("gioLam").value

    var index = findID(account);
    if(index === -1) return;
    var foundEmployee = employeeList[index]
    foundEmployee.name = name;
    foundEmployee.email = email;
    foundEmployee.password = password;
    foundEmployee.datepicker = datepicker;
    foundEmployee.salary = salary;
    foundEmployee.position = position;
    foundEmployee.dateInMonth =dateInMonth
    renderEmployee()
    saveData()
}
function findEmployee(){
    var keyword = document.getElementById("searchName").value.toLowerCase().trim()
   
    var result = []
    for(var i = 0 ;i < employeeList.length;i++){
        var employeeName = employeeList[i].name.toLowerCase()
        var employeeType = employeeList[i].arrangeType().toLowerCase()
        
        if(employeeList[i].account.includes(keyword) || employeeName.includes(keyword) || employeeType.includes(keyword)){
          
            result.push(employeeList[i])
        }
    }
    renderEmployee(result)
}

function required(value,spanId,message){
    
    if(!value){
        document.getElementById(spanId).style.display ="block"
        document.getElementById(spanId).innerHTML = message || "This field is required"
        return false
    }
    document.getElementById(spanId).innerHTML = ""
    return true;
}
function length(value,spanId,min,max,message){
    if(value.length<min || value.length>max){
        document.getElementById(spanId).style.display ="block"
        document.getElementById(spanId).innerHTML = message || `The length is between ${min} and ${max}`
        return false;
    }
    document.getElementById(spanId).innerHTML = ""
return true;
}
function pattern(value,spanId,regex,message){
    if(!regex.test(value)){
        document.getElementById(spanId).style.display ="block"

       document.getElementById(spanId).innerHTML = message ||"Incorrect value"
       return false
    }
    document.getElementById(spanId).innerHTML =""
    return true;
   }
   function checkValue(value,spanId,min,max,message){
    if(+value<min || +value>max){
        document.getElementById(spanId).style.display ="block"
        document.getElementById(spanId).innerHTML = message || `The value is between ${min} and ${max}`
        return false;
    }
    document.getElementById(spanId).innerHTML = ""
return true;
   }
   function turnModal(){
    document.getElementById("btnThemNV").addAttribute("data-dismiss")
}
turnModal()
function validate(){
    var account = document.getElementById("tknv").value
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var datepicker = document.getElementById("datepicker").value
    var salary = document.getElementById("luongCB").value
    var position = document.getElementById("chucvu").value
    var dateInMonth = document.getElementById("gioLam").value

    var isValid = true;
    var regexAccount = /^[0-9]+$/g
    var regexName =/^[A-z ]+$/g
    var regexPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/g
    var regexEmail =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    var regexDate =/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g
    var regexSalary =/^[1-9][0-9]*$/g
    var regexWork =/^[1-9][0-9]*$/g
    isValid&=required(account,"tbTKNV") && length(account,"tbTKNV",4,6) && pattern(account,"tbTKNV",regexAccount,"The account includes 6 numbers ")
    
    isValid&=required(name,"tbTen") &&  pattern(name,"tbTen",regexName,"This name is not permitted")
    isValid&=required(email,"tbEmail") &&  pattern(email,"tbEmail",regexEmail,"This name is not permitted")
    isValid&=required(password,"tbMatKhau") && length(password,"tbMatKhau",6,10,"This password is not permitted") &&  pattern(password,"tbMatKhau",regexPassword,"This password is not permitted")
    isValid&=required(datepicker,"tbNgay") &&  pattern(datepicker,"tbNgay",regexDate,"This date is not permitted")
    isValid&=required(salary,"tbLuongCB") && checkValue(salary,"tbLuongCB",1000000,20000000,"The salary is between 1,000,000 and 20,000,000") && pattern(salary,"tbLuongCB",regexSalary,"The salary is not permitted ")
    isValid&=required(position,"tbChucVu")
    isValid&=required(dateInMonth,"tbGiolam") && checkValue(dateInMonth,"tbGiolam",80,200,"The hour of work is between 80 and 200")  && pattern(dateInMonth,"tbGiolam",regexWork,"The salary is not permitted")

    return isValid
}
