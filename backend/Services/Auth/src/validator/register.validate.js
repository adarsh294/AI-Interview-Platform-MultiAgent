import { body } from "express-validator";

export const registerValidation = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Username should be at least 3 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        // .custom(async (email) => {
        //     const user = await User.findOne({ email });

        //     if (user) {
        //         throw new Error("Email already exists");
        //     }

        //     return true;
        // })
        .bail()
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")

];