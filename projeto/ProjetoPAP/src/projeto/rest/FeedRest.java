package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Estado;
import projeto.entity.Feed;

@Path("/feedrest")
public class FeedRest {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Feed> listarFeeds() {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		return dao.listar();	
	}
	
	// post para salvar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarFeed(Feed f) {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		if (f.getIdFeed() < 1){
			dao.salvar(f);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarFeed(Feed f) {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		if (f.getIdFeed() > 0){
			dao.alterar(f);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarFeed(Feed f) {
		InterfaceDao<Feed> dao = FactoryDao.createFeedDao();
		if (f.getIdFeed() > 0){
			dao.excluir(f);
		}
	}
}
