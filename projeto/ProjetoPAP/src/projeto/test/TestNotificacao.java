package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.NotificacaoDao;
import projeto.entity.Notificacao;

public class TestNotificacao {
	
	@Test
	public void cadastrarNotificacao(){
		Notificacao n = new Notificacao();
		n.setTextoNotificacao("Notificação 1");
		NotificacaoDao daoNot = FactoryDao.createNotificacaoDao();
		daoNot.salvar(n);
	}
	
	@Test
	public void listarnNotificacao() {
		int id = 1;
		List<Notificacao> notificacao = FactoryDao.createNotificacaoDao().listarPorUsuario(id);
		if (notificacao.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarNotificacao(){
		Notificacao n = new Notificacao();
		n.setIdNotificacao(2);
		n.setTituloNotificacao("Notificação alterada");
		NotificacaoDao daoNot = FactoryDao.createNotificacaoDao();
		daoNot.alterar(n);
	}
	
	@Test 
	public void excluirNotificacao(){
		Notificacao n = new Notificacao();
		NotificacaoDao daoNot = FactoryDao.createNotificacaoDao();
		n = daoNot.getObjById(3);
		daoNot.excluir(n);
	}

	

}
