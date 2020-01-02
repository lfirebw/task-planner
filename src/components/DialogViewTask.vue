<template>
    <div class="modal-task" v-show="value">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header bg-secondary">
                <h5 class="modal-title">{{item.nombre}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <!--Resume-->
                <div class="card text-white mb-2 bg-secondary ">
                    <div class="card-body pb-0">
                        <div class="row border-bottom border-dark">
                            <div class="col-auto p-0 pl-1">
                                <p class="m-0">Name:</p>
                            </div>
                            <div class="col-auto text-left">
                                <p class="m-0">{{item.nombre}}</p>
                            </div>
                        </div>
                        <div class="row border-bottom border-dark">
                            <div class="col-auto p-0 pl-1">
                                <p class="m-0">Description:</p>
                            </div>
                            <div class="col-auto text-left">
                                <p class="m-0">{{item.descripcion}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-auto p-0 pl-1">
                                <p class="m-0">Members:</p>
                            </div>
                            <div class="col-9 text-left">
                                <div class="row">
                                    <div class="col-2 p-0" v-for="member in this.membersInfo" :key="member.id">
                                        <figure class="m-0 text-center">
                                            <img :src="member.img" class="img-fluid rounded-circle" style="width:40px;" />
                                        </figure>
                                        <p class="text-center" style="font-size:small;">{{member.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--DESC LONG-->
                <div class="card text-white mb-2 bg-secondary">
                    <div class="card-body">
                        <div id="descContent" class="border rounded bg-white p-1 descLongContent">
                        </div>
                    </div>
                </div>
                <!--TASK-->
                <div class="card text-white bg-light">
                    <div class="card-header text-dark">Task list</div>
                    <div class="card-body">
                        <ul class="list-group text-dark text-left">
                            <li class="list-group-item" v-for="(task,index) in this.taskInfo" :key="task.name">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" :id="'checkn'+index" v-model="task.completed" @change="taskState">
                                    <label class="form-check-label" :for="'checkn' + index">
                                        {{task.name}}
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="close">Close</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import {EventBus} from '@/bus.js'

import VARIABLES from "@/variables.js"
import axios from 'axios'
import qs from 'qs'

const IMGDEFAULT = 'http://bravewolfdev.com/main/office/public/assets/img/noavatarwolf.png';

export default {
    props:{
        value:{
            required: true
        },
        item:[Object,Array]
    },
    data(){
        return {
            taskInfo: [],
            membersInfo:[],
            request:false
        }
    },
    methods:{
        close(){
            this.$emit("input", !this.value);
            this.$el.style.opacity = "0";
        },
        taskState(){
            let url = String.prototype.concat(VARIABLES.URLWEB,"task/edit");

            let POSTDATA = {
                id: this.item.id,
                task : this.taskInfo,
                keygen: VARIABLES.KEYGEN
            }
            //save task to the database
            const options = {
                method: 'POST',
                headers: { 'Accept': 'application/json, application/xml, text/plain, text/html, *.*','content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(POSTDATA),
                url,
            };
            axios(options)
            .then((response) => {
                if(response.data.code != 200){
                    console.error("error en la consulta: ",response.data.message);
                }else{
                    //update task
                    EventBus.$emit('updateTask',this.item.estado);
                }
            })
            .catch(error => console.log("error ",error))
        }
    },
    updated(){
        if(this.value && this.request == false){
            this.request = true;
            let memberJSON = JSON.parse(this.item.members);
            let checkJSON = JSON.parse(this.item.checklist);

            //request
            axios.get(String.prototype.concat(VARIABLES.URLWEB,"users"))
            .then((response) => {
                if(response.data.code == 200){
                    if(Object.keys(response.data.data).length > 0 && Object.keys(memberJSON).length > 0){
                        let obj = response.data.data;
                        let findkey = null;
                        let prepare = [];
                        for(var val of memberJSON){
                            
                            findkey = obj.findIndex((el)=>{ return el.id == val.id });
                            if(findkey != -1){
                                if( obj[findkey].avatar == null || obj[findkey].avatar == ''){
                                    obj[findkey].avatar = IMGDEFAULT;
                                }
                                val.img = obj[findkey].avatar;
                                prepare.push(val);
                            }
                        }//end for
                        this.membersInfo = prepare;
                    }
                }else{
                    console.error("error en la consulta: ",response.data.message);
                }
            })
            .catch(error => console.log("error ",error))
            

            if(Object.keys(checkJSON).length > 0){
                Array.from(checkJSON).forEach(e=>{ e.completed = (e.completed == 'true'); });
                this.taskInfo = checkJSON;
            }

            this.$el.querySelector('#descContent').innerHTML = this.item.descripcion_long;

        }else{
            this.request = (this.value == false) ? false : this.request;
        }
    }
}
</script>
<style>
    .descLongContent{text-align: initial; max-height:300px; overflow:auto;}
</style>