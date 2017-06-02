package projeto.test;

import java.util.List;
import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.RespostaAvaliacaoDao;
import projeto.entity.RespostaAvaliacao;


public class TestRespostaAvaliacao {
	
	@Test
	public void cadastrarRespostaAvaliacao(){
		RespostaAvaliacao ra = new RespostaAvaliacao();
		
		ra.setTextoRespostaAvaliacao("RespostaAvaliacao 1 teste");
		RespostaAvaliacaoDao daoRespostaAvaliacao = FactoryDao.createRespostaAvaliacaoDao();
		daoRespostaAvaliacao.salvar(ra);
	}
	
	@Test
	public void listarRespostaAvaliacao() {		
		List<RespostaAvaliacao> respostaAvaliacaos = FactoryDao.createRespostaAvaliacaoDao().listar();
		if (respostaAvaliacaos.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarRespostaAvaliacao(){
		RespostaAvaliacaoDao daoRespostaAvaliacao = FactoryDao.createRespostaAvaliacaoDao();
		RespostaAvaliacao ra = daoRespostaAvaliacao.getObjById(2);	
		ra.setTextoRespostaAvaliacao("RespostaAvaliacao 1 teste alterada");
		daoRespostaAvaliacao.alterar(ra);
	}
	
	@Test
	public void excluirRespostaAvaliacao(){
		RespostaAvaliacaoDao daoRespostaAvaliacao = FactoryDao.createRespostaAvaliacaoDao();
		RespostaAvaliacao ra = daoRespostaAvaliacao.getObjById(3);
		daoRespostaAvaliacao.excluir(ra);
	}

}
