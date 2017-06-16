<style lang="less" sceopd>
.mySearch {
    width: 100%;
    position: relative;
    ul,
    li,
    input {
        list-style: none;
        padding: 0;
        margin: 0;
        outline-style: none;
    }
    input {
        display: inline-block;
        height: 36px;
        margin: auto;
        width: 100%;
        border: 1px solid #DBDBDB;
        border-radius: 4px;
        vertical-align: baseline;
        box-sizing: border-box;
        text-indent: 10px;
    }
    ul::-webkit-scrollbar {
        width: 6px;
        background-color: #fff;
    }
    ul::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 6px;
    }
    ul::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
        border-radius: 6px;
        background-color: #fff;
    }
    ul {
        padding: 5px 0;
        box-shadow: 0 0 5px #ddd;
        z-index: 99999;
        position: absolute;
        left: 0;
        top: 40px;
        max-height: 200px;
        overflow: auto;
        width: 100%;
        background-color: #FFF;
        li {
            list-style: none;
            line-height: 36px;
            padding: 0 10px;
            margin: 0;
            cursor: pointer;
            color: #48576a;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: #fff;
        }
        li:hover {
            color: #FFF;
            background-color: #FA8435;
        }
    }
}
</style>
<template>
    <div class="mySearch">
        <input type="text" v-on:focus="show()" v-on:blur="hide()" v-bind:value="value" :placeholder="placeholder" v-on:keyup="searchChange($event.target.value)">
        <ul v-show="list.length > 0 && showList">
            <li v-on:click="inputValue(item)" v-for="item in list">
                <span v-if="!!item.label  && item.label != ''">{{item.label}}</span>
                <span v-else>{{item.value}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'mySearch',
    props: {
        placeholder: '',
        value: '',
        lable: ''
    },
    data() {
        return {
            showList: false,
            isClick: false,
            val: '',
            list: []
        }
    },
    methods: {
        searchChange(params) {
            this.isClick = false;
            this.$emit('input', params);
            this.$emit('fetch-suggestions', params, this.callback);
        },
        callback(params) {
            this.list = params;
        },
        inputValue(val) {
            this.isClick = true;
            console.log(val);
            this.$emit('input', val.value);
            this.$emit('select', val);
            this.showList = false;
        },
        hide() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (!this.isClick) {
                    this.$emit('input', '');
                }
                this.showList = false;
            }, 200);
        },
        show() {
            this.showList = true;
        }
    }
}
</script>
