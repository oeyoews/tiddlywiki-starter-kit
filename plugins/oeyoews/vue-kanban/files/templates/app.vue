<template>
  <div class="flex relative flex-1 flex-col md:flex-row min-h-0 px-4 py-2 overflow-x-auto gap-2 ">

    <VueDraggable v-model="list1" animation="150" ghostClass="ghost" group="people" @update="onUpdate" @add="onAdd"
      target=".list1" @remove="remove">
      <div
        class="mr-2 w-[350px] flex flex-col overflow-y-hidden rounded-md transition-all duration-75 border border-solid border-dimmed-100 dark:border-dimmed-700">
        <!-- title -->
        <div class="flex-col shrink-0 flex p-2">
          <h3>
            list1
          </h3>
          <hr>
        </div>
        <!-- list -->
        <div class="flex flex-col py-2 px-4 grow relative h-[500px] mb-4 overflow-y-auto list1">
          <div v-for="item in list1" :key="item.id"
            class="relative rounded-md border border-dimmed-100 border-solid shadow-sm overflow-visible mb-2 shrink-0 flex-col dark:border-dimmed-700">
            <div class="pt-2 border-none border-dimmed-100 pb-3 rounded-sm px-4 dark:border-dimmed-700">
              <div class="p-4">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <button class="flex py-2 w-full px-4 gap-4 h-10">add new item</button>
      </div>
    </VueDraggable>

    <VueDraggable v-model="list2" animation="150" group="people" ghostClass="ghost" @update="onUpdate" @add="onAdd"
      target=".list2" @remove="remove">
      <div
        class="mr-2 w-[350px] flex flex-col overflow-y-hidden rounded-md transition-all duration-75 border border-solid border-dimmed-100 dark:border-dimmed-700">
        <!-- title -->
        <div class="flex-col shrink-0 flex p-2">
          <h3>
            list2
          </h3>
          <hr>
        </div>
        <!-- list -->
        <div class="flex flex-col py-2 px-4 grow relative h-[500px] mb-4 overflow-y-auto list2">
          <div v-for="item in list2" :key="item.id"
            class="relative rounded-md border border-dimmed-100 border-solid shadow-sm overflow-visible mb-2 shrink-0 flex-col dark:border-dimmed-700">
            <div class="pt-2 border-none border-dimmed-100 pb-3 rounded-sm px-4 dark:border-dimmed-700">
              <div class="p-4">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <button class="flex py-2 w-full px-4 gap-4 h-10">add new item</button>
      </div>
    </VueDraggable>

    <VueDraggable v-model="list3" animation="150" group="people" ghostClass="ghost" @update="onUpdate" @add="onAdd"
      target=".list3" @remove="remove">
      <div
        class="mr-2 w-[350px] flex flex-col overflow-y-hidden rounded-md transition-all duration-75 border border-solid border-dimmed-100 dark:border-dimmed-700">
        <!-- title -->
        <div class="flex-col shrink-0 flex p-2">
          <h3>
            list3
          </h3>
          <hr>
        </div>
        <!-- list -->
        <div class="flex flex-col py-2 px-4 grow relative h-[500px] mb-4 overflow-y-auto list3">
          <div v-for="item in list3" :key="item.id"
            class="relative rounded-md border border-dimmed-100 border-solid shadow-sm overflow-visible mb-2 shrink-0 flex-col dark:border-dimmed-700">
            <div class="pt-2 border-none border-dimmed-100 pb-3 rounded-sm px-4 dark:border-dimmed-700">
              <div class="p-4">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <button class="flex py-2 w-full px-4 gap-4 h-10">add new item</button>
      </div>
    </VueDraggable>


  </div>

</template>