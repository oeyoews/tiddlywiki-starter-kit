<template>
  <MenuBar id="neotw-menubar" :options="menuData">
    <template #prefix>
      <Icon :icon="tiddlywiki_icon" custom-class="mx-1 mt-0.5" />
    </template>
    <template #suffix>
      <Icon :icon="menu_icon" custom-class="ml-auto mr-2 cursor-pointer" @menu="toggleSidebar" />
    </template>
  </MenuBar>
  <!-- <div @contextmenu="onContextMenu">Button</div> -->
</template>