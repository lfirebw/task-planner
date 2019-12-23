
<template>
    <div class="container">
        <button class="btn" @click="openModal">Open Modal</button>
        <DialogViewTask ref="modal_view" v-model="modalOpen"></DialogViewTask>
        <h1>Task Planner <span class="badge badge-primary">v0.5</span></h1>
        <div class="row pb-4">
            <TaskList ref="to_do" v-for="value in list" :key="value.id" :title="value.name" :type="value.id"></TaskList>
        </div>
    </div>
</template>

<script>

import TaskList from "./TaskList"
import DialogViewTask from "./DialogViewTask"

export default {
    components:{
        TaskList,
        DialogViewTask
    },
    data: ()=>{
        return {
            modalOpen: false,
            list:[
                {id:1, name:"To do"},
                {id:2, name:"In process"},
                {id:3, name:"To evaluate"},
                {id:4, name:"Finished"}
            ]
        }
    },
    methods:{
        openModal() {
            this.modalOpen = !this.modalOpen;
            setTimeout((obj)=>{
                document.querySelector('.modal-task').style.opacity = (obj.modalOpen) ? "1" : "0";
            },100,this);            
        }
    }
}
</script>