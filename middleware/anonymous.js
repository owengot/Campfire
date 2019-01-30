import firebase from 'firebase/app'

export default function ({
  isServer,
  store,
  redirect
}) {
  if (!store.getters.isAuthenticated) {
    return redirect('/account/login')
  }
}
