<template>
    <div class="card">
        <draggable v-model="items" v-bind="dragOptions">
            <TaskListItem v-for="item in items" :item="item" :key="item.id"></TaskListItem>
        </draggable>
    </div>
</template>

<script>
import Draggable from "vuedraggable"
import TaskListItem from "./TaskListItem"
export default {
    components:{
        TaskListItem
    },
    computed:{
        items: {
            get() {
                return [
                    {id:1,title:"Task 1"},{id:2,title:"Task 2"},{id:3,title:"Task 3"}
                ]
            }
        }
    }
}
</script>