<style scoped>
  .personal_infor {
    position: relative;
  }

  .personal_infor .title {
    font-size: 20px;
    color: #333333;
    height: 45px;
    border-bottom: 1px solid #999;
    margin-bottom: 15px;
  }

  .personal_infor .title p {
    width: 90px;
    height: 100%;
    border-bottom: 1px solid #FA8435;
  }

  .personal_infor .main {
    float: left;
    margin: 20px 0 0 90px;
    width: 500px;
  }

  .personal_infor .main .box {
    width: 500px;
    height: 42px;
    margin-bottom: 5px;
  }

  .personal_infor .edit .box {
    margin-bottom: 25px;
  }

  .personal_infor .main .box .name {
    width: 140px;
    float: left;
    text-align: right;
    color: #6B6B6B;
    line-height: 36px;
  }

  .personal_infor .main .box .content {
    width: 360px;
    float: left;
  }

  .personal_infor .main .box .special {
    width: 360px;
    float: left;
    padding-top: 7px;
  }

  .personal_infor .main .box .tcontent {
    width: 360px;
    box-sizing: border-box;
    float: left;
    /*border: 1px solid #ccc;*/
    min-height: 36px;
    border-radius: 4px;
    padding-left: 12px;
    padding: 11px 0 11px 12px;
    font-size: 14px;
    line-height: 18px;
  }

  .personal_infor .main .editor {
    box-sizing: border-box;
    width: 360px;
    height: 40px;
    background-color: #FA8435;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
    font-size: 16px;
    color: white;
    margin-top: 30px;
    margin-left: 140px;
    cursor: pointer;
  }
