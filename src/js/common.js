/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

function getStore(name) {
    try {
        return JSON.parse(localStorage[name]);
    } catch (e) {}
    return null;
}

function setStore(name, value) {
    localStorage[name] = JSON.stringify(value);
}

function showUnread(unreadCount) {
    var text = '';

    if (unreadCount > 20) {
        text = '20+';
    } else if (unreadCount > 0) {
        text = unreadCount + '';
    } else if (unreadCount === -1) {
        text = 'x';
    }

    chrome.browserAction.setBadgeText({text: text});
}