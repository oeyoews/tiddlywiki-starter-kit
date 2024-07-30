<template>
  <div
    class="relative min-h-0 overflow-x-auto gap-2 select-none not-prose ~bg-[#efefef] grid grid-cols-1 grid-rows-1 md:grid-cols-3">
    <template v-for="(list, index) in allData" :key="index">
      <List :data="list.items" :type="list.name" @onUpdate="onUpdate" @onAdd="onAdd" @remove="remove" />
    </template>
  </div>
</template>