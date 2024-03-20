<template>
  <div>
    <div class="backdrop-blur-lg z-[9998] fixed inset-0 bg-black/20 transition-all cursor-pointer opacity-100">
      <div
        class="bg-white flex-col z-[9999] transform shadow-lg p-2 mt-4 fixed left-1/2 -translate-x-1/2 rounded transition-all dark:invert w-3/4 md:w-1/2 flex">
      </div>
      <Command theme="custom">
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <!-- <Command.Empty>No results found.</Command.Empty> -->

          <div class="flex flex-col p-2 bg-gray-200">
            <Command.Group heading="Letters">
              <Command.Item>a</Command.Item>
              <Command.Item>b</Command.Item>
              <Command.Separator />
              <Command.Item>c</Command.Item>
            </Command.Group>

            <Command.Item>Apple</Command.Item>
          </div>
        </Command.List>
      </Command>
    </div>
  </div>
</template>