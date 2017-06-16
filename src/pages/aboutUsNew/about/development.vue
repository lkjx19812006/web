<style lang="less" scoped>
.development {
    width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 40px;
    .process {
        margin-top: 75px;
        margin-bottom: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .lineX {
            width: 7px;
            background-color: #F1DFC6;
        }
        .lineY {
            height: 7px;
            margin-top: 14px;
            background-color: #F1DFC6;
            width: 98px;
            border-radius: 3.5px;
        }
        .step_left,
        .step_right {
            flex: 1;
            position: relative;
            .content {
                position: absolute;
                width: 500px;
                right: 35px;
                top: 0;
                display: flex;
                flex-direction: row-reverse;
                .content_info {
                    flex: 0 1 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    padding-right: 15px;
                    line-height: 32px;
                }
            }
        }
        .step_right {
            .content {
                left: 35px;
                top: 0;
                flex-direction: row;
                .content_info {
                    align-items: flex-start;
                    padding-right: 0;
                    padding-left: 15px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="development">
        <titleView :title="title"></titleView>
        <div class="process">
            <div class="lineX" style="height: 46px;">
            </div>
            <div class="year_img">
                <img src="../../../static/icon/2017.png" height="67" width="67">
            </div>
            <div class="lineX" style="height: 46px;">
            </div>
            <!-- 2017年3月 -->
            <div class="step_left">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2017年3月</span>
                        <span style="font-size: 16px; color: #666666">
                    		获得上海健康医疗产业基金A轮融资<span style="color: #f32f2f">2000万</span>人民币
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 57px;">
            </div>
            <!-- 2017年2月 -->
            <div class="step_right">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2017年2月</span>
                        <span style="font-size: 14px; color: #00b8ed; line-height: 26px;">自营交易总金额3134.78万</span>
                        <span style="font-size: 16px; color: #666666">
                    		国内.自营累计交易金额<span style="color: #f32f2f">2892.7万</span>
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		国际.自营累计交易金额<span style="color: #f32f2f">36.5万</span>美金
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 94px;">
            </div>
            <div class="year_img">
                <img src="../../../static/icon/2016.png" height="67" width="67">
            </div>
            <div class="lineX" style="height: 32px;">
            </div>
            <!-- 2016年11月 -->
            <div class="step_left">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2016年11月</span>
                        <span style="font-size: 14px; color: #00b8ed; line-height: 26px;">自营交易金额2485.83万</span>
                        <span style="font-size: 16px; color: #666666">
                    		国内.自营累计交易金额<span style="color: #f32f2f">2274万</span>
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		国际.自营累计交易金额<span style="color: #f32f2f">30.7万</span>美金
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 102px;">
            </div>
            <!-- 2016年6月 -->
            <div class="step_right">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2016年6月</span>
                        <span style="font-size: 14px; color: #00b8ed; line-height: 26px;">自营交易金额746.67万</span>
                        <span style="font-size: 14px; color: #41a146; line-height: 26px;">撮合交易金额11.12亿</span>
                        <span style="font-size: 16px; color: #666666">
                    		国内.自营累计交易金额<span style="color: #f32f2f">711万</span>
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		国际.自营累计交易金额<span style="color: #f32f2f">5.17万</span>美金
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		药材买卖网安卓版本APP2.0上线
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		药材买卖网PC版2.0上线 金融+物流上线
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 178px;">
            </div>
            <!-- 2016年3月 -->
            <div class="step_left">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2016年3月</span>
                        <span style="font-size: 14px; color: #41a146; line-height: 26px;">撮合交易金额7.46亿</span>
                        <span style="font-size: 16px; color: #666666">
                    		国内.自营累计交易金额<span style="color: #f32f2f">97万</span>
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		国际.自营累计交易金额<span style="color: #f32f2f">2.08万</span>美金
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		累计交易量突破60000吨
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		药材买卖网安卓版APP1.0上线
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 151px;">
            </div>
            <!-- 2016年1月 -->
            <div class="step_right">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2016年1月</span>
                        <span style="font-size: 14px; color: #41a146; line-height: 26px;">撮合交易金额4.66亿</span>
                        <span style="font-size: 16px; color: #666666">
                    		累计交易金额突破<span style="color: #f32f2f">4亿</span> 以上
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		国际.自营累计交易金额<span style="color: #f32f2f">1.07万</span>美金
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		累计交易量突破40000吨
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 125px;">
            </div>
            <div class="year_img">
                <img src="../../../static/icon/2015.png" height="67" width="67">
            </div>
            <!-- 2015年12月 -->
            <div class="step_left">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2015年12月</span>
                        <span style="font-size: 14px; color: #41a146; line-height: 26px;">撮合交易金额2.81亿</span>
                        <span style="font-size: 16px; color: #666666">
                    		累计交易金额突破<span style="color: #f32f2f">2亿</span> 以上
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		累计交易量突破20000吨
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 106px;">
            </div>
            <!-- 2015年10月 -->
            <div class="step_right">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2015年10月</span>
                        <span style="font-size: 14px; color: #41a146; line-height: 26px;">撮合交易金额1.21亿万</span>
                        <span style="font-size: 16px; color: #666666">
                    		累计交易金额突破<span style="color: #f32f2f">1亿</span> 以上
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		国际站MIANGUANGROUP上线
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 99px;">
            </div>
            <!-- 2015年8月 -->
            <div class="step_left">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2015年8月</span>
                        <span style="font-size: 14px; color: #41a146; line-height: 26px;">撮合交易金额436.94万</span>
                        <span style="font-size: 16px; color: #666666">
                    		累计交易金额突破<span style="color: #f32f2f">400万</span> 以上
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		国际.自营交易金额<span style="color: #f32f2f">135</span> 美金
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		药材买卖网PC上线
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		成立国际部
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		微信公众号上线
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 181px;">
            </div>
            <!-- 2015年1月 -->
            <div class="step_right">
                <div class="img_wrap">
                    <img src="../../../static/icon/development.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="lineY">
                    </div>
                    <div class="content_info">
                        <span style="font-size: 18px; color: #FA8435">2015年1月</span>
                        <span style="font-size: 14px; color: #41a146; line-height: 26px;">撮合交易金额191.45万</span>
                        <span style="font-size: 16px; color: #666666">
                    		交易金额突破<span style="color: #f32f2f">100万</span>
                        </span>
                        <span style="font-size: 16px; color: #f32f2f">
                    		上海冕冠电子商务有限公司成立
                        </span>
                        <span style="font-size: 16px; color: #666666">
                    		成立交易中心
                        </span>
                    </div>
                </div>
            </div>
            <div class="lineX" style="height: 120px;">
            </div>
        </div>
    </div>
</template>
<script>
import titleView from '../../../components/about/title.vue'
export default {
    data() {
            return {
                title: {
                    enTitle: 'DEVELOPMENT PROCESS',
                    zhTitle: '药材买卖网发展历程'
                }
            }
        },
        components: {
            titleView,
        }
}
</script>
