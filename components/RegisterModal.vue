<template>
  <!-- Modal Overlay -->
  <div class="modal-overlay fixed inset-0 flex justify-center items-center">
    <!-- Modal -->
    <div
      class="flex flex-col bg-white w-full md:w-7/12 h-full md:h-4/6 md:rounded-xl p-6 overflow-scroll"
    >
      <div class="flex justify-end">
        <button @click="closeModal">x</button>
      </div>
      <form
        @submit.prevent="register"
        class="grid grid-cols-1 md:grid-cols-2 gap-3"
        autocomplete="on"
      >
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autocomplete="username"
            v-model="username"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autocomplete="new-password"
            v-model="password"
          />
        </div>
        <div class="md:col-span-2">
          <label for="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            autocomplete="email"
            v-model="email"
          />
        </div>
        <div class="md:col-span-2">
          <p>Date of birth</p>
          <div class="grid grid-col-1 md:grid-cols-7 gap-3">
            <div class="md:col-span-3">
              <label for="month">Month</label>
              <select
                id="month"
                name="month"
                class="border p-2"
                autocomplete="bday-month"
                v-model="dob.month"
              >
                <option :value="0" disabled selected></option>
                <option :value="1">January</option>
                <option :value="2">February</option>
                <option :value="3">March</option>
                <option :value="4">April</option>
                <option :value="5">May</option>
                <option :value="6">June</option>
                <option :value="7">July</option>
                <option :value="8">August</option>
                <option :value="9">September</option>
                <option :value="10">October</option>
                <option :value="11">November</option>
                <option :value="12">December</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label for="day">Day</label>
              <select
                id="day"
                name="day"
                class="border p-2"
                autocomplete="bday-day"
                v-model="dob.day"
              >
                <option :value="0" disabled selected></option>
                <option
                  v-for="day in numberOfDays()"
                  :value="day"
                  :key="'day-' + day"
                >
                  {{ day }}
                </option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label for="year">Year</label>
              <select
                id="year"
                name="year"
                class="border p-2"
                autocomplete="bday-year"
                v-model="dob.year"
              >
                <option :value="0" disabled selected></option>
                <option
                  v-for="year in years"
                  :value="year"
                  :key="'year-' + year"
                >
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          value="submit"
          class="bg-blue-300 p-2 rounded-xl w-full text-white md:col-span-2"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegisterModal',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      dob: {
        month: 0,
        day: 0,
        year: 0,
      },
    }
  },
  computed: {
    years: function () {
      const years = []
      for (let i = new Date().getFullYear(); i > 1900; i--) {
        years.push(i)
      }
      return years
    },
  },
  watch: {
    dob: {
      handler: function (val) {
        if (val.month === 2) {
          if (val.day > 29) {
            this.dob.day = 0
            return
          }
        }
        if ([4, 6, 9, 11].includes(val.month)) {
          if (val.day === 31) {
            this.dob.day = 0
            return
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    closeModal: function () {
      this.clearInput()
      this.$store.dispatch('modal/closeRegisterModal')
    },
    numberOfDays: function () {
      if (this.dob.month === 0) {
        return 31
      }
      if (this.dob.month === 2) {
        return 29
      }
      if ([4, 6, 9, 11].includes(this.dob.month)) {
        return 30
      }
      return 31
    },
    clearInput: function () {
      this.username = ''
      this.password = ''
      this.email = ''
      this.dob = {
        month: 0,
        day: 0,
        year: 0,
      }
    },
    register: async function () {
      const user = {
        username: this.username,
        password: this.password,
        email: this.email,
        dob: this.dob,
      }
      const response = await this.$axios.post('/users/register', user)
      const data = response.data
      if (!data.success) {
        console.log(data.message)
        return
      }
      this.clearInput()
      const success = await this.$store.dispatch('user/login', user)
      if (!success) {
        console.log('Login failed')
        return
      }
      this.closeModal()
    },
  },
}
</script>
<style scoped>
label,
input {
  @apply block;
}

input,
select {
  @apply border rounded-lg w-full p-2 mb-3 mt-1;
}

.modal-overlay {
  background-color: #000000da;
}
</style>
