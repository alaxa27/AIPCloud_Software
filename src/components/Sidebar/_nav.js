export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Entries',
      url: '/entries',
      icon: 'icon-phone'
    }, {
      name: 'Platform',
      url: '/platform',
      icon: 'icon-grid',
      children: [
        {
          name: 'Text',
          url: '/platform/text',
          icon: 'icon-grid'
        },
        {
          name: 'Opinion',
          url: '/platform/opinion',
          icon: 'icon-grid'
        }
      ]
    },
    {
      name: 'Logout',
      url: '/login',
      icon: 'icon-logout',
      class: 'mt-auto',
      variant: 'danger'
    }
  ]
};
