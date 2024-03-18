<template>
  <div class="flex-1 overflow-auto">
    <main class="p-3 inline-flex">
      <!-- card -->
      <div class="ml-4 flex-shrink-0 flex flex-col w-96 bg-gray-100 rounded-md h-96">
        <h2 class="flex-shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-gray-900">No Status</h2>
        <!-- list -->
        <div class="flex-1 overflow-y-auto min-h-0">
          <div v-for="nostatus in state.nostatus" class="pt-1 pb-3 px-3">
            <div> {{nostatus}} </div>
            <div> {{nostatus}} </div>
            <div> {{nostatus}} </div>
            <div> {{nostatus}} </div>
            <div> {{nostatus}} </div>
            <div> {{nostatus}} </div>
          </div>
        </div>
      </div>

      <div class="ml-4 flex-shrink-0 flex flex-col w-96 bg-gray-100 rounded-md">
        <h2 class="flex-shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-gray-900">No Status</h2>
        <!-- list -->
        <div class="flex-1 overflow-y-auto min-h-0">
          <div v-for="nostatus in state.nostatus" class="pt-1 pb-3 px-3">
            {{nostatus}}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>