import { IUserGooglePut, IUserLogin } from '@/interfaces/RequestInterfaces';
import Cookies from 'js-cookie';
import {decode} from "jsonwebtoken";
const googleUserKey = "googleUser";
const regularUserKey = "regularUser";


export function useUserCookies() {

    const saveGoogleUser = (newGoogleUser: IUserGooglePut) => {
        const dataToString = JSON.stringify(newGoogleUser);
        Cookies.set(googleUserKey, dataToString, { expires: 7 });
      };
    
      const saveRegularUser = (newRegularUser: IUserLogin) => {
        const dataToString = JSON.stringify(newRegularUser);
        Cookies.set(regularUserKey, dataToString, { expires: 7 });
      };
    
      const saveUserToken = (token: string) => {
        const cookieString = JSON.stringify(token);
        Cookies.set("token", cookieString, { expires: 7 });
      };
    
      const getUserToken = (): string | null => {
        const token = Cookies.get("token");
        return token ? JSON.parse(token) : null;
      };
    
      const removeUserToken = () => {
        Cookies.remove("token");
      };
    
      const getGoogleUser = (): IUserGooglePut | null => {
        const googleUser = Cookies.get(googleUserKey);
    
        if (googleUser) {
          try {
            const cookieParse = JSON.parse(googleUser);
    
            return cookieParse;
          } catch (error) {
            console.error("Error parsing Google User from cookies:", error);
            return null;
          }
        } else {
          return null;
        }
      };
    
      const getRegularUser = (): IUserLogin | null => {
        const regularUser = Cookies.get(regularUserKey);
    
        if (regularUser) {
          try {
            const cookieParse = JSON.parse(regularUser);
    
            return cookieParse;
          } catch (error) {
            return null;
          }
        } else {
          console.warn("Regular User cookie not found.");
          return null;
        }
      };
    
      const deleteGoogleUser = () => {
        Cookies.remove(googleUserKey);
      };
    
      const deleteRegularUser = () => {
        Cookies.remove(regularUserKey);
      };
    
      const isValidToken = (token: string) => {
        try {
          const decoded = decode(token);
          if (!decoded) {
            return false; // Invalid token
          }
          if (
            typeof decoded === "object" &&
            decoded.exp &&
            Date.now() >= decoded.exp * 1000
          ) {
            return false; // Token has expired
          }
          return true; // Token is valid
        } catch (error) {
          console.error("Invalid token:", error);
          return false; // Token is invalid
        }
      };
    
      return {
        saveGoogleUser,
        saveRegularUser,
        getGoogleUser,
        getRegularUser,
        deleteGoogleUser,
        deleteRegularUser,
        saveUserToken,
        getUserToken,
        removeUserToken,
        isValidToken,
      };
}