<template>
    <div class="card mt-1 mb-1">
        <h5 class="card-header h5 p-1">
            <div class="row justify-content-between m-0">
                <div class="col-9 p-1">{{ item.nombre }}</div>
                <div class="col-3 p-0 text-right">
                    <div class="dropdown d-inline-block">
                        <button type="button" class="btn btn-primary btn-sm mr-1"  role="button" id="dropdownmenu" @click="showDrowndown" @blur="handleBlur">...</button>
                        <div class="dropdown-menu show" v-if="this.showDropMenu1" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="javascript:void(0)" @click.prevent="viewTask">View</a>
                            <a class="dropdown-item" href="javascript:void(0)" @click.prevent="go('edit')">Edit</a>
                            <a class="dropdown-item" href="javascript:void(0)" @click.prevent="moveto">Move to</a>
                            <a class="dropdown-item" href="javascript:void(0)" @click="removeTask">Remove</a>
                        </div>
                    </div>
                    <button type="button" @click="removeTask" class="btn btn-danger btn-sm mr-1">&times;</button>
                </div>
            </div>
            
        </h5>
        <div class="card-body pt-1">
            <div class="row">
                <div class="col-1"><div class="tag-green"></div></div>
                <div class="col-1"><div class="tag-yellow"></div></div>
                <div class="col-1"><div class="tag-red"></div></div>
            </div>
            <div class="p-1"></div>
            <div @click="viewTask" style="cursor:pointer;">
                <p class="card-text text-left">{{ item.descripcion }}</p>
            </div>
            <div class="row justify-content-right">
                <div class="col-2 p-0">
                    <figure class="m-0"><img src="https://media.licdn.com/dms/image/C4E03AQFBYTg5yAUuPA/profile-displayphoto-shrink_100_100/0?e=2159024400&v=beta&t=-3FToVy8-8T3jmVT9SFC7fPzTsP5CsH9e4CFEsNzp14" class="img-fluid" /></figure>
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
    props:['item'],
    data(){
        return {
            showDropMenu1: false
        }
    },
    methods:{
        removeTask(){
            let _estado = this.item.estado;
            //remove component instance
            this.$destroy();

            //remove from DB
            let url = String.prototype.concat(VARIABLES.URLWEB,"task/edit");

            let POSTDATA = {
                id: this.item.id,
                iddetalle:this.item.iddetalle,
                type : -1,
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
                    EventBus.$emit('updateTask',_estado);
                }
            })
            .catch(error => console.log("error ",error))
            
        },
        showDrowndown(){
            this.showDropMenu1 = !this.showDropMenu1;
        },
        handleBlur(){
            // this.showDrowndown();
        },
        go(v){
            let _id = this.item.id;
            v = v.toString().toLowerCase();
            switch(v){
                case 'edit':
                    this.$router.push({ path: `/edit/${_id}` })
                break;
            }
            this.showDrowndown();
        },
        viewTask(){
            this.showDropMenu1 = false;
            EventBus.$emit('showmodal',{modalType:1, data: this.item });
        },
        moveto(){
            this.showDrowndown();
            EventBus.$emit('showmodal2',this.item);
        }
    },
    beforeDestroy () {
        // remove the element from the DOM
        if(this.$el.parentNode != null){
            this.$el.parentNode.removeChild(this.$el)
        }
    }
}
</script>