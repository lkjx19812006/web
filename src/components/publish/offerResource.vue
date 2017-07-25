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
      <el-form-item label="产品" prop="breedName">
        <!-- <breed v-model="ruleForm.breedName" v-on:getBreedId="getBreedId"></breed> -->
        <mySelect v-model="ruleForm.breedName" style="width: 380px;" placeholder="请输入您需要的产品名称"
                  v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></mySelect>
      </el-form-item>
      <el-form-item label="规格" prop="spec">
        <!-- <el-autocomplete style="width: 380px;" class="inline-input" v-model="ruleForm.spec" :fetch-suggestions="querySearchSpec" placeholder="请输入内容"></el-autocomplete> -->
        <el-select v-model="ruleForm.spec" placeholder="请选择规格">
          <el-option v-for="item in specOptions" :label="item.name" :value="item.name" :key="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="location">
        <!-- <el-autocomplete style="width: 380px;" class="inline-input" v-model="ruleForm.location" :fetch-suggestions="querySearchLocation" placeholder="请输入内容"></el-autocomplete> -->
        <el-select v-model="ruleForm.location" placeholder="请选择产地">
          <el-option v-for="item in locationOptions" :label="item.name" :value="item.locationId" :key="item.locationId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <template>
          <el-input type="number" v-model.number="ruleForm.number" placeholder="请输入数量">
            <el-select style="width: 120px;" v-model.number="ruleForm.unit" slot="append" placeholder="请选择单位">
              <el-option v-for="item in unit" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-input>
        </template>
      </el-form-item>
      <el-form-item label="销售价格" prop="price">
        <template>
          <el-input type="number" v-model.number="ruleForm.price" placeholder="请输入销售价格">
            <el-select style="width: 120px;" v-model.number="ruleForm.unit" slot="append" placeholder="请选择单位">
              <el-option v-for="item in unit" :label="item.priceLable" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-input>
        </template>
      </el-form-item>
      <!--  <el-form-item label="交货地" v-if="false">
          <el-cascader v-model="ruleForm.address" placeholder="请输入城市" :options="citys" filterable></el-cascader>
      </el-form-item> -->
      <el-form-item label="货物图片" prop="image">
        <div class="img_div">
          <div class="imgUpload_btn" @click="showImgDialog">上传图片</div>
        </div>
        <ul class="img_items" v-show="ruleForm.editImage.length > 0">
          <li class="img_item" v-on:mouseenter="showModelIndex = index" v-on:mouseleave="showModelIndex = -1"
              :key="index" v-for="(item, index) in ruleForm.editImage">
            <img :src="item" alt="">
            <div class="model" v-show="index === showModelIndex">
              <a :href="item" target="_blank" class="el-icon-view"></a>
              <span @click="deleteImg(index)" class="el-icon-delete2"></span>
            </div>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="是否提供样品">
        <el-radio-group v-model="ruleForm.sampling">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="样品数量" prop="sampleNumber" v-if="ruleForm.sampling=='1'">
        <el-input type="number" v-model.number="ruleForm.sampleNumber" placeholder="请输入样品数量">
          <el-select style="width: 120px;" v-model="otherUnit" slot="append" placeholder="请选择单位">
            <el-option label="份" value="66"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="样品价格" prop="sampleAmount" v-if="ruleForm.sampling=='1'">
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
      <!--   <el-form-item label="姓名" prop="customerName">
          <el-input v-model="ruleForm.customerName" :placeholder="user.fullname"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="customerPhone">
          <el-input v-model="ruleForm.customerPhone" :placeholder="user.phone"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" size="large" class="orange_button" @click="offer('ruleForm')">提交</el-button>
      </el-form-item>
      <el-dialog v-on:close="closeImgUploade" title="上传图片" class="imgUploade" v-model="imgUploadeDialog" size="tiny">
        <div class="imgUploade_wrap">
          <div class="img_wrap">
            <img src="../../assets/images/imgIcon.jpg" height="80" width="140">
          </div>
          <div class="btn_wrap">
            <imgUpload :param="ruleForm.editImage" v-on:postUrl="getImgUrl"></imgUpload>
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
  export default {
    data() {
      function validateAddress(rule, value, callback) {
        if (!value.length) {
          return callback(new Error('请选择地址'));
        } else {
          callback();
        }
      }

      return {
        ruleForm: {
          breedName: '',
          spec: '',
          location: '',
          locationId: '',
          number: '',
          price: '',
          quality: '',
          customerName: '',
          customerPhone: '',
          customerId: '',
          breedId: '',
          unit: '',
          address: [],
          sampling: 1,
          editImage: [],
          descriptions: '',
          sampleNumber: '',
          sampleAmount: '',
          duedate: 30,
          sampleUnit: '66',
          id: ''
        },
        title: '资源发布成功',
        dialogMsg: false,
        timer: '',
        imgUploadeDialog: false,
        showModelIndex: -1,
        sampleUnit: [{
          name: '份',
          id: '66'
        }],
        search: {
          type: '0',
          value: ''
        },
        otherUnit: '66',
        otherPrice: '66',
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
          number: [{
            required: true,
            pattern: /^[0-9]*[1-9][0-9]*$/,
            message: '请输入正整数',
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
            trigger: 'blur, change'
          }],
          sampleNumber: [{
            required: true,
            pattern: /^[0-9]*[1-9][0-9]*$/,
            message: '请输入正整数',
            trigger: 'blur'
          }],
          address: [{
            validator: validateAddress,
            trigger: 'blur'
          }]

        },
        unit: [],
        specOptions: [],
        locationOptions: [],
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
        this.getResDetail(this.$route.params.id);
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user
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
        this.$store.dispatch('setUrl', '/publish/resource').then(() => {
          this.$router.push('/login');
        });
      }
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
      //     for (var i = 0; i < this.locationOptions.length; i++) {
      //         let obj = this.locationOptions[i];
      //         obj.value = obj.name;
      //     };
      //     var results = queryString ? this.locationOptions.filter(this.createFilter(queryString)) : this.locationOptions;
      //     cb(results);
      // },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      closeMsg() {
        this.$router.push('/member/myResource');
      },
      getImgUrl(val) {
        this.ruleForm.editImage.push(val.url);
        this.imgUploadeDialog = false;
      },
      deleteImg(index) {
        this.$confirm('确定删除该图片吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ruleForm.editImage.splice(index, 1);
        }).catch(() => {
        });
      },
      handleSelect(params) {
        this.ruleForm.breedName = params.breedName;
        this.ruleForm.breedId = params.breedId;
        if (params.breedId) {
          this.getLocalSpecList(params.breedId);
        }
      },
      showImgDialog() {
        if (this.ruleForm.editImage.length >= 5) {
          this.$message({
            showClose: false,
            type: 'warning',
            message: '最多可上传5张图片！！！'
          });
          return;
        }
        this.imgUploadeDialog = true;
      },
      closeImgUploade() {
        this.imgUploadeDialog = false;
      },
      offerSubmit() {
        let _self = this;
        let arr = [];
        let count = _self.ruleForm.editImage.length;
        if (count <= 0) {
          this.$message({
            showClose: false,
            message: '请至少上传一张图片'
          });
          return;
        }

        this.$emit('showLoad', true);
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'intentionService',
          biz_method: 'editSupplyInfo',
          biz_param: {
            breedName: _self.ruleForm.breedName,
            spec: _self.ruleForm.spec,
            location: _self.ruleForm.location,
            number: _self.ruleForm.number,
            price: _self.ruleForm.price,
            quality: _self.ruleForm.quality,
            customerName: _self.ruleForm.customerName,
            customerPhone: _self.ruleForm.customerPhone,
            customerId: _self.user.id,
            breedId: _self.ruleForm.breedId,
            unit: _self.ruleForm.unit,
            address: _self.ruleForm.address[0] + _self.ruleForm.address[1] + _self.ruleForm.address[2],
            sampling: _self.ruleForm.sampling,
            editImage: _self.ruleForm.editImage,
            descriptions: _self.ruleForm.descriptions,
            sampleNumber: _self.ruleForm.sampleNumber,
            sampleAmount: _self.ruleForm.sampleAmount,
            duedate: _self.ruleForm.duedate,
            sampleUnit: _self.ruleForm.sampleUnit
          }
        }
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body).then(function (suc) {
          _self.$emit('showLoad', false);
          _self.title = '资源发布成功';
          _self.dialogMsg = true;
        }).catch(function (err) {
          _self.$emit('showLoad', false);
        })

      },
      resive() {
        let _self = this;
        let arr = [];
        let count = _self.ruleForm.editImage.length;
        if (count <= 0) {
          this.$message({
            showClose: false,
            message: '请至少上传一张图片'
          });
          return;
        }

        this.$emit('showLoad', true);
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'intentionService',
          biz_method: 'updateEditSupplyInfo',
          biz_param: {
            breedName: _self.ruleForm.breedName,
            spec: _self.ruleForm.spec,
            location: _self.ruleForm.location,
            number: _self.ruleForm.number,
            price: _self.ruleForm.price,
            quality: _self.ruleForm.quality,
            customerName: _self.ruleForm.customerName,
            customerPhone: _self.ruleForm.customerPhone,
            customerId: _self.user.id,
            breedId: _self.ruleForm.breedId,
            unit: _self.ruleForm.unit,
            address: _self.ruleForm.address[0] + _self.ruleForm.address[1] + _self.ruleForm.address[2],
            sampling: _self.ruleForm.sampling,
            editImage: _self.ruleForm.editImage,
            descriptions: _self.ruleForm.descriptions,
            sampleNumber: _self.ruleForm.sampleNumber,
            sampleAmount: _self.ruleForm.sampleAmount,
            duedate: _self.ruleForm.duedate,
            sampleUnit: _self.ruleForm.sampleUnit,
            id: _self.ruleForm.id
          }
        }
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body).then(function (suc) {
          _self.$emit('showLoad', false);
          _self.title = '资源修改成功'
          _self.dialogMsg = true;
          // clearTimeout(_self.timer);
          // _self.timer = setTimeout(() => {
          //     _self.dialogMsg = false;
          // }, 2000);
        }).catch(function (err) {
          _self.$emit('showLoad', false);
        })

      },
      offer(formName) {
        let _self = this;
        if (!this.ruleForm.customerName) this.ruleForm.customerName = this.user.fullname;
        if (!this.ruleForm.customerPhone) this.ruleForm.customerPhone = this.user.phone;
        if (!this.ruleForm.customerId) this.ruleForm.customerId = this.user.id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _self.$confirm('确定提交表单吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              if (!_self.ruleForm.id) _self.offerSubmit();
              if (_self.ruleForm.id) _self.resive();
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
          _self.citys = suc.biz_result.list;
        }).catch(function (err) {
        })
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
          for (var i = 0; i < suc.biz_result.list.length; i++) {
            let obj = suc.biz_result.list[i];
            obj.priceLable = '元/' + obj.name;
          }
          ;
          _self.unit = suc.biz_result.list;
          if (!_self.$route.params.id) {
            _self.ruleForm.unit = _self.unit[2].id;
          }
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
            breedId: breedId,
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
            'name': '不限',
            'locationId': -1,
            'breedId': -1
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
              obj.value = obj.breedName;
              obj.label = obj.keyWord + '（' + obj.breedName + '）';
            }
            ;
            cb(suc.biz_result.list);
          }).catch(function (err) {
            cb([{
              value: '请输入关键字',
              keyWord: ''
            }]);
          });
        }, 300);
      },
      getResDetail(id) {
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
              console.log(data);
              _self.ruleForm.breedName = data.breedName;
              _self.ruleForm.spec = data.spec;
              _self.ruleForm.location = data.locationId;
              _self.ruleForm.number = data.number;
              _self.ruleForm.price = Number(data.price);
              _self.ruleForm.quality = data.quality;
              _self.ruleForm.customerName = data.customerName;
              _self.ruleForm.customerPhone = data.customerPhone;
              _self.ruleForm.breedId = data.breedId;
              for (var i = 0; i < _self.unit.length; i++) {
                let obj = _self.unit[i];
                if (obj.name === data.unit) {
                  _self.ruleForm.unit = obj.id;
                  break;
                }
              }
              _self.ruleForm.sampling = data.sampling;
              _self.ruleForm.editImage = data.image;
              _self.ruleForm.sampleNumber = data.sampleNumber;
              _self.ruleForm.sampleAmount = data.sampleAmount;
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
          });

      },
    }
  }
</script>
