package projeto.test;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Cidade;
import projeto.entity.Curso;
import projeto.entity.Estado;
import projeto.entity.InstituicaoEnsino;

public class TestIniciaBanco {
	
	@Test
	public void cadastrarEstado(){
		Estado uf = new Estado();
		uf.setNomeEstado("Paraná");
		uf.setSiglaEstado("PR");
		InterfaceDao<Estado> dao = FactoryDao.createEstadoDao();
		dao.salvar(uf);
	}
	
	@Test
	public void cadastrarCidade(){
		Cidade c = new Cidade();
		
		c.setNomeCidade("Curitiba");
		InterfaceDao<Estado> daoEstado = FactoryDao.createEstadoDao();
		c.setEstadoCidade(daoEstado.getObjById(1));
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		daoCidade.salvar(c);
	}
	
	@Test
	public void cadastrarInstituicao(){
		InstituicaoEnsino inst = new InstituicaoEnsino();
		
		inst.setNomeInstituicao("Universidade Positivo");
		InterfaceDao<Cidade> daoCidade = FactoryDao.createCidadeDao();
		inst.setCidadeInstituicao(daoCidade.getObjById(1));
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		daoInst.salvar(inst);
		
	}
	
	@Test
	public void cadastrarCurso(){
		Curso c = new Curso();
		c.setNomeCurso("Analise de Sistemas");
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		c.setInstituicaoCurso(daoInst.getObjById(1));
		InterfaceDao<Curso> daoCurso = FactoryDao.createCursoDao();
		daoCurso.salvar(c);
	}
	
}
