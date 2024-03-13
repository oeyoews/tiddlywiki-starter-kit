<template>
  <div class="flex items-center space-x-4 flex-wrap gap-2 justify-center text-sm mb-4 scale-75">
    <Text text="Version" color="purple" :number="version" :icon="iversion" />

    <Text text="Update" color="red" :number="update" :icon="iinfo" />

    <Text text="Plugins" color="green" :number="plugins" :icon="iplugin" />

    <Text text="Tags" color="yellow" :number="tags" :icon="itag" />

    <Text text="Tiddlers" color="blue" :number="tiddlers" :icon="itiddler" />
  </div>
</template>
