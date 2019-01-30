<template>
  <div>
    
    <div class="columns" v-if="account" v-cloak>
            
            <div class="account">
              
              <div class="logo">
              <img v-bind:src="account.image" width="100%" />
              </div>
                
            <div class="info">
             <h3 v-text="account.displayName"></h3>
             <div class="details" style="clear: both;">
             <a class="url" v-text="account.websiteUrl" :href="'http://'+account.websiteUrl"></a>
             <a class="location" v-text="'Athens, Greece'"></a>
           </div>
            <p v-text="account.description"></p>
          </div>

          </div>

        <main v-if="dataReady">

    <div class="flex-grid">
     
      <div class='score' id="smart_aid">
        <h2>Smart Aid Score</h2>
        <p>{{ users.smart_aid }}</p>
      </div>
      <div class='score' id="daily_visits">
        <h2>Daily Visits</h2>
        <p>{{ users.daily_visits }}</p>
      </div>
      <div class='score' id="total_visits">
        <h2>Cumulative Visits</h2>
        <p>{{ users.cumulative_visits }}</p>
      </div>
    </div>

    <div class="flex-grid">
      <div class="services">
              <h2>Services</h2>
        <div class="flex-grid ">
        <div>
       <h3>Units of Service</h3>
      <p>{{ users.units_total }}</p>
        </div>
         <div>
        <h3>Cost of Total Units</h3>
        <p>€ {{ users.units_cost }}</p>
        
        </div>
        <div>
        <h3>Value of Total Units</h3>
        <p>€ {{ users.units_value }}</p>
        
        </div>
        </div>
      </div>
    </div>

    <div class="flex-grid">
      <div class="finances">
              <h2>Finances</h2>
        <div class="flex-grid ">
        <div>
       <h3>Annual Income</h3>
          <BarChart v-if="dataReady" :data="barChartData" :options="barChartData.options" />
  <div class="legend" id="income">
  <ul>
    <li>Donations</li>
    <li>In Kind</li>
    </ul>
    </div>
        </div>
         <div>
        <h3>Total Expenses</h3>
        
            <DoughnutChart class="expenses" v-if="dataReady" :data="doughnutChartData" :options="doughnutChartData.options" />
<div class="legend" id="income">
  <ul>
    <li>Direct Services</li>
    <li>Administrative</li>
    </ul>
      </div>  
        </div>
    
        </div>
      </div>
    </div>

    <div class="flex-grid">
      <div class="team">
       
       <h2>Distribution of Staff &amp; Volunteers</h2>
          <BarChart v-if="dataReady" :data="teamData" :options="teamData.options" />

<div class="legend" id="staff">
  <ul>
    <li>Local</li>
    <li>International</li>
    <li>Refugee</li>
    </ul>
      </div>  

        </div>
        
        </div>


       <div class="flex-grid">
      <div class="services">
              <h2>Volunteers Recruited</h2>
        <div class="flex-grid ">
        <div>
       <h3>Total Recruited</h3>
      <p>{{ users.volunteers_total }}</p>
        </div>
   
        <div>
        <h3>Average Stay</h3>
        <p>{{ users.volunteers_stay }} Weeks</p>
        
        </div>
        </div>
      </div>
    </div>
   
 

  </main>
          
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BarChart from '~/components/bar-chart'
import DoughnutChart from '~/components/doughnut-chart'
import axios from 'axios'

export default {
  middleware: 'anonymous', // checking if auth'd with firebase kinda sucks as the middleware is triggered before firebase is ready
  components: {
    DoughnutChart,
    BarChart
  },
  computed: {
    ...mapState([
      'user',
      'account'
    ]),
    imageAlt () {
      return `Profile image for ${this.account.displayName}`
    }
  },
  data () {
    return {
      editing: false,
      org: String,
      users: '',
      dataReady: false,
      barChartData: '',
      doughnutChartData: '',
      teamData: '',
      volunteersRecruited: '',
      volunteersDurations: ''
    }
  },
  methods: {
    toggleEditForm () {
      this.editing = !this.editing
    },
    signOut () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push('/account/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  async mounted() {
     if(this.user.uid === "XIWyvZtPkIgZ5lRvwevW1x3Qjpl1") {
      this.org = 'hestia_hellas'
    }

    axios.get(process.env.baseUrl + '/' + this.org + '/' + 'index.json')
      .then((res) => {
        console.log('client fetch')
        this.users = res.data

        this.barChartData = {
        labels: res.data.annual_income.map(stat => stat.year),
        datasets: [
          {
            label: 'In Kind',
            backgroundColor: '#41b883',
            data: res.data.annual_income.map(stat => stat.inkind)
          },
          {
            label: 'Donations',
            backgroundColor: '#1b89ff',
            data: res.data.annual_income.map(stat => stat.donations)
          }
        ],
        options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            FontFamily: 'Exo 2'
          }
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            ticks: {
            beginAtZero: true
          }
          }]
        }
      },
      
      }

