package projeto.test;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Competencia;

public class TestCompetencia {
	
	@Test
	public void cadastrarCompetencia(){
		Competencia c = new Competencia();
		
		c.setNomeCompetencia("Competência Y");

		InterfaceDao<Competencia> dao = FactoryDao.createCompetenciaDao();
		dao.salvar(c);
		
	}
	
	@Test
	public void listarCompetencia() {		
		List<Competencia> competencias = FactoryDao.createCompetenciaDao().listar();
		if (competencias.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarCompetencia(){
		InterfaceDao<Competencia> daoComp = FactoryDao.createCompetenciaDao();
		Competencia comp = daoComp.getObjById(1);	
		comp.setNomeCompetencia("Competência Alterada");
		daoComp.alterar(comp);
	}
	
	@Test
	public void excluirCompetencia(){
		InterfaceDao<Competencia> daoComp = FactoryDao.createCompetenciaDao();
		Competencia comp = daoComp.getObjById(3);	
		daoComp.excluir(comp);
	}

}
