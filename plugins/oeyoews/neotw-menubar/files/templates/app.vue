<template>
  <MenuBar id="neotw-menubar" :options="menuData" style="padding: 8px 9px;border-radius: 30px;" class="shadow-sm">
    <template #prefix>
      <Icon :icon="tiddlywiki_icon" custom-class="mx-1 ml-3 mt-0.5" />
    </template>
    <!-- dynamic menu icon -->
    <template #suffix>
      <div class="ml-auto flex">
        <Icon :icon="sound_icon"
          custom-class="mr-4 cursor-pointer rounded-full transition-all duration-600 hover:scale-125"
          @menu="toggleSound" />
        <Icon :icon="menu_icon"
          custom-class="mr-4 cursor-pointer rounded-full transition-all duration-600 hover:scale-125"
          @menu="toggleSidebar" />
      </div>
    </template>
  </MenuBar>
  <!-- <div @contextmenu="onContextMenu">Button</div> -->
</template>