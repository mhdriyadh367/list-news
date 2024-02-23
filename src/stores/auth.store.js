import { defineStore } from 'pinia'

import { fetchWrapper } from '../helper/fetch-wrapper.js'
// import { getStorage } from '@/utils/storage'
import router from '../router/index.js'
import Swal from 'sweetalert2'
import Configuration from '@/app.config.js'
const baseUrl = Configuration.value('baseURL')

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null,
    dataSuccess: {}
  }),
  actions: {
    async login(email, password) {
      const user = await fetchWrapper
        .post(`${baseUrl}/auth/login`, {
          email,
          password
        })
        .then((response) => {
          this.user = response.data
          if (response) {
            Swal.fire({
              text: 'Your login was successfully',
              target: '#custom-toast-success',
              icon: 'success',
              background: '#05A763',
              showConfirmButton: false,
              color: '#fff',
              iconColor: '#fff',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 3000,
              timerProgressBar: false,
              customClass: {
                container: 'absolute'
              },
              toast: true,
              position: 'top-right'
            })
            localStorage.setItem('user', JSON.stringify(response.data))
            setTimeout(() => {
              router.push(this.returnUrl || '/')
            }, 2000)
          }
        })
        .catch((error) => {
          Swal.fire({
            text: error,
            target: '#custom-toast-success',
            icon: 'error',
            background: '#FB6056',
            showCancelButton: false,
            showConfirmButton: false,
            color: '#fff',
            iconColor: '#fff',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              container: 'absolute'
            },
            toast: true,
            position: 'top-right'
          })
        })
    },
    async logout() {
      this.user = null
      localStorage.removeItem('user')
      // if (getStorage('viewed-tour')) {
      //   window.location.href = '/auth/login'
      // } else {
      //   router.push('/auth/login')
      // }
    },

    async register(name, email, password, verify_password, gender) {
      const user = await fetchWrapper.post(`${baseUrl}/register`, {
        name,
        email,
        password,
        verify_password,
        gender
      })
      Swal.fire({
        text: 'Your register was successfully',
        target: '#custom-toast-success',
        icon: 'success',
        background: '#05A763',
        showCancelButton: false,
        showConfirmButton: false,
        color: '#fff',
        iconColor: '#fff',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          container: 'absolute'
        },
        toast: true,
        position: 'top-right'
      })

      setTimeout(() => {
        router.push(this.returnUrl || '/auth/login')
      }, 2000)
    },

    async loginGoogle(data) {
      try {
        const token = data.access_token

        const userGoogle = await fetchWrapper.post(`${baseUrl}/auth/google/` + token)
        localStorage.setItem('user', JSON.stringify(userGoogle.data))

        Swal.fire({
          text: 'Your login was successfully',
          target: '#custom-toast-success',
          icon: 'success',
          background: '#05A763',
          showCancelButton: false,
          showConfirmButton: false,
          color: '#fff',
          iconColor: '#fff',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            container: 'absolute'
          },
          toast: true,
          position: 'top-right'
        })
        setTimeout(() => {
          const url = new URL('/', window.location.origin)
          window.location.href = url.toString()
        }, 2000)
      } catch (err) {
        console.log(err)
      }
    },
    async forgotPassword(email) {
      try {
        await fetchWrapper
          .post(`${baseUrl}/auth/forgot-password?email=` + email)
          .then((response) => {
            this.dataSuccess = response.code
          })
      } catch (error) {
        $('#error-forgot-password').text('*Your email is not registered in Kelip')
        $('.email-forgot-password').addClass('invalid:border-red-500')
      }
    },
    async changePasswordGoogle(token, password, confirm_password) {
      fetchWrapper
        .put(
          baseUrl +
            '/auth/change-password/' +
            token +
            '?password=' +
            password +
            '&confirm_password=' +
            confirm_password
        )
        .then((response) => {
          this.dataSuccess = response.code
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Berhasil mengganti password'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
