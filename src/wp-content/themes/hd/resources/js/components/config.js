export const hdConfig = {
    _ajaxUrl: window.hd?._ajaxUrl ?? '/wp-admin/admin-ajax.php',
    _baseUrl: window.hd?._baseUrl ?? window.location.origin + '/',
    _themeUrl: window.hd?._themeUrl ?? '',
    _csrfToken: window.hd?._csrfToken ?? '',
    _restToken: window.hd?._restToken ?? '',
    _lang: window.hd?._lang ?? 'vi',
};
