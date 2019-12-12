
<template>
    <div class="container">
        <h1>Task Planner <span class="badge badge-primary">v0.5</span></h1>
        <div class="row">
            <TaskList ref="to_do" v-for="value in list" :key="value.id" :title="value.name" :type="value.id"></TaskList>
        </div>
    </div>
</template>

<script>

import TaskList from "./TaskList"

export default {
    components:{
        TaskList
    },
    data: ()=>{
        return {
            list:[
                {id:1, name:"To do"},
                {id:2, name:"In process"},
                {id:3, name:"To evaluate"},
                {id:4, name:"Finished"}
            ]
        }
    }
}
</script>