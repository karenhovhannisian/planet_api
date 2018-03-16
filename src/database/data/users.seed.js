import bcrypt from 'bcryptjs';

export const testPass = 'user_pass';

export const insertingUser = {
    id: 1,
    name: 'Test User',
    email: 'user@example.com',
    password: bcrypt.hashSync(testPass, bcrypt.genSaltSync(8))
};
