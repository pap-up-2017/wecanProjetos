package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.TipoUsuario;

public class TestTipoUsuario {
	
	@Test
	public void cadastrarTipoUsuario(){
		TipoUsuario t = new TipoUsuario();
		
		t.setTipoUsuario("Professor");
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		dao.salvar(t);
	}
	
	@Test
	public void listarTipoUsuario() {		
		List<TipoUsuario> tipousuarios = FactoryDao.createTipoUsuarioDao().listar();
		if (tipousuarios.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarTipoUsuario(){
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		TipoUsuario t = new TipoUsuario();
		t = dao.getObjById(2);
		t.setTipoUsuario("Professor");
		dao.alterar(t);
	}
	
	@Test
	public void excluirTipoUsuario(){
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		TipoUsuario t = dao.getObjById(3);
		dao.excluir(t);
	}

}
