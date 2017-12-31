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
          icon: 'icon-grid',
          name: 'Text',
          url: '/platform/text'
        },
        {
          icon: 'icon-grid',
          name: 'Opinion',
          url: '/platform/opinion'
        }
      ]
    }
  ]
};
