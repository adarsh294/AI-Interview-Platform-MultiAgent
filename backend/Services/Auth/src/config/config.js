
if (!process.env.MONGO_URI) {
    throw new Error("Connection failed to DB");
}

if (!process.env.PORT) {
    throw new Error("Connection failed to DB");
}

if (!process.env.JWT_SECRET) {
    throw new Error("jwt secret not defined");
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
     PORT:process.env.PORT,
     JWT_SECRET:process.env.JWT_SECRET
};
