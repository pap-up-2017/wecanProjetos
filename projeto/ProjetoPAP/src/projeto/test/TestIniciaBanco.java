package projeto.test;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Estado;

public class TestIniciaBanco {
	
	@Test
	public void cadastrarEstado(){
		Estado uf = new Estado();
		uf.setNomeEstado("Paraná");
		uf.setSiglaEstado("PR");
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		dao.salvar(uf);
	}
}
