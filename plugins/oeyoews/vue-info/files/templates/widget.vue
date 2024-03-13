<template>
  <div class="flex items-center space-x-4 flex-wrap gap-2 justify-center text-sm mb-4 scale-75">
    <InfoCard>
      <IconVersion />
      <Text text="Version" color="purple" :number="version" />
    </InfoCard>

    <InfoCard>
      <IconInfo />
      <Text text="Update" color="red" :number="update" />
    </InfoCard>

    <InfoCard>
      <IconPlugin />
      <Text text="Plugins" color="green" :number="plugins" />
    </InfoCard>

    <InfoCard>
      <IconTag />
      <Text text="Tags" color="yellow" :number="tags" />
    </InfoCard>

    <InfoCard>
      <IconTiddler />
      <Text text="Tiddlers" color="blue" :number="tiddlers" />
    </InfoCard>
  </div>
</template>
