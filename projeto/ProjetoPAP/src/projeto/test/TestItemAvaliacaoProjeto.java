package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.business.ItemAvaliacaoProjetoBusiness;
import projeto.dao.ItemAvaliacaoProjetoDao;
import projeto.entity.ItemAvaliacaoProjeto;

public class TestItemAvaliacaoProjeto {
	
	@Test
	public void cadastrarItem(){
		ItemAvaliacaoProjeto item = new ItemAvaliacaoProjeto(); 
		item.setNomeItem("Item de teste");
		item.setDescricaoItem("Descrição do item de teste");
		ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
		itemBus.create(item);
	}
	
	@Test
	public void listarItens(){
		ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
		List<ItemAvaliacaoProjeto> itens = itemBus.listaAll();
		if(itens.size() > 0){
			// funcionou
		}
	}
	
	@Test
	public void deleteLogico (){
		ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		ItemAvaliacaoProjeto item = itemDao.getObjById(1);
		itemBus.deleteLogico(item);
	}
	
	
	@Test
	public void alterar(){
		ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		ItemAvaliacaoProjeto item = itemDao.getObjById(1);
		itemBus.ativaItem(item);
	}
	
	@Test 
	public void listaAtivos(){
		ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
		List<ItemAvaliacaoProjeto> itens = itemBus.listaAtivos();
		System.out.println("total de listados: "+itens.size());
		if(itens.size() > 0){
			// funcionou
		}
	}
}
