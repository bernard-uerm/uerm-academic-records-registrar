
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/registrar',
    component: () => import('layouts/RegistrarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Registrar.vue') }
    ]
  },
  {
    path: '/analytics',
    component: () => import('layouts/RegistrarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Analytics.vue') },
      { path: '/analytics/analytics-detailed/:id', component: () => import('components/analytics/Detailed.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
