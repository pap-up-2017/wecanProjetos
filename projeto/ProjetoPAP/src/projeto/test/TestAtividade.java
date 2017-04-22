package projeto.test;

import java.util.List;
import org.junit.Test;

import projeto.dao.AtividadeDao;
import projeto.dao.FactoryDao;
import projeto.entity.Atividade;


public class TestAtividade {
	
	@Test
	public void cadastrarAtividade(){
		Atividade a = new Atividade();
		
		a.setNomeAtividade("Atividade 1 teste");
		AtividadeDao daoAtividade = FactoryDao.createAtividadeDao();
		daoAtividade.salvar(a);
	}
	
	@Test
	public void listarAtividade() {		
		List<Atividade> atividades = FactoryDao.createAtividadeDao().listar();
		if (atividades.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarAtividade(){
		AtividadeDao daoAtividade = FactoryDao.createAtividadeDao();
		Atividade a = daoAtividade.getObjById(2);	
		a.setNomeAtividade("Atividade 1 teste alterada");
		daoAtividade.alterar(a);
	}
	
	@Test
	public void excluirAtividade(){
		AtividadeDao daoAtividade = FactoryDao.createAtividadeDao();
		Atividade a = daoAtividade.getObjById(3);
		daoAtividade.excluir(a);
	}

}
