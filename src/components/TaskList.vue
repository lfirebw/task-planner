<template>
    <div class="col-3 p-0 pl-1 pr-1">

        <div class="card tasklist p-1">
            <h4 class="tasklist-title">{{title}}</h4>
            <!--v-bind="dragOptions"-->
            <draggable v-model="tasks" > 
                <TaskListItem  v-for="task in tasks" :item="task" :key="task.id"></TaskListItem>
            </draggable>
            <div class="card mt-2">
                <button type="button" class="btn btn-success d-block">Add Task</button>
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from "vuedraggable"
import TaskListItem from "./TaskListItem"
import VARIABLES from "@/variables.js"
import axios from 'axios'

export default {
    props: ['title','type'],
    components:{
        TaskListItem,
        Draggable
    },
    data() {
      return {
          objeto: this.type,
          tasks:null
        }
    },
    computed:{
        items: {
            get() {
                return [
                    {id:1,title:"Task 1"},{id:2,title:"Task 2"},{id:3,title:"Task 3"}
                ]
            }
        }
    },
    mounted(){
        let strRequest = `task/user/1/list/${this.type}`;
        axios.get(String.prototype.concat(VARIABLES.URLWEB,strRequest))
        .then((response) => {
            if(response.data.code == 200){
                this.tasks = response.data.data;
            }else{
                console.error("error en la consulta: ",response.data.message);
            }
        })
        .catch(error => console.log("error ",error))
    },
    created: ()=>{
       //do it
    }
}
</script>