<template>
  <div
    class="flex items-center space-x-4 flex-wrap gap-2 justify-center text-sm mb-4 scale-75"
  >
    <InfoCard>
      <IconVersion />
      <span class="ml-1 font-semibold text-purple-500">Version</span>
      <IconTitle>
        {{ version }}
      </IconTitle>
    </InfoCard>

    <InfoCard>
      <IconInfo />
      <span class="ml-1 font-semibold text-red-500">Update</span>
      <IconTitle>
        {{ update }}
      </IconTitle>
    </InfoCard>

    <InfoCard>
      <IconPlugin />
      <span class="ml-1 font-semibold text-green-500">Plugins</span>
      <IconTitle>
        {{ plugins }}
      </IconTitle>
    </InfoCard>

    <InfoCard>
      <IconTag />
      <span class="ml-1 font-semibold text-yellow-500">Tags</span>
      <IconTitle>
        {{ tags }}
      </IconTitle>
    </InfoCard>

    <InfoCard>
      <IconTiddler />
      <span class="ml-1 font-semibold text-blue-500">Tiddlers</span>
      <IconTitle>
        {{ tiddlers }}
      </IconTitle>
    </InfoCard>
  </div>
</template>
