<template>
  <form @submit.prevent="addNewLink" class="my-1">
    <div class="flex gap-2 items-center shrink-0">
      <input
        type="text"
        v-model.trim="newDesc"
        required
        placeholder="desc"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      <input
        type="text"
        v-model.trim="newLink"
        required
        placeholder="links"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
    <button
      type="submit"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      添加
    </button>
    <button
      type="button"
      @click.stop="toEdit"
      class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
    >
      切换编辑模式
    </button>
  </form>

  <div v-show="false">
    <h2>chart</h2>
    <button @click="addData">update chart</button>
    <div ref="chart" style="width: 900px; height: 400px"></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>序号</th>
        <th>描述</th>
        <th>网址</th>
        <Transition>
          <th v-show="edit">操作</th>
        </Transition>
      </tr>
    </thead>
    <TransitionGroup name="list" tag="tbody" v-if="prettyLinkData.length">
      <tr v-for="(item, index) in prettyLinkData" :key="item.prettyLink">
        <td>{{ index + 1 }}</td>
        <td>{{ item.desc }}</td>
        <td>
          <a
            :href="item.link"
            target="_blank"
            class="hover:underline"
            :title="item.desc"
          >
            {{ item.prettyLink }}
          </a>
        </td>
        <Transition>
          <td @click="removeLink(item.link)" v-show="edit">
            <a
              href="#"
              @click.prevent="removeLink(index)"
              class="hover:underline"
              title="remove"
              >删除</a
            >
          </td>
        </Transition>
      </tr>
    </TransitionGroup>
    <tbody v-else>
      <tr>
        <td :colspan="edit ? 4 : 3" class="text-center">
          <div class="h-24 flex items-center justify-center">暂无数据</div>
        </td>
      </tr>
    </tbody>
    <!-- <tfoot > foot </tfoot> -->
  </table>
</template>
