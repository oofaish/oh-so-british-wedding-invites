import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { validateIncomingValues } from '@/lib/validateIncomingValues';
import connectToDatabase from '@/lib/mongodb';
import { checkResponse } from '@/lib/ses';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) return res.status(401);

    const error = validateIncomingValues(req.body);
    req.body.date = new Date();
    if (error) return res.json({ error });

    const { db } = await connectToDatabase();

    const { acknowledged } = await db.collection('rsvps').insertOne(req.body);

    try {
        let errorSesCheck;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

        const msg: MailDataRequired = {
            to: process.env.USER_EMAIL,
            from: process.env.ADMIN_EMAIL as string,
            subject: `Wedding response from ${req.body.names}`,
            text: checkResponse(req.body) as string,
            html: checkResponse(req.body) as string,
        };

        // eslint-disable-next-line no-shadow
        const sgResults = await sgMail.send(msg).catch((error) => {
            console.log('err sending email', error.message);
            errorSesCheck = error.message;
        });
        console.log(sgResults);
        if (errorSesCheck) {
            return res.json({ success: 'false', errorSesCheck });
        }
        return res.json({ success: acknowledged ? 'true' : 'false' });
    } catch (err) {
        return console.log('ERROR sending email TO CLIENT: ', err);
    }
};
