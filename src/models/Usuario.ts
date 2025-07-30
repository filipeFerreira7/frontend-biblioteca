export class Usuario {
  id?: number; // opcional, pois geralmente é gerado pelo backend
  nome!: string;
  dataNascimento!: string; // ou Date, dependendo do formato que você usa
  email!: string;
  matricula!: string;
}
