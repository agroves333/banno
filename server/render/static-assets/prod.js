import { GOOGLE_ANALYTICS_ID } from '../../../config/env';
import assets from '../../../public/assets/manifest.json';

const createAppScript = () => `<script type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`;

const createTrackingScript = () => GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID) : '';

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

export { createAppScript, createTrackingScript };

