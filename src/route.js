import AppContent from '@/components/AppContent.vue'
import MakeTask from '@/components/MakeTask.vue'

const routes = [
    {path:'/', component: AppContent},
    {path:'/maketask/:type', component: MakeTask},
    {path:'/edit/:id', component: MakeTask,props:{isEdit:true}}
];

export default routes;