<template>
    <div class="modal-task modal-moveto" v-show="value">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
            <div class="modal-header bg-secondary">
                <h5 class="modal-title">{{item.nombre}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <!--TASK-->
                <div class="card text-white bg-light">
                    <div class="card-body text-dark">
                        <div class="form-group">
                            <label>Move to</label>
                            <select class="form-control" v-model="type">
                                <option value="1">To do</option>
                                <option value="2">In process</option>
                                <option value="3">To evaluate</option>
                                <option value="4">finished</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row justify-content-between">
                    <div class="col-4">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="close">Close</button>
                    </div>
                    <div class="col-4">
                        <button type="button" class="btn btn-success" @click="moveTo">Save</button>
                    </div>
                </div>
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


export default {
    props:{
        value:{
            required: true
        },
        item:[Object,Array]
    },
    data(){
        return {
            type: 0
        }
    },
    methods:{
        close(){
            this.type = this.item.estado.toString();
            this.$emit("input", !this.value);
        },
        moveTo(){
            let url = String.prototype.concat(VARIABLES.URLWEB,"task/edit");

            let POSTDATA = {
                id: this.item.id,
                type : this.type,
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
                    EventBus.$emit('updateTask',null);
                    this.close();
                }
            })
            .catch(error => console.log("error ",error))
        }
    },
    updated(){
        if(this.value && this.type == 0){
            this.type = this.item.estado != null ? this.item.estado.toString() : this.type;
        }
    }
}
</script>
<style>
    
</style>