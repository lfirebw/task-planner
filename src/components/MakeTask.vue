<template>
    <div class="container">
        <div v-if="this.isEdit != null && this.isEdit == true">
            <h2>Edit Task</h2>
        </div>
        <div v-else>
            <h2 class="font-italic" v-if="type == 1" >New task to "To do" List</h2>
            <h2 class="font-italic" v-else-if="type == 2" >New task to "In Process" List</h2>
            <h2 class="font-italic" v-else-if="type == 3" >New task to "Evaluate" List</h2>
            <h2 class="font-italic" v-else >New task to "Finished" List</h2>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form id="addtask_form" class="border border-primary rounded p-2" @submit.prevent="onSubmit" method="POST">
                    <div class="form-group">
                        <label for="">Task name</label>
                        <input type="text" class="form-control" required id="taskname" name="taskname" placeholder="Write the task name here..." v-model="name" />
                    </div>
                    <div class="form-group">
                        <label for="description">Short Description</label>
                        <textarea  class="form-control" required rows="3" maxlength="255" id="description" name="description" placeholder="Write one short description here..." v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="descriptionlong">Long Description</label>
                        <vue-editor v-model="descriptionLong"></vue-editor>
                    </div>
                    <div class="form-group">
                        <label for="">Assign members</label>
                        <multiselect v-model="members" :options="optionsMembers" :searchable="true" :multiple="true" :taggable="true" track-by="id" label="name"></multiselect>
                    </div>
                    <div class="form-group">
                        <label for="">Task</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-primary" type="button" @click="addtasklist">Add</button>
                            </div>
                            <input v-model="newtask" type="text" class="form-control" placeholder="Write the task" v-on:keyup.enter="addtasklist">
                        </div>
                        <ul class="list-group text-left">
                            <li v-for="(val, index) in checklist" :key="val.name" class="list-group-item p-1">
                                <div class="row m-0">
                                    <div class="col-10 p-0">
                                        {{++index}} - {{val.name}}
                                    </div>
                                    <div class="col-2 text-center">
                                        <button type="button" class="btn btn-secondary" @click="removetasklist(val)">&times;</button>
                                    </div>
                                </div>
                            </li>
                        </ul>  
                    </div>
                    <div class="form-group">
                        <label for="">Tag color</label>
                        <multiselect v-model="tagColor" :options="optionsColors" :searchable="true" :multiple="true" track-by="name" label="name" >
                            <template slot="tag" slot-scope="props"><span :class="String.prototype.concat(props.option.class,' mr-1') ">{{props.option.name}}</span></template>
                            <template slot="option" slot-scope="props">
                                <div :class="props.option.class">{{props.option.name}}</div>
                            </template>
                        </multiselect>
                    </div>
                    <div class="form-group text-center row justify-content-between">
                        <div class="col-sm-4 text-center">
                            <button type="button" class="btn btn-danger" @click.prevent="goBack">Cancel</button>
                        </div>
                        <div class="col-sm-4 text-center">
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import VARIABLES from "@/variables.js"
import Multiselect from 'vue-multiselect'
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";

import axios from 'axios'
import qs from 'qs'

export default {
    props:['isEdit'],
    components: { Multiselect, VueEditor },
    data(){
        return {
            type: 0,
            name: null,
            description:null,
            descriptionLong:'',
            members:[],
            newtask: '',
            checklist: [],
            tagColor: [],
            optionsMembers: [],
            optionsColors: [{id:3,name:"Red",'class':'badge badge-danger'},{id:2,name:"Yellow",'class':'badge badge-warning'},{id:1,name:"Green",'class':'badge badge-success'}]
        }
    },
    mounted(){
        //set params
        this.type = this.$route.params.type
        //find users
        axios.get(String.prototype.concat(VARIABLES.URLWEB,"users"))
        .then((response) => {
            if(response.data.code == 200){
                if(Object.keys(response.data.data).length > 0){
                    Array.from(response.data.data).forEach((element)=>{
                        this.optionsMembers.push({id:element.id, name:element.user});
                    });
                }
            }else{
                console.error("error en la consulta: ",response.data.message);
            }
        })
        .catch(error => console.log("error ",error))
        .finally(()=>{
            if(this.isEdit != null && this.isEdit == true){
                this.findtaskForEdit();
            }
        })

    },
    methods:{
        goBack(){
            this.$router.push('/')

        },
        findtaskForEdit(){
            let _id = this.$route.params.id;
            //find task
            axios.get(String.prototype.concat(VARIABLES.URLWEB,"task/id/",_id))
            .then((response) => {
                if(response.data.code == 200){
                    if(Object.keys(response.data.data).length > 0){
                        let obj = response.data.data[0];
                        this.name = obj.nombre;
                        this.description = obj.descripcion;
                        this.descriptionLong = obj.descripcion_long;
                        this.members = JSON.parse(obj.members);
                        this.checklist = JSON.parse(obj.checklist);
                        this.tagColor = JSON.parse(obj.tagcolor);
                    }
                }else{
                    console.error("error en la consulta: ",response.data.message);
                }
            })
            .catch(error => console.log("error ",error))
        },
        removetasklist(value,indice){
            this.checklist.splice((indice - 1),1);
        },
        addtasklist(){
            this.checklist.push({name:this.newtask,completed: false});
            this.newtask = '';
        },
        onSubmit(e){
            let _continue = true;
            let url = String.prototype.concat(VARIABLES.URLWEB,"task/save");

            let POSTDATA = {
                name: this.name,
                desc: this.description,
                desclong: this.descriptionLong,
                members: this.members,
                colors: this.tagColor,
                type: this.type,
                task : this.checklist,
                keygen: VARIABLES.KEYGEN
            }
            if(this.members.length < 1){
                _continue = false;
            }
            if(_continue){
                //save task to the database
                const options = {
                    method: 'POST',
                    headers: { 'Accept': 'application/json, application/xml, text/plain, text/html, *.*','content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(POSTDATA),
                    url,
                };
                axios(options)
                .then((response) => {
                    if(response.data.code == 200){
                        alert("Comleted");
                        this.$router.push('/')
                    }else{
                        console.error("error en la consulta: ",response.data.message);
                    }
                })
                .catch(error => console.log("error ",error))
            }
            e.preventDefault();
        }
    }
}
</script>
