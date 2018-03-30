// Measuring the Critical Rendering Path with Navigation Timing
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp

function logCRP() {
  var t = window.performance.timing,
    dcl = t.domContentLoadedEventStart - t.domLoading,
    complete = t.domComplete - t.domLoading;
  var stats = document.getElementById("crp-stats");
  stats.textContent = 'DCL: ' + dcl + 'ms, onload: ' + complete + 'ms';
}

window.addEventListener("load", function(event) {
  logCRP();

  var head = document.querySelector('head');
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', '//fonts.googleapis.com/css?family=Open+Sans:400,700');
  head.appendChild(link);

  var body = document.querySelector('body');
  var gaScript = document.createElement('script');
  
  gaScript.innerHTML = '!function(a,g){a.GoogleAnalyticsObject=g,a.ga=a.ga||function(){(a.ga.q=a.ga.q||[]).push(arguments)},a.ga.l=1*new Date}(window,"ga"),ga("create","UA-XXXX-Y"),ga("send","pageview");'

  body.appendChild(gaScript);

  var gaScriptAsync =  document.createElement('script');

  gaScriptAsync.setAttribute('async', '');
  gaScriptAsync.setAttribute('src', 'https://www.google-analytics.com/analytics.js');

  body.appendChild(gaScriptAsync);

});
