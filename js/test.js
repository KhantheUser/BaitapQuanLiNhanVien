var studentList =[]
function createStudent(){
    if(!validate()) return;
    var id = document.getElementById("txtMaSV").value;
    var name = document.getElementById("txtTenSV").value;
    var email = document.getElementById("txtEmail").value;
    var dob = document.getElementById("txtNgaySinh").value;
    var course = document.getElementById("khSV").value;
    var math = +document.getElementById("txtDiemToan").value;
    var physic = +document.getElementById("txtDiemLy").value;
    var chemistry = +document.getElementById("txtDiemHoa").value;

    var newStudent = new Student(name,
        id,
        email,
        dob,
        course,
        math,
        physic,
        chemistry)
    studentList.push(newStudent);
    renderStudent()
    saveData()

}
function renderStudent(data=studentList){
    var dataHTML = ""
    for(var i=0; i<data.length; i++){
        dataHTML += `
        <tr>
       <td>${i + 1}</td>

        <td>${data[i].id}</td>
       <td>${data[i].name}</td>
       <td>${data[i].email}</td>
       <td>${data[i].dob}</td>
       <td>${data[i].course}</td>
       <td>${data[i].calcGPA()}</td>
       <td>
       <button class="btn btn-danger" onclick = "deleteStudent('${data[i].id}')" >Xoa</button>
       <button class="btn btn-info" onclick ="getStudent('${data[i].id}')" >Update</button>
       </td>
        </tr>
        `
    }
    document.getElementById("tbodySinhVien").innerHTML =dataHTML
}
function saveData(){
    localStorage.setItem("list",JSON.stringify(studentList))
}
function getData(){
    var studentListJSON = localStorage.getItem("list")
    if(studentListJSON){
        studentList = mapStudent(JSON.parse(studentListJSON))
        renderStudent()
    }
}
getData()

function mapStudent(dataFromLocal){
    var data=[];
    for(var i=0;i<dataFromLocal.length;i++){
        var currentStudent = dataFromLocal[i]
        var mapStudent = new Student(
            currentStudent.name,
       currentStudent.id,
       currentStudent.email,
       currentStudent.dob,
       currentStudent.course,
       currentStudent.math,
       currentStudent.physic,
       currentStudent.chemistry
            )
            data.push(mapStudent)
    }
    return data;
}
function findID(id){
    
    for(var i=0;i<studentList.length;i++){
        if(studentList[i].id=== id){
            return i;
        }
        
    }
    return -1;
}
function deleteStudent(id){
var index = findID(id)
if(index === -1){
    alert("Sinh vien khong ton tai")
    return;
}
studentList.splice(index,1);
renderStudent()
saveData()

}
function getStudent(id){
    var index = findID(id);
    if(index === -1){
        alert("Sinh viên không tồn tại!");
        return;
    }
    var foundStudent = studentList[index]
    document.getElementById("txtMaSV").value = foundStudent.id;
    document.getElementById("txtTenSV").value = foundStudent.name;
    document.getElementById("txtEmail").value = foundStudent.email;
    document.getElementById("txtNgaySinh").value = foundStudent.dob;
    document.getElementById("khSV").value = foundStudent.course;
    document.getElementById("txtDiemToan").value = foundStudent.math;
    document.getElementById("txtDiemLy").value = foundStudent.physic
   document.getElementById("txtDiemHoa").value = foundStudent.chemistry;
   document.getElementById("btnUpdate").style.display = "inline-block";
   document.getElementById("btnCreate").style.display = "none";
   document.getElementById("txtMaSV").disabled = true
}
function updateStudent(){
    var id = document.getElementById("txtMaSV").value;
   var name = document.getElementById("txtTenSV").value;
   var email = document.getElementById("txtEmail").value;
   var dob = document.getElementById("txtNgaySinh").value;
   var course = document.getElementById("khSV").value;
   var math = +document.getElementById("txtDiemToan").value;
   var physic = +document.getElementById("txtDiemLy").value;
   var chemistry = +document.getElementById("txtDiemHoa").value;

   var index = findID(id);
   
   if (index === -1) {
     alert("Sinh viên không tồn tại!");
     return;
   }
 
   var foundStudent = studentList[index];
   foundStudent.name = name;
   foundStudent.email = email;
   foundStudent.dob = dob;
   foundStudent.course = course;
   foundStudent.math = math;
   foundStudent.physic = physic;
   foundStudent.chemistry = chemistry;
   
   renderStudent()
   saveData()
   document.getElementById("btnReset").click()
   document.getElementById("btnUpdate").style.display = "none";
   document.getElementById("btnCreate").style.display = "block";
   document.getElementById("txtMaSV").disabled = false

}

function findStudent(){
    var keyWord = document.getElementById("txtSearch").value.toLowerCase().trim();
    var result =[];
    for(var i=0;i<studentList.length; i++){
        var studentName = studentList[i].name.toLowerCase();
        
        if(studentList[i].id === keyWord || studentName.includes(keyWord)){
            result.push(studentList[i])
        }
    }
   
    renderStudent(result);

}

// Validation ----------------------------------------------------------------
function required(value,spanId,message){
    if(!value){
        document.getElementById(spanId).innerHTML = message|| "This fill is forced"
        return false;
    }
    document.getElementById(spanId).innerHTML = ""
    return true;
    
}
// 1.Required

// 2.Validate
function validate(){
   var id = document.getElementById("txtMaSV").value;
   var name = document.getElementById("txtTenSV").value;
   var email = document.getElementById("txtEmail").value;
   var isValid = true;
   
var textPattern = /[A-z ]+$/g
var checkEmail =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
isValid&=required(id,"spanMaSV") &&  length(id,"spanMaSV",5,10);
isValid&=required(email,"spanEmailSV") && pattern(email,"spanEmailSV",checkEmail)
   

isValid&=required(name,"spanTenSV") && pattern(name,"spanTenSV",textPattern)
return isValid;
}
function length(value,spanId,min,max){
    if(value.length <min || value.length > max){
        document.getElementById(spanId).innerHTML = `The length is between ${min} and ${max}`
        return false;
    }
    document.getElementById(spanId).innerHTML =""
    return true;
    

}

// Pattern
function pattern(value,spanId,regex){
 if(!regex.test(value)){
    document.getElementById(spanId).innerHTML = "Incorrect value"
    return false
 }
 document.getElementById(spanId).innerHTML =""
 return true;
}
var student1 ={
    name:"thien",
    age:18
}
var student2 = Object.assign({},student1)
student2.name = "dung"
console.log(student1.name,student2.name)
var student2 = JSON.parse(JSON.stringify(student1))
// => tao object moi hoan toan ma khong bi anh huong boi tham chieu