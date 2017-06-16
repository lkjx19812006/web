<style lang="less" scoped>
.teamStyle {
    width: 1200px;
    margin: auto;
    .items {
        margin-top: 20px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 40px;
            .time_wrap {
                flex: 0 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 10px;
                background-color: #F6F6F6;
                .year {
                    margin-top: 12px;
                    line-height: 22px;
                    color: #c4c4c4;
                    font-size: 22px;
                }
                .md {
                    font-size: 24px;
                    line-height: 36px;
                    color: #df1212;
                }
            }
            .txt_wrap {
                flex: 1;
                padding: 0 25px;
                .content {
                    span {
                        padding: 0;
                        margin: 0;
                        font-size: 22px;
                        color: #333333;
                    }
                    .cont_p {
                        margin: 10px 0;
                    }
                    p {
                        padding: 0;
                        margin: 0;
                        color: #676767;
                        font-size: 16px;
                        line-height: 36px;
                    }
                }
                .img_wrap {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 25px 0;
                }
            }
        }
    }
}
</style>
<template>
    <div class="teamStyle">
        <titleView :title="title"></titleView>
        <div class="items">
            <div class="item" v-for="item in content">
                <div class="time_wrap">
                    <span class="year">{{item.year}}</span>
                    <span class="md">{{item.md}}</span>
                </div>
                <div class="txt_wrap">
                    <div class="content">
                        <span>{{item.title}}</span>
                        <div class="cont_p">
                            <p v-for="subp in item.plist">{{subp}}</p>
                        </div>
                    </div>
                    <div class="img_wrap">
                        <img :src="item.imgUrl">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import titleView from '../../../components/about/title.vue'
let content = [{
    year: '2017',
    md: '05-03',
    title: '凝心聚力，青春风采|药材买卖网团建活动完美绽放',
    plist: ['随着团队人员的不断扩大，为了打造团队多彩的业余生活，增加同事之间的感情。在盛夏来临之前，公司决定组织一次全员健身活动，给同事们来一次说举行就举行的团建活动。', '2017年5月6日10:30，药材买卖网总部及6个地区子公司共计100多人相聚在迪士卡赛车馆，对于药材买卖网的每一个人来说这是一次难得的经历，也将是一场心灵和心灵碰撞的旅行。'],
    imgUrl: require('../../../static/icon/teamstyle1.png')
}, {
    year: '2017',
    md: '02-22',
    title: '日本三井制糖株式会社一行莅临药材买卖网参观调研',
    plist: ['浅春送暖，微风拂面，值此佳期，药材买卖网上海总部迎来了一群特殊的客人。', '2017年2月11日下午，日本三井制糖株式会社一行3名代表组成的参观团赴我司进行参观交流，药材买卖网联合创始人于莎莎，国际部负责人Tania，日本市场负责人张胜男等陪同参观介绍。'],
    imgUrl: require('../../../static/icon/teamstyle2.png')
}, {
    year: '2017',
    md: '01-21',
    title: '传承共进|定格感动一刻，2017药材买卖网年会盛况',
    plist: ['2017年1月21-22日，一年一度的药材买卖网年会在太湖雷迪森温泉度假酒店举行。药材买卖网总部及亳州子公司的小伙伴齐聚湖州，策勋饮至回顾2016，鹊笑鸠舞展望2017。'],
    imgUrl: require('../../../static/icon/teamstyle3.png')
}, {
    year: '2016',
    md: '12-19',
    title: '药材买卖网亳州子公司开业',
    plist: ['2016年12月18日10点18分，药材买卖网亳州子公司在鞭炮和鲜花的相互辉映中隆重开业。总总司领导，部分合作伙伴一同出席，见证了此次盛会。随着子公司的开业，药材买卖网又站在了一个新的高度，迈进了新的发展里程碑。成立这一年有余，药材买卖网的不断壮大和发展过程中，凝聚着两位创始人的坚定信念和运筹决策，凝聚着每一位员工对中药材工作的热爱和本着对客户负责的态度，才有了今天象征扩大的伊始。'],
    imgUrl: require('../../../static/icon/teamstyle4.png')
}, {
    year: '2016',
    md: '12-13',
    title: '美国威斯康辛州花旗参农业总会代表团一行莅临药材买卖网参观调研',
    plist: ['2016年12月13日，由美国威斯康辛州花旗参农业总会4名代表组成的参观团赴我公司进行访问交流。药材买卖网联合创始人于莎莎，以及国际部负责人Tania等陪同参观介绍。'],
    imgUrl: require('../../../static/icon/teamstyle5.png')
}]
export default {
    data() {
            return {
                title: {
                    enTitle: 'TEAM STYLE',
                    zhTitle: '团队风采'
                },
                content: content
            }
        },
        components: {
            titleView
        }
}
</script>
