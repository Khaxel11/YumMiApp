export interface UsuarioERP {
    id: string;
    nombre: string;
    zonaId?: string;
    correo?: string;
    correos?: string;
    area?: string;
    puesto?: string;
    departamentoId?: number;
}

export class UsuarioERP {
    id = '';
    nombre = '';
    zonaId?: string;
    correo?: string;
    correos?: string;
    area?: string;
    puesto?: string;
    departamentoId?: number;
}
