/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

var CHECK_TIME = 5 * 60 * 1000; // 5 minutes

function checkUnread() {
    var $content = $('<div></div>');

    $content.load('https://github.com/dashboard/index/1 .news', function() {
        var unreadCount = 0,
            latestItem = getStore('github-latest-item');

        if ($content.find('.alert').length === 0) {  // not login
            unreadCount = -1;
        } else if (!latestItem) { // first use
            unreadCount = 21;
        } else {
            $content.find('.alert').each(function() {
                if (latestItem.title === $(this).find('.title').text() &&
                    latestItem.time === $(this).find('time').attr('datetime')) {
                    return false;
                }
                unreadCount++;
            });
        }
        showUnread(unreadCount);
        setTimeout(checkUnread, CHECK_TIME);
    });
}

checkUnread();