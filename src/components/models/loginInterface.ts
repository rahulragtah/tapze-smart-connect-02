export interface signUpDTO {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    isVerified: number
  }

  export interface resendEmailDTO extends Record<string, unknown>{
    email: string;
    firstName: string;
    lastName:string;
    //transactionId:string;
    emailSubject:string;
    tagline:string;
    actionText:string;
    urlParam:string;
}
