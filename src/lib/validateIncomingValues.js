const nameRegex = /^.{3,}$/g;
const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

export function validateIncomingValues(rsvp) {
    let error;

    const fn = rsvp.names.match(nameRegex);
    const e = rsvp.email.match(emailRegex);

    if (!fn) {
        error = `Oops, there's a problem with your names`;
    } else if (fn && fn[0] !== rsvp.names) {
        error = `Oops, there's a problem with your names`;
    } else if (!e) {
        error = `Oops, there's a problem with the email`;
    } else if (e && e[0] !== rsvp.email) {
        error = `Oops, there's a problem with the email`;
    }

    return error;
}
