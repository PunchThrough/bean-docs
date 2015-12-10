console.log('frontend')

// Syntax highlighting. Depends on highlight.js
var pre = document.getElementsByTagName('pre')
var pl = pre.length
for (var i = 0; i < pl; i++) {
  pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML
  var num = pre[i].innerHTML.split(/\n/).length
  for (var j = 1; j < num; j++) {
    var line_num = pre[i].getElementsByTagName('span')[0]
    line_num.innerHTML += '<span>' + j + '</span>'
  }
};
hljs.initHighlighting()

// Make links that end in >> into buttons with »
var links = Array.prototype.slice.call(document.getElementsByTagName('a'))
var to_buttons = links.filter(function(e) { return e.text.endsWith('>>') })
to_buttons.forEach(function(e) {
  e.innerHTML = e.innerHTML.replace('&gt;&gt;', '&raquo;')
  $(e).addClass('btn btn-primary btn-lg')
})
