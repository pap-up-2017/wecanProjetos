package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Estado;


public class TestEstado {

	@Test
	public void cadastrarEstado(){
		Estado uf = new Estado();
		uf.setNomeEstado("Paraná");
		uf.setSiglaEstado("PR");
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		dao.salvar(uf);
	}
	
	@Test
	public void listarEstado() {		
		List<Estado> estados = FactoryDao.createEstadoDao().listar();
		if (estados.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarEstado(){
		Estado uf = new Estado();
		uf.setNomeEstado("Teste de alteração");
		uf.setSiglaEstado("SP");
		uf.setIdEstado(2);
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		dao.alterar(uf);
	}
	
	@Test 
	public void excluirEstado(){
		Estado uf = new Estado();
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		uf = dao.getObjById(36);
		dao.excluir(uf);
	}
	
}
