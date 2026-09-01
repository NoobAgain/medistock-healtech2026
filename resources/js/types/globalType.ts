export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface ActiveMenuPage {
    id: number;
}


export interface Faskes {
    id: number;
    kode: string;
    nama: string;
}

export interface UnitRawat {
    id: number;
    faskes_id: number;
    kode: string;
    nama: string;
}

export interface Periode {
    id: number;
    nama: string;
}

export enum ResultSelectWithCreate {
    id = 'id',
    name = 'name',
    json = 'json',
}
