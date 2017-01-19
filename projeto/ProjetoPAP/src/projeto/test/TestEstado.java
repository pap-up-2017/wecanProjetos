package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Estado;


public class TestEstado {

	@Test
	public void cadastrarCurso(){
		Estado uf = new Estado();
		
		uf.setNomeEstado("Paraná");
		uf.setSiglaEstado("PR");
		
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		dao.salvar(uf);
		
	}
	
	@Test
	public void listarCurso() {		
		List<Estado> estados = FactoryDao.createEstadoDao().listar();
		
		if (estados.size() > 0) {
			//funcionou
		}

	}
}
