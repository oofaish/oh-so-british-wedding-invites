/* eslint-disable prettier/prettier */
export default (attending, names) =>
    attending === 'yes'
        ? `
            Dear ${names},<br><br>

            Thank you for RSVP-ing. We are delighted you can make it to our wedding celebration in ${process.env.WEDDING_LOCATION_AND_DATE}.<br><br>
            If you have any questions, please don't hesitate to reach out to us on email or phone.<br><br>
            Looking forward to spending time with you!<br><br>
            Best Wishes<br><br>
            ${process.env.NEXT_PUBLIC_COUPLES_NAME}
        `
        : attending === 'no'
        ? `
                Dear ${names},<br><br>

                Thank you for RSVP-ing. We are sorry to hear you cannot make our wedding.<br><br>

                Hopefully we can get together at another point to catch up.<br><br>

                Best Wishes<br><br>
                ${process.env.NEXT_PUBLIC_COUPLES_NAME}
            `
        : `
                Sorry what?
            `;
