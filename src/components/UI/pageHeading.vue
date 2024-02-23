<template>
  <div class="py-6 sm:py-8">
    <div class="flex flex-col sm:flex-row w-full justify-between items-center">
      <div class="flex flex-col gap-y-2">
        <slot name="title" />
      </div>

      <!-- action button -->
      <div>
        <div
          class="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3"
        >
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>
