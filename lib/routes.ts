export const homepageRoutes = {
  home: {
    label: 'Home',
    path: '/',
    name: 'home',
  },
  challengeHackathons: {
    label: 'Challenge & Hackathons',
    path: '/challenges',
    name: 'challenge-hackathons',
  },
  learningInstitutions: {
    label: 'For Learning Institutions',
    path: '/learning-institutions',
    name: 'learning-institutions',
  },
  about: {
    label: 'About Us',
    path: '/about-us',
    name: 'about',
  },
  contact: {
    label: 'Contact Us',
    path: '#contact-us',
    name: 'contact',
  },
  login: {
    label: 'Login',
    path: '/login',
    name: 'login',
  },
  signup: {
    label: 'Signup',
    path: '/signup',
    name: 'signup',
  },
  forgotPassword: {
    label: 'Forgot Password',
    path: '/forgot-password',
    name: 'forgot-password',
  }

};

export const dashboardRoutes = {
  dashboard: {
    label: 'Dashboard',
    path: '/dashboard',
    name: 'dashboard',
  },
  challengeHackathons: {
    label: 'Challenge & Hackathons',
    path: '/dashboard/challenges',
    name: 'challenge-hackathons',
    new: {
      label: 'Create New Challenge',
      path: '/dashboard/challenges/new',
      name: 'create-new-challenge',
    },
    // edit: {
    //   label: 'Edit a Challenge',
    //   path: '/dashboard/challenges/',
    //   name: 'create-new-challenge',
    // },
  },
  community: {
    label: 'Community',
    path: '/community',
    name: 'community',
  },
  profile: {
    label: 'Profile',
    path: '/dashboard/profile',
    name: 'profile',
  },
  settings: {
    label: 'Settings',
    path: '/dashboard/settings',
    name: 'settings',
  },
};
