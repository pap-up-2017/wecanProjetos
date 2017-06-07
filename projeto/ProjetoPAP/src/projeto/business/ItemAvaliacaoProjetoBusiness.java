package projeto.business;

import java.util.List;

import projeto.dao.ItemAvaliacaoProjetoDao;
import projeto.entity.ItemAvaliacaoProjeto;

public class ItemAvaliacaoProjetoBusiness {
	
	// cria
	public void create (ItemAvaliacaoProjeto item){
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		item.setIsActivated(true);
		itemDao.salvar(item);
	}
	
	// del logico
	public void deleteLogico (ItemAvaliacaoProjeto item){
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		item.setIsActivated(false);
		System.out.println("status do item: "+item.getIsActivated());
		itemDao.alterar(item);
	}
	
	// altera
	public void alterar(ItemAvaliacaoProjeto item){
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		itemDao.alterar(item);
	}
	
	// lista os ativos
	public List<ItemAvaliacaoProjeto> listaAtivos(){
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		return itemDao.listarNotDeleted();
	}
	
	// lista todos
	public List<ItemAvaliacaoProjeto> listaAll(){
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		return itemDao.listar();
	}
	
	// reativa
	public void ativaItem(ItemAvaliacaoProjeto item){
		item.setIsActivated(true);
		ItemAvaliacaoProjetoDao itemDao = new ItemAvaliacaoProjetoDao();
		itemDao.alterar(item);
	}
}
