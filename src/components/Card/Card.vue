<script setup>
import Skeleton from '@/components/Skeleton/Skeleton.vue';
import useDateConverter from '@/composables/useConvertDate.js';
import { useNewsStore } from '@/stores/news.store.js';

// Icon
import Trash from '@/components/Icon/Trash.vue';

const props = defineProps(['newsData', 'showBtnMore', 'showBtnMoreDelete', 'type'])
const newsStore = useNewsStore()

const options = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}

const { convertDate } = useDateConverter()

const emit = defineEmits(['clickCard', 'deleteCard'])

const handleClick = (news) => {
  if (props.showBtnMore) {
    emit('clickCard', news)
  }
}

const handleDeleteCard = (news) => {
  emit('deleteCard', news)
  console.log('news', news)
}
</script>

<template>
  <div
    v-for="(news, index) in newsData"
    :key="index"
    class="border-[2px] w-full hover:shadow-lg transition-all ease-in duration-100 cursor-pointer relative"
    :class="type === 'search' ? 'h-[500px]' : 'h-[100%]'"
    @click="handleClick(news)"
  >
    <div>
      <div class="relative">
        <Skeleton v-if="newsStore.loading" :height="150" :rounded="false" />
        <img
          v-else
          class="w-full object-cover h-[150px]"
          :src="news.urlToImage !== null ? news.urlToImage : 'https://via.placeholder.com/150'"
          :alt="news.title"
        />
        <div
          v-show="!newsStore.loading"
          class="absolute bottom-[10px] left-[10px] bg-black hover:bg-slate-800 rounded-lg transition-all ease-in-out duration-100 px-3 py-2 text-white"
        >
          {{ news.source.name }}
        </div>
      </div>
      <div
        class="p-[10px] flex flex-col"
        :class="`${!newsStore.loading ? 'gap-[15px]' : 'gap-[5px]'}`"
      >
        <Skeleton v-if="newsStore.loading" :height="50" />

        <h1 v-else class="text-sm md:text-[16px] lg:text-[22px] text-bold leading-[28px] truncate">
          {{ news.title }}
        </h1>

        <Skeleton v-if="newsStore.loading" :height="100" />
        <p v-else class="text-sm md:text-[13px] lg:text-[16px] text-bold">
          {{
            news.description !== null
              ? news.description.slice(0, 160) + '...'
              : 'Tidak ada deskripsi'
          }}
        </p>

        <Skeleton v-if="newsStore.loading" :height="50" />

        <h3 v-else class="text-sm md:text-[15px] lg:text-[18px] text-bold text-blue-400">
          {{ news.author === null ? 'Tidak ada Author' : news.author }}
        </h3>

        <Skeleton v-if="newsStore.loading" :height="50" />

        <div v-else class="lg:absolute bottom-[25px] left-[10px] w-[60%] overflow-hidden">
          <h4>Published : {{ convertDate(news.publishedAt, options) }}</h4>
        </div>
        <div class="lg:absolute bottom-[25px] right-[10px]" v-show="showBtnMore">
          <a
            class="bg-green-500 rounded-md text-white p-[10px] hover:bg-green-400 transition-all ease-in duration-100"
            :href="`${news.url}`"
            target="_blank"
          >
            View More
          </a>
        </div>

        <div v-show="showBtnMoreDelete" class="lg:absolute bottom-[25px] right-[10px]">
          <button @click="handleDeleteCard(news)" class="bg-red-500 hover:bg-red-800 p-2 rounded-md transition-all ease-out duration-100">
           <Trash :width="20" :height="20" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
