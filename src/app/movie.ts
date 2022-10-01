import { Actor } from "./actor";
import { Producer } from "./producer";

export interface Movie {
    id: number;
    directorName: string;
    title : string;
    summary : string;
    producer: Producer;
    actors : Actor[];
  }