export interface Persoana {
  id?: string;
  nume?: string;
  prenume?: string;
  cnp?: string;
  telefon?: string;
}

export interface Aviz {
  id?: string;
  dataExpirare?: string;
  oferitDe?: string;
}

export interface Sanctiune {
  id?: string;
  descriere?: string;
  motiv?: string;
  dataExpirare?: string;
  oferitDe?: string;
  srl?: Srl;
}

export interface Srl {
  id?: string;
  nume?: string;
  tip?: string;
  locatie?: string;
  proprietar?: Persoana;
  avize?: Aviz[];
  sanctiuni?: Sanctiune[];
}
