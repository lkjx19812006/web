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
      .radio_item_wrap {
        height: 36px;
        line-height: 36px;
        margin-bottom: 10px;
        input {
          outline-style: none;
          border: 0 none;
          border-bottom: 1px solid #DBDBDB;
          text-align: center;
          height: 20px;
          line-height: 20px;
          width: 100px;
          margin: 0 10px;
        }
        .radio_input_wrap {
          margin-bottom: 20px;
        }
      }
      .check_box_wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        .check_box_item {
          margin-right: 20px;
        }
      }
    }
    .price_radio {
      height: 260px;
      margin-bottom: 20px;
      overflow: hidden;
      .radio_inupt_wrap {
        // padding-left: 23px;
      }
    }
  }
</style>
<template>
  <div class="offer offerNeedNew">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品" prop="breedName">
        <mySelect v-model="ruleForm.breedName" style="width: 380px;" placeholder="请输入您需要的产品名称"
                  v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></mySelect>
      </el-form-item>
      <el-form-item label="规格" prop="spec">
        <el-select v-model="ruleForm.spec" placeholder="请选择规格">
          <el-option v-for="item in specOptions" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="location">
        <el-select v-model="ruleForm.location" placeholder="请选择产地">
          <el-option v-for="item in locationOptions" :key="item.name" :label="item.name" :value="item.locationId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="求购数量" prop="number">
        <el-input type="number" v-model.number="ruleForm.number" placeholder="请输入数量">
          <el-select style="width: 120px;" v-model="ruleForm.unit" slot="append" placeholder="请选择单位">
            <el-option :label="item.name" :value="item.id" v-for="item in unit" :key="item.id"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="质量要求" prop="quality">
        <el-checkbox-group v-model="ruleForm.quality">
          <template>
            <div class="check_box_wrap">
              <div class="check_box_item" v-for="item in qualitys" :key="item.label">
                <el-checkbox :label="item.label"></el-checkbox>
              </div>
            </div>
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="交货地" prop="PCD">
        <el-cascader @change="selectChange" style="width: 380px;" v-model="ruleForm.PCD" placeholder="请输入城市"
                     :options="citys"></el-cascader>
      </el-form-item>
      <div class="price_radio" v-if="false">
        <el-form-item label="付款方式">
          <el-radio-group @change="radioChange" v-model="payment">
            <template>
              <div class="radio_item_wrap">
                <el-radio :label="0">
                  <template>
                    <span>合同签订后，预付定金</span>
                    <input :disabled="payment != 0" type="number" v-model.number="frontMoney">
                    <span>%</span>
                  </template>
                </el-radio>
              </div>
              <div class="radio_item_wrap">
                <el-radio :label="1">
                  <template>
                    <span>验收合格后，立即付款</span>
                  </template>
                </el-radio>
              </div>
              <div class="radio_item_wrap">
                <el-radio :label="2">
                  <template>
                    <span>验收合格后，</span>
                    <input :disabled="payment != 2" type="number" v-model.number="frontDate">
                    <span>天内付款</span>
                  </template>
                </el-radio>
              </div>
              <div class="radio_item_wrap">
                <el-radio :label="3">
                  <template>
                    <span style="margin-right: 10px;">其他</span>
                  </template>
                </el-radio>
                <div class="radio_inupt_wrap">
                  <el-input type="textarea" :rows="3" :disabled="payment != 3" style="width: 380px;"
                            :placeholder="placeholderOtherStr" v-model="otherStr"></el-input>
                </div>
              </div>
            </template>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item label="截止时间">
        <el-radio-group @change="radioDate" v-model="ruleForm.duedate">
          <template>
            <div class="radio_item_wrap">
              <el-radio :label="7">7天</el-radio>
              <el-radio :label="15">15天</el-radio>
              <el-radio :label="30">30天</el-radio>
              <el-radio :label="-1">
                <template>
                  <input :disabled="ruleForm.duedate != -1" type="number" v-model.number="duedate">
                  <span>天</span>
                </template>
              </el-radio>
            </div>
          </template>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-checkbox-group @change="changeDes" v-model="ruleForm.description">
          <template>
            <div class="check_box_wrap">
              <div class="check_box_item" v-for="item in des" :key="item.label">
                <el-checkbox :label="item.label"></el-checkbox>
              </div>
            </div>
          </template>
        </el-checkbox-group>
        <el-input v-on:change="changeText" type="textarea" :rows="4" :placeholder="otherdescription" v-model="otherdes">
        </el-input>
      </el-form-item>
      <!--   <el-form-item label="姓名" prop="customerName">
          <el-input v-model="ruleForm.customerName" :placeholder="user.fullname"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="customerPhone">
          <el-input v-model="ruleForm.customerPhone" :placeholder="user.phone"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button style="width: 380px;" type="primary" size="large" class="orange_button" @click="offer('ruleForm')">
          提交
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-on:close="closeMsg" class="my_msg" v-model="dialogMsg">
      <msg :title="title" phone="021-55502736"></msg>
    </el-dialog>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import imgUpload from './imgUploade.vue'
  import breed from './breed.vue'
  import msg from '../msg.vue'
  import mySelect from '../../components/select.vue'
  let qualitys = [{
    label: '符合药典',
    value: '符合药典'
  }, {
    label: '硫不超标',
    value: '硫不超标'
  }, {
    label: '无虫蛀',
    value: '无虫蛀'
  }, {
    label: '无霉',
    value: '无霉'
  }, {
    label: '无变色',
    value: '无变色'
  }, {
    label: '无走油',
    value: '无走油'
  }, {
    label: '干度好',
    value: '干度好'
  }, {
    label: '杂质少',
    value: '杂质少'
  }, {
    label: '含量够',
    value: '含量够'
  }]
  let des = [{
    label: '时间紧',
    value: '时间紧'
  }, {
    label: '价格适合，立即合作',
    value: '价格适合，立即合作'
  }, {
    label: '现款无账期',
    value: '现款无账期'
  }, {
    label: '常年有需求，可建立稳固渠道',
    value: '常年有需求，可建立稳固渠道'
  }]
  export default {
    data() {
      function validateAddress(rule, value, callback) {
        if (!value.length) {
          return callback(new Error('请选择交货地'));
        } else {
          callback();
        }
      }

      return {
        duedate: '',
        payment: 0,
        paymentWay: '',
        placeholderOtherStr: '例：要等我下家确认货没有问题，立即现款',
        frontMoney: '',
        frontDate: '',
        otherStr: '',
        otherdescription: '如上述备注信息不充足，可在这里填写',
        otherdes: '',
        iv: '',
        des: des,
        qualitys: qualitys,
        dialogMsg: false,
        title: '求购发布成功',
        timer: '',
        imgUploadeDialog: false,
        showModelIndex: -1,
        sampleUnit: [{
          name: '份',
          id: '66'
        }],
        otherUnit: '66',
        otherPrice: '66',
        otherData: '66',
        search: {
          type: '0',
          value: ''
        },
        rules: {
          breedName: [{
            required: true,
            message: '请选择产品',
            trigger: 'blur, change'
          }],
          spec: [{
            required: true,
            message: '请选择规格',
            trigger: 'blur, change'
          }],
          location: [{
            required: true,
            type: 'number',
            message: '请选择产地',
            trigger: 'blur, change'
          }],
          PCD: [{
            required: true,
            validator: validateAddress,
            trigger: 'blur, change'
          }],
          number: [{
            required: true,
            pattern: /^[0-9]*[1-9][0-9]*$/,
            message: '请输入正整数',
            trigger: 'blur'
          }],
          customerName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur, change'
          }],
          customerPhone: [{
            required: true,
            pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入合法的手机号',
            trigger: 'blur,change'
          }],
          duedate: [{
            required: true,
            pattern: /^[0-9]*[1-9][0-9]*$/,
            message: '请输入正整数',
            trigger: 'blur'
          }],
        },
        unit: [],
        specOptions: [],
        locationOptions: [],
        ruleForm: {
          breedName: '',
          spec: '',
          location: '',
          locationId: '',
          number: '',
          duedate: 7,
          paymentWay: '',
          quality: [],
          customerName: '',
          PCD: [],
          province: -1,
          city: -1,
          district: -1,
          description: [],
          customerPhone: '',
          customerId: '',
          breedId: '',
          unit: '',
          id: ''
        }
      }
    },
    components: {
      imgUpload,
      breed,
      msg,
      mySelect
    },
    created() {
      this.getUnit();
      if (this.$route.params.id) {
        this.getNeedDetail(this.$route.params.id);
      }

    },
    mounted(){
      if (!common.validateUserInfo(this.user, () => {
        })) {
        this.$alert('您还未完善个人信息,请立即去完善', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/register');
          }
        });
        return;
      } else if (!this.user.phone) {
        this.$store.dispatch('setUrl', '/publish/need').then(() => {
          this.$router.push('/login');
        });
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user
      },
      citys() {
        return this.$store.state.search.cityList;
      },
    },
    methods: {
      selectChange(item) {
        console.log(item);
      },
      //文本域发生变化 修改值
      changeText(val) {
        let arr = val.split(',');
        if (arr.length === 1 && arr[0] === '') {
          this.ruleForm.description = []
        } else {
          this.ruleForm.description = arr
        }
      },
      //截止时间
      radioDate(val) {
        switch (val) {
          case 7:
            this.duedate = '';
            break;
          case 15:
            this.duedate = '';
            break;
          case 30:
            this.duedate = '';
            break;
        }
      },
      // //付款方式
      // radioChange(val) {
      //     switch (val) {
      //         case 0:
      //             this.frontDate = '';
      //             this.otherStr = '';
      //             break;
      //         case 1:
      //             this.frontMoney = '';
      //             this.frontDate = '';
      //             this.otherStr = '';
      //             break;
      //         case 2:
      //             this.frontMoney = '';
      //             this.otherStr = '';
      //             break;
      //         case 3:
      //             this.frontMoney = '';
      //             this.frontDate = '';
      //             break;
      //     }
      // },
      // //校验付款方式
      // vaildatePayment(payment) {
      //     let validate = true;
      //     let result;
      //     let msg = '';
      //     switch (payment) {
      //         case 0:
      //             if (!parseFloat(this.frontMoney)) {
      //                 validate = false;
      //                 msg = '请输入合法的百分比';
      //                 break;
      //             };
      //             validate = !!this.frontMoney;
      //             msg = '请填写预付定金百分比';
      //             if (this.frontMoney > 100) {
      //                 this.frontMoney = 100;
      //             } else if (this.frontMoney <= 0) {
      //                 validate = false;
      //                 msg = '预付定金百分比不能小于0';
      //             }

      //             this.paymentWay = '合同签订后，预付定金' + this.frontMoney + '%';
      //             break;
      //         case 1:
      //             this.paymentWay = '验收合格后，立即付款';
      //             break;
      //         case 2:
      //             if (this.frontDate != '') {
      //                 this.frontDate = parseInt(this.frontDate);
      //             }
      //             validate = !!this.frontDate;
      //             msg = '请填写付款期限';
      //             if (this.frontDate <= 0) {
      //                 msg = '付款期限不能少于0';
      //             }
      //             this.paymentWay = '验收合格后，' + this.frontDate + '天内付款';

      //             break;
      //         case 3:
      //             validate = !!this.otherStr;
      //             this.paymentWay = this.otherStr;
      //             msg = '请填写付款方式内容';
      //             break;
      //     }
      //     if (!validate) {
      //         this.$message({
      //             message: msg,
      //             type: 'warning'
      //         });
      //         return false;
      //     }
      //     return true;
      // },
      // //编辑时获取付款方式
      // getEditPayment(paymentWay) {
      //     let _self = this;
      //     //获取Unicode编码
      //     // var GB2312UnicodeConverter = {
      //     //     ToUnicode: function(str) {
      //     //         return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
      //     //     },
      //     //     ToGB2312: function(str) {
      //     //         return unescape(str.replace(/\\u/gi, '%u'));
      //     //     }
      //     // };
      //     let Reg0 = /^\u5408\u540c\u7b7e\u8ba2\u540e\uff0c\u9884\u4ed8\u5b9a\u91d1[1-9]\d*.\d*|0.\d*[1-9]\d*%$/;
      //     let Reg1 = /^\u9a8c\u6536\u5408\u683c\u540e\uff0c\u7acb\u5373\u4ed8\u6b3e$/;
      //     let Reg2 = /^\u9a8c\u6536\u5408\u683c\u540e\uff0c[1-9]\d*\u5929\u5185\u4ed8\u6b3e$/;
      //     // 合同签订后，预付定金  % 0
      //     // 验收合格后，立即付款    1
      //     // 验收合格后，? 天内付款   2
      //     // 其他                    3
      //     if (Reg0.test(paymentWay)) {
      //         //处理第一种方式
      //         this.payment = 0;
      //     } else if (Reg1.test(paymentWay)) {
      //         //处理第二种方式
      //         this.payment = 1;
      //     } else if (Reg2.test(paymentWay)) {
      //         //处理第三种方式
      //         this.payment = 2;
      //     } else {
      //         this.payment = 3;
      //         //处理第四种方式
      //     }
      //     switch (this.payment) {
      //         case 0:
      //             _self.frontMoney = paymentWay.substring(10, paymentWay.length - 1);
      //             break;
      //         case 2:
      //             _self.frontDate = paymentWay.substring(6, paymentWay.length - 4);
      //             break;
      //         case 3:
      //             _self.otherStr = paymentWay;
      //             break;
      //     }
      // },
      changeDes() {
        if (this.ruleForm.description.length != 0) {
          this.otherdes = this.ruleForm.description.join(',') + ',';
        } else {
          this.otherdes = this.ruleForm.description.join(',')
        }

      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      closeMsg() {
        clearTimeout(this.timer);
        this.$router.push('/member/myNeed');
      },
      handleSelect(params) {
        this.ruleForm.breedName = params.breedName;
        this.ruleForm.breedId = params.breedId;
        if (params.breedId) {
          this.getLocalSpecList(params.breedId);
        }
      },
      offerSubmit(params) {
        let _self = this;
        this.$emit('showLoad', true);
        let url = common.urlCommon + common.apiUrl.most;
        let module = 'intentionService';
        let method = 'htmlEditBegBuyInfo';
        let title = '求购发布成功';
        if (_self.ruleForm.id) {
          method = 'updatehtmlEditBegBuyInfo';
          title = '求购修改成功'
        }
        let body = {
          biz_module: module,
          biz_method: method,
          biz_param: {
            breedName: _self.ruleForm.breedName,
            breedId: _self.ruleForm.breedId,
            spec: _self.ruleForm.spec,
            location: _self.ruleForm.location,
            number: _self.ruleForm.number,
            unit: _self.ruleForm.unit,
            duedate: params.duedate,
            quality: params.quality,
            description: params.description,
            address: params.address,
            // paymentWay: paymentWay,
            province: _self.ruleForm.province,
            city: _self.ruleForm.city,
            district: _self.ruleForm.district
            // customerName: _self.ruleForm.customerName,
            // customerPhone: _self.ruleForm.customerPhone,
            // customerId: _self.ruleForm.customerId,
          }
        };
        if (_self.ruleForm.id) {
          body.biz_param.id = _self.ruleForm.id;
        }
        ;
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body).then(function (suc) {
          _self.$emit('showLoad', false);
          _self.title = title;
          _self.dialogMsg = true;
        }).catch(function (err) {
          _self.$emit('showLoad', false);
        })
      },
      offer(formName) {
        let _self = this;
        // if (!this.ruleForm.customerName) this.ruleForm.customerName = this.user.fullname;
        // if (!this.ruleForm.customerPhone) this.ruleForm.customerPhone = this.user.phone;
        // if (!this.ruleForm.customerId) this.ruleForm.customerId = this.user.id;
        let duedate = '';
        let quality;
        let description;
        let address = [];
        let paymentWay;
        //处理时间
        if (this.duedate == '' && this.ruleForm.duedate == -1) {
          this.$message({
            message: '请输入截止时间',
            type: 'warning'
          });
          return;
        }
        ;
        if (this.ruleForm.duedate === -1) {
          if (parseInt(this.duedate)) {
            this.duedate = parseInt(this.duedate)
            duedate = this.duedate;
          }
        } else {
          duedate = this.ruleForm.duedate;
        }
        if (duedate == '' || duedate <= 0) {
          this.$message({
            message: '截止时间不能少于0天',
            type: 'warning'
          });
          return;
        }
        if (duedate > 30) {
          this.$message({
            message: '有效期限不能超过30天',
            type: 'warning'
          });
          return;
        }
        ;
        //处理质量要求
        if (this.ruleForm.quality.length === 0) {
          this.$message({
            message: '请选择质量要求',
            type: 'warning'
          });
          return;
        }
        ;
        quality = this.ruleForm.quality.join(',');

        //处理描述
        let Reg = /,$/;
        if (Reg.test(this.otherdes)) {
          description = this.otherdes.substring(this.otherdes.length - 1, -1);
        } else {
          description = this.otherdes;
        }
        if (description === '') {
          this.$message({
            message: '请选择或填写备注信息',
            type: 'warning'
          });
          return;
        }
        ;
        //处理地址 地址Id 文本型的地址
        var pp = [];
        var cc = [];
        this.ruleForm.PCD.forEach(function (PCDid, index) {
          switch (index) {
            case 0:
              //确定省级ID对应的name名称
              _self.citys.forEach(function (p, i) {
                if (PCDid === p.id) {
                  address.push(p.cname);
                  pp = p.childList;
                  _self.ruleForm.province = PCDid;
                  _self.ruleForm.city = '';
                  _self.ruleForm.district = '';
                }
              })
              break;
            case 1:
              pp.forEach(function (c, i) {
                if (PCDid === c.id) {
                  address.push(c.cname);
                  cc = c.childList;
                  _self.ruleForm.city = PCDid;
                  _self.ruleForm.district = '';
                }
              })
              break;
            case 2:
              cc.forEach(function (d, i) {
                if (PCDid === d.id) {
                  address.push(d.cname);
                  _self.ruleForm.district = PCDid;
                }
              })
              break;
          }
        })
        address = address.join(',');
        //处理付款方式
        // paymentWay = this.paymentWay;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            _self.$confirm('确定提交表单吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              // if (!_self.vaildatePayment(this.payment)) {
              //     return;
              // };
              _self.offerSubmit({
                duedate: duedate,
                quality: quality,
                description: description,
                address: address
              })
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
      getUnit() {
        let _self = this;
        common.commonPost(common.urlCommon + common.apiUrl.most, {
          biz_module: 'enumService',
          biz_method: 'queryEnumList',
          biz_param: {
            type: 'MU'
          }
        }).then(function (suc) {
          _self.unit = suc.biz_result.list;
          if (!_self.$route.params.id) _self.ruleForm.unit = _self.unit[2].id;
          _self.ruleForm.sampleUnit = _self.unit[0].id;
        }).catch(function (err) {
        })
      },
      getLocalSpecList(breedId) {
        let _self = this;
        common.commonPost(common.urlCommon + common.apiUrl.most, {
          biz_module: 'breedService',
          biz_method: 'queryLocalSpecList',
          biz_param: {
            breedId: this.ruleForm.breedId,
            name: ''
          }
        }).then(function (suc) {
          let src = suc.biz_result;
          _self.specOptions = src.specList;
          _self.locationOptions = src.localList;
        }).catch(function (err) {
          _self.specOptions = [{
            'name': '不限'
          }];
          _self.locationOptions = [{
            'name': '不限'
          }];

        })
      },
      querySearchAsync(queryString, cb) {
        let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
        if (!pattern.test(queryString)) {
          cb([{
            value: '请输入关键字',
            keyWord: ''
          }]);
          return;
        }
        ;
        let _self = this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          common.commonPost(common.urlCommon + common.apiUrl.most, {
            biz_module: 'searchKeywordService',
            biz_method: 'querySearchKeywordBreed',
            biz_param: {
              keyWord: queryString,
              pn: 1,
              pSize: 20
            }
          }).then(function (suc) {
            let src = suc.biz_result.list;
            for (var i = 0; i < src.length; i++) {
              let obj = src[i];
              obj.label = obj.keyWord + '（' + obj.breedName + '）';
              obj.value = obj.breedName;
              cb(suc.biz_result.list);
            }
            ;
          }).catch(function (err) {
            cb([{
              value: '请输入关键字',
              keyWord: ''
            }]);
          });
        }, 300);
      },
      getNeedDetail(id) {
        let _self = this;
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
          biz_module: 'intentionService',
          biz_method: 'queryIntentionInfo',
          biz_param: {
            id: id
          }
        };
        url = common.addSID(url);
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body)
          .then(function (res) {
            _self.loading = false;
            if (res.code == '1c01') {
              let data = res.biz_result;
              _self.ruleForm.breedName = data.breedName;
              _self.ruleForm.breedId = data.breedId;
              _self.ruleForm.spec = data.spec;
              _self.ruleForm.location = data.locationId;
              _self.ruleForm.number = data.number;

              let date = _self.getDate(data.duedate);
              if (date != 7 && date != 15 && date != 30) {
                _self.ruleForm.duedate = -1;
                _self.duedate = date;
              } else {
                _self.ruleForm.duedate = date;
              }

              //处理编辑质量要求
              let arr = data.quality.split(',');
              let result = [];
              arr.forEach((item) => {
                for (var i = 0; i < _self.qualitys.length; i++) {
                  if (item === _self.qualitys[i].label) {
                    result.push(item);
                  }
                }
              });
              //处理编辑质量要求
              _self.ruleForm.quality = result;

              if (data.description != '') {
                _self.ruleForm.description = data.description.split(',');
              } else {
                _self.ruleForm.description = [];
              }

              // _self.ruleForm.address = _self.constructor.filter('countAddressStr')(data.address);

              // _self.getEditPayment(data.paymentWay);
              // _self.paymentWay = '';

              _self.otherdes = data.description;
              //地址Id
              _self.ruleForm.province = data.provinceId;
              _self.ruleForm.city = data.cityId;
              _self.ruleForm.district = data.districtId;
              if (_self.ruleForm.province != '') _self.ruleForm.PCD.push(_self.ruleForm.province);
              if (_self.ruleForm.city != '') _self.ruleForm.PCD.push(_self.ruleForm.city);
              if (_self.ruleForm.district != '') _self.ruleForm.PCD.push(_self.ruleForm.district);

              _self.ruleForm.customerName = data.customerName;
              _self.ruleForm.customerPhone = data.customerPhone;
              for (var i = 0; i < _self.unit.length; i++) {
                let obj = _self.unit[i];
                if (obj.name === data.unit) {
                  _self.ruleForm.unit = obj.id;
                  break;
                }
              }
              _self.ruleForm.id = id;
              _self.locationOptions.push({
                name: data.location,
                locationId: data.locationId,
                breedId: data.breedId
              });
              _self.getLocalSpecList(data.breedId);
            }
          })
          .catch(function (err) {
            _self.loading = false;
          })
      },
      getDate(myDate) {
        myDate = myDate.split('.')[0];
        let toDay = new Date();
        toDay = toDay.getTime();

        let due = new Date(myDate);
        let duedate = due.getTime();

        let time = duedate - toDay;
        let day = Math.ceil(time / (1000 * 3600 * 24));
        return day;
      },
      getCity() {
        function sortArr(item) {
          console.log(item)
          item.label = item.cname;
          // item.value = item.cname; //取文本情况
          item.value = item.id;
          if (item.childList.length > 0) item.children = item.childList;
          if (item.childList.length > 0) item.children.forEach(function (childItem) {
            sortArr(childItem);
          })
        }

        let _self = this;
        common.commonPost(common.urlCommon + common.apiUrl.most, {
          biz_module: 'locationService',
          biz_method: 'queryLocationList',
          biz_param: {}
        }).then(function (suc) {
          suc.biz_result.list.forEach(function (item) {
            sortArr(item);
          });
          _self.$store.dispatch('sch_getCityList', suc.biz_result.list);
        }).catch(function (err) {
          _self.$store.dispatch('sch_getCityList', []);
        })
      },
    }
  }
</script>
