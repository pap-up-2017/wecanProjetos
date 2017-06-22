package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.business.ItemAvaliacaoUsuarioBusiness;
import projeto.dao.ItemAvaliacaoUsuarioDao;
import projeto.entity.ItemAvaliacaoUsuario;

public class TestItemAvaliacaoProjeto {
	
	@Test
	public void cadastrarItem(){
		ItemAvaliacaoUsuario item = new ItemAvaliacaoUsuario(); 
		item.setNomeItem("Item de teste");
		item.setDescricaoItem("Descrição do item de teste");
		ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
		itemBus.create(item);
	}
	
	@Test
	public void listarItens(){
		ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
		List<ItemAvaliacaoUsuario> itens = itemBus.listaAll();
		if(itens.size() > 0){
			// funcionou
		}
	}
	
	@Test
	public void deleteLogico (){
		ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		ItemAvaliacaoUsuario item = itemDao.getObjById(1);
		itemBus.deleteLogico(item);
	}
	
	
	@Test
	public void alterar(){
		ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		ItemAvaliacaoUsuario item = itemDao.getObjById(1);
		itemBus.ativaItem(item);
	}
	
	@Test 
	public void listaAtivos(){
		ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
		List<ItemAvaliacaoUsuario> itens = itemBus.listaAtivos();
		System.out.println("total de listados: "+itens.size());
		if(itens.size() > 0){
			// funcionou
		}
	}
}
