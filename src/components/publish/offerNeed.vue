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
    }
  }
</style>
<template>
  <div class="offer">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品" prop="breedName">
        <!-- <breed v-model="ruleForm.breedName" v-on:getBreedId="getBreedId"></breed> -->
        <search v-model="ruleForm.breedName" style="width: 380px;" placeholder="请输入您需要的产品名称"
                v-on:fetch-suggestions="querySearchAsync" v-on:select="handleSelect"></search>
      </el-form-item>
      <el-form-item label="规格" prop="spec">
        <!--  <el-autocomplete style="width: 380px;" class="inline-input" v-model="ruleForm.spec" :fetch-suggestions="querySearchSpec" placeholder="请输入内容"></el-autocomplete> -->
        <el-select v-model="ruleForm.spec" placeholder="请选择规格">
          <el-option v-for="item in specOptions" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="location">
        <!--  <el-autocomplete style="width: 380px;" class="inline-input" v-model="ruleForm.location" :fetch-suggestions="querySearchLocation" placeholder="请输入内容"></el-autocomplete> -->
        <el-select v-model="ruleForm.location" placeholder="请选择产地">
          <el-option v-for="item in locationOptions" :key="item.name" :label="item.name" :value="item.locationId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input type="number" v-model.number="ruleForm.number" placeholder="请输入数量">
          <el-select style="width: 120px;" v-model="ruleForm.unit" slot="append" placeholder="请选择单位">
            <el-option :label="item.name" :value="item.id" v-for="item in unit" :key="item.id"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="求购有效期" prop="duedate">
        <el-input type="number" v-model.number="ruleForm.duedate" placeholder="请输入天数">
          <el-select style="width: 120px;" v-model="otherData" slot="append" placeholder="请选择">
            <el-option label="天" value="66"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="产品需求点">
        <el-input type="textarea" :rows="4" placeholder="请根据实际情况填写药材需求点,如需要符合药典标准，药材品质等" v-model="ruleForm.quality">
        </el-input>
      </el-form-item>
      <!--  <el-form-item label="姓名" prop="customerName">
           <el-input v-model="ruleForm.customerName" :placeholder="user.fullname"></el-input>
       </el-form-item>
       <el-form-item label="联系方式" prop="customerPhone">
           <el-input v-model="ruleForm.customerPhone" :placeholder="user.phone"></el-input>
       </el-form-item> -->
      <el-form-item>
        <el-button type="primary" size="large" class="orange_button" @click="offer('ruleForm')">提交</el-button>
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
  import search from '../../components/search.vue'
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
          duedate: '',
          quality: '',
          customerName: '',
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
      search
    },
    created() {
      this.getUnit();
      if (this.$route.params.id) {
        this.getNeedDetail(this.$route.params.id);
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user
      }
    },
    methods: {
      querySearchSpec(queryString, cb) {
        for (var i = 0; i < this.specOptions.length; i++) {
          let obj = this.specOptions[i];
          obj.value = obj.name;
        }
        ;
        var results = queryString ? this.specOptions.filter(this.createFilter(queryString)) : this.specOptions;
        cb(results);
      },
      querySearchLocation(queryString, cb) {
        for (var i = 0; i < this.locationOptions.length; i++) {
          let obj = this.locationOptions[i];
          obj.value = obj.name;
        }
        ;
        var results = queryString ? this.locationOptions.filter(this.createFilter(queryString)) : this.locationOptions;
        cb(results);
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
      offerSubmit() {
        let _self = this;
        this.$emit('showLoad', true);
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'intentionService',
          biz_method: 'editBegBuyInfo',
          biz_param: {
            breedName: _self.ruleForm.breedName,
            spec: _self.ruleForm.spec,
            location: _self.ruleForm.location,
            number: _self.ruleForm.number,
            duedate: _self.ruleForm.duedate,
            quality: _self.ruleForm.quality,
            customerName: _self.ruleForm.customerName,
            customerPhone: _self.ruleForm.customerPhone,
            customerId: _self.ruleForm.customerId,
            breedId: _self.ruleForm.breedId,
            unit: _self.ruleForm.unit
          }
        }
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body).then(function (suc) {
          _self.$emit('showLoad', false);
          _self.title = '求购发布成功'
          _self.dialogMsg = true;
        }).catch(function (err) {
          _self.$emit('showLoad', false);
        })

      },
      resive() {
        let _self = this;
        this.$emit('showLoad', true);
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'intentionService',
          biz_method: 'updateEditBegBuyInfo',
          biz_param: {
            breedName: _self.ruleForm.breedName,
            spec: _self.ruleForm.spec,
            location: _self.ruleForm.location,
            number: _self.ruleForm.number,
            duedate: _self.ruleForm.duedate,
            quality: _self.ruleForm.quality,
            customerName: _self.ruleForm.customerName,
            customerPhone: _self.ruleForm.customerPhone,
            customerId: _self.ruleForm.customerId,
            breedId: _self.ruleForm.breedId,
            unit: _self.ruleForm.unit,
            id: _self.ruleForm.id
          }
        }
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body).then(function (suc) {
          _self.$emit('showLoad', false);
          _self.title = '求购修改成功'
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
              debugger;
              console.log(_self.$route.query.operation);
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
              _self.ruleForm.duedate = _self.getDate(data.duedate);
              _self.ruleForm.quality = data.quality;
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
      }
    }
  }
</script>
