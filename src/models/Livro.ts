import {Usuario} from './Usuario';

export class Livro {
  id!: number;
  titulo!: string;
  autor!: string;
  dataEmprestimo!: Date;
  dataDevolucao!: Date;
  disponivel!: boolean;
  usuario!: Usuario; // Pode criar interface para Usuario também
}
