<template>
  <div class="flex gap-2 items-center overflow-auto flex-wrap">
    <div class="flex gap-2 items-center shrink-0">
      <label for="desc">描述</label>
      <input
        type="text"
        id="desc"
        v-model.trim="newDesc"
        required
        placeholder="desc"
      />
      <label for="link">网址</label>
      <input
        type="text"
        id="link"
        v-model.trim="newLink"
        required
        placeholder="links"
      />
    </div>
    <button class="p-2" @click="addNewLink">add</button>
    <button @click.stop="toEdit" class="p-2 shrink-0">切换编辑模式</button>
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
    <TransitionGroup tag="tbody" v-if="prettyLinkData.length">
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
          <td @click="removeLink(index + 1)" v-show="edit">
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
      暂无数据
    </tbody>
    <!-- <tfoot > foot </tfoot> -->
  </table>
</template>
