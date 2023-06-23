// מודל זה נועד לאמת את זהות המשתמש
import jwt from 'jsonwebtoken';
import Account from './models/account.js';

export default (request, response, next) => {
    const brearHeader = request.headers['authorization'];
    // אנו מחלצים את תכונת ההרשאה מבקשת החזית 
    // תכונה זו מכילה מחרוזת עם המילה Bearer והאסימון של המשתמש    
    if(brearHeader){
        // אם מצאנו את תכונת ההרשאה
         // אנו מחלצים ממנו רק את האסימון של המשתמש
        const brearToken = brearHeader.split(' ')[1];
        // ועכשיו אנו מפענחים את האסימון בשיטה ההפוכה
        jwt.verify(brearToken, process.env.JWT_KEY, (err, authData) => {
            if(err) {
                // אם נקבל שגיאה נחזיר את קוד המצב 403
                return response.status(403);
            } else {
                // אחרת אנחנו מוסיפים לבקשת החזית שקיבלנו עוד שתי תכונות
                 // 1. האסימון
                 // 2. האובייקט עם פרטי המשתמש המפוענחים
                 //console.log("authData:" + JSON.stringify(authData));
                Account.findById(authData.dataTotoken._id)
                .then(account => {
                    console.log(account);
                    request.token = brearToken;
                    request.account = account;
                    // לאחר שנעשה את כל זה נחזור לפונקציה שקראה לשיטה זו
                    next();
                })
                .catch(err => {
                    return response.status(403);
                })
            }
        })

    } else {
        return response.status(403);
    }
}