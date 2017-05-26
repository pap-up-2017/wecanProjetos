package projeto.test;

import java.util.List;
import org.junit.Test;

import projeto.dao.AvaliacaoDao;
import projeto.dao.ExercicioDao;
import projeto.dao.FactoryDao;
import projeto.entity.Avaliacao;
import projeto.entity.Exercicio;


public class TestExercicio {
	
	@Test
	public void cadastrarExercicio(){
		Exercicio e = new Exercicio();
		
		e.setTituloExercicio("Exercicio 1 teste");
		ExercicioDao daoExercicio = FactoryDao.createExercicioDao();
		daoExercicio.salvar(e);
	}
	
	@Test
	public void listarExercicio() {		
		List<Exercicio> exercicios = FactoryDao.createExercicioDao().listar();
		if (exercicios.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarExercicio(){
		ExercicioDao daoExercicio = FactoryDao.createExercicioDao();
		Exercicio e = daoExercicio.getObjById(2);	
		e.setTituloExercicio("Exercicio 1 teste alterada");
		daoExercicio.alterar(e);
	}
	
	@Test
	public void excluirExercicio(){
		ExercicioDao daoExercicio = FactoryDao.createExercicioDao();
		Exercicio e = daoExercicio.getObjById(3);
		daoExercicio.excluir(e);
	}

}
