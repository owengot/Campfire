<template>
  <div>
  <div class="profile">

<div class="image-upload">
    <label for="file-input" class="profile-image">
        <img :src="newData.image"/>
    </label>

    <input id="file-input" type="file" accept="image/*" placeholder="Profile Image" v-on:change="updateProfileImage" ref="fileInput">

</div>

                  <h3 v-text="newData.displayName"></h3>
                  <p>Manage your account</p>

  </div>
  <form>
     <div class="entry">
      <div class="label"><p>Organisation Name</p></div>
      <div class="input">
        <input type="email" placeholder="Enter Your Organisation Name" v-model="newData.displayName" v-on:input="updateField('displayName')">
      </div>
    </div>
     <div class="entry">
      <div class="label"><p>Your Website</p></div>
      <div class="input">
                <input class="form-control" type="text" placeholder="Website" v-model="newData.websiteUrl" v-on:input="updateField('websiteUrl')">
      </div>
    </div>

    <div class="entry">
      <div class="label"><p>Description of your organisation</p></div>
      <div class="input">
        <textarea class="form-control" type="text" placeholder="Description" v-model="newData.description" v-on:input="updateField('description')">
          </textarea>
      </div>
    </div>
    
    
    <div class="save">
      <p class="fadeIn" v-if="formSuccess.length > 0" v-text="formSuccess"></p>
    </div>
  </form>
</div>
</template>

<style lang='scss'>

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
.save {
  border: none;
  font-size: 1.3em;
  padding: 10px 30px;
  border-radius: 15px;
  height: 40px;
  margin: 0 0 30px 20px;
  color: white !important;
  .fadeIn {
      background: rgba(97, 168, 146, 0.7);
      animation: fadeIn 1s ease forwards !important;
      display: inline-block;
      padding: 10px 15px;
      margin: -10px 0 0 27%;
      width: 400px;
      text-align: center;
      border-radius: 15px;
  }
   &:hover {
    background: #61a892
   }
  &:focus {
    outline: 0
  }
}
  


.image-upload > input
{
    display: none;
}

.profile {
  margin: 50px 10px 20px ;
  border: 0px solid #efefef;
  border-radius: 20px;
  overflow: hidden;
  width: 700px !important;
  display: inline-block;
  h3 {
    font-size: 2.7em;
    color: #61b999;
    padding-bottom: 5px;
    display: inline-block;
    margin: 25px 0 0 5px;
    border-bottom: 1px solid #efefef;
  }
  p {
    font-size: 1.65em;
    margin: 10px 0 0 5px;
     display: inline-block;
     width: 70%;
     font-weight: bold;
    color: #424242;
  }
}
 .profile-image {
    border-radius: 20px;
    overflow: hidden;
    width: 170px;
    height: 170px;
    float: left;
    margin: 0px 25px 0 0;
    border: 6px solid #efefef;
    position: relative;
    transition: background .3s ease;
  }

  .profile-image img {
    transition: all .3s ease;
  }
  .profile-image:hover {
    background: rgba(0,0,0,1);
    cursor: pointer;
    border: 6px solid #5ea38d;


  }

  .profile-image:hover:after{
position: absolute;
top: 40%;
left: 0;
text-align: center;
width: 100%;
height: 40px;
content: 'edit';
color: white;
font-size: 1.4em;
  }
  
  .profile {
    display: inline-block;
    height: auto
  }

  .profile-image:hover img {
    opacity: 0.3;
   
  }
  .profile-image img {
    width: 100%;
  }
form {
  width: 90%;
}
.profile {
  width: 100%;
  display: inline-block;
}
.entry .input {

  border: none;
  background: #efefef;
  box-shadow: none;
  width: auto;
  flex: 1;
  font-size: 1.45em;
}
.entry .input input {
  height: 100%;
  padding: 20px 20px 20px 30px;
  width: 100%;
  border: none;
  border-radius: 0 !important;
  font-size: 1.1em;
  transition: background 1s ease;
   box-shadow: none;
    border-left: 1px solid #ddd;

}
.entry input:focus {
    outline: 0 !important;
      background: #efefef;
border: none;
border-left: 1px solid #61b999;

  }
.entry .label {
  width: 30%;
    height: 70px;
    padding: 0 14px;
 display: flex;
  align-items: center;
  justify-content: left;
  box-shadow: none;
}
.entry .label p {
  height: auto;
  display: inline-block;
  margin: 0;
  font-size: 1.9em;
  line-height: 1.7em;
    color: #61b999;
    border: none;

  }
.entry {
  display: flex;
  height: auto;
  margin: 10px 0 30px;
border: none;
}
textarea {
  width: 100%;
  height: 250px;
  display: inline-block;
  padding: 20px 10px 20px 30px !important;
  border-radius: 0 !important;
  font-size: 1.1em !important;
  line-height: 1.55em !important;
  resize: none;
  border: none !important;
  border-left: 1px solid #ddd !important;
  background: #fff;
  box-shadow: none !important;
  transition: background 1s ease;
}
textarea:focus {
   outline: 0 !important;
      background: #efefef;
border: none;
border-left: 1px solid #61b999 !important;

}
</style>
<script>
import firebase from 'firebase/app'
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'user',
    'account'
  ]),
  data () {
    return {
      newData: {
        displayName: '',
        image: '',
        websiteUrl: '',
        description: ''
      },
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  mounted () {
    this.newData.displayName = this.account.displayName
    this.newData.image = this.account.image
    this.newData.description = this.account.description
    this.newData.websiteUrl = this.account.websiteUrl
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    updateField (key) {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        console.info('update field', key)
        this.$store.dispatch('userUpdate', this.newData)
          .then(() => {
            this.formSuccess = 'Saved'
          })
          .catch((err) => {
            this.formError = "We couldn't save that. Try reloading the browser."
            console.error(err)
          })
      }, 500)
    },
    updateProfileImage () {
      this.resetFormMessages()
      const file = this.$refs.fileInput.files[0]
      const ref = firebase.storage().ref().child(`accounts/profile/${this.user.uid}`)
      ref.put(file)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL()
        })
        .then((downloadUrl) => {
          return this.$store.dispatch('userUpdateImage', downloadUrl)
        })
        .then(() => {
          this.formSuccess = 'Successfully uploaded a new profile image'
          // reset the form input
          this.$refs.fileInput.value = null
        })
        .catch((err) => {
          this.formError = 'Error uploading new profile image'
          console.error(err)
        })
    }
  }
}
</script>
