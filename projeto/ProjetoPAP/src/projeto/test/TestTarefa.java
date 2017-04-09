package projeto.test;

import java.util.List;
import org.junit.Test;
import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.entity.Projeto;
import projeto.entity.Tarefa;


public class TestTarefa {
	
	@Test
	public void cadastrarTarefa(){
		Tarefa t = new Tarefa();
		
		t.setNomeTarefa("Tarefa 1 teste");
		InterfaceProjetoDao<Projeto> daoProjeto = FactoryDao.createProjetoDao();
		t.setProjetoTarefa(daoProjeto.getObjById(1));
		InterfaceDao<Tarefa> daoTarefa = FactoryDao.createTarefaDao();
		daoTarefa.salvar(t);
	}
	
	@Test
	public void listarTarefa() {		
		List<Tarefa> tarefas = FactoryDao.createTarefaDao().listar();
		if (tarefas.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarTarefa(){
		InterfaceDao<Tarefa> daoTarefa = FactoryDao.createTarefaDao();
		InterfaceProjetoDao<Projeto> daoProjeto = FactoryDao.createProjetoDao();
		Tarefa t = daoTarefa.getObjById(2);	
		t.setNomeTarefa("Tarefa 1 teste alterada");
		t.setProjetoTarefa(daoProjeto.getObjById(2));
		daoTarefa.alterar(t);
	}
	
	@Test
	public void excluirTarefa(){
		InterfaceDao<Tarefa> daoTarefa = FactoryDao.createTarefaDao();
		Tarefa t = daoTarefa.getObjById(3);
		daoTarefa.excluir(t);
	}

}
