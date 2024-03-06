<template>
  <table>
    <tr>
      <th>描述</th>
      <th>网址</th>
    </tr>
    <tr v-for="item in data">
      <td>{{ item[0] }}</td>
      <td>
        <a
          :href="item[1]"
          target="_blank"
          class="hover:underline"
          :title="item[0]"
        >
          {{ prettyLink(item[1]) }}
        </a>
      </td>
    </tr>
  </table>
</template>
