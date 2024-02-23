<script setup>
import { useNewsStore } from '@/stores/news.store.js';
import { onMounted, ref } from 'vue';

// component
import Button from '@/components/Button/Button.vue';
import Card from '@/components/Card/Card.vue';

const newsStore = useNewsStore()
const newsPreview = ref([])
const mainPreviewNews = ref(null)
const listNews = ref([])
const isDisabledBtn = ref(false)
const selectedCategory = ref('')
const readingNews = ref([])
const search = ref('')

const defaultParams = ref({
  pageSize: 4,
  page: 1,
  category: '',
  search: ''
})

onMounted(async () => {
  await newsStore.getAllNews(defaultParams.value)
  listNews.value = await newsStore.news
  if (localStorage.getItem('reading') === null) {
    localStorage.setItem('reading', JSON.stringify([]))
  } else {
    readingNews.value = JSON.parse(localStorage.getItem('reading'))
  }
})

const handleClickCard = (news) => {
  // mainPreviewNews.value = news
  const isDuplicate = newsPreview.value.some(
    (existingNews) => existingNews.title === news.title && existingNews.author === news.author
  )

  if (!isDuplicate) {
    newsPreview.value.push(news)
  }

  localStorage.setItem('reading', JSON.stringify(newsPreview.value))

  readingNews.value = JSON.parse(localStorage.getItem('reading'))
}

const handleDeleteNews = (news) => {
  const filteredNews = newsPreview.value.filter(
    (existingNews) => existingNews.title !== news.title && existingNews.author !== news.author
  )

  newsPreview.value = filteredNews
  localStorage.setItem('reading', JSON.stringify(newsPreview.value))
  readingNews.value = JSON.parse(localStorage.getItem('reading'))
}

const handlePrevNews = () => {
  if (defaultParams.value.page > 1) {
    defaultParams.value.page -= 1
    newsStore.getAllNews(defaultParams.value)
  } else {
    isDisabledBtn.value = true
  }
}
const handleNextNews = () => {
  if (newsStore.news.length !== 0) {
    defaultParams.value.page += 1
    newsStore.getAllNews(defaultParams.value)
  } else {
    isDisabledBtn.value = true
  }
}

const handleSearch = (event) => {
  search.value = event.target.value
  if (event.target.value === '') {
    defaultParams.value.search = search.value
    defaultParams.value.pageSize = 4
    defaultParams.value.page = 1
    newsStore.getAllNews(defaultParams.value)
  } else {
    defaultParams.value.search = search.value
    defaultParams.value.pageSize = 10
    defaultParams.value.page = 1
    newsStore.getAllNews(defaultParams.value)
  }
}
</script>

<template>
  <div class="w-full h-full">
    <!-- Navbar -->
    <nav>
      <div class="w-full h-[50px] bg-black flex items-center">
        <div class="container mx-auto flex justify-between items-center">
          <div @click="selectedCategory = ''" class="text-white text-3xl cursor-pointer">NEWS</div>

          <div class="text-white flex gap-[10px] items-center">
            <div>
              <input
                type="text"
                class="bg-transparent border-[2px] py-1 px-4"
                placeholder="Search"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Search -->
    <div class="container mx-auto" v-show="search !== ''">
      <h1 class="text-left text-2xl m-[50px_0]">Result Search : {{ search }}</h1>

      <div class="w-full lg:h-full">
        <div class="h-[900px] grid grid-cols-3 gap-[10px]">
          <Card
            :newsData="newsStore.news"
            :showBtnMore="true"
            :showBtnMoreDelete="false"
            class="flex-shrink-0"
            style="height: 500px"
            :type="'search'"
          />
        </div>
      </div>
    </div>

    <!-- List News -->
    <div class="container mx-auto" v-show="search === ''">
      <h1 class="text-center text-2xl m-[50px]">List Berita Ku Nih</h1>
      <div class="w-full h-full grid grid-cols-1 lg:grid-cols-[40%_60%] gap-[10px]">
        <div class="w-full h-[900px] border-[2px] relative">
          <div v-if="listNews.length > 0">
            <img
              class="object-cover w-full h-[600px]"
              :src="listNews[0].urlToImage"
              :alt="listNews[0].title"
            />
            <div class="p-[10px] flex flex-col gap-[15px]">
              <h1 class="text-sm md:text-[16px] lg:text-[22px] text-bold leading-[28px]">
                {{ listNews[0].title }}
              </h1>
              <p
                v-if="listNews[0].description"
                class="text-sm md:text-[13px] lg:text-[16px] text-bold"
              >
                {{ listNews[0].description.slice(0, 160) + '...' }}
              </p>
              <h3 class="text-sm md:text-[15px] lg:text-[18px] text-bold text-blue-400">
                {{ listNews[0].author }}
              </h3>
            </div>
            <div class="absolute bottom-[25px] right-[10px]">
              <a
                class="bg-green-500 rounded-md text-white p-[10px] hover:bg-green-400 transition-all ease-in duration-100"
                :href="`${listNews[0].url}`"
                target="_blank"
              >
                View More
              </a>
            </div>
          </div>
        </div>
        <div class="w-full h-[900px]">
          <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-[10px] lg:h-full">
            <Card
              :newsData="newsStore.news"
              @clickCard="handleClickCard"
              :showBtnMore="true"
              :showBtnMoreDelete="false"
              :type="'list'"
            />
          </div>
          <div class="w-full flex justify-around p-[30px_0] h-auto">
            <!-- Back -->
            <Button :text="'Prev'" @click="handlePrevNews" :disabled="defaultParams.page === 1" />

            <!-- Next -->
            <Button :text="'Next'" @click="handleNextNews" :disabled="isDisabledBtn" />
          </div>
        </div>
      </div>
    </div>

    <!-- List Reading News -->

    <div class="container mx-auto lg:mt-[200px]" v-show="search === ''">
      <h1 class="text-center text-2xl m-[50px]">List Berita Pernah Ku Baca Nih</h1>

      <div class="w-full h-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-[10px]">
        <div v-if="readingNews.length > 0" class="w-full h-[900px] border-[2px]">
          <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-[10px] lg:h-full">
            <Card
              :newsData="readingNews"
              :showBtnMore="false"
              :showBtnMoreDelete="true"
              @deleteCard="handleDeleteNews"
              :type="'list'"
            />
          </div>
        </div>
        <div v-else class="w-full h-[900px] border-[2px] flex items-center justify-center">
          <img class="w-full h-full" src="https://via.placeholder.com/150" alt="">
        </div>
        <div class="w-full h-[900px] border-[2px] relative">
          <div v-if="readingNews.length > 0">
            <img
              class="object-cover w-full h-[600px]"
              :src="
                readingNews[0].urlToImage !== null
                  ? readingNews[0].urlToImage
                  : 'https://via.placeholder.com/150'
              "
              :alt="readingNews[0].title"
            />
            <div class="p-[10px] flex flex-col gap-[15px]">
              <h1 class="text-sm md:text-[16px] lg:text-[22px] text-bold leading-[28px]">
                {{ readingNews[0].title }}
              </h1>
              <p
                v-if="readingNews[0].description"
                class="text-sm md:text-[13px] lg:text-[16px] text-bold"
              >
                {{ readingNews[0].description.slice(0, 160) + '...' }}
              </p>
              <h3 class="text-sm md:text-[15px] lg:text-[18px] text-bold text-blue-400">
                {{ readingNews[0].author }}
              </h3>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
