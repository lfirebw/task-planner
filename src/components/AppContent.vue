
<template>
    <div class="container">
        <h1>Task Planner <span class="badge badge-primary">v0.5</span></h1>
        <div class="row">
            <div class="col-3 p-0 pl-1 pr-1">
                <TaskList ref="to_do" title="To do" type="1"></TaskList>
            </div>
            <div class="col-3 p-0 pl-1 pr-1">
                <TaskList ref="process" title="In process" type="1"></TaskList>
            </div>
            <div class="col-3 p-0 pl-1 pr-1">
                <TaskList ref="checking" title="To evaluate" type="1"></TaskList>
            </div>
            <div class="col-3 p-0 pl-1 pr-1">
                <TaskList ref="finish" title="Finished" type="1"></TaskList>
            </div>
        </div>
    </div>
</template>

<script>

import TaskList from "./TaskList"

export default {
    components:{
        TaskList
    }
}
</script>