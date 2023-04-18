<template>
  <div class="qd-filter" :class="className">
    <!-- <div class="filter-tips">筛选条件：</div> -->
    <div
      v-for="(item, index) in filterList"
      :key="index"
      class="filter-item"
      :class="getClass(item.fieldType)"
    >
      <!-- 输入框 -->
      <label v-if="item.label_lds" class="filterLabel">{{ item.value }}</label>
      <el-input
        v-if="item.fieldType === 'text'"
        v-model="searchQuery[item.key]"
        class="filter-text"
        :type="item.fieldType"
        size="medium"
        :clearable="true"
        :placeholder="getPlaceholder(item)"
        @keyup.enter.native="handleClick('search')"
        @change="$forceUpdate()"
      ></el-input>

      <!-- 选择框 -->
      <el-select
        size="medium"
        v-if="item.fieldType === 'select'"
        v-model="searchQuery[item.key]"
        class="filter-select"
        :clearable="true"
        :filterable="true"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, searchQuery[item.key])"
      >
        <el-option
          v-for="(childItem, childIndex) in listTypeInfo[item.key]"
          :key="childIndex"
          :label="childItem.label"
          :value="childItem.value"
        />
      </el-select>

      <!-- date  -->
      <el-date-picker
        size="medium"
        v-if="dateTypeArr.indexOf(item.fieldType) > -1"
        v-model="searchQuery[item.key]"
        class="filter-date"
        :value-format="item.format ? item.format : 'timestamp'"
        :picker-options="item.datePickerOptions || datePickerOptions"
        :start-placeholder="`${item.value1}`"
        :end-placeholder="`${item.value2}`"
        :type="item.fieldType"
        :clearable="true"
        :validate-event="false"
        :placeholder="getPlaceholder(item)"
        @focus="handleEvent(item.event)"
      />

      <!-- 下拉级联 -->
      <el-cascader
        size="medium"
        v-if="isCascader(item.fieldType)"
        v-model="searchQuery[item.key]"
        clearable
        class="filter-cascader"
        :options="options[item.key]"
        :placeholder="getPlaceholder(item)"
        :filterable="true"
        :props="{
          lazy: true,
          checkStrictly: item.checkStrictly ? item.checkStrictly : true,
          lazyLoad: cascaderChildrenFn(item),
        }"
        @change="handleEvent"
      />
    </div>

    <template v-if="filterList.length">
      <!-- 按钮 -->
      <el-button
        v-if="search_lds"
        size="medium"
        class="filter-btn"
        @click="handleClick('search')"
        style="background: #1f6bff; color: white"
        >搜索</el-button
      >
      <el-button
        v-if="daoMessage"
        size="medium"
        class="filter-btn"
        icon="el-icon-download"
        type="primary"
        @click="handleDao"
        style="margin-bottom: 15px"
        >导出</el-button
      >
      <el-button
        v-if="search_lds_set"
        size="medium"
        class="filter-btn"
        type="cancel"
        icon="el-icon-reset"
        @click="handleClick('search-reset')"
        >重置</el-button
      >
    </template>
  </div>
</template>

<script src="./index.js">
</script>
<style lang="scss">
// 自定义过滤相关
.qd-filter {
  padding-bottom: 5px;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  .filter-btn {
    // background-image: linear-gradient(#70b0ff, #0b5ed7);
    border: none;
    color: #FFF;
    background-color: #409EFF;
  }
  .timewidth {
    // width: 474px !important;
  }
  .selectwidth {
    width: 290px !important;
  }
  .filter-item {
    // display: inline-flex;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-right: 10px;
    width: 320px;
    .el-range-editor--small .el-range-separator {
      line-height: 32px;
    }
    label {
      text-align: left !important;
    }
  }
  .filter-tips {
    display: inline-flex;
    width: 70px;
    font-size: 14px;
  }

  .filter-label {
    padding-right: 5px;
    font-size: 14px;
    color: #606266;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .filter-text,
  .filter-time,
  .filter-datetime {
    display: block;
    width: 250px !important;

    &.el-input--suffix .el-input__inner {
      padding-right: 8px;
      background: #001d4c;
      border: 1px solid #124d78;
      color: #124d78 !important;
    }
    .el-input__inner {
      border-radius: 2px;
      border: 1px solid #124d78 !important;
    }
  }

  .filter-select {
    width: 100%;
  }

  .el-button {
    margin-right: 12px;
    border-radius: 2px;
    height: 100%;
  }

  .el-button + .el-button {
    margin-left: 0;
  }
}
.filterLabel {
  white-space: nowrap;
  margin-right: 10px;
  color: white;
  font-size: 14px;
  text-align: center;
}
input::-webkit-input-placeholder {
  color: #124d78 !important;
  border: 1px solid #124d78;
}
input::-moz-input-placeholder {
  color: #124d78 !important;
  border: 1px solid #124d78;
}
input::-ms-input-placeholder {
  color: #124d78 !important;
  border: 1px solid #124d78;
}
.el-select-dropdown {
  border: 1px solid #124d78 !important;
}
</style>
