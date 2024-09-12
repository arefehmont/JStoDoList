//color picker 
const body = document.querySelector("body");
const color1 = document.getElementById ("color1");
const color2 = document.getElementById ("color2");

const handleBGcolor = () => {
    body.style.background = `linear-gradient(to right , ${color1.value} ,${color2.value})`;

}
color1.addEventListener("input",handleBGcolor);
color2.addEventListener("input",handleBGcolor);

//ToDo

const Tasks = [
    { id:1 , name: "Buy stuff", category:"Shopping" , completed:false},
    { id:2 , name: "Finish Tez", category:"university" , completed:true},
    { id:3 , name: "Clean my room", category:"Home" , completed:true},
    { id:4 , name: "Call co-worker", category:"personal" , completed:false},
    { id:5 , name: "Learning JS", category:"personal" , completed:false}
]

const table = document.getElementById ("table-body");
const selectCategory = document.getElementById ("select-category");
const filterCategory = document.getElementById ("filter-category");
const taskInput = document.getElementById ("task-input");
const searchInput = document.getElementById ("search-input");
const add = document.getElementById ("add");
const filter = document.getElementById ("filter");
const search = document.getElementById ("search");

function DisplayTasks (taskArr) {
    table.innerHTML="";
    taskArr.forEach((task)=>{
        const tr = document.createElement("tr");

        const id = document.createElement("td");
        const name = id.cloneNode();
        const category = document.createElement("td");
        const completed = document.createElement("td");

        id.textContent = task.id;
        name.textContent = task.name;
        category.textContent = task.category;
        // completed.textContent = task.completed;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("click",()=>{
            task.completed = !task.completed
            DisplayTasks(Tasks)
        });
        completed.appendChild(checkbox)

        if(task.completed){
            name.style.textDecoration = "line-through"
        }
        tr.append(id,name,category,completed)
        table.appendChild(tr);
    })
}
//option-Add

const addNewTask = () => {
    const TaskName = taskInput.value;
    if (!TaskName){
        return alert ("You must input a Task")
    }
    const newTask = {
        id:Tasks.length +1,
        name: taskInput.value,
        category:selectCategory.value,
        completed:false,
    };
    
    Tasks.push(newTask);
    DisplayTasks(Tasks);
    taskInput.value = "";
}
add.addEventListener("click",addNewTask)

//select&option-Filter

const filterTasks = () =>{
    const selectedCategory = filterCategory.value;
    const filteredTasks = Tasks.filter ((task) => {
        if(selectedCategory=== "all") return task;
        return task.category === selectedCategory;
    });
    DisplayTasks(filteredTasks);
}
filter.addEventListener ("click",filterTasks)

//select&option-category

const initialCategory = () => {
    const categoryObj = { all:null };
    Tasks.forEach ((item) => {
        Object.assign(categoryObj,{[item.category]:null});
    });

for (const key in categoryObj){
    const option = document.createElement("option");
    option.textContent = key;
    if(key!== "all"){
        selectCategory.appendChild(option);
   }
    filterCategory.appendChild(option.cloneNode(true))
    }
};

//option-search 
const searchTask =()=>{
    const filtered = Tasks.filter( (task) => {
       return task.name.toLowerCase().includes(searchInput.value.trim().toLowerCase())
    });
    DisplayTasks(filtered);
}
search.addEventListener("click", searchTask )

//initialize
const initialize = () => {
    initialCategory();
    DisplayTasks(Tasks)
}

window.onload = initialize;