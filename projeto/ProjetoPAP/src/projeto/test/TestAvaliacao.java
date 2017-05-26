package projeto.test;

import java.util.List;
import org.junit.Test;

import projeto.dao.AvaliacaoDao;
import projeto.dao.FactoryDao;
import projeto.entity.Avaliacao;


public class TestAvaliacao {
	
	@Test
	public void cadastrarAvaliacao(){
		Avaliacao a = new Avaliacao();
		
		a.setNomeAvaliacao("Avaliacao 1 teste");
		AvaliacaoDao daoAvaliacao = FactoryDao.createAvaliacaoDao();
		daoAvaliacao.salvar(a);
	}
	
	@Test
	public void listarAvaliacao() {		
		List<Avaliacao> avaliacoes = FactoryDao.createAvaliacaoDao().listar();
		if (avaliacoes.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarAvaliacao(){
		AvaliacaoDao daoAvaliacao = FactoryDao.createAvaliacaoDao();
		Avaliacao a = daoAvaliacao.getObjById(2);	
		a.setNomeAvaliacao("Avaliacao 1 teste alterada");
		daoAvaliacao.alterar(a);
	}
	
	@Test
	public void excluirAvaliacao(){
		AvaliacaoDao daoAvaliacao = FactoryDao.createAvaliacaoDao();
		Avaliacao a = daoAvaliacao.getObjById(3);
		daoAvaliacao.excluir(a);
	}

}
