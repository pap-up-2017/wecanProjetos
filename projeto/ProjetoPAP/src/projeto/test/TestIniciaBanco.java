package projeto.test;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Cidade;
import projeto.entity.Curso;
import projeto.entity.Estado;
import projeto.entity.InstituicaoEnsino;
import projeto.entity.TipoUsuario;

public class TestIniciaBanco {
	
	@Test
	public void cadastrarUsuarioAdmin(){
		// cad estado
		InterfaceDao<Estado> daoUf = FactoryDao.createEstadoDao();
		Estado uf = new Estado();
		uf.setNomeEstado("Paraná");
		uf.setSiglaEstado("PR");
		daoUf.salvar(uf);
		
		// cad cidade
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		Cidade c = new Cidade();
		c.setNomeCidade("Curitiba");
		c.setEstadoCidade(daoUf.getObjById(1));
		daoCidade.salvar(c);
		
		//cadInstituicao
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		InstituicaoEnsino i = new InstituicaoEnsino();
		i.setNomeInstituicao("Universidade Positivo");
		i.setCidadeInstituicao(daoCidade.getObjById(1));
		daoInst.salvar(i);
		
		//cadCurso
		InterfaceDao<Curso> daoCurso = FactoryDao.createCursoDao();
		Curso curso = new Curso();
		curso.setNomeCurso("Analise e desenvolvimento de Sistemas");
		curso.setInstituicaoCurso(daoInst.getObjById(1));
		daoCurso.salvar(curso);
		
		//CadTipoUsuario
		InterfaceDao<TipoUsuario> dao = FactoryDao.createTipoUsuarioDao();
		TipoUsuario t = new TipoUsuario();
		t.setTipoUsuario("Administrador");
		dao.salvar(t);
	}
}
