package projeto.test;

import java.util.List;

import org.junit.Test;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Feed;

public class TestFeed{
	
	@Test
	public void cadastrarFeed(){
		Feed f = new Feed();
		
		f.setTituloFeed("Titulo de feed Test");
		f.setTextoFeed("Texto de teste para feed de projetos.");
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		dao.salvar(f);
	}
	
	@Test
	public void listarFeeds() {		
		List<Feed> feeds = FactoryDao.createFeedDao().listar();
		if (feeds.size() > 0) {
			//funcionou
		}
	}
	
	@Test
	public void alterarTarefa(){
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		
		Feed f = dao.getObjById(1);
		f.setTituloFeed("Titulo de feed Teste");
		dao.alterar(f);
	}
	
	@Test
	public void excluirTarefa(){
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		Feed f = dao.getObjById(1);
		dao.excluir(f);
	}
}
