<template>
  <div>
    <div v-if="loading"> loading ...</div>
    <article v-for="(item, index) in rssItems" :key="item">
      <h2> {{index+1}}. {{item.title}}</h2>
      <small>
        <a :href="item.link">{{item.link}}</a>

        <div>{{item.update}}</div>
      </small>
      <details>
        <!-- <summary v-html="item.summary"></summary> -->
        <p v-html="item.summary" />
      </details>
    </article>
  </div>
</template>