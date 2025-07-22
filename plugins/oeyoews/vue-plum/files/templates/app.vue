<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden" style="z-index: -1"
    :style="`mask-image: ${mask};--webkit-mask-image: ${mask};`">
    <canvas ref="el" width="400" height="400" />
  </div>
</template>