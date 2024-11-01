import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import Produto from './produto.entity';
import produtos from 'src/constants/produtos';

@Controller('produtos') // Define o controlador para a URL base: /produtos
export class ProdutoController {
  @Get('ping') //define o endpoint e o metodo
  ping(): string {
    return 'pong';
  }

  @Get() // quando entrar na url produtos ja vai mostrar todos os produtos
  async obterProdutos(): Promise<Produto[]> {
    return produtos;
     //Estamos usando promises para tratar a função como assíncrona, pois acessamos um banco de dados ou API externa que demora. Isso permite que outras operações continuem enquanto os dados são carregados, sem bloquear o funcionamento da aplicação. OBS: na promise coloque o que ele vai devolver
  }

  @Get(':id')
  async obterProdutosId(@Param('id') id: string): Promise<Produto> {
    return produtos.find((produto) => produto.id === +id); //+id porque as requisições http so aceitam srting, e a nossa model produto o id é um tipo number, para comparar precisamos transformar o id string vindo da url em numero
    //@Param: implica que o id vem por meio da URL
  }

  @Post()
  async criarProduto(@Body() produto: Produto): Promise<void>{
    produtos.push({
      ...produto,
      id: produto.id ? produto.id : produtos.length + 1
    })
    console.log(produto.nome)
    //@body(): implica que os dados do produto vem do corpo da requisição

  }
}
