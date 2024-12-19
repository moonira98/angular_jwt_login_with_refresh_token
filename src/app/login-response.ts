export interface LoginResponse {
   
        message: string;
        result: boolean;
        data: {
          userId: number;
          emailId: string;
          token: string;
          refreshToken: string;
        };
      
      
}
