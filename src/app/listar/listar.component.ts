import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  listaProdutos: Produto[];
  productEdit = { _id: '-1', titulo: '', preco: 0.0, descricao: '' };

  constructor(private web: WebService) {}

  carregarProdutos(): void {
    this.web.getProdutos().subscribe((res) => {
      this.listaProdutos = res;
    });
  }

  editarProduto(produto) {
    this.web.updateProduto(produto).subscribe((res) => {
      console.log('res');
      console.log(res);
      if (res.statusText == 'OK') {
        alert('A edição foi realizada com sucesso');
        window.location.reload();
      } else {
        alert('A edição não foi realizada!');
      }
    });
  }

  deletarProduto(id) {
    this.web.deleteProduto(id).subscribe((res) => {
      if (res.msg == 'Produto deletado com sucesso') {
        alert('A remoção foi realizada com sucesso');
        window.location.reload();
      } else {
        alert('A remoção não foi realizada!');
      }
    });
  }

  editCondition(produto) {
    console.log(produto);
    if (produto._id === this.productEdit._id) {
      this.editarProduto(produto);
    } else {
      this.productEdit = produto;
    }
  }

  clearEdit() {
    this.productEdit = { _id: '-1', titulo: '', preco: 0.0, descricao: '' };
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}
