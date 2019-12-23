import AppContent from '@/components/AppContent.vue'
import MakeTask from '@/components/MakeTask.vue'

const routes = [
    {path:'/', component: AppContent},
    {path:'/maketask/:type', component: MakeTask}
];

export default routes;