    export function getFormattedAmount(amount) {
        return (isNumber(amount) ? '$' : '') + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    export function getRelativeTime(dateTime) {
        const date = new Date(dateTime);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const day = 1000 * 60 * 60 * 24;
        const week = day * 7;
        const month = day * 30;
        const year = day * 365;
        if (diff < day) {
            return `Today at ${date.toLocaleTimeString()}`;
        } else if (diff < day * 2) {
            return `Yesterday at ${date.toLocaleTimeString()}`;
        } else if (diff < day * 7) {
            return `${Math.floor(diff / day)} days ago at ${date.toLocaleTimeString()}`;
        } else if (diff < week * 2) {
            return `1 week ago at ${date.toLocaleTimeString()}`;
        } else if (diff < month) {
            return `${Math.floor(diff / week)} weeks ago at ${date.toLocaleTimeString()}`;
        } else if (diff < month * 2) {
            return `1 month ago at ${date.toLocaleTimeString()}`;
        } else if (diff < year) {
            return `${Math.floor(diff / month)} months ago at ${date.toLocaleTimeString()}`;
        } else if (diff < year * 2) {
            return `1 year ago at ${date.toLocaleTimeString()}`;
        } else {
            return `${Math.floor(diff / year)} years ago at ${date.toLocaleTimeString()}`;
        }
    }

    export function getFirstWord(str) {
        return str.split(' ')[0].toLowerCase();
    }

    // Inside helper function
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // set session storage
    export function setSessionStorage(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }

    export function getSessionStorage(key) {
        return JSON.parse(window.sessionStorage.getItem(key));
    }

    export function updateSessionStorage(key, value) {
        const data = getSessionStorage(key);
        const updatedData = Object.assign({}, data, value);
        setSessionStorage(key, updatedData);
    }

    export function removeSessionStorage(key) {
        window.sessionStorage.removeItem(key);
    }

    export function clearSessionStorage() {
        window.sessionStorage.clear();
    }

    export function logError(error, stack) {
        // style console log
        console.log('%cError: '+ error, 'color: red; font-weight: bold');
        console.log('%cStack: '+ stack, 'color: red; font-weight: bold');

    }