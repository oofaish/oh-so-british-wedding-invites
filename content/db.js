// eslint-disable-next-line no-undef
db.createCollection('rsvps', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['names', 'attending', 'expectedPartyCount'],
            properties: {
                names: {
                    bsonType: 'string',
                    description: 'Name of everyone in the party',
                },
                email: {
                    bsonType: 'string',
                    description: 'Email address of one of the guests',
                },
                phoneNumber: {
                    bsonType: 'string',
                    description: 'Phone number.',
                },

                attending: {
                    enum: ['yes', 'no'],
                    description: 'Can only be one of the enum values and is required',
                },
                expectedPartyCount: {
                    bsonType: 'Int',
                    description: 'total expected party count',
                    default: 0,
                },
                diet: {
                    bsonType: 'string',
                    description: 'Dietary requirements',
                },
            },
        },
    },
});
