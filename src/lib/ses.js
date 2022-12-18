export function checkResponse(rsvp) {
    let response;
    if (rsvp.attending === 'yes') {
        response = `
            You received another response to the wedding! ${rsvp.names} is going to attend!
            They are bringing ${rsvp.expectedPartyCount} total number of people.
            
            Email: ${rsvp.email}

            Phone number: ${rsvp.phoneNumber}
            
            ${rsvp.diet ? `Dietery requirements: ${rsvp.diet}` : ''}
        `;
    } else if (rsvp.attending === 'no') {
        response = `
            You received another response to the wedding. ${rsvp.names} is not able to attend.
        `;
    }
    return response;
}
