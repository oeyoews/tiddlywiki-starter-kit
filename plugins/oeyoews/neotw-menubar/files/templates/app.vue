<template>
  <MenuBar id="neotw-menubar" :options="menuData">
    <template #prefix>
      <Icon :icon="tiddlywiki_icon" custom-class="mx-1 ml-3 mt-0.5" />
    </template>
    <!-- dynamic menu icon -->
    <template #suffix>
      <Icon :icon="menu_icon"
        custom-class="ml-auto mr-4 cursor-pointer rounded-full transition-all duration-600 hover:scale-125"
        @menu="toggleSidebar" />
    </template>
  </MenuBar>
  <!-- <div @contextmenu="onContextMenu">Button</div> -->
</template>