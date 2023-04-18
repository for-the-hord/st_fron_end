<template>
  <div class="qd-table" :class="className">
    <!-- 显示表格 -->
    <el-table
      id="qdTable"
      ref="table"
      v-loading="listInfo.loading"
      :max-height="listInfo.tableHeight || undefined"
      :data="data"
      :height="tableHeight"
      stripe
      :showClose="true"
      style="width: 100%"
      show-overflow-tooltip
      :row-class-name="rowClassName"
      @select-all="handleSelectionChange"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @deleteOk="deleteOk"
      :summary-method="getSummaries"
      :show-summary="!!listInfo.summary"
      :span-method="arraySpanMethod"
    >
      <el-table-column
        v-if="checkBox"
        :key="'selection'"
        align="center"
        type="selection"
        :selectable="selectableHandler"
        width="55"
      />
      <el-table-column
        v-if="tabIndex"
        :key="'index'"
        align="center"
        label="序号"
        class-name="tab_index"
        :width="fieldList.length === 0 ? '' : 60"
      >
        <template v-slot="scope">
          <span>
            {{ scope.$index + 1 + (listInfo.curPage - 1) * listInfo.pageSize }}
          </span>
        </template>
      </el-table-column>
      <!-- 当屏幕宽度小于1360时，可实现折叠字段功能 -->
      <!-- <el-table-column type="expand" v-if="expandShow">
                <template slot-scope="props">
                    <div class="qd-table-expand">
                        <p v-for="col in expandList" :key="col.key">
                            <label>{{col.label}}：</label>
                            <span>{{ props.row[col.key]||'-' }}</span>
                        </p>
                    </div>
                </template>
            </el-table-column> -->

      <template v-for="(item, index) in commomFieldList">
        <el-table-column
          v-if="item.type === 'label'"
          :key="index"
          :label="item.label"
        >
          <el-table-column
            v-for="(child, idx) in item.children"
            :key="idx"
            :prop="child.key"
            :label="child.label"
            align="center"
            :fixed="child.fixed"
            :show-overflow-tooltip="child.tooltip"
            :sortable="child.canSort === 1 ? 'custom' : false"
            :width="child.width || '90px'"
          >
            <template v-slot="scope">
              <!-- solt 自定义列-->
              <template v-if="child.type === 'slot'">
                <slot :name="'col-' + child.key" :row="scope.row" />
              </template>
              <!-- 嵌套表格 -->
              <template v-else-if="child.children">
                <el-table-column
                  v-for="(childItem, childIndex) in item.children"
                  :key="childIndex"
                  :prop="childItem.key"
                  :label="childItem.value"
                  align="center"
                  :width="child.width"
                  :min-width="child.minWidth || '40px'"
                ></el-table-column>
              </template>
              <!-- 标签 -->
              <el-tag v-else-if="child.type === 'tag'">{{
                scope.row[child.key]
              }}</el-tag>

              <!-- 其他 -->
              <span v-else :class="{ 'can-click': child.event }">
                {{ scope.row[child.key] || "-" }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.key"
          :label="item.label"
          :fixed="item.fixed"
          align="center"
          :sortable="item.canSort === 1 ? 'custom' : false"
          :width="item.width"
          :min-width="item.minWidth"
        >
          <template v-slot="scope">
            <!-- slot 自定义列-->
            <template v-if="item.type === 'slot'">
              <slot :name="'col-' + item.key" :row="scope.row" />
            </template>
            <!-- 嵌套表格 -->
            <template v-else-if="item.children"> </template>
            <!-- 标签 -->
            <el-tag v-else-if="item.type === 'tag'">{{
              scope.row[item.key]
            }}</el-tag>

            <!-- 其他 -->
            <span v-else :class="{ 'can-click': item.event }">
              {{ scope.row[item.key] || "-" }}
            </span>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="handle"
        :key="'handle'"
        fixed="right"
        align="center"
        label="操作"
      >
        <template v-slot="scope">
          <template v-for="(item, index) in handle.btList">
            <slot
              v-if="item.slot"
              :name="'bt-' + item.event"
              :data="{ item, row: scope.row }"
            />
            <el-button
              :key="index"
              v-waves
              size="mini"
              type="text"
              :disabled="item.disabled"
              @click="handleClick(item.event, scope.row)"
              >{{ item.label }}</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <template v-if="pager && data.length">
      <div v-show="!listInfo.loading" class="pagination-container">
        <el-pagination
          background
          :current-page.sync="listInfo.curPage"
          :page-sizes="listInfo.pageSizes"
          :page-size="listInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </div>
</template>
// <style lang="scss">
//       .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
//   border-color: rgba(153,153,153, 0.5);
// }
// .el-table--border::after, .el-table--group::after, .el-table::before{
//   background-color:rgba(153,153,153, 0.1);
// }
//
</style>
<script src="./index.js"></script>
<style lang="scss">
// 自定义表格相关
.qd-table {
  font-size: 14px;
  .tableHandleBtn {
    background-image: linear-gradient(#F68A00, #99430E);
    border: 1px solid #fff0;
    border: none;
    margin-right: 10px;
  }
  .tableHandleBtn-success {
    background-image: linear-gradient(#62e482, #18980a);
    border: none;
    margin-right: 10px;
  }
  .qd-table-expand {
    p {
      min-width: 100px;
      line-height: 28px;
      margin-left: 48px;
      display: flex;
    }
    label {
      display: inline-block;
      padding: 0 16px;
      color: #99a9bf;
      text-align: right;
    }
    span {
      flex: 1;
    }
  }

  .pagination-container {
    width: 100%;
    padding: 0px 0;
    text-align: right;
    // border-top: 1px solid #e6eaf2;
    background-color: #fff;
    // position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin-top: 20px;
  }
  .tab_index {
    .cell,
    .cell > span {
      padding: 0;
      display: inline-block;
      width: 100%;
      height: 100%;
      cursor: default;
    }
  }
  .el-table th,
  .el-table td {
    padding: 8px 0;
    // color: var(--tableText) !important;
    color: #505b71;
    .cell {
      word-break: normal;
    }
  }
  .can-click {
    cursor: pointer;
    color: #409eff;
  }
  .el-table th,
  .el-table tr:nth-child(even) {
    background-color: #f8f8f9;
    // background-color: #c1deff;
    // color: #000;
  }
  .el-table tr.danger-row {
    background-color: #ffc3c3 !important;
    td {
      background-color: transparent;
    }
  }
  .el-table tr.warning-row {
    background-color: #ffe6a7 !important;
    td {
      background-color: transparent;
    }
  }
  tr.success-row {
    background-color: #f0f9eb;
  }
  .el-button--text.el-button {
    padding: 0;
  }
  .el-table__footer {
    td {
      background-color: #fff;
      color: #42b983;
      cursor: default;
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #fff0;
    cursor: default;
  }
  .el-table tr {
    // background-color: #fff;
    cursor: default;
  }
}
</style>