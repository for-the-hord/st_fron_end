// 级联地址处理
export default {
    data(){
        return{
            //车辆状态图标
            carStateStyle:{
                origin:{
                    moveIcon: 'static/monitorIcon/Sidebarmove_icon.png',	//车辆正常行驶状态
                    stopIcon: 'static/monitorIcon/Sidebarjingstop_icon.png',	//车辆停止状态-----acc关
                    stopRight: 'static/monitorIcon/Sidebarjingzheng_icon.png',		//停止状态正转
                    stopReverse: 'static/monitorIcon/Sidebarjingfan_icon.png',	//停止状态反转
                    offLine: 'static/monitorIcon/Sidebarjinglixian_icon.png',	//离线状态
                    noMoney: 'static/monitorIcon/Sidebarjingqian_icon.png',	//欠费状态
                    warning: 'static/monitorIcon/Sidebarmovealarm_icon.png',	//报警状态
                    moveRight: 'static/monitorIcon/Sidebarmovezheng_icon.png',	//行驶中正转
                    moveReverse: 'static/monitorIcon/Sidebarmovefan_icon.png',	//行驶中反转
                    noSignal: 'static/monitorIcon/Sidebarsignal_icon.png',	//信号弱
                    accIcon: 'static/monitorIcon/Sidebarjinga_icon.png',	//acc图标
                },
                change:{
                    moveIcon: 'static/monitorIcon1/Sidebarmove_icon.png',	//车辆正常行驶状态
                    stopIcon: 'static/monitorIcon1/Sidebarjingstop_icon.png',	//车辆停止状态-----acc关
                    stopRight: 'static/monitorIcon1/Sidebarjingzheng_icon.png',		//停止状态正转
                    stopReverse: 'static/monitorIcon1/Sidebarjingfan_icon.png',	//停止状态反转
                    offLine: 'static/monitorIcon1/Sidebarjinglixian_icon.png',	//离线状态
                    noMoney: 'static/monitorIcon1/Sidebarjingqian_icon.png',	//欠费状态
                    warning: 'static/monitorIcon1/Sidebarmovealarm_icon.png',	//报警状态
                    moveRight: 'static/monitorIcon1/Sidebarmovezheng_icon.png',	//行驶中正转
                    moveReverse: 'static/monitorIcon1/Sidebarmovefan_icon.png',	//行驶中反转
                    noSignal: 'static/monitorIcon1/Sidebarsignal_icon.png',	//信号弱
                    accIcon: 'static/monitorIcon1/Sidebarjinga_icon.png',	//acc图标
                }
            },
            carState: {},
            //工地状态图标
            siteStateStyle:{
                origin:{
                    factoryIcon: 'static/monitorIcon/Sidebarfactory_icon.png',	//工厂图标
                    siteIcon: 'static/monitorIcon/Sidebarworking_icon.png',	//工地图标
                    blendRight: 'static/monitorIcon/Sidebarguanzaixian_icon.png',	//砂浆罐正常 图标
                    warningIcon: 'static/monitorIcon/Sidebarguanalarm_icon.png',	//砂浆罐报警 图标
                    offLine: 'static/monitorIcon/Sidebarguanlixian_icon.png',	//砂浆罐离线 图标
                    noMoney: 'static/monitorIcon/Sidebarjingqian_icon.png',		//欠费状态
                    electricIcon: 'static/monitorIcon/Sidebarguangongzuo_icon.png',		//砂浆罐电机运行状态
                },
                change:{
                    factoryIcon: 'static/monitorIcon1/Sidebarfactory_icon.png',	//工厂图标
                    siteIcon: 'static/monitorIcon1/Sidebarworking_icon.png',	//工地图标
                    blendRight: 'static/monitorIcon1/Sidebarguanzaixian_icon.png',	//砂浆罐正常 图标
                    warningIcon: 'static/monitorIcon1/Sidebarguanalarm_icon.png',	//砂浆罐报警 图标
                    offLine: 'static/monitorIcon1/Sidebarguanlixian_icon.png',	//砂浆罐离线 图标
                    noMoney: 'static/monitorIcon1/Sidebarjingqian_icon.png',		//欠费状态
                    electricIcon: 'static/monitorIcon1/Sidebarguangongzuo_icon.png',		//砂浆罐电机运行状态
                },
            },
            siteState:{
                
            },
        }
    },
    mounted () {
        let skinStyle = localStorage.getItem('skinStyle')
        this.handleChangeStyle(skinStyle)
        // this.$bus.on('ChangeSkin',e=>{
        //     this.handleChangeStyle(e)
        // })
    },
    destroyed () {
        // this.$bus.off('ChangeSkin')
    },
    methods: {
        handleChangeStyle(e){
            this.carState = e==1?this.carStateStyle.origin:this.carStateStyle.origin;
            this.siteState = e==1?this.siteStateStyle.origin:this.siteStateStyle.origin
        },
    }

};