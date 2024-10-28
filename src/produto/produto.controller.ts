import { Controller, Get, Param } from '@nestjs/common';
import Produto from './produto.entity';
import produtos from 'src/constants/produtos';

@Controller('produtos') // define a URL: /produtos
export class ProdutoController {
  @Get('ping') //define o endpoint e o metodo
  ping(): string {
    return 'pong';
  }

  @Get() // quando entrar na url produtos ja vai mostrar todos os produtos
  async obterProdutos(): Promise<Produto[]> {
    return produtos;
  }

  @Get(':id')
  async obterProdutosId(@Param('id') id: string): Promise<Produto> {
    return produtos.find((produto) => produto.id === +id); //+id porque as requisições http so aceitam srting, e a nossa model produto o id é um tipo number, para comparar precisamos transformar o id string vindo da url em numero
  }
}
