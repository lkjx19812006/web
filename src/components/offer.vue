<style lang="less" scoped>
.offer {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: 100%;
    .demo-ruleForm {
        width: 40%;
        .img_div {
            display: flex;
            flex-direction: row;
            width: 800px;
            .imgUpload_btn {
                padding: 10px 20px;
                color: #fff;
                background-color: #FFC945;
                border-radius: 4px;
                font-size: 16px;
                line-height: 16px;
                cursor: pointer;
            }
        }
        .img_items {
            display: flex;
            flex-direction: row;
            width: 800px;
            list-style: none;
            padding: 0;
            li {
                padding: 0;
                margin: 0;
                list-style: none;
            }
            .img_item {
                height: 150px;
                width: 150px;
                margin-right: 10px;
                float: left;
                overflow: hidden;
                position: relative;
                img {
                    height: 100%;
                    width: 100%;
                }
                .model {
                    position: absolute;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, .3);
                    span,
                    a {
                        font-size: 20px;
                        flex: 1;
                        text-align: center;
                        color: #fff;
                        cursor: pointer;
                        text-decoration: none;
                    }
                    span:hover,
                    a:hover {
                        color: #FA8535;
                    }
                }
            }
        }
        .imgUploade_wrap {
            height: 100%;
            width: 100%;
            border: 3px dashed #E6E6E6;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .img_wrap {
                display: flex;
                flex-direction: row;
                justify-content: center;
                padding-top: 44px;
                padding-bottom: 14px;
            }
            .btn_wrap {
                display: flex;
                flex-direction: row;
                justify-content: center;
                height: 50px;
            }
            .content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-top: 40px;
                p {
                    margin: 0;
                    padding: 8px 0;
                    text-align: center;
                }
            }
        }
    }
}
</style>
<template>
    <div class="offer">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="产品">
                <el-input :disabled="true" v-model="breed.breedName"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="spec">
                <!--  <el-autocomplete style="width: 380px;" class="inline-input" v-model="ruleForm.spec" :fetch-suggestions="querySearchSpec" placeholder="请输入内容"></el-autocomplete> -->
                <el-select v-model="ruleForm.spec" placeholder="请选择规格">
                    <el-option v-for="item in specOptions" :label="item.name" :key="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产地" prop="location">
                <!-- <el-autocomplete style="width: 380px;" class="inline-input" v-model="ruleForm.location" :fetch-suggestions="querySearchLocation" placeholder="请输入内容"></el-autocomplete> -->
                <el-select v-model="ruleForm.location" placeholder="请选择产地">
                    <el-option v-for="item in placeOptions" :label="item.name" :key="item.name" :value="item.locationId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数量" prop="number">
                <el-input type="number" v-model.number="ruleForm.number" placeholder="请输入数量">
                    <el-select style="width: 120px;" v-model="unitInfo.id" slot="append" placeholder="请选择单位">
                        <el-option :label="item.name" :value="item.id" v-for="item in unitInfo.list" :key="item.id"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label="销售价格" prop="price">
                <el-input type="number" v-model.number="ruleForm.price" placeholder="请输入销售价格">
                    <el-select style="width: 120px;" v-model="unitInfo.id" slot="append" placeholder="请选择单位">
                        <el-option :label="item.itemName" :value="item.id" v-for="item in unitInfo.list" :key="item.id"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <!--  <el-form-item label="交货地" v-if="false">
                <el-cascader v-model="ruleForm.address" placeholder="请输入城市" :options="citys" filterable></el-cascader>
            </el-form-item> -->
            <el-form-item label="货物图片" prop="image">
                <div class="img_div">
                    <div class="imgUpload_btn" @click="showImgDialog">上传图片</div>
                </div>
                <ul class="img_items" v-show="ruleForm.breedImage.length > 0">
                    <li class="img_item" v-on:mouseenter="showModelIndex = index" :key="index" v-on:mouseleave="showModelIndex = -1" v-for="(item, index) in ruleForm.breedImage">
                        <img :src="item" alt="">
                        <div class="model" v-show="index === showModelIndex">
                            <a @click="showBigImg()" :href="item" target="_blank" class="el-icon-view"></a>
                            <span @click="deleteImg(index)" class="el-icon-delete2"></span>
                        </div>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="是否提供样品">
                <el-radio-group v-model="ruleForm.sampling">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="样品数量" prop="sampleNumber" v-if="ruleForm.sampling==='1'">
                <el-input type="number" v-model.number="ruleForm.sampleNumber" placeholder="请输入样品数量">
                    <el-select style="width: 120px;" v-model="otherUnit" slot="append" placeholder="请选择单位">
                        <el-option label="份" value="66"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label="样品价格" prop="sampleAmount" v-if="ruleForm.sampling==='1'">
                <el-input type="number" v-model.number="ruleForm.sampleAmount" placeholder="请输入样品价格">
                    <el-select style="width: 120px;" v-model="otherPrice" slot="append" placeholder="请选择单位">
                        <el-option label="元/份" value="66"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label="产品卖点">
                <el-input type="textarea" :rows="4" placeholder="请根据实际情况填写药材卖点，如药典标准，药材品质等" v-model="ruleForm.quality">
                </el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="offerName">
                <el-input v-model="ruleForm.offerName" :placeholder="user.fullname"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="offerMobile">
                <el-input v-model="ruleForm.offerMobile" :placeholder="user.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="large" class="orange_button" @click="offer('ruleForm')">提交</el-button>
            </el-form-item>
            <el-dialog v-on:close="imgUploadClose" title="上传图片" class="imgUploade" v-model="imgUploadeDialog" size="tiny">
                <div class="imgUploade_wrap">
                    <div class="img_wrap">
                        <img src="../assets/images/imgIcon.jpg" height="80" width="140">
                    </div>
                    <div class="btn_wrap">
                        <imgUpload :param="ruleForm.breedImage" v-on:postUrl="getImgUrl"></imgUpload>
                    </div>
                    <div class="content">
                        <p>支持格式: jpg, jpeg, bmp, png, gif</p>
                        <p>原始图片大小超过200KB时，系统会自动对图片进行等比例压缩</p>
                        <p>一次最多可以上传5张，单张图片最大不能超过3M。</p>
                    </div>
                </div>
            </el-dialog>
        </el-form>
        <el-dialog v-on:close="closeMsg" class="my_msg" v-model="dialogMsg">
            <msg title="报价已提交成功" phone="021-55502736"></msg>
        </el-dialog>
    </div>
