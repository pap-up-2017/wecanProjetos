package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Curso;
import projeto.entity.InstituicaoEnsino;

public class TestCurso {
	
	@Test
	public void cadastrarCurso(){
		Curso c = new Curso();
		c.setNomeCurso("Analise de Sistemas");
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		c.setInstituicaoCurso(daoInst.getObjById(1));
		InterfaceDao<Curso> daoCurso = FactoryDao.createCursoDao();
		daoCurso.salvar(c);
	}
	
	@Test
	public void listarCurso() {		
		List<Curso> cursos = FactoryDao.createCursoDao().listar();
		if (cursos.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarCurso(){
		Curso c = new Curso();
		c.setIdCurso(2);
		c.setNomeCurso("Analise de Sistemas");
		InterfaceDao<InstituicaoEnsino> daoInst = FactoryDao.createInstituicaoEnsinoDao();
		c.setInstituicaoCurso(daoInst.getObjById(2));
		InterfaceDao<Curso> daoCurso = FactoryDao.createCursoDao();
		daoCurso.alterar(c);
	}
	
	@Test 
	public void excluirCurso(){
		Curso c = new Curso();
		InterfaceDao<Curso> daoCurso = FactoryDao.createCursoDao();
		c = daoCurso.getObjById(3);
		daoCurso.excluir(c);
	}

	

}
