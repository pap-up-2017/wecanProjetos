package projeto.test;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Disciplina;

public class TestDisciplina {
	
	@Test
	public void cadastrarDisciplina(){
		Disciplina c = new Disciplina();
		
		c.setNomeDisciplina("Disciplina X");

		InterfaceDao<Disciplina> dao = FactoryDao.createDisciplinaDao();
		dao.salvar(c);
		
	}
	
	@Test
	public void listarDisciplina() {		
		List<Disciplina> disciplinas = FactoryDao.createDisciplinaDao().listar();
		if (disciplinas.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarDisciplina(){
		InterfaceDao<Disciplina> daoDisc = FactoryDao.createDisciplinaDao();
		Disciplina disc = daoDisc.getObjById(1);	
		disc.setNomeDisciplina("Disciplina Alterada");
		daoDisc.alterar(disc);
	}
	
	@Test
	public void excluirDisciplina(){
		InterfaceDao<Disciplina> daoDisc = FactoryDao.createDisciplinaDao();
		Disciplina disc = daoDisc.getObjById(3);	
		daoDisc.excluir(disc);
	}

}
