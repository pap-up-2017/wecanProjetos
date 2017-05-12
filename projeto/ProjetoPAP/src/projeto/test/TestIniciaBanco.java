package projeto.test;

import org.junit.Test;

import projeto.business.UsuarioBusiness;
import projeto.dao.CidadeDao;
import projeto.dao.CursoDao;
import projeto.dao.EstadoDao;
import projeto.dao.FactoryDao;
import projeto.dao.InstituicaoEnsinoDao;
import projeto.dao.InterfaceDao;
import projeto.dao.TipoUsuarioDao;
import projeto.entity.Cidade;
import projeto.entity.Curso;
import projeto.entity.Estado;
import projeto.entity.InstituicaoEnsino;
import projeto.entity.TipoUsuario;
import projeto.entity.Usuario;

public class TestIniciaBanco {
	
	@Test
	public void cadastrarUsuarioAdmin(){
		// cria tipo usuario 
		TipoUsuario t = new TipoUsuario();
		t.setTipoUsuario("Administrador");
		TipoUsuarioDao tDao = new TipoUsuarioDao();
		tDao.salvar(t);
		
		// cria estado
		Estado e = new Estado();
		e.setNomeEstado("Paraná");
		e.setSiglaEstado("PR");
		EstadoDao eDao = new EstadoDao();
		eDao.salvar(e);
		
		// cria cidade 
		Cidade c = new Cidade();
		c.setNomeCidade("Curitiba");
		c.setEstadoCidade(eDao.getObjById(1));
		CidadeDao cDao = new CidadeDao();
		cDao.salvar(c);
		
		// cria instituição
		InstituicaoEnsino i = new InstituicaoEnsino();
		i.setNomeInstituicao("Universidade Positivo");
		i.setCidadeInstituicao(cDao.getObjById(1));
		InstituicaoEnsinoDao iDao = new InstituicaoEnsinoDao();
		iDao.salvar(i);
		
		//cria curso
		Curso cs = new Curso();
		cs.setNomeCurso("Analise e Desenvolvimento de Sistemas");
		cs.setInstituicaoCurso(iDao.getObjById(1));
		CursoDao csDao = new CursoDao();
		csDao.salvar(cs);
		
		// cria usuario
		Usuario u = new Usuario();
		u.setNomeUsuario("Administrador do Sistema");
		u.setUsernameUsuario("administrador");
		u.setEmailUsuario("adm@wecan.com");
		u.setSenhaUsuario("wecanADM");
		u.setTipoUsuario(tDao.getObjById(1));
		u.setCidadeUsuario(cDao.getObjById(1));
		u.setInstituicaoUsuario(iDao.getObjById(1));
		u.setCursoUsuario(csDao.getObjById(1));
		UsuarioBusiness uBusiness = new UsuarioBusiness();
		uBusiness.create(u);
	}
}
