package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.dao.UsuarioDao;
import projeto.dao.UsuarioLogadoDao;
import projeto.entity.TipoUsuario;
import projeto.entity.Usuario;
import projeto.entity.UsuarioLogado;

public class TestUsuarioLogado {
	
	@Test
	public void cadastrarUsuarioLogado(){
		InterfaceDao<Usuario> daoUser = FactoryDao.createUsuarioDao();
		Usuario u = daoUser.getObjById(2);
		
		UsuarioLogado uLog = new UsuarioLogado();
		uLog.setIdUsuarioLogado(u.getIdUsuario());
		uLog.setTipoUsuarioLogado(u.getTipoUsuario().getTipoUsuario());
		InterfaceDao<UsuarioLogado> dao = FactoryDao.createUsuarioLogadoDao();
		dao.salvar(uLog);
	}
	
	@Test
	public void listarUsuarioLogado() {		
		List<UsuarioLogado> usuariosLogados = FactoryDao.createUsuarioLogadoDao().listar();
		if (usuariosLogados.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void excluirUsuarioLogado(){
		InterfaceDao<UsuarioLogado> dao = FactoryDao.createUsuarioLogadoDao();
		UsuarioLogado u = dao.getObjById(3);
		dao.excluir(u);
	}

}
