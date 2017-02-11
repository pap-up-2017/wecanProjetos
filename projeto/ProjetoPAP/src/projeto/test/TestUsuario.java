package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Cidade;
import projeto.entity.Curso;
import projeto.entity.InstituicaoEnsino;
import projeto.entity.TipoUsuario;
import projeto.entity.Usuario;

public class TestUsuario {
	
	@Test
	public void cadastrarUsuario(){
		Usuario u = new Usuario();
		u.setNomeUsuario("Usuario Teste");
		u.setUsernameUsuario("usuarioTeste");
		u.setEmailUsuario("usuarioTeste@email.com");
		u.setSenhaUsuario("1234");
		InterfaceDao<TipoUsuario> daoTipoUsuario = FactoryDao.createTipoUsuarioDao();
		u.setTipoUsuario(daoTipoUsuario.getObjById(1));
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		u.setCidadeUsuario(daoCidade.getObjById(1));
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		u.setInstituicaoUsuario(daoInst.getObjById(1));
		InterfaceDao<Curso> daoCurso = FactoryDao.createCursoDao();
		u.setCursoUsuario(daoCurso.getObjById(1));
		InterfaceDao<Usuario> dao = FactoryDao.createUsuarioDao();
		dao.salvar(u);	
	}
	
	@Test
	public void listarUsuario() {		
		List<Usuario> usuarios = FactoryDao.createUsuarioDao().listar();
		if (usuarios.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarUsuario(){
		Usuario u = new Usuario();
		InterfaceDao<Usuario> daoUsuario = FactoryDao.createUsuarioDao();
		InterfaceDao<Curso> daoCurso = FactoryDao.createCursoDao();
		u = daoUsuario.getObjById(2);
		u.setCursoUsuario(daoCurso.getObjById(2));		
		daoUsuario.alterar(u);
	}
	
	@Test 
	public void excluirUsuario(){
		Usuario u = new Usuario();
		InterfaceDao<Usuario> dao = FactoryDao.createUsuarioDao();
		u = dao.getObjById(3);
		dao.excluir(u);
	}
}
