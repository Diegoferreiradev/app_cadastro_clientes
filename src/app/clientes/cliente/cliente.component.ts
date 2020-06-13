import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from 'src/app/cliente/cliente-form/cliente-form.component';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ClienteViewModel } from 'src/app/cliente/models/cliente-view-model';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
              private modalService: NgbModal,
              private clienteService: ClienteService
              ) { }

              
  clientes: ClienteViewModel[] = [];
  
  ngOnInit(): void {
    this.mostrarClientes();
  }


  addCliente() {
    const modal = this.modalService.open(ClienteFormComponent);
    modal.result.then(
      this.handleModalClienteFormComponent.bind(this),
      this.handleModalClienteFormComponent.bind(this)
    )
  }

  EditarClick(cliente: ClienteViewModel) {
     const modal = this.modalService.open(ClienteFormComponent);
     modal.result.then(
      this.handleModalClienteFormComponent.bind(this),
      this.handleModalClienteFormComponent.bind(this)
    )
    modal.componentInstance.modoInsercao = false;
    modal.componentInstance.cliente = cliente;
  }

  mostrarClientes() {  
    this.clienteService.getClientes().subscribe(response => {
    this.clientes = [];
    response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const cliente: ClienteViewModel = {
          id: id,
          nome: data.nome,
          endereco: data.endereco,
          casado: data.casado,
          dataMod: data.dataMod.toDate()

        };
        this.clientes.push(cliente);
      });   
      });
  }

  DeletarClick(ClienteId: string, index: number) {
    this.clienteService.deletarClientes(ClienteId)
      .then(() => { this.clientes.splice(index, 1); })
      .catch(err => console.error(err));
  }


  checkedCasado(index: number) {
    const novoValor = !this.clientes[index].casado
    this.clientes[index].casado = novoValor;

    const obj = { casado: novoValor };
    const id = this.clientes[index].id;
    this.clienteService.editarClientesParcial(id, obj);
  }


  handleModalClienteFormComponent(response) {
      if (response === Object(response)) {
        if(response.modoInsercao) {
          response.cliente.id = response.id;
          this.clientes.unshift(response.cliente)
        }
        else {
          let index = this.clientes.findIndex(value => value.id == response.id);
          this.clientes[index] = response.cliente;
        }
      }
  }
  
}
