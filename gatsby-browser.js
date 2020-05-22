import 'normalize.css';
import './src/global.css';

export const onRouteUpdate = () => {
  // For Google Analytics page views
  if (window.ga) {
    window.ga('send', 'pageview');
  }
};
