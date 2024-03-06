<template>
  <form @submit.prevent="addNewLink">
    描述:
    <input type="text" v-model.trim="newDesc" required placeholder="desc" />
    链接:
    <input type="text" v-model.trim="newLink" required placeholder="links" />
    <button>add</button>
  </form>

  <button @click="toEdit">Toggle edit</button>

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
