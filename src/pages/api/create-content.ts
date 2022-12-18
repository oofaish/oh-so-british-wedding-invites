import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
    let result = await db.collection('content').remove();
    if (result.acknowledged) {
        result = await db.collection('content').insertOne(req.body);
    }

    return res.json({ acknowledged: result.acknowledged });
};
