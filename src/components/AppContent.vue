
<template>
    <div class="container">
        <!-- <button class="btn" @click="openModal">Open Modal</button> -->
        <DialogViewTask ref="modal_view" v-model="modalOpen" :item="dataModal"></DialogViewTask>
        <DialogMoveto ref="modal_moveto" v-model="modalOpen2" :item="dataModal2"></DialogMoveto>
        <h1>Task Planner <span class="badge badge-primary">v0.5</span></h1>
        <div class="row pb-4">
            <TaskList ref="to_do" v-for="value in list" :key="value.id" :title="value.name" :type="value.id"></TaskList>
        </div>
    </div>
</template>

<script>

import TaskList from "./TaskList"
import DialogViewTask from "./DialogViewTask"
import DialogMoveto from "./DialogMoveto"
import {EventBus} from '@/bus.js'

export default {
    components:{
        TaskList,
        DialogViewTask,
        DialogMoveto
    },
    data: ()=>{
        return {
            modalOpen: false,
            modalOpen2: false,
            dataModal: [],
            dataModal2: [],
            list:[
                {id:1, name:"To do"},
                {id:2, name:"In process"},
                {id:3, name:"To evaluate"},
                {id:4, name:"Finished"}
            ]
        }
    },
    methods:{
        openModal(e,element=null) {
            if(element != null){
                this.dataModal = element.data;
            }
            this.modalOpen = !this.modalOpen;
            setTimeout((obj)=>{
                document.querySelector('.modal-task').style.opacity = (obj.modalOpen) ? "1" : "0";
            },100,this);            
        },
        openModal2(e,element=null){
            if(element != null){
                this.dataModal2 = element;
            }
            this.modalOpen2 = !this.modalOpen2;
            setTimeout((obj)=>{
                document.querySelector('.modal-moveto').style.opacity = (obj.modalOpen2) ? "1" : "0";
            },100,this);    
        }
    },
    created(){
        EventBus.$on('showmodal',(el)=>{
            this.openModal(null,el);
        });
        EventBus.$on('showmodal2',(el)=>{
            this.openModal2(null,el);
        });
    }
}
</script>