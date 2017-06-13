package projeto.business;

import java.util.List;

import projeto.dao.ItemAvaliacaoUsuarioDao;
import projeto.entity.ItemAvaliacaoUsuario;

public class ItemAvaliacaoUsuarioBusiness {
	
	// cria
	public void create (ItemAvaliacaoUsuario item){
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		item.setIsActivated(true);
		itemDao.salvar(item);
	}
	
	// del logico
	public void deleteLogico (ItemAvaliacaoUsuario item){
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		item.setIsActivated(false);
		System.out.println("status do item: "+item.getIsActivated());
		itemDao.alterar(item);
	}
	
	// altera
	public void alterar(ItemAvaliacaoUsuario item){
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		itemDao.alterar(item);
	}
	
	// lista os ativos
	public List<ItemAvaliacaoUsuario> listaAtivos(){
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		return itemDao.listarNotDeleted();
	}
	
	// lista todos
	public List<ItemAvaliacaoUsuario> listaAll(){
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		return itemDao.listar();
	}
	
	// reativa
	public void ativaItem(ItemAvaliacaoUsuario item){
		item.setIsActivated(true);
		ItemAvaliacaoUsuarioDao itemDao = new ItemAvaliacaoUsuarioDao();
		itemDao.alterar(item);
	}
}
