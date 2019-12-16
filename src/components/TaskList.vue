<template>
    <div class="col-3 p-0 pl-1 pr-1">

        <div class="card tasklist p-1">
            <h4 class="tasklist-title">{{title}}</h4>
            <draggable v-model="items" > <!--v-bind="dragOptions"-->
                <TaskListItem  v-for="item in items" :item="item" :key="item.id"></TaskListItem>
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
export default {
    props: ['title','type'],
    components:{
        TaskListItem,
        Draggable
    },
    data() {
      return {objeto: this.type}
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
        switch(this.type){
            case 1:{
                console.log("buscar en axio la lista to do");
            }break;
            case 2:{
                console.log("buscar en axio la lista de in process");
            }break;
            case 3:{
                console.log("buscar en axio la lista de checking");
            }break;
            case 4:{
                console.log("buscar en axio la lista de finished");
            }break;
        }
    },
    created: ()=>{
       //do it
    }
}
</script>