</style>
<template>
  <div class="personal_infor">
    <titleHead :param="myhead"></titleHead>
    <!-- 展示页面 -->
    <div class="main" v-if="!show">
      <div class="box">
        <div class="name">姓名：</div>
        <!--认证通过显示 name-->
        <div class="tcontent">
          {{user.utype === 2 ? user.name : user.fullname}}
        </div>
      </div>
      <div class="box">
        <div class="name">生日：</div>
        <div class="tcontent">
          {{user.birthday | myBirth}}
        </div>
      </div>
      <div class="box">
        <div class="name">性别：</div>
        <div class="tcontent">
          {{user.gender}}
        </div>
      </div>
      <div class="box">
        <div class="name">手机：</div>
        <div class="tcontent">
          {{user.phone}}
        </div>
      </div>
      <!--<div class="box">-->
      <!--<div class="name">邮箱：</div>-->
      <!--<div class="tcontent">-->
      <!--{{user.email}}-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="box">-->
      <!--<div class="name">固话：</div>-->
      <!--<div class="tcontent">-->
      <!--{{user.tel}}-->
      <!--</div>-->
      <!--</div>-->
      <div class="box">
        <div class="name">主营品类：</div>
        <div class="tcontent">
          {{user.bizMain}}
        </div>
      </div>
      <div class="box">
        <div class="name">买卖性质：</div>
        <div class="tcontent">
          {{getUserType(user.userType)}}
        </div>
      </div>
      <div class="box">
        <div class="name">经营类型：</div>
        <div class="tcontent">
          {{getManageType(user.manageType)}}
        </div>
      </div>
      <div class="box">
        <div class="name">个人认证：</div>
        <div class="tcontent">
          <span v-if="user.utype === 0">未申请</span>
          <span v-if="user.utype === 1">审核中</span>
          <span v-if="user.utype === 2">已认证</span>
          <span v-if="user.utype === 3">未通过</span>
        </div>
      </div>
      <div class="box">
        <div class="name">公司名称：</div>
        <div class="tcontent">
          {{user.company}}
        </div>
      </div>
      <div class="box">
        <div class="name">企业认证：</div>
        <div class="tcontent">
          <span v-if="user.ctype === 0">未申请</span>
          <span v-if="user.ctype === 1">审核中</span>
          <span v-if="user.ctype === 2">已认证</span>
          <span v-if="user.ctype === 3">未通过</span>
        </div>
      </div>
      <!--<div class="box">-->
      <!--<div class="name">地址：</div>-->
      <!--<div class="tcontent">-->
      <!--{{user.address}}-->
      <!--</div>-->
      <!--</div>-->
      <div class="editor" @click="modify(user)">编辑修改</div>
    </div>
    <!--  编辑页面 -->
    <div class="main edit" v-if="show">
      <div class="box">
        <div class="name">姓名：<span style="color: red">（必填）</span></div>
        <div class="content">
          <!--完成个人认证通过后 不让编辑-->
          <el-input :disabled="user.utype === 2" v-model="user.utype === 2?user.name:formDate.fullname"
                    placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="box">
        <div class="name">生日：</div>
        <div class="content">
          <el-date-picker v-model="formDate.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="box">
        <div class="name">性别：</div>
        <div class="special">
          <el-radio class="radio" v-model="formDate.gender" :label="1">男</el-radio>
          <el-radio class="radio" v-model="formDate.gender" :label="0">女</el-radio>
        </div>
      </div>
      <div class="box">
        <div class="name">手机：<span style="color: red">（必填）</span></div>
        <div class="content">
          <el-input v-model="formDate.phone" placeholder="请输入" :disabled="true"></el-input>
        </div>
      </div>
      <!--<div class="box">-->
      <!--<div class="name">邮箱：</div>-->
      <!--<div class="content">-->
      <!--<el-input v-model="formDate.email" placeholder="请输入"></el-input>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="box">-->
      <!--<div class="name">固话：</div>-->
      <!--<div class="content">-->
      <!--<el-input v-model="formDate.tel" placeholder="请输入"></el-input>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="box">-->
      <!--<div class="name">公司名称：</div>-->
      <!--<div class="content">-->
      <!--<el-input v-model="formDate.company" placeholder="请输入"></el-input>-->
      <!--</div>-->
      <!--</div>-->
      <div class="box">
        <div class="name">主营品类：<span style="color: red">（必填）</span></div>
        <div class="content">
          <el-select :disabled="true" v-model="formDate.bizMain" :multiple-limit="10" multiple filterable remote
                     placeholder="请输入关键词" :remote-method="querySearchAsync" :loading="loading">
            <el-option v-for="item in optionsList" :key="item.value" :label="item.breedName" :value="item.breedName">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="box">
        <div class="name">买卖性质：<span style="color: red">（必选）</span></div>
        <div class="content" style="line-height: 36px">
          <el-radio-group :disabled="true" @change="changeRadio" v-model="formDate.userType">
            <el-radio :label="1">我是买方</el-radio>
            <el-radio :label="2">我是卖方</el-radio>
            <el-radio :label="3">我是买卖方</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="box" style="width: 960px;">
        <div class="name">经营类型：<span style="color: red">（必选）</span></div>
        <div class="content" style="line-height: 36px; height: auto; min-height: 36px; width: 760px;">
          <el-radio-group :disabled="true" v-model="formDate.manageType">
            <el-radio :label="item.id" v-for="item in userTypeMap" :key="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>

      <!--<div class="box">-->
      <!--<div class="name">地址：</div>-->
      <!--<div class="content">-->
      <!--<el-input v-model="formDate.address" placeholder="请输入"></el-input>-->
      <!--</div>-->
      <!--</div>-->
      <div class="editor" @click="confirm">保存修改</div>
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService.js'
  import validation from '../../validation/validation.js'
  import titleHead from '../../components/common/headTitle'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'personal-infor-view',
    data() {
      return {
        loading: false,
        optionsList: [],
        formDate: {
          fullname: '',
          birthday: '',
          userType: '',
          manageType: '',
          gender: 1,
          email: '',
          tel: '',
          company: '',
          bizMain: [],
          address: '',
          phone: ''
        },
        show: false,
        myhead: {
          name: '个人信息'
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user;
      },
      userTypeMap() {
        return this.$store.state.user.userTypeMap;
      }

    },
    components: {
      titleHead
    },
    created() {
      if (!common.validateUserInfo(this.user, () => {
        })) {
        this.$router.push('/register');
        return;
      }
      // /member/personalInformation
    },
    mounted() {
      this.getHttp();
      this.getInfoList();
    },
    methods: {
      getUserType(params) {
        let str = '';
        switch (params) {
          case 1:
            str = '我是买方';
            break;
          case 2:
            str = '我是卖方';
            break;
          case 3:
            str = '我是买卖方';
            break;
          default:
            str = '暂未选择';
            break;
        }
        return str;
      },
      getManageType(params) {
        for (var i = 0; i < this.userTypeMap.length; i++) {
          if (params === this.userTypeMap[i].id) {
            return this.userTypeMap[i].name;
          }
        }
        return '暂未选择';
      },
      modify: function (user) {
        let _self = this;
        if (user.gender == '男') {
          _self.formDate.gender = 1;
        } else if (user.gender == '女') {
          _self.formDate.gender = 0;
        }

        _self.formDate.fullname = user.fullname;
        _self.formDate.phone = user.phone;
        _self.formDate.birthday = user.birthday * 1000;
        _self.formDate.userType = user.userType;
        this.getInfoList()

        _self.formDate.manageType = user.manageType;
        //console.log(11,_self.formDate.birthday);
        _self.formDate.company = user.company;
        _self.formDate.bizMain = user.bizMain === '' ? [] : user.bizMain.split(',');
        _self.formDate.tel = user.tel;
        _self.formDate.email = user.email;
        _self.formDate.address = user.address;
        _self.show = true;

        console.log(_self.formDate.gender)
      },
      getHttp() {
        let _self = this;
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'userService',
          biz_method: 'queryUserInfo',
          biz_param: {}
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
      confirm() {
        this.submit();
      },
      getTimeStamp(str) {
        var date = new Date(str / 1000);
        return date.getTime();
      },
      submit() {
        let _self = this;
        console.log(1, _self.formDate.birthday);
        let birthday = _self.getTimeStamp(_self.formDate.birthday);
        //console.log(2,birthday);
        let gender = "男";
        if (_self.formDate.gender == 1) {
          gender = "男";
        } else {
          gender = "女";
        }
        this.loading = true;
        //校验身份信息
        if (_self.formDate.userType === 0) {
          _self.$message({
            type: 'warning',
            message: '请选择身份信息！！！'
          });
          return
        }

        let bizMain = this.formDate.bizMain.join(',');
        //校验身份具体信息
        let flag = true;
        for (var i = 0; i < this.userTypeMap.length; i++) {
          if (this.formDate.manageType === this.userTypeMap[i].id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          _self.$message({
            type: 'warning',
            message: '请选择具体身份信息！！！'
          });
          return
        }
        ;
        if (bizMain == '') {
          _self.$message({
            type: 'info',
            message: '请填写主营品种'
          });
          return;
        }
        ;

        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'userService',
          biz_method: 'updateUserInfo',
          biz_param: {
            gender: gender,
            fullname: _self.formDate.fullname,
            phone: _self.formDate.phone,
            birthday: birthday,
            company: _self.formDate.company,
            userType: _self.formDate.userType,
            manageType: _self.formDate.manageType,
            bizMain: bizMain,
            tel: _self.formDate.tel,
            email: _self.formDate.email,
            address: _self.formDate.address
          }
        };
        url = common.addSID(url);
        console.log(url)
        body.version = 1;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body)
          .then(function (res) {
            if (res.code == '1c01') {
              _self.getHttp();
              _self.$message({
                type: 'success',
                message: '修改成功'
              });
            }
            _self.loading = false;
            _self.show = false;
          })
          .catch(function (err) {
            _self.loading = false;
          })

      },
      querySearchAsync(queryString) {
        if (queryString !== '') {
          this.loading = true;
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
              _self.loading = false;
              _self.optionsList = suc.biz_result.list;
            }, () => {
              _self.loading = false;
            });
          }, 300);
        } else {
          this.optionsList = [];
        }
      },
      changeRadio(val) {
        this.getInfoList();
      },
      getInfoList() {
        let _self = this;
        let userType = '';
        if (this.formDate.userType === '') {
          userType = 0;
        } else {
          if (this.formDate.userType === 0) {
            userType = 1;
          } else {
            userType = this.formDate.userType;
          }

        }
        ;
        let url = common.urlCommon + common.apiUrl.most
        let body = {
          biz_module: 'userService',
          biz_method: 'queryCustomerTypeMap',
          biz_param: {
            userType: userType
          }
        }
        url = common.addSID(url);
        body.version = 1;
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        this.$store.dispatch('getUserTypeMap', {
          path: url,
          body: body
        }).then(() => {

        }, () => {
        })
      }

    }
  }
</script>
