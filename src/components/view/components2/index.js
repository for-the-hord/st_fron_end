import Timeline from './Timeline'
import TimelineItem from './TimelineItem'
import './style.less'

// const component = {
//     install: function (Vue) {
//         Vue.component('component-name', component)
//     }
//  } //'component-name'这就是后面可以使用的组件的名字，install是默认的一个方法
const compontlds = {
        install: function (Vue) {
            Vue.component(Timeline.name, Timeline)
            Vue.component(TimelineItem.name, TimelineItem)
        }
    }
export default compontlds