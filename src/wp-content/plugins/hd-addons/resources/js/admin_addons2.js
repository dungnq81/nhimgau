

jQuery(function($) {
    // wpColorPicker
    $('.addon-color-field').wpColorPicker();

    // codemirror
    if (typeof codemirror_settings !== 'undefined') {
        const codemirror_css = document.querySelectorAll('.codemirror_css');
        const codemirror_html = document.querySelectorAll('.codemirror_html');

        function initializeCodeMirror(elements, settings, type) {
            elements.forEach(el => {
                if (!el.CodeMirror) {
                    let editorSettings = settings ? { ...settings } : {};
                    editorSettings.codemirror = {
                        ...editorSettings.codemirror,
                        indentUnit: 3,
                        tabSize: 3,
                        autoRefresh: true,
                    };
                    el.CodeMirror = wp.codeEditor.initialize(el, editorSettings);
                }
            });
        }

        initializeCodeMirror(codemirror_css, codemirror_settings.codemirror_css, 'CSS');
        initializeCodeMirror(codemirror_html, codemirror_settings.codemirror_html, 'HTML');
    }

    $.fn.fadeOutAndRemove = function(speed) {
        return this.fadeOut(speed, function() {
            $(this).remove();
        });
    };

    $.fn.serializeObject = function() {
        let obj = {};
        let array = this.serializeArray();
        $.each(array, function() {
            let name = this.name;
            let value = this.value || '';
            if (name.indexOf('[]') > -1) {
                name = name.replace('[]', '');
                if (!obj[name]) {
                    obj[name] = [];
                }
                obj[name].push(value);
            } else {
                if (obj[name] !== undefined) {
                    if (!Array.isArray(obj[name])) {
                        obj[name] = [ obj[name] ];
                    }
                    obj[name].push(value);
                } else {
                    obj[name] = value;
                }
            }
        });

        return obj;
    };

    // hide notice
    $(document).on('click', '.notice-dismiss', function(e) {
        $(this).closest('.notice.is-dismissible')?.fadeOutAndRemove(500);
    });

    // ajax submit settings
    $(document).on('submit', '#_settings_form', function(e) {
        e.preventDefault();
        let $this = $(this);
        let $data = $this.serializeObject();

        let btn_submit = $this.find('button[name="_submit_settings"]');
        let button_text = btn_submit.html();
        let button_text_loading = '<span class="ajax-loader">&nbsp;</span>';

        btn_submit.prop('disabled', true).html(button_text_loading);
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'submit_settings',
                _data: $data,
                _ajax_nonce: $this.find('input[name="_wpnonce"]').val(),
                _wp_http_referer: $this.find('input[name="_wp_http_referer"]').val(),
            },
        })
            .done(function(data) {
                btn_submit.prop('disabled', false).html(button_text);
                $this.find('#_content').prepend(data);

                // auto reload tabs
                if (!window.location.hash ||
                    window.location.hash === '#global_setting_settings' ||
                    window.location.hash === '#custom_css_settings' ||
                    window.location.hash === '#custom_script_settings' ||
                    (window.location.hash === '#custom_sorting_settings' && $data['order_reset'] !== undefined) ||
                    (window.location.hash === '#base_slug_settings' && $data['base_slug_reset'] !== undefined)
                ) {
                    window.location.reload();
                }

                // dismissible auto hide
                setTimeout(() => {
                    $this.find('#_content')?.find('.dismissible-auto')?.fadeOutAndRemove(400);
                }, 4000);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                btn_submit.prop('disabled', false).html(button_text);
                console.log(errorThrown);
            });
    });

    // filter tabs
    const $filterTabs = $('.filter-tabs');
    $filterTabs.each(function() {
        const $el = $(this),
            $nav = $el.find('.tabs-nav'),
            $content = $el.find('.tabs-content'),
            $tabs = $nav.find('a'),
            initialHash = window.location.hash;

        const activateTab = (hash) => {
            const $tab = $nav.find(`a[href="${hash}"]`);
            $nav.find('a').removeClass('current');
            $content.find('.tabs-panel').hide();

            if ($tab.length) {
                $tab.addClass('current');
                $(hash).show();
            } else {
                $tabs.first().addClass('current');
                $content.find('.tabs-panel').first().show();
                window.history.replaceState(null, null, window.location.pathname + window.location.search);
            }
        };

        activateTab(initialHash || $tabs.first().attr('href'));

        $nav.on('click', 'a', function(e) {
            e.preventDefault();
            const hash = $(this).attr('href');
            window.location.hash = hash;
            activateTab(hash);
            $('html, body').animate({ scrollTop: $el.offset().top - $('header').outerHeight() }, 300);
        });

        $(window).on('hashchange', function() {
            activateTab(window.location.hash || $tabs.first().attr('href'));
        });
    });
});
