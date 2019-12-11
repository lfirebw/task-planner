<template>
    <div class="card tasklist p-1">
        <h4 class="tasklist-title">{{title}}</h4>
        <draggable v-model="items" > <!--v-bind="dragOptions"-->
            <TaskListItem  v-for="item in items" :item="item" :key="item.id"></TaskListItem>
        </draggable>
        <div class="card mt-2">
            <button type="button" class="btn btn-success d-block">Add Task</button>
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
    data: function () {
      return {objeto: this}
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
    
    mounted: ()=>{
        console.log("montado");
    },
    created: ()=>{
       //do it
        console.log("creado");

    }
}
</script>