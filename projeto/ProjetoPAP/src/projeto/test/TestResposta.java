package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Feed;
import projeto.entity.Resposta;

public class TestResposta {

	@Test
	public void cadastrarResposta(){
		Resposta r = new Resposta();
		
		r.setTextoResposta("Resposta do feed");
		InterfaceDao<Feed> daoFeed = FactoryDao.createFeedDao();
		r.setFeedResposta(daoFeed.getObjById(3));
		
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		dao.salvar(r);
	}
	
	@Test
	public void listarResposta() {		
		List<Resposta> respostas = FactoryDao.createRespostaDao().listar();
		if (respostas.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarResposta(){
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		
		Resposta r = dao.getObjById(1);
		r.setTextoResposta("Texto da resposta alterado");
		dao.alterar(r);
	}
	
	@Test
	public void excluirResposta(){
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		Resposta r = dao.getObjById(1);
		dao.excluir(r);
	}
}
