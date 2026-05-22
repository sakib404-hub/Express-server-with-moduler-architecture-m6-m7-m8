
export const USER_ROLE = {
    admin : 'admin',
    moderator : 'moderator'
} as const;

export type Roles ='admin' | 'moderator';