package projeto.business;

import java.util.ArrayList;
import java.util.List;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.entity.Feed;
import projeto.entity.Projeto;
import projeto.entity.Resposta;

public class FeedBusiness {
	
	public void create (int idProjeto){
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		Projeto p = dao.getObjById(idProjeto);
		Feed f = new Feed();
		f.setTituloFeed("feed do projeto: "+p.getNome());
		f.setTextoFeed("Comente aqui a respeito do projeto.");
		f.setProjetoFeed(p);
		InterfaceDao<Feed> daoFeed = FactoryDao.createFeedDao();
		daoFeed.salvar(f);
	}
	
	public Feed buscaPorProjeto(int idProjeto){
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		
		List<Feed> feeds = dao.listar();
		for(Feed f : feeds){
			if(f.getProjetoFeed() != null){
				// retorna o feed de acordo com o projeto
				if(f.getProjetoFeed().getIdProjeto() == idProjeto){
					return f;
				}
			}
		}	
		return null;
	}
}
