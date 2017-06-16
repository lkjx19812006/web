<style scoped lang="less">
.person_certifi {
    position: relative;
}

p {
    padding: 0;
    margin: 0;
}

.person_certifi .content {
    float: left;
    width: 100%;
}

.person_certifi .content .basic {
    float: left;
    width: 500px;
    font-size: 14px;
    margin-top: 10px;
}

.person_certifi .content .basic .name_title {
    float: left;
    width: 105px;
    line-height: 36px;
    color: #333;
    text-align: right;
    padding-right: 25px;
}

.person_certifi .content .basic .name_input {
    float: left;
    width: 280px;
    position: relative;
}

.person_certifi .content .basic .name_input .img_title {
    position: absolute;
    left: 284px;
    top: 0;
    width: 550px;
    font-size: 13px;
}

.person_certifi .content .basic .name_input .up_img {
    width: 239px;
    height: 160px;
    overflow: hidden;
    position: relative;
}

.person_certifi .content .basic .name_input .up_img .word {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.person_certifi .content .basic .name_input .img_title .img_title_left,
.img_title_bottom {
    float: left;
}

.person_certifi .content .basic .name_input .img_title .img_title_bottom {
    padding-top: 65px;
}

.person_certifi .content .basic .name_input .img_title .img {
    float: left;
    padding: 0 20px;
}

.person_certifi .content .basic .name {
    float: left;
    width: 100%;
    margin-bottom: 15px;
}

.person_certifi .content .basic .tname {
    margin: 20px 0 50px 0;
}

.person_certifi .confirm {
    float: right;
    background-color: #FA8435;
    box-sizing: border-box;
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
    margin-top: 40px;
    margin-right: 440px;
    cursor: pointer;
    color: white;
}

.person_certifi {
    .hideType {
        width: 900px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .msg_img_wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            .img_wrap {
                display: flex;
                flex-direction: row;
                justify-content: center;
                img {
                    vertical-align: middle;
                }
                .title {
                    padding-left: 20px;
                    line-height: 62px;
                    font-size: 20px;
                    color: #56C101;
                }
                margin-bottom: 20px;
            }
            p {
                margin: 0;
                padding: 0;
                text-align: center;
                font-size: 16px;
                color: #4E4E4E;
                line-height: 32px;
            }
            .btn {
                margin-top: 20px;
                font-size: 18px;
                color: #fff;
                padding: 10px 20px;
                background-color: #FF8336;
                border-radius: 4px;
                cursor: pointer;
            }
        }
        .suc_info {
            margin-top: 30px;
            .info {
                padding-bottom: 30px;
            }
            .info_img {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                span {
                    flex: 0 0 100px;
                }
                .img_wrap {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    width: 900px;
                    .box {
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 10px;
                        .img_box {
                            width: 235px;
                            height: 165px;
                            margin-right: 30px;
                            img {
                                width: 235px;
                                height: 165px;
                            }
                        }
                        .name {
                            width: 235px;
                            margin-top: 10px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}

.person_certifi {
    .step {
        padding: 0 30px;
        padding-top: 25px;
        width: 900px;
        height: 120px;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            .step_wrap {
                height: 48px;
                width: 48px;
                border: 2px solid #DBDBDB;
                border-radius: 50% 50%;
                position: relative;
                .tip_left,
                .tip_lright {
                    height: 16px;
                    width: 16px;
                    position: absolute;
                    left: -8px;
                    top: 15px;
                    background-color: #fff;
                    z-index: 1
                }
                .tip_lright {
                    right: -8px;
                }
                .line_wrap {
                    height: 12px;
                    width: 400px;
                    background-color: #FFF;
                    position: absolute;
                    left: 25px;
                    top: 15px;
                    padding: 3px 0;
                    div {
                        height: 100%;
                        width: 100%;
                        background-color: #DBDBDB;
                    }
                    z-index: 2;
                    .bgc_step {
                        background-color: #FFC945;
                    }
                }
                .txt {
                    height: 42px;
                    width: 42px;
                    line-height: 42px;
                    background-color: #DBDBDB;
                    color: #fff;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 700;
                    position: absolute;
                    margin: auto;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 50% 50%;
                    z-index: 3
                }
                .color_step {
                    color: #FFC945;
                }
                .bgc_step {
                    background-color: #FFC945;
                }
            }
            .border_step {
                border-color: #FFC945;
            }
            .tit_wrap {
                font-size: 20px;
                padding: 12px 0;
                color: #DCDCDC;
            }
            .color_step {
                color: #FFC945;
            }
            .bgc_step {
                background-color: #FFC945;
            }
        }
    }
}
</style>
<template>
    <div class="person_certifi">
        <titleHead :param="myhead"></titleHead>
        <myTitle :param="param"></myTitle>
        <div class="step">
            <div class="item" v-for="(item,index) in step">
                <div class="step_wrap" :class="{'border_step ': personType >= index}">
                    <div class="tip_left" v-if="index != 0">
                    </div>
                    <div class="tip_right" v-if="index != (step.length -1)">
                    </div>
                    <div class="line_wrap" v-if="index != (step.length -1)">
                        <div :class="{'bgc_step ': personType > index}"></div>
                    </div>
                    <div class="txt" :class="{'bgc_step ': personType >= index}">{{item.step}}</div>
                </div>
                <div class="tit_wrap" :class="{'color_step ': personType >= index}">
                    {{item.title}}
                </div>
            </div>
        </div>
        <div v-if="personType == 1" class="hideType">
            <div class="msg_img_wrap">
                <div class="img_wrap">
                    <img src="../../assets/images/success.png" height="62" width="78">
                    <div class="title">
                        提交成功
                    </div>
                </div>
                <p>尊敬的用户，您的身份信息已提交成功，请耐心等待审核</p>
            </div>
        </div>
        <div v-if="personType == 2" class="hideType">
            <div class="msg_img_wrap">
                <div class="img_wrap">
                    <img src="../../assets/images/success.png" height="62" width="78">
                    <div class="title">
                        审核通过
                    </div>
                </div>
            </div>
            <div class="suc_info">
                <div class="info">
                    <span>姓名:{{user.fullname}}</span>
                    <span style="margin-left: 95px;">身份证号:{{user.idnumber}}</span>
                </div>
                <div class="info_img">
                    <span>身份证照片:</span>
                    <div class="img_wrap">
                        <div class="box">
                            <div v-for="item in userValidate.list" class='img_box' v-show="item.category == 0">
                                <img :src="item.path">
                            </div>
                            <div class="name" v-for="item in userValidate.list" v-show="item.category == 0">手持身份证照片</div>
                        </div>
                        <div class="box">
                            <div v-for="item in userValidate.list" class='img_box' v-show="item.category == 1">
                                <img :src="item.path">
                            </div>
                            <div class="name" v-for="item in userValidate.list" v-show="item.category == 1">身份证正面</div>
                        </div>
                        <div class="box">
                            <div v-for="item in userValidate.list" class='img_box' v-show="item.category == 2">
                                <img :src="item.path">
                            </div>
                            <div class="name" v-for="item in userValidate.list" v-show="item.category == 2">身份证反面</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="personType == 3 && !again" class="hideType">
            <div class="msg_img_wrap">
                <div class="img_wrap">
                    <img src="../../assets/images/error.png" width="46" height="46" style="margin-top:10px;">
                    <div class="title" style="color: red">
                        审核不通过
                    </div>
                </div>
                <p>尊敬的用户，此次认证失败，请您与药材买卖网客服人员联系</p>
                <p style="color:#FF8336">联系电话：021-55502736</p>
                <div class="btn" v-on:click="againValidate">再次申请</div>
            </div>
        </div>
        <div class="content" v-if="personType == 0 || again">
            <div class="basic">
                <div class="name">
                    <div class="name_title">姓名</div>
                    <div class="name_input">
                        <el-input v-model="formData.name" :placeholder="user.fullname"></el-input>
                    </div>
                </div>
                <div class="name">
                    <div class="name_title">身份证号</div>
                    <div class="name_input">
                        <el-input v-model="formData.idCard" placeholder="请输入身份证号码"></el-input>
                    </div>
                </div>
                <div class="name tname" v-for="(todo,index) in imagesData">
                    <div class="name_title">{{todo.name}}</div>
                    <div class="name_input">
                        <div class="up_img">
                            <imageUpload :param="imgUp[index]" v-on:postUrl="getUrl"></imageUpload>
                            <div class="word" v-if="!imgUp[index].url">上传图片</div>
                        </div>
                        <div class="img_title">
                            <div class="img_title_left">示例</div>
                            <div class="img">
                                <img :src="todo.title_img">
                            </div>
                            <div class="img_title_bottom">
                                <p>{{todo.first}}</p>
                                <p>{{todo.second}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="confirm" v-show="personType == 0 || again" @click="confirm">提交申请</div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import titleHead from '../../components/common/headTitle'
import myTitle from '../../components/common/title'
import imageUpload from '../../components/imageUpload'
import validation from '../../validation/validation.js'
let step = [{
    step: '1',
    title: '个人身份认证',
}, {
    step: '2',
    title: '等待审核',
}, {
    step: '3',
    title: '审核通过',
}]
export default {
    name: 'personal-certifi-view',
    data() {
        return {
            step: step,
            again: false,
            myhead: {
                name: '个人认证'
            },
            param: {
                title: '温馨提示:',
                arr: [{
                    name: '1、您的证件信息药材买卖网将为您保密，只用于身份认证，不会挪作他用'
                }, {
                    name: '2、带有*的项目为必填项',
                }, {
                    name: '3、照片大小不要超过3M'
                }]
            },
            obj:'',
            loading: false,
            imagesData: [{
                name: "手持身份证照片",
                up_img: "../../static/icon/images-up.png",
                title_img: '../../static/icon/identity-card.png',
                first: '1、免冠，保证五官清晰可见',
                second: '2、手持证件，不要遮挡证件上的信息'
            }, {
                name: "身份证正面",
                up_img: "../../static/icon/images-up.png",
                title_img: '../../static/icon/identity-card---front.png',
                first: '1、证件与手持证件一致',
                second: '2、证件文字清晰可见'
            }, {
                name: "身份证反面",
                up_img: "../../static/icon/images-up.png",
                title_img: '../../static/icon/identity-card---back.png',
                first: '1、证件与手持证件一致',
                second: '2、证件文字清晰可见'
            }],
            imgUp: [{
                defaults: '../../static/icon/images-up.png',
                keyName: 'authen',
                index: 0,
                url: ''
            }, {
                defaults: '../../static/icon/images-up.png',
                keyName: 'authen',
                index: 1,
                url: ''
            }, {
                defaults: '../../static/icon/images-up.png',
                keyName: 'authen',
                index: 2,
                url: ''
            }],
            formData: {
                name: '',
                idCard: '',
                imgArr: [{
                    path: '',
                    catagory: 0,
                }, {
                    path: '',
                    catagory: 1,
                }, {
                    path: '',
                    catagory: 2,
                }]
            },
        }
    },
    computed: {
        personType() {
            if (this.$store.state.authentication.types === 3) {
                this.step[2].title = '审核不通过'
            } else {
                this.step[2].title = '审核通过'
            }
            return this.$store.state.authentication.types;
        },
        userValidate() {
            return this.$store.state.authentication.userValidate;
        },
        user() {
            return this.$store.state.user.user;
        },
    },
    components: {
        titleHead,
        myTitle,
        imageUpload
    },
    methods: {
        againValidate() {
            this.again = true;
        },
        getUrl(param) {
            this.formData.imgArr[param.index].path = param.url;
        },
        getHttp() {
            let _self = this;
            _self.loading = true;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserAuthenImage',
                biz_param: {
                    type: 0
                }
            };
            if (!common.SID) {
                common.getSID(req, redirect);
            }
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            _self.$store.dispatch('personAuthen', {
                body: body,
                path: url
            })
        },
        authentication() {
            let _self = this;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userService',
                biz_method: 'webSubmitAuthenImage',
                biz_param: {
                    type: 0,
                    authenImage: _self.formData.imgArr,
                    fullname: _self.formData.name,
                    idnumber: _self.formData.idCard
                }
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.loading = true;
            this.again = false;
            common.commonPost(url, body)
                .then(function(res) {
                    if (res.code == '1c01') {
                        _self.getHttp();
                        _self.getUserInfo();
                    }
                    _self.loading = false;
                })
                .catch(function(res) {
                    _self.loading = false;
                })
        },
        selectType(val) {
            switch (val) {
                case 0:
                    return '手持身份证照';
                    break;
                case 1:
                    return '身份证正面照';
                    break;
                case 2:
                    return '身份证反面照';
                    break;
            }
        },
        confirm() {
            let _self = this;
            let checkArr = [];
            if (!this.formData.name) this.formData.name = this.user.fullname;
            let checkNameDes = validation.checkLook(_self.formData.name);
            checkArr.push(checkNameDes);
            let checkIdCard = validation.checkIdCard(_self.formData.idCard);
            checkArr.push(checkIdCard);
            let checkImg = validation.checkArr(_self.formData.imgArr);
            checkArr.push(checkImg);
            for (let i = 0; i < checkArr.length; i++) {
                if (checkArr[i]) {
                    this.$message({
                        showClose: false,
                        message: checkArr[i]
                    });
                    return;
                }
            }
            for (var i = 0; i < this.formData.imgArr.length; i++) {
                if(this.formData.imgArr[i])this.obj = this.formData.imgArr[i];
                //console.log(this.obj)
                if (!this.obj.path) {
                    if (_self.selectType(_self.obj.catagory)) {
                        this.$message({
                            message: _self.selectType(_self.obj.catagory) + '未上传',
                            type: 'info'
                        });
                        return;
                    }
                }
            }
            this.$confirm('确定提交个人认证信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                _self.authentication();
            }).catch(() => {});
        },
        getUserInfo() {
            let _self = this;
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserInfo',
                biz_param: {

                }
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            _self.$store.dispatch('getUserInformation', {
                body: body,
                path: url
            });
        },

    },
    mounted() {
        if (this.user.phone && !this.user.fullname) {
            this.$alert('您还未完善个人信息,立即去完善', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push('/member/personalInformation');
                }
            });
            return;
        };
        this.getHttp();
    }
}
</script>
