package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.business.FeedBusiness;
import projeto.business.RespostaBusiness;
import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Feed;
import projeto.entity.Resposta;

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
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/buscaFeedProjeto/{id}")
	public Feed buscaFeedProjeto(@PathParam("id") int id){
		System.out.println("Feed projeto: " +id);
		FeedBusiness fbus = new FeedBusiness();
		Feed f = fbus.buscaPorProjeto(id);
		return f;
	}
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getresposta/{id}")
	public List<Resposta> listarRespostas(@PathParam("id") int id) {
		RespostaBusiness rbus = new RespostaBusiness();
		return rbus.buscaRespostasFeed(id);
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
	
	// post para salvar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcadresposta/{id}")
	public void cadastrarResposta(@PathParam("id") int id, Resposta r) {
		RespostaBusiness rbus = new RespostaBusiness();
		if (r.getIdResposta() < 1){
			rbus.create(r, id);		
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
