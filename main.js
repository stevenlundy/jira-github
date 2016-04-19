
var baseURL = 'https://kanjoya.atlassian.net/browse/';
var ticketPattern = /\[(PER-\d+)\]/gi;

var createLinkToJira = function(fullMatch, ticket) {
  return `<a href="${ baseURL + ticket }" target="_blank">${ fullMatch }</a>`;
};

var addLinksToTitles = function () {
  var titles = document.querySelectorAll('.js-issue-title');
  for (var i = 0; i < titles.length; i++) {
    if (!titles[i].classList.contains('jirafied')) {
      titles[i].innerHTML = titles[i].innerHTML.replace(ticketPattern, createLinkToJira);
      titles[i].classList.add('jirafied');
    }
  }
};

addLinksToTitles();

var observer = new MutationObserver(function (mutations) {
  addLinksToTitles();
});

var config = { attributes: true, childList: true, characterData: true };

observer.observe(document.querySelector('#js-repo-pjax-container'), config);