var refugee=[];
var local=[];
var international=[];
res.data.team.map((e)=>{
  if(e.paid)
  { 
refugee.push(e.paid.refugee);
local.push(e.paid.local);
international.push(e.paid.international)
  }
  else
  {
    refugee.push(e.unpaid.refugee);
local.push(e.unpaid.local);
international.push(e.unpaid.international)
  }

})
console.log(local)
console.log(international)
console.log(refugee)

      
this.teamData = {
        labels: ['Paid', 'Unpaid'],
        datasets: [
          {
            label: 'Refugee',
            data: refugee,
						backgroundColor: '#ff9300'
          },
          {
						label: 'Local',
						data: local,
						backgroundColor: '#41b883'
          },
          {
						label: 'International',
						data: international,
						backgroundColor: '#1b89ff'
					}
        ],
        options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            FontFamily: 'Exo 2'
          }
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            ticks: {
            beginAtZero: true
          }
          }]
        }
      },
      
      }

      this.doughnutChartData = {
        labels: ['Direct Services', 'Administrative'],
        datasets: [
          {
          data: [res.data.expenses.direct, res.data.expenses.admin],
          backgroundColor: ['#1b89ff', '#41b883'],
          hoverBackgroundColor: ['#1b89ff', '#00b153']
          },
        ], options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            FontFamily: 'Exo 2'
          }
        }
      }
      }

      this.dataReady = true;


      });

    
  },
};
</script>

<style lang="sass" scoped>

.details
  display: block
  margin: 5px 0 25px
.url
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath fill-rule='evenodd' fill='#5abbaa' d='M50 6a44 44 0 1 0 0 88 44 44 0 0 0 0-88zm2 4.7c1.3.4 2.6 1.2 4 2.4 1.9 1.9 3.8 4.7 5.4 8.3l1.6 3.9H52zm-4 0v14.6H37l1.6-4c1.6-3.5 3.5-6.3 5.5-8.2 1.3-1.2 2.6-2 3.9-2.4zm-7.6.5c-2.1 2.2-4 5.1-5.5 8.5-.7 1.8-1.5 3.6-2 5.6H18.4a40 40 0 0 1 21.9-14.1zm19.2 0a40 40 0 0 1 21.9 14.1H67.2L65 19.7a31.6 31.6 0 0 0-5.5-8.5zM15.8 29.3h15.9c-1.4 5.6-2.3 12-2.4 18.7H10c.4-6.8 2.4-13.2 5.8-18.7zm20 0H48V48H33.3c.1-6.8 1-13.2 2.5-18.7zm16.2 0h12.2A80.2 80.2 0 0 1 66.7 48H52zm16.3 0h16A39.8 39.8 0 0 1 90 48H70.7c-.1-6.7-1-13-2.4-18.7zM10 52h19.3c.1 6.6 1 12.9 2.3 18.4h-16A39.8 39.8 0 0 1 10 52zm23.3 0H48v18.4H35.7A80.5 80.5 0 0 1 33.3 52zM52 52h14.7c-.1 6.7-1 13-2.5 18.4H52zm18.7 0H90c-.4 6.7-2.4 13-5.6 18.4h-16A85 85 0 0 0 70.7 52zM18.3 74.4h14.4l2.2 5.9c1.6 3.4 3.4 6.3 5.5 8.5a40 40 0 0 1-22-14.4zm18.6 0h11v15c-1.2-.5-2.5-1.3-3.8-2.5-2-1.9-4-4.7-5.5-8.3l-1.7-4.2zm15 0H63a47 47 0 0 1-1.6 4.2A26.2 26.2 0 0 1 56 87c-1.3 1.2-2.6 2-4 2.4zm15.4 0h14.4a40 40 0 0 1-22 14.4c2-2.2 3.8-5.1 5.4-8.5.8-1.8 1.5-3.8 2.2-5.9z' color='%23797979' overflow='visible' style='text-indent:0;text-transform:none;block-progression:tb'/%3E%3C/svg%3E") no-repeat 10px 6.5px
  padding: 8px 13px 7px 38px
  font-size: 1.1em
  color: #5abbaa
  border: 1px solid #efefef
  border-radius: 10px
  margin: 0 7px 0 0px
  position: relative
  top: 6px
  background-size: 22px
  text-decoration: none

.location
  padding: 8px 13px 7px
  font-size: 1.1em
  color: rgba(0,0,0,0.6)
  border: 1px solid #efefef
  border-radius: 10px
  margin: 0px 0px
  position: relative
  top: 6px
  background-size: 22px
  text-decoration: none

.account
  width: 100%
  display: inline-block
  position: relative
  height: auto
  margin-top: 120px
.info
  width: 60%
  float: left
  margin: 0px 0 0 20px
  h3
    font-size: 2.1em
    padding: 6px 14px
    margin: 25px 0 10px
    border: 1px solid #5abbaa
    color: #5abbaa
    display: inline-block
    border-radius: 10px
  p
    font-size: 1.4em
    line-height: 34px

