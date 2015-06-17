/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

$(function() {
    var $content = $('#content');

    $content.load('https://github.com/dashboard/index/1 .news', function() {
        if ($content.find('.alert').length === 0) {
            $('#login').show();
            return;
        }
        
        var user = $('.js-select-button').text();
        $('.select-menu-button.with-gravatar')
            .wrap('<a href="https://github.com/' + user + '" target="_blank"></a>')
            .parent().parent()
            .append('<span class="line-divider"></span>')
            .append('<a href="https://github.com/stars" target="_blank">Stars</a>')
            .append('<span class="line-divider"></span>')
            .append('<a href="https://github.com/notifications" target="_blank">Notifications</a>');

        $('.select-menu-modal-holder.js-menu-content').hide();

        $content.find('.alert').each(function(i) {
            var $time = $(this).find('.time').insertAfter($(this).find('.title')).find('[datetime]');

            $time.text(moment($time.attr('datetime')).fromNow());

            $(this).find('.details').hide();

            if (i === 0) {
                setStore('github-latest-item', {
                    title: $(this).find('.title').text(),
                    time: $time.attr('datetime')
                });
                showUnread(0);
            }
        });

        $content.find('a').attr('target', '_blank').each(function() {
            var href = $(this).attr('href');

            if (href.charAt(0) === '/') {
                $(this).attr('href', 'https://github.com' + href);
            }
        });
        $content.find('.pagination a').attr('href', 'https://github.com/dashboard/index/2');

        $content.find('.protip').hide();
    })
});
