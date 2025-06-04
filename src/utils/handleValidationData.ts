import isEmail from 'validator/lib/isEmail';

export const validateEmail = (email: string) => {
    if (!email.trim()) return 'Поле обязательно';
    if (/\s/.test(email)) return 'Почта не должна содержать пробелы';
    if (!isEmail(email.trim())) return 'Недопустимый формат';
    return '';
};

export const validatePassword = (password: string) => {
    if (!password.trim()) return 'Поле обязательно';
    if (/\s/.test(password)) return 'Пароль не должен содержать пробелы';
    if (password.trim().length < 6) return 'Минимальная длина пароля: 6 символов';
    return '';
};

export const validateAge = (age?: string) => {
    if (!age) return '';
    if (!/^\d{1,2}$/.test(age)) return 'Возраст должен быть числом до 99';
    return '';
};