.logo
  width: 30%
  height: 270px
  float: left
  margin: 20px 20px 0
  border-right: 1px solid #efefef
  padding-right: 25px

@import url("https://fonts.googleapis.com/css?family=Open+Sans")

@import url("https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css")

#smart_aid
  background: #9437ff

#daily_visits
  background: #1b89ff

#total_visits
  background: #00A650

.score
  p
    font-size: 1.7em
    color: white
    font-weight: 600
    padding: 0 7px


.services
  h2, .score
    color: black !important
  div
    border: none !important
    h2, .score
      text-align: center !important

.finances
  h2
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 36.3'%3E%3Cpath fill-rule='evenodd' fill='rgba(0,0,0,0.7)' d='M5 24h3v-2H5v2zM23 5h5V3h-5v2zM10.1 8h11.7l-9.4-4.7L10.1 8zM30 10v3h-2v-3H5V8h2.9L11.6.7 26.2 8H28a2 2 0 0 1 2 2zm-2 10v-3h-4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4zm2-3v3a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2zm-2 7h2v3a2 2 0 0 1-2 2H4a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h3v2H4a2 2 0 0 0-2 2v18c0 1.1.9 2 2 2h24v-3z'/%3E%3C/svg%3E") no-repeat 22px 20px rgba(255,255,255,0.05) !important
    background-size: 30px !important
    padding-left: 66px !important
  h3
    text-align: center !important

*
  margin: 0
  padding: 0
  box-sizing: border-box
  &:before, &:after
    margin: 0
    padding: 0
    box-sizing: border-box
  &:before, &:after
    content: ''
    display: block
    position: absolute

html
  height: 100%

body
  height: 100%
  font: 15px/1 'Open Sans', sans-serif
  color: #777

a
  cursor: pointer

ul
  list-style: none

.wrapper
  display: flex
  min-height: 100vh

@keyframes slide
  100%
    transform: translate3d(0, 0px, 0)
    opacity: 1

main
  flex: 1
  border-radius: 20px
  padding: 30px 20px 0


.flex-grid
  display: flex
  transform: translate3d(0, 120px, 0)
  opacity: 0
  animation: slide .7s ease forwards
  > div
    flex: 1
    margin: 0 20px 10px 0
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1)
    padding: 15px
    border-radius: 15px
    background: #fff
    justify-content: center
    align-items: center
    .flex-grid > div
      margin: 10px 20px 10px
      border-top: 1px solid #efefef
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1)
      h3 
        margin: -15px -15px 15px -15px
        padding: 18px 20px 12px
        border-bottom: 2px solid rgba(0,0,0,0.02)
        font-family: sans-serif
        background: #fafafa !important
        color: black
        border-radius: 18px 18px 0 0
        border-top: solid 2px #fff
        font-size: 1.4em
        text-align: center !important
        font-weight: 600

    &:last-child
      margin-right: 0
  h2
    margin: -15px -15px 15px -15px
    padding: 20px 20px 17px
    background: rgba(255,255,255,0.15)
    font-family: sans-serif
    color: white
    font-size: 1.6em
    font-weight: 600

.score h3
  border-bottom: 1px solid rgba(255,255,255,0.3) !important

.services h2, .team h2, .finances h2
  margin: -15px -15px 15px -15px
  padding: 20px 20px 17px
  background: rgba(0,0,0,0.02)
  font-family: sans-serif
  color: rgba(0,0,0,0.7) !important
  font-size: 1.6em
  font-weight: 600
  border-radius: 15px 15px 0 0 
  border-bottom: 1px solid rgba(0,0,0,0.05)

.services
  margin: 15px 0 30px !important
  padding-bottom: 0
  div div
    background: #fafafa !important
    box-shadow: none !important
    border: 1px solid #efefef !important
    margin: 10px 10px 10px 0    
  p
    font-size: 1.35em
    color: black
    text-align: center
    font-weight: 600
    padding: 0 7px



.expenses
  width: 87%
  margin: 0 auto -20px
#staff 
  li
    background: rgba(27, 137, 255, 1.0000)
    color: white
    font-weight: bold
    &:first-child
      background: rgba(65, 184, 131, 1.0000)
      border-radius: 10px 0 0 10px
    &:nth-child(3)
      background: #ff8300
      border-radius: 0 10px 10px 0

#income 
  li
    background: rgba(65, 184, 131, 1.0000)
    color: white
    font-weight: bold
    border-radius: 0 10px 10px 0
    &:first-child
      background: rgba(27, 137, 255, 1.0000)
      border-radius: 10px 0 0 10px

.legend 
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  margin: 20px auto 0 !important
  ul
    display: inline-block
    width: auto
    border: 1px solid #efefef
    border-radius: 10px
    li
      float: left
      padding: 20px
      border-right: 1px solid #efefef
      &:last-child
        border: none
@media (max-width: 1000px)
  .flex-grid
    flex-direction: column
    > div
      margin-right: 0
</style>
