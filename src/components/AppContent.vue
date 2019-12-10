
<template>
    <div class="container">
        <h1>Task Planner <span class="badge badge-primary">v0.5</span></h1>
        <div class="row">
            <div class="col-4">
                <TaskList></TaskList>
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