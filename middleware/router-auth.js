import firebase from 'firebase/app'

export default function ({
  isServer,
  store,
  redirect,
  route
}) {
  if (!isServer && (store.getters.isAuthenticated && firebase.auth().currentUser)) {
    return redirect('/account/dashboard')
  }
  if (!store.getters.isAuthenticated && !firebase.auth().currentUser && isAdminRoute(route)) {
  	return redirect('/account/login')
  }
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path == '/account')) {
    return true
  }
}