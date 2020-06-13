import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { ClienteViewModel } from '../models/cliente-view-model';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFirestore) { }

  private clienteCollection = 'clientes';

  getClientes(): Observable<firebase.firestore.QuerySnapshot>{
    return this.db.collection<Cliente>(this.clienteCollection, ref => ref.orderBy('nome', 'asc')).get();
  }

  salvarClientes(cliente: Cliente): Promise<DocumentReference>{
    return this.db.collection(this.clienteCollection).add(cliente);
  }

  editarClientes(cliente: ClienteViewModel): Promise<void> {
    return this.db.collection(this.clienteCollection).doc(cliente.id).update(cliente);
  } 

  editarClientesParcial(id: string, obj: object): Promise<void> {
    return this.db.collection(this.clienteCollection).doc(id).update(obj);
  } 
  
  deletarClientes(id: string): Promise<void> {
    return this.db.collection(this.clienteCollection).doc(id).delete();
  } 

}
