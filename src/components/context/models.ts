export interface RSVP {
    names: string;
    email: string;
    phoneNumber: string;
    attending: 'yes' | 'no';
    expectedPartyCount: number;
    diet: string;
}

export interface Guest extends RSVP {
    _id: string;
}

export interface Action {
    type: string;
    payload?: any;
}

export interface Content {
    title: string;
    firstDate: string;
    secondDate: string;
    saturday: Array<Array<string>>;
    sunday: Array<Array<string>>;
    hotels: Array<string>;
    rsvpDate: string;
    venue1: Array<string>;
    venue2: Array<string>;
    footnote: string;
}
