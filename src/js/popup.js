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
    })
});