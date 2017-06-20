<style lang="less" scoped>
th {
    background-color: #FBFBF6;
}

.need_arrondi_compent {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 50px;
    .need_table {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .title {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
            width: 100%;
            margin-bottom: 16px;
            .title_name {
                font-size: 22px;
                color: #676767;
                flex: 0 0 auto;
            }
            .title_more {
                font-size: 16px;
                color: #8F8F8F;
                flex: 0 0 auto;
                cursor: pointer;
            }
        }
        .table {
            border-top: 2px solid #F98435;
            .phone {
                cursor: pointer;
                height: 40px;
                width: 64px;
                background: url('../../assets/images/phone-green.png') no-repeat center;
            }
            .phone:hover {
                cursor: pointer;
                height: 40px;
                width: 64px;
                background: url('../../assets/images/phone-ogange.png') no-repeat center;
            }
            .ewm_wrap {
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
            .orange_btn {
                height: 12px;
                width: 58px;
                display: inline-block;
                line-height: 12px;
                padding: 7px 5px;
                font-size: 12px;
                color: #FA8435;
                border: 1px solid #FA8435;
                background-color: #FFF;
                border-radius: 2px;
                cursor: pointer;
                margin-right: 17px;
            }
            .orange_btn:hover {
                background-color: #FA8435;
                color: #fff;
            }
            .img_erw_wrap {
                height: 28px;
                width: 28px;
                display: inline-block;
                background: url('../../static/icon/ewm.png') no-repeat center;
            }
            .img_erw_wrap:hover {
                cursor: pointer;
                background: url('../../static/icon/ewmHover.png') no-repeat center;
            }
        }
    }
    .find_box {
        width: 300px;
        height: 485px;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        box-sizing: border-box;
        .top {
            width: 100%;
            height: 45px;
        }
        .find_good {
            flex: 1;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            .tab {
                border-top: 2px solid #F98435;
                margin-top: 20px;
                background-color: #FBFAF6;
                padding: 0 15px;
                flex: 1;
                display: flex;
                flex-direction: column;
                .tab_box {
                    height: 50px;
                    font-size: 15px;
                    color: #FBA971;
                    display: flex;
                    flex-direction: row;
                    img {
                        height: 20px;
                        margin-top: 15px;
                        margin-right: 10px;
                    }
                    .word {
                        line-height: 50px;
                    }
                }
            }
            .top {
                width: 100%;
                height: 50px;
                display: flex;
                flex-direction: row;
                box-sizing: border-box;
                text-align: center;
                line-height: 50px;
                color: #fff;
                .left {
                    flex: 1;
                    heigth: 50px;
                    margin-right: 25px;
                    border-radius: 3px;
                    background-color: #A3D5BA;
                    cursor: pointer;
                    position: relative;
                    padding-left: 16px;
                    border-sizing: border-box;
                    img {
                        position: absolute;
                        left: 16px;
                        top: 16px;
                    }
                }
                .right {
                    flex: 1;
                    heigth: 50px;
                    border-radius: 3px;
                    background-color: #FEAE79;
                    cursor: pointer;
                    position: relative;
                    padding-left: 16px;
                    border-sizing: border-box;
                    img {
                        position: absolute;
                        left: 16px;
                        top: 15px;
                    }
                }
            }
            .confirm {
                font-size: 14px;
                line-height: 35px;
                text-align: center;
                color: #FBA971;
                border: 1px solid #FBA971;
                box-sizing: border-box;
                border-radius: 3px;
                heigth: 35px;
                width: 85px;
                margin: auto;
                cursor: pointer;
            }
            .confirm:hover {
                color: #fff;
                background-color: #FBA971;
            }
        }
    }
}
</style>
<template>
    <div class="need_arrondi_compent">
        <div class="need_table">
            <div class="title">
                <div class="title_name">求购专区</div>
                <div class="title_more" v-on:click="linkTo">更多 >></div>
            </div>
            <div class="table">
                <el-table :data="needList" style="width: 100%;border:none;text-align:center">
                    <el-table-column label="品名" width="115">
                        <template scope="scope">
                            <span>{{scope.row.breedName,5 | filterTxt}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格" width="125">
                        <template scope="scope">
                            <span>{{scope.row.spec,4 | filterTxt}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="产地" width="125">
                        <template scope="scope">
                            <span>{{scope.row.location,5 | filterTxt}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="overTime" label="剩余时间" width="100">duedate
                        <template scope="scope">
                            <span>{{scope.row.duedate | timeDateNum}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="求购类型" width="120">
                        <template scope="scope">
                            <span v-if="scope.row.indentType === 0" style="color: #FA8435;">药厂求购</span>
                            <span v-if="scope.row.indentType != 0">普通求购</span>
                            <!-- <span>{{scope.row.description,5 | filterTxt}}</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="offer" label="报价人数" width="105">
                    </el-table-column>
                    <el-table-column label="咨询电话" width="95">
                        <template scope="scope">
                            <el-tooltip class="item" effect="dark" :content="'交易员:' + scope.row.employeeName +'   ' +  '电话:' + scope.row.employeeMobil" placement="top-start">
                                <div class="phone"></div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template scope="scope">
                            <el-popover popper-class="popper_wrap" ref="EWMpopover" placement="right" trigger="hover">
                                <qrcode type="image" level="H" :size="100" :value="scope.row.ewmUrl"></qrcode>
                                <div class="ewm_title">扫码报价</div>
                            </el-popover>
                            <div class="ewm_wrap" v-popover:EWMpopover>
                                <!--   <div class="orange_btn" @click="offer(scope.row.id)">立即报价</div> -->
                                <div class="img_erw_wrap">
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='find_box'>
            <div class='top'>
            </div>
            <div class="find_good">
                <div class='top'>
                    <div class='left' @click="linkToRes">
                        <div>资源发布</div>
                        <img src="../../static/icon/resource-it.png">
                    </div>
                    <div class='right' @click="linkToNeed">
                        <div>求购发布</div>
                        <img src="../../static/icon/need-it.png">
                    </div>
                </div>
                <div class="tab">
                    <div class='tab_box'>
                        <img src="../../assets/images/Looking-for-goods-current.png">
                        <div class='word'>找货助手</div>
                    </div>
                    <div class='content'>
                        <el-input type="textarea" :rows="11" v-show="!user.phone" placeholder="登录后，写下您的真实需求，包括规格,产地等，我们收到后会立即给您回电确认，剩下的就交给我们吧" v-model="textarea">
                        </el-input>
                        <el-input type="textarea" :rows="11" v-show="user.phone" placeholder="写下您的真实需求，包括规格,产地等，我们收到后会立即给您回电确认，剩下的就交给我们吧" v-model="textarea">
                        </el-input>
                    </div>
                    <div class='confirm' @click='confirm()'>确定发布</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import qrcode from 'v-qrcode'
export default {
    data() {
            var checkPhone = (rule, value, callback) => {
                if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            return {
                QRious: '',
                httpParam: {
                    sort: {
                        "offer": "0",
                        "duedate": "0",
                        "shelve_time": "0"
                    },
                    location: '',
                    indentType: 0,
                    keyWord: '',
                    pn: 1,
                    pSize: 10
                },
                textarea: '',
                needContent: '',
                breedName: '',
                specOptions: [],
                placeOptions: [],
                selectStatus: 0,
                loading: false,
                findLoading: false,
                ruleForm: {
                    breedName: '',
                    place: '',
                    spec: '',
                    price: '',
                    number: '',
                    phone: ''
                },
                rules: {
                    breedName: [{
                        required: true,
                        message: '请输入药材名称',
                        trigger: 'blur',
                        type: 'number'
                    }],
                    place: [{
                        required: true,
                        message: '请输入药材产地',
                        trigger: 'blur'
                    }],
                    spec: [{
                        required: true,
                        message: '请输入药材规格',
                        trigger: 'blur'
                    }],
                    price: [{
                        required: true,
                        message: '请输入药材价格',
                        trigger: 'blur'
                    }],
                    number: [{
                        required: true,
                        message: '请输入药材数量',
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入联系方式',
                        trigger: 'blur'
                    }, {
                        validator: checkPhone,
                        trigger: 'blur'
                    }]
                }
            }
        },
        components: {
            qrcode
        },
        created() {
            if (this.$store.state.resource.needList.list.length == 0) {
                this.getHttp();
            }
        },
        computed: {
            breed() {
                return this.$store.state.search.namePpl.list
            },
            needList() {
                //处理二维码
                let arr = this.$store.state.resource.needList.list;
                for (var i = 0; i < arr.length; i++) {
                    let obj = arr[i];
                    obj.ewmUrl = common.commonGetEWMURL(obj.breedName, obj.id);
                }
                return arr;
            },
            total() {
                return this.$store.state.resource.needList.total
            },
            user() {
                return this.$store.state.user.user
            }
        },
        methods: {
            linkToRes() {
                let _self = this;
                if (this.user.phone && !this.user.fullname) {
                    this.$alert('您还未完善个人信息,立即去完善', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/member/personalInformation');
                        }
                    });
                    return;
                };
                if (this.user.phone) {
                    this.$router.push('/publish/resource');
                } else {
                    this.$store.dispatch('setUrl', '/publish/resource').then(() => {
                        this.$router.push('/login');
                    });
                    // _self.$message({
                    //     showClose: true,
                    //     message: '请先登录',
                    //     type: 'warning'
                    // });                   
                };
            },
            confirm() {
                let _self = this;
                if (!this.user.phone) {
                    this.$confirm('此操作需要先登录', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        _self.$store.dispatch('setUrl', '').then(() => {
                            _self.$router.push('/login');
                        });
                    }).catch(() => {

                    });
                } else {
                    _self.findLoading = true;
                    let url = common.urlCommon + common.apiUrl.most;
                    let body = {
                        biz_module: 'intentionService',
                        biz_method: 'findIntentionMsg',
                        biz_param: {
                            content: _self.textarea
                        }
                    };
                    if (common.KEY) {
                        url = common.addSID(url);
                        body.version = 1;
                        body.time = Date.parse(new Date()) + parseInt(common.difTime);
                        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    }
                    common.commonPost(url, body).then(function(suc) {
                        if (suc.code == '1c01') {
                            _self.$message({
                                showClose: true,
                                message: suc.msg,
                                type: 'success'
                            });
                            _self.$router.push('/member/mySuggest');
                        } else {
                            _self.$message({
                                showClose: true,
                                message: suc.msg,
                                type: 'info'
                            });
                        }
                        _self.textarea = '';
                        _self.findLoading = false;
                    }).catch(function(err) {
                        _self.findLoading = false;
                        _self.$message({
                            showClose: true,
                            message: suc.msg,
                            type: 'info'
                        });
                        _self.textarea = '';
                    })
                }

            },
            linkToNeed() {
                let _self = this;
                if (this.user.phone && !this.user.fullname) {
                    this.$alert('您还未完善个人信息,立即去完善', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/member/personalInformation');
                        }
                    });
                    return;
                };
                if (this.user.phone) {
                    this.$router.push('/publish/need');
                } else {
                    this.$store.dispatch('setUrl', '/publish/need').then(() => {
                        this.$router.push('/login');
                    });
                    // _self.$message({
                    //     showClose: true,
                    //     message: '请先登录',
                    //     type: 'warning'
                    // });
                    return;
                };
            },
            publish() {
                if (!this.needContent) {
                    this.$message({
                        showClose: true,
                        message: '请输入您的需求！',
                        type: 'error'
                    });
                } else {
                    this.postIntention({
                        messageType: 0,
                        content: this.needContent
                    });
                }
            },
            getLocation(breedId) {
                let _self = this;
                this.$store.state.search.namePpl.list.forEach(item => {
                    if (item.breedId === breedId) {
                        _self.breedName = item.breedName;
                    }
                })
                common.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'queryLocalSpecList',
                    biz_param: {
                        breedId: breedId
                    }
                }).then(function(suc) {
                    _self.placeOptions = suc.biz_result.localList;
                    _self.specOptions = suc.biz_result.specList;
                }).catch(function(err) {})
            },
            remoteMethod(query) {
                let _self = this;
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        let url = common.urlCommon + common.apiUrl.most;
                        let body = {
                            biz_module: 'searchKeywordService',
                            biz_method: 'querySearchKeywordBreed',
                            biz_param: {
                                keyWord: query,
                                pn: 1,
                                pSize: 20
                            }
                        }
                        let obj = {
                            body: body,
                            path: url
                        }
                        _self.$store.dispatch('sch_getInitNamePpl', obj).then(() => {}, () => {});
                    }, 300);
                } else {}
            },
            getHttp() {
                let _self = this;
                let url = common.urlCommon + common.apiUrl.most;
                if (common.SID) url = common.addSID(url);
                this.$store.dispatch('getNeedList', {
                    body: {
                        biz_module: 'intentionService',
                        biz_method: 'queryBegBuyList',
                        biz_param: _self.httpParam
                    },
                    path: url
                }).then(() => {}, () => {});
            },
            offer(paramsId) {
                let _self = this;
                if (this.user.phone && !this.user.fullname) {
                    this.$alert('您还未完善个人信息,立即去完善', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/member/personalInformation');
                        }
                    });
                    return;
                };
                if (this.user.phone) {
                    // let newWin = window.open();
                    // newWin.location.href = "/needDetail/" + paramsId;
                    this.$router.push("/needDetail/" + paramsId);
                    return;
                } else {
                    this.$store.dispatch('setUrl', '/needDetail/' + paramsId).then(() => {
                        this.$router.push('/login');
                    });
                    return;
                    // _self.$message({ // showClose: true, // message: '请先登录', // type: 'warning' // });
                };
            },
            linkTo() {
                this.$router.push('/need');
            },
            changeStatus(index) {
                this.selectStatus = index;
            },
            login() {
                this.$router.push('/login');
            },
            submitForm(formName) {
                let _self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _self.postIntention({
                            messageType: 1,
                            breedName: this.breedName,
                            location: this.ruleForm.place,
                            spec: this.ruleForm.spec,
                            price: this.ruleForm.price,
                            number: this.ruleForm.number,
                            phone: this.ruleForm.phone
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
}
</script>
