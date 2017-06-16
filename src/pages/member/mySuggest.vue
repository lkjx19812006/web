<style lang="less" scoped>
.my_suggest {
    .content {
        margin-top: 30px;
        .lookDetail {
            color: #079946;
            cursor: pointer;
        }
        .orange {
            color: #FB975C;
            cursor: pointer;
        }
    }
    .suggest_con {
        min-height: 280px;
        font-size: 15px;
        line-height: 25px;
        .buttom {
            width: 100px;
            color: #fff;
            background-color: #FB8432;
            font-size: 20px;
            height: 40px;
            line-height: 40px;
            margin: 20px auto 0 auto;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .block {
        float: right;
        margin-top: 20px;
    }
}
</style>
<template>
    <div class="my_suggest">
        <titleHead :param="myhead"></titleHead>
        <div class="content">
            <el-table :data="mySuggest.list" border style="width: 100%">
                <el-table-column label="留言日期">
                    <template scope="scope">
                        <span>{{scope.row.utime | formatBirth}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="留言类型">
                    <template scope="scope">
                        <span v-show='scope.row.type == 0'>委托找货</span>
                    </template>
                </el-table-column>
                <el-table-column label="留言内容">
                    <template scope="scope">
                        <span>{{scope.row.content, 30 | filterTxt}}</span>
                        <br><span class='lookDetail' @click='lookDetail(scope.row)'><查看详情></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <span class='orange' @click='dete(scope.row.id)'>删除</span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                        <span class='orange' @click='resivePop(scope.row)'>编辑</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog v-model="edit" size="tiny" title="留言内容">
            <div class='suggest_con'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{pop_text}}</div>
        </el-dialog>
        <el-dialog v-model="revise_edit" size="tiny" title="修改留言">
            <div class='suggest_con'>
                <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="revise_text">
                </el-input>
                <div class='buttom' @click='revise'>确定</div>
            </div>
        </el-dialog>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="mySuggest.total" :page-size="10" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import common from '../../common/httpService.js'
import titleHead from '../../components/common/headTitle'
export default {
    name: 'my-suggest-view',
    data() {
        return {
            suggestParam: {
                pn: 1,
                pSize: 10
            },
            myhead: {
                name: '我的留言'
            },
            textarea: '',
            loading: false,
            pop_text: '',
            revise_text: '',
            edit: false,
            revise_edit: false,
            id: ''
        }
    },
    computed: {
        mySuggest() {
            return this.$store.state.user.mySuggest;
        }
    },
    components: {
        titleHead
    },
    mounted() {
        this.getHttp();
    },
    methods: {
        getHttp() {
            let _self = this;
            _self.loading = true;
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'queryIntentionMsg',
                biz_param: _self.suggestParam
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            this.$store.dispatch('getSuggest', {
                body: body,
                path: url
            }).then(() => {
                _self.loading = false;
            }, () => {
                _self.loading = false;
            })
        },
        lookDetail(row) {
            let _self = this;
            _self.edit = true;
            _self.pop_text = row.content;
        },
        dete(id) {
            let _self = this;
            function deteSuggest() {
                _self.loading = true;
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'deleteIntentionMsg',
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
                    .then(function(res) {
                        _self.loading = false;
                        if (res.code == '1c01') {
                            _self.getHttp();
                            _self.$message({
                                type: 'success',
                                message: '删除留言成功'
                            });
                        }
                    })
                    .catch(function(err) {
                        _self.loading = false;
                    })
            }
            this.$confirm('确定删除此留言?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                deteSuggest();
            }).catch(() => {
                _self.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        resivePop(row) {
            let _self = this;
            _self.revise_edit = true;
            _self.revise_text = row.content;
            _self.id = row.id;
        },
        revise() {
            let _self = this;
            this.$confirm('确定修改留言?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.revise_edit = false;
                _self.confirm();
            }).catch(() => {
                _self.revise_edit = false;
                _self.$message({
                    type: 'info',
                    message: '已取消修改'
                });
            });
        },
        handleCurrentChange(val) {
            this.suggestParam.pn = val;
            this.getHttp();
        },
        confirm() {
            let _self = this;
            _self.loading = true;
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'updateIntentionMsg',
                biz_param: {
                    id: _self.id,
                    content: _self.revise_text
                }
            };
            url = common.addSID(url);
            body.version = 1;
            let localTime = new Date().getTime();
            body.time = localTime + common.difTime;
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            common.commonPost(url, body)
                .then(function(res) {
                    _self.loading = false;
                    if (res.code == '1c01') {
                        _self.getHttp();
                        _self.$message({
                            type: 'success',
                            message: '修改留言成功'
                        });
                    }
                })
                .catch(function(err) {
                    _self.loading = false;
                })
        }

    }
}
</script>
