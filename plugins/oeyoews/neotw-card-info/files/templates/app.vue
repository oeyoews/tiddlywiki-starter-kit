<template>
  <!-- // TODO: render text -->
  <div style="display: flex; align-items: center">
    <el-popover :width="300" :show-after="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
      <!-- title -->
      <template #reference>
        <a @click.prevent="goto" class="hover:cursor-pointer">
          {{title}}
        </a>
      </template>
      <!-- hover -->
      <template #default>
        <div class="" style="display: flex; gap: 16px; flex-direction: column">
          <div>
            <p class="" style="margin: 0; font-weight: 500">
              {{title}}
            </p>
            <p class="" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
              <!-- <el-avatar :size="20" src="https://github.com/oeyoews.png?size=16" /> -->
              {{username}}
              <!-- {{tiddler?.created}} -->
            </p>
          </div>

          <p class="" style="margin: 0">
            {{tiddler?.description}}
          </p>
        </div>
      </template>
    </el-popover>
  </div>
</template>