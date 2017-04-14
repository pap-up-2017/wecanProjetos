package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Resposta;
import projeto.entity.RespostaResposta;

public class TestRespostaResposta {
	
/*	@Test
	public void cadastrarRespostaResposta (){
		Resposta r = new Resposta();
		
		r.setTextoResposta("Resposta do feed");
		InterfaceDao<Feed> daoFeed = FactoryDao.createFeedDao();
		r.setFeedResposta(daoFeed.getObjById(2));
		
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		dao.salvar(r);
		
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		RespostaResposta rr = new RespostaResposta();
		rr.setRespostaPai(dao.getObjById(2));
		rr.setRespostaFilho(dao.getObjById(3));
		
		InterfaceDao<RespostaResposta> dao2 = FactoryDao.createRespostaRespostaDao();
		dao2.salvar(rr);
	}*/
	
	@Test
	public void listarResposta2() {		
		List<RespostaResposta> respostas2 = FactoryDao.createRespostaRespostaDao().listar();
		if (respostas2.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void excluirRespostaResposta(){
		InterfaceDao<RespostaResposta> dao = FactoryDao.createRespostaRespostaDao();
		RespostaResposta rr = dao.getObjById(1);
		dao.excluir(rr);
	}

}
