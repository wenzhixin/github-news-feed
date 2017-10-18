/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

const CHECK_TIME = 5 * 60 * 1000 // 5 minutes

function checkUnread() {
  const $content = $('<div></div>')

  $content.load('https://github.com/dashboard/index/1 .news', () => {
    let unreadCount = 0
    const latestItem = getStore('github-latest-item')

    if ($content.find('.watch_started, .fork, .create').length === 0) { // not login
      unreadCount = -1
    } else if (!latestItem) { // first use
      unreadCount = 21
    } else {
      $content.find('.news>div').each(function() {
        if ($(this).hasClass('tabnav') || $(this).hasClass('text-gray')) {
          return
        }
        if (latestItem.title === $(this).find('.text-bold').text() &&
          latestItem.time === $(this).find('relative-time').attr('datetime')) {
          return false
        }
        unreadCount++
      })
    }
    showUnread(unreadCount)
    setTimeout(checkUnread, CHECK_TIME)
  })
}

checkUnread()
