<template>
  <div>
    <h2>RSS Loader</h2>
    <div v-if="loading"> loading ...</div>

    <h2>Articles</h2>
    <article v-for="(item, index) in rssItems" :key="item">
      <h2> {{index+1}}. {{item.title}}</h2>
      <details>
        <summary v-html="item.summary"></summary>
        <p v-html="item.text" />
      </details>
    </article>
  </div>
</template>