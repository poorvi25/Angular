//used as dataModel for formModel, used for mapping data stored on server side;
export class Feedback{
    firstname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;
}

export const ContactType = ['None','Tel','Email'];