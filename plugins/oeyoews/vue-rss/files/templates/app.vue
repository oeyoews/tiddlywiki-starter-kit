<template>
  <div>
    <h2>RSS Loader</h2>
    <div v-if="loading"> loading ...</div>
    <div>
      <h2>TOC</h2>
      <ul>
        <li v-for="item in rssItems">
          {{item.title}}
        </li>
      </ul>
    </div>

    <h2>Articles</h2>
    <article v-for="(item, index) in rssItems" :key="item">
      <h2> {{index+1}}. {{item.title}}</h2>
      <div v-html="item.summary" />
      <hr>
      <!-- <div v-html="item.update.split('T')[0]" /> -->
      <p v-html="item.text" />
    </article>
  </div>
</template>