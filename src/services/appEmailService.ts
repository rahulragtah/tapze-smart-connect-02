import emailjs from '@emailjs/browser';

export const sendRestPasswordEmail = async (email: string, FirstName: string ,lastName : string, transactionId: string ) => {
// send email from this place to customer for reset password
const emailPayload = {email,FirstName,lastName,transactionId}
    try {
        await emailjs.send('tapzeEmailService', 'template_1ncvqdb', emailPayload, 'iwIaefaueRobx3b5j');
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }
    console.log("reset link is sent to ", email);
  
};