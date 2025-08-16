import emailjs from '@emailjs/browser';
import {resendEmailDTO} from '../components/models/loginInterface'

export const sendRestPasswordEmail = async (payload : resendEmailDTO ) => {
// send email from this place to customer for reset password
    console.log("sendRestPasswordEmail payload ", payload);
    try {
        await emailjs.send('tapzeEmailService', 'template_1ncvqdb', payload, 'iwIaefaueRobx3b5j');
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }
};

export const sendAccountVerificationEmail = async (payload : resendEmailDTO ) => {
// send email from this place to customer for reset password

    try {
        await emailjs.send('tapzeEmailService', 'template_1ncvqdb', payload, 'iwIaefaueRobx3b5j');
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }
};