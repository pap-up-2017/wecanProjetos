package projeto.test;

import java.util.List;
import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.RespostaAtividadeDao;
import projeto.entity.RespostaAtividade;


public class TestRespostaAtividade {
	
	@Test
	public void cadastrarRespostaAtividade(){
		RespostaAtividade ra = new RespostaAtividade();
		
		ra.setTextoRespostaAtividade("RespostaAtividade 1 teste");
		RespostaAtividadeDao daoRespostaAtividade = FactoryDao.createRespostaAtividadeDao();
		daoRespostaAtividade.salvar(ra);
	}
	
	@Test
	public void listarRespostaAtividade() {		
		List<RespostaAtividade> respostaAtividades = FactoryDao.createRespostaAtividadeDao().listar();
		if (respostaAtividades.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarRespostaAtividade(){
		RespostaAtividadeDao daoRespostaAtividade = FactoryDao.createRespostaAtividadeDao();
		RespostaAtividade ra = daoRespostaAtividade.getObjById(2);	
		ra.setTextoRespostaAtividade("RespostaAtividade 1 teste alterada");
		daoRespostaAtividade.alterar(ra);
	}
	
	@Test
	public void excluirRespostaAtividade(){
		RespostaAtividadeDao daoRespostaAtividade = FactoryDao.createRespostaAtividadeDao();
		RespostaAtividade ra = daoRespostaAtividade.getObjById(3);
		daoRespostaAtividade.excluir(ra);
	}

}
