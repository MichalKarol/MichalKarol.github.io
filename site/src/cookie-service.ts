class CookieService {
    public static set_cookie_consent(value: boolean) {
        localStorage.setItem('cookie_consent', value.toString());
    }

    public static get_cookie_consent() {
        return localStorage.getItem('cookie_consent') === Boolean(true).toString();
    }
}

export default CookieService;