</template>
<script>
import common from '../common/httpService.js'
import imgUpload from './publish/imgUploade.vue'
import msg from './msg.vue'
export default {
    props: {
        breed: {
            default: null
        },
        unitInfo: {
            id: '',
            list: []
        },
        placeOptions: '',
        specOptions: '',
    },
    data() {
        function validateAddress(rule, value, callback) {
            if (!value.length) {
                return callback(new Error('请选择地址'));
            } else {
                callback();
            }
        }
        var validateNum = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入数量'));
            } else if (!(/^([1-9][0-9]*){1,10}$/.test(value))) {
                callback(new Error('数量为正整数'));
            } else {
                callback();
            }
        };
        var validateSampleNum = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入样品数量'));
            } else if (!(/^([1-9][0-9]*){1,10}$/.test(value))) {
                callback(new Error('样品数量为正整数'));
            } else {
                callback();
            }
        };
        return {
            dialogMsg: false,
            timer: '',
            imgUploadeDialog: false,
            showModelIndex: -1,
            sampleUnit: [{
                name: '份',
                id: '66'
            }],
            otherUnit: '66',
            otherPrice: '66',
            ruleForm: {
                spec: '',
                location: '',
                number: '',
                price: '',
                quality: '',
                customerId: '',
                address: [],
                sampling: '1',
                breedImage: [],
                descriptions: '',
                offerName: '',
                offerMobile: '',
                sampleNumber: '',
                sampleAmount: '',
                sampleUnit: '66',
                intentionId: '',
                unit: '',
            },
            rules: {
                spec: [{
                    required: true,
                    message: '请选择规格',
                    trigger: 'blur,change'
                }],
                location: [{
                    required: true,
                    type: 'number',
                    message: '请选择产地',
                    trigger: 'blur,change'
                }],
                offerName: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur,change'
                }],
                offerMobile: [{
                    required: true,
                    pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                    message: '请输入合法的手机号',
                    trigger: 'blur,change'
                }],
                number: [{
                    validator: validateNum,
                    trigger: 'blur'
                }],
                price: [{
                    required: true,
                    type: 'number',
                    message: '请输入意向售价',
                    trigger: 'blur'
                }],
                sampleAmount: [{
                    required: true,
                    type: 'number',
                    message: '请输入样品价格',
                    trigger: 'blur'
                }],
                sampleNumber: [{
                    validator: validateSampleNum,
                    trigger: 'blur'
                }],
                address: [{
                    validator: validateAddress,
                    trigger: 'blur,change'
                }]

            },
            unit: [],
            citys: []
        }
    },
    components: {
        imgUpload,
        msg
    },
    computed: {
        user() {
            return this.$store.state.user.user
        }
    },
    mounted() {
        // this.gethttp(this.$route.params.id);        
        // this.getCity();

    },
    methods: {
        // querySearchSpec(queryString, cb) {
        //     for (var i = 0; i < this.specOptions.length; i++) {
        //         let obj = this.specOptions[i];
        //         obj.value = obj.name;
        //     };
        //     var results = queryString ? this.specOptions.filter(this.createFilter(queryString)) : this.specOptions;
        //     cb(results);
        // },
        // querySearchLocation(queryString, cb) {
        //     for (var i = 0; i < this.placeOptions.length; i++) {
        //         let obj = this.placeOptions[i];
        //         obj.value = obj.name;
        //     };
        //     var results = queryString ? this.placeOptions.filter(this.createFilter(queryString)) : this.placeOptions;
        //     cb(results);
        // },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        closeMsg() {
            this.$router.push('/member/myReportPrice');
        },
        getImgUrl(val) {
            this.ruleForm.breedImage.push(val.url);
            this.imgUploadeDialog = false;
        },
        deleteImg(index) {
            this.$confirm('确定删除该图片吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ruleForm.breedImage.splice(index, 1);
            }).catch(() => {});
        },
        showImgDialog() {
            this.imgUploadeDialog = true;
        },
        imgUploadClose() {
            this.imgUploadeDialog = false;
        },
        offerSubmit() {
            let _self = this;
            let arr = [];
            let count = _self.ruleForm.breedImage.length;
            if (count <= 0) {
                this.$message({
                    showClose: false,
                    message: '请至少上传一张图片'
                });
                return;
            }
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'intentionOfferService',
                biz_method: 'saveIntentionOffer',
                biz_param: {
                    breedName: _self.breed.breedName,
                    spec: _self.ruleForm.spec,
                    location: _self.ruleForm.location,
                    number: _self.ruleForm.number,
                    price: _self.ruleForm.price,
                    quality: _self.ruleForm.quality,
                    // customerId: _self.ruleForm.customerId,
                    // address: _self.ruleForm.address[0] + _self.ruleForm.address[1] + _self.ruleForm.address[2],
                    sampling: _self.ruleForm.sampling,
                    breedImage: _self.ruleForm.breedImage,
                    descriptions: _self.ruleForm.descriptions,
                    offerName: _self.ruleForm.offerName,
                    offerMobile: _self.ruleForm.offerMobile,
                    sampleNumber: _self.ruleForm.sampleNumber,
                    sampleAmount: _self.ruleForm.sampleAmount,
                    sampleUnit: _self.ruleForm.sampleUnit,
                    intentionId: _self.$route.params.id,
                    unit: _self.unitInfo.id
                }
            }
            url = common.addSID(url);
            body.version = 1;
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$emit('showLoad', true);
            common.commonPost(url, body).then(function(suc) {
                _self.$emit('showLoad', false);
                _self.dialogMsg = true;
                // clearTimeout(_self.timer);
                // _self.timer = setTimeout(() => {
                //     _self.dialogMsg = false;
                // }, 2000);
                // _self.$msgbox({
                //     title: '消息',
                //     message: '资源发布成功',
                //     showCancelButton: true,
                //     confirmButtonText: '确定',
                //     beforeClose: (action, instance, done) => {
                //         done();
                //     }
                // }).then(action => {
                //     done();
                // });
            }).catch(function(err) {
                _self.$emit('showLoad', false);
            })

        },
        offer(formName) {
            let _self = this;
            if (!this.ruleForm.offerName) this.ruleForm.offerName = this.user.fullname;
            if (!this.ruleForm.offerMobile) this.ruleForm.offerMobile = this.user.phone;
            if (!this.ruleForm.customerId) this.ruleForm.customerId = this.user.id;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.$confirm('确定提交表单吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        _self.offerSubmit();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });

                } else {
                    return false;
                }
            });
        },
        getCity() {
            function sortArr(item) {
                item.label = item.cname;
                item.value = item.cname;
                if (item.childList.length > 0) item.children = item.childList;
                if (item.childList.length > 0) item.children.forEach(function(childItem) {
                    sortArr(childItem);
                })
            }
            let _self = this;
            common.commonPost(common.urlCommon + common.apiUrl.most, {
                biz_module: 'locationService',
                biz_method: 'queryLocationList',
                biz_param: {}
            }).then(function(suc) {
                suc.biz_result.list.forEach(function(item) {
                    sortArr(item);
                });
                _self.citys = suc.biz_result.list;
            }).catch(function(err) {})
        },

    }
}
</script>
