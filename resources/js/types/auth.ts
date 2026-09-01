export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

// export type Auth = {
//     uid: number;
//     name: string;
//     email: string,
// };

// export interface UserInfo {
//     name: string;
//     email: string;
//     avatar: string;
// }
