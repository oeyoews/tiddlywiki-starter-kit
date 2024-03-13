<template>
  <div class="flex items-center space-x-4 flex-wrap gap-2 justify-center text-sm mb-4 scale-75" @click="gotoTiddler">
    <Text text="Version" color="purple" :number="version" :icon="iversion" data-title="version" />

    <Text text="Update" color="red" :number="update" :icon="iinfo" data-title="update" />

    <Text text="Plugins" color="green" :number="plugins" :icon="iplugin" data-title="plugin" />

    <Text text="Tags" color="yellow" :number="tags" :icon="itag" data-title="tag" />

    <Text text="Tiddlers" color="blue" :number="tiddlers" :icon="itiddler" data-title="tiddler" />
  </div>
</template>
