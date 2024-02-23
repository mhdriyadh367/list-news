// import Configuration from '@/app.config.js';
import { defineStore } from 'pinia';

const baseUrl = 'https://newsapi.org/v2';


// const baseUrl = Configuration.value('VITE_BASE_URL');

export const useNewsStore = defineStore({
  id: 'news',
  state: () => ({
    news: [],
    categories: [],
    totalResults: 0,
    loading: true,
  }),
  actions: {
    async getAllNews(params) {
      console.log('params', params)
      try {
        this.loading = true;
        const response = await fetch(`${baseUrl}/everything?${params.search === '' ? 'q=apple' : `q=${params.search}`}&pageSize=${params.pageSize}&page=${params.page}&apiKey=02459689da214c5cbd7992e25ee051c8`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.news = data.articles;
        this.totalResults = data.totalResults;
      } catch (e) {
        console.error(e);
        this.loading = false;
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      }
    },

    async searchNews(params) {
      try {
        this.loading = true;

        

      }catch(e){
        console.error(e);
      }
      finally{
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      }
    }

  },
});
