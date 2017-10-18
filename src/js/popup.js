/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

$(function() {
  const $content = $('#content')

  $content.load('https://github.com/dashboard/index/1 .news', function() {
    if ($content.find('.watch_started, .fork, .create').length === 0) {
      $('#login').show()
      return
    }

    const $header = $('<div class="header border-bottom"></div>')
    $header.append('<a href="#" target="_blank"><span class="avatar">' +
        '</span> <span class="username">loading...</span></a>')
      .append('<span class="line-divider"></span>')
      .append('<a href="https://github.com/stars" target="_blank">Stars</a>')
      .append('<span class="line-divider"></span>')
      .append('<a href="https://github.com/notifications" target="_blank">Notifications</a>')

    $header.find('.avatar').load('https://github.com .HeaderMenu .avatar')
    $header.find('.username').load('https://github.com strong.css-truncate-target', function() {
      $header.find('.username').parent()
        .attr('href', 'https://github.com/' + $header.find('.username').text())
    })
    $content.prepend($header)

    $content.find('.tabnav, form, .text-gray').remove()

    $content.find('.news>div').each(function(i) {
      const $time = $(this).find('relative-time')
      $time.text(moment($time.attr('datetime')).fromNow())

      if (i === 0) {
        setStore('github-latest-item', {
          title: $(this).find('.text-bold').text(),
          time: $time.attr('datetime')
        })
        showUnread(0)
      }
    })

    $content.find('a').attr('target', '_blank').each(function() {
      const href = $(this).attr('href')

      if (href.charAt(0) === '/') {
        $(this).attr('href', 'https://github.com' + href)
      }
    })
  })
